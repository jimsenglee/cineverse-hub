import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    AlertTriangle,
} from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks, subWeeks } from 'date-fns';
import { calendarShowtimes, movies, cinemas } from '@/data/mockAdminData';

export default function ShowtimeScheduler() {
    const [currentDate, setCurrentDate] = useState(new Date('2026-01-04'));
    const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<{ hall: string; time: string } | null>(null);
    const [hasConflict, setHasConflict] = useState(false);

    // Form state
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedHall, setSelectedHall] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const halls = cinemas[0]?.halls || [];
    const hours = Array.from({ length: 16 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`);

    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    // Filter showtimes for current view
    const getShowtimesForDay = (date: Date, hallId: string) => {
        const dateStr = format(date, 'yyyy-MM-dd');
        return calendarShowtimes.filter((st) => {
            const stDate = format(new Date(st.startTime), 'yyyy-MM-dd');
            return stDate === dateStr && st.hallId === hallId;
        });
    };

    // Check for conflicts
    const checkConflict = (movieId: string, hallId: string, time: string) => {
        const movie = movies.find(m => m.id === movieId);
        if (!movie) return false;

        const startTime = new Date(`${format(currentDate, 'yyyy-MM-dd')}T${time}:00`);
        const endTime = new Date(startTime.getTime() + movie.duration * 60000);

        const existingShowtimes = getShowtimesForDay(currentDate, hallId);

        return existingShowtimes.some((st) => {
            const stStart = new Date(st.startTime);
            const stEnd = new Date(st.endTime);
            return (startTime < stEnd && endTime > stStart);
        });
    };

    const handleMovieSelect = (movieId: string) => {
        setSelectedMovie(movieId);
        if (selectedHall && selectedTime) {
            setHasConflict(checkConflict(movieId, selectedHall, selectedTime));
        }
    };

    const handleHallSelect = (hallId: string) => {
        setSelectedHall(hallId);
        if (selectedMovie && selectedTime) {
            setHasConflict(checkConflict(selectedMovie, hallId, selectedTime));
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        if (selectedMovie && selectedHall) {
            setHasConflict(checkConflict(selectedMovie, selectedHall, time));
        }
    };

    const openAddDialog = (hall?: string, time?: string) => {
        setSelectedSlot(hall && time ? { hall, time } : null);
        if (hall) setSelectedHall(hall);
        if (time) setSelectedTime(time);
        setIsAddDialogOpen(true);
    };

    const renderDayView = () => (
        <div className="grid grid-cols-[80px_repeat(4,1fr)] gap-1">
            {/* Header */}
            <div className="h-12 bg-secondary rounded flex items-center justify-center font-medium text-sm text-foreground">
                Time
            </div>
            {halls.map((hall) => (
                <div
                    key={hall.id}
                    className="h-12 bg-secondary rounded flex items-center justify-center font-medium text-sm text-foreground"
                >
                    {hall.name}
                    <Badge variant="outline" className="ml-2 text-xs">
                        {hall.type}
                    </Badge>
                </div>
            ))}

            {/* Time slots */}
            {hours.map((hour) => (
                <>
                    <div
                        key={`time-${hour}`}
                        className="h-16 bg-secondary/50 rounded flex items-center justify-center text-sm text-muted-foreground border border-border/50"
                    >
                        {hour}
                    </div>
                    {halls.map((hall) => {
                        const slotShowtimes = getShowtimesForDay(currentDate, hall.id).filter((st) => {
                            const stHour = format(new Date(st.startTime), 'HH:00');
                            return stHour === hour;
                        });

                        return (
                            <div
                                key={`${hall.id}-${hour}`}
                                className="h-16 bg-card rounded border border-border/50 p-1 relative group cursor-pointer hover:bg-secondary/50"
                                onClick={() => openAddDialog(hall.id, hour)}
                            >
                                {slotShowtimes.map((st) => (
                                    <div
                                        key={st.id}
                                        className="absolute inset-1 rounded px-2 py-1 text-white text-xs font-medium truncate flex items-center"
                                        style={{ backgroundColor: st.color }}
                                    >
                                        {st.movieTitle}
                                    </div>
                                ))}
                                {slotShowtimes.length === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </>
            ))}
        </div>
    );

    const renderWeekView = () => (
        <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-1">
            {/* Header */}
            <div className="h-12 bg-secondary rounded flex items-center justify-center font-medium text-sm text-foreground">
                Hall
            </div>
            {weekDays.map((day) => (
                <div
                    key={day.toISOString()}
                    className="h-12 bg-secondary rounded flex flex-col items-center justify-center font-medium text-sm text-foreground"
                >
                    <span>{format(day, 'EEE')}</span>
                    <span className="text-xs text-muted-foreground">{format(day, 'MMM d')}</span>
                </div>
            ))}

            {/* Hall rows */}
            {halls.map((hall) => (
                <>
                    <div
                        key={`hall-${hall.id}`}
                        className="h-24 bg-secondary/50 rounded flex flex-col items-center justify-center text-sm border border-border/50"
                    >
                        <span className="font-medium text-foreground">{hall.name}</span>
                        <Badge variant="outline" className="text-xs mt-1">
                            {hall.type}
                        </Badge>
                    </div>
                    {weekDays.map((day) => {
                        const dayShowtimes = getShowtimesForDay(day, hall.id);

                        return (
                            <div
                                key={`${hall.id}-${day.toISOString()}`}
                                className="h-24 bg-card rounded border border-border/50 p-1 overflow-y-auto"
                            >
                                <div className="space-y-1">
                                    {dayShowtimes.slice(0, 3).map((st) => (
                                        <div
                                            key={st.id}
                                            className="rounded px-1 py-0.5 text-white text-xs truncate"
                                            style={{ backgroundColor: st.color }}
                                        >
                                            {format(new Date(st.startTime), 'HH:mm')} {st.movieTitle}
                                        </div>
                                    ))}
                                    {dayShowtimes.length > 3 && (
                                        <div className="text-xs text-muted-foreground text-center">
                                            +{dayShowtimes.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </>
            ))}
        </div>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                                setCurrentDate(viewMode === 'day' ? addDays(currentDate, -1) : subWeeks(currentDate, 1))
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                                setCurrentDate(viewMode === 'day' ? addDays(currentDate, 1) : addWeeks(currentDate, 1))
                            }
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">
                                {viewMode === 'day'
                                    ? format(currentDate, 'EEEE, MMMM d, yyyy')
                                    : `Week of ${format(weekStart, 'MMM d')} - ${format(addDays(weekStart, 6), 'MMM d, yyyy')}`}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex border rounded-lg overflow-hidden">
                            <Button
                                variant={viewMode === 'day' ? 'secondary' : 'ghost'}
                                size="sm"
                                className="rounded-none"
                                onClick={() => setViewMode('day')}
                            >
                                Day
                            </Button>
                            <Button
                                variant={viewMode === 'week' ? 'secondary' : 'ghost'}
                                size="sm"
                                className="rounded-none"
                                onClick={() => setViewMode('week')}
                            >
                                Week
                            </Button>
                        </div>

                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button onClick={() => openAddDialog()}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Showtime
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Add Showtime</DialogTitle>
                                    <DialogDescription>
                                        Schedule a new movie showtime for {format(currentDate, 'MMMM d, yyyy')}.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label>Movie</Label>
                                        <Select value={selectedMovie} onValueChange={handleMovieSelect}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select movie" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {movies.map((movie) => (
                                                    <SelectItem key={movie.id} value={movie.id}>
                                                        {movie.title} ({movie.duration} min)
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Hall</Label>
                                        <Select value={selectedHall} onValueChange={handleHallSelect}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select hall" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {halls.map((hall) => (
                                                    <SelectItem key={hall.id} value={hall.id}>
                                                        {hall.name} ({hall.type})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Start Time</Label>
                                        <Input
                                            type="time"
                                            value={selectedTime}
                                            onChange={(e) => handleTimeSelect(e.target.value)}
                                        />
                                    </div>

                                    {hasConflict && (
                                        <Alert variant="destructive">
                                            <AlertTriangle className="h-4 w-4" />
                                            <AlertDescription>
                                                This showtime conflicts with an existing schedule in the selected hall.
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>

                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => setIsAddDialogOpen(false)}
                                        disabled={!selectedMovie || !selectedHall || !selectedTime || hasConflict}
                                    >
                                        Add Showtime
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Legend */}
                <Card>
                    <CardContent className="py-3">
                        <div className="flex items-center gap-6 flex-wrap">
                            <span className="text-sm text-muted-foreground">Legend:</span>
                            {movies.slice(0, 5).map((movie, index) => {
                                const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
                                return (
                                    <div key={movie.id} className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded"
                                            style={{ backgroundColor: colors[index % colors.length] }}
                                        />
                                        <span className="text-sm">{movie.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Calendar Grid */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold">
                            Showtime Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        {viewMode === 'day' ? renderDayView() : renderWeekView()}
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
