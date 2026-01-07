import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Building2, Play, Pause, Wrench, Users } from 'lucide-react';
import { hallStatuses } from '@/data/mockAdminData';
import { seatLayouts } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function HallManagement() {
    const [selectedHall, setSelectedHall] = useState<typeof hallStatuses[0] | null>(null);
    const [isSeatDialogOpen, setIsSeatDialogOpen] = useState(false);
    const [maintenanceSeats, setMaintenanceSeats] = useState<string[]>([]);

    const openSeatDialog = (hall: typeof hallStatuses[0]) => {
        setSelectedHall(hall);
        setMaintenanceSeats(hall.maintenanceSeats);
        setIsSeatDialogOpen(true);
    };

    const toggleMaintenance = (seatId: string) => {
        setMaintenanceSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(s => s !== seatId)
                : [...prev, seatId]
        );
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'showing':
                return <Play className="h-4 w-4 text-green-600" />;
            case 'cleaning':
                return <Pause className="h-4 w-4 text-amber-600" />;
            case 'maintenance':
                return <Wrench className="h-4 w-4 text-red-600" />;
            default:
                return <Pause className="h-4 w-4 text-gray-400" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'showing':
                return <Badge className="bg-green-100 text-green-700">Now Showing</Badge>;
            case 'cleaning':
                return <Badge className="bg-amber-100 text-amber-700">Cleaning</Badge>;
            case 'maintenance':
                return <Badge variant="destructive">Maintenance</Badge>;
            default:
                return <Badge variant="secondary">Idle</Badge>;
        }
    };

    // Generate seat grid for dialog
    const renderSeatGrid = (hallId: string) => {
        const hallSeats = seatLayouts.filter(s => s.hallId === hallId);
        const rows = [...new Set(hallSeats.map(s => s.row))].sort();
        const maxSeatsPerRow = Math.max(...hallSeats.map(s => s.number));

        return (
            <div className="space-y-2">
                <div className="flex justify-center mb-4">
                    <div className="bg-primary/20 rounded-lg px-8 py-2 text-sm text-primary border border-primary/30">
                        SCREEN
                    </div>
                </div>

                {rows.map((row) => {
                    const rowSeats = hallSeats.filter(s => s.row === row).sort((a, b) => a.number - b.number);
                    return (
                        <div key={row} className="flex items-center gap-1 justify-center">
                            <span className="w-6 text-xs text-muted-foreground">{row}</span>
                            {rowSeats.map((seat) => {
                                const seatLabel = `${seat.row}${seat.number}`;
                                const isInMaintenance = maintenanceSeats.includes(seatLabel);
                                return (
                                    <button
                                        key={seat.id}
                                        onClick={() => toggleMaintenance(seatLabel)}
                                        className={cn(
                                            'w-6 h-6 rounded text-xs font-medium transition-colors',
                                            isInMaintenance
                                                ? 'bg-red-500 text-white'
                                                : 'bg-secondary hover:bg-secondary/70 text-foreground'
                                        )}
                                        title={isInMaintenance ? 'Click to remove from maintenance' : 'Click to mark for maintenance'}
                                    >
                                        {seat.number}
                                    </button>
                                );
                            })}
                        </div>
                    );
                })}

                <div className="flex justify-center gap-4 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-secondary" />
                        <span className="text-xs">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-500" />
                        <span className="text-xs">Maintenance</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Hall Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hallStatuses.map((hall) => (
                        <Card key={hall.hallId} className="overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(hall.status)}
                                        <CardTitle className="text-lg">{hall.hallName}</CardTitle>
                                        <Badge variant="outline">{hall.hallType}</Badge>
                                    </div>
                                    {getStatusBadge(hall.status)}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {hall.status === 'showing' && hall.currentMovie ? (
                                    <div className="bg-secondary/50 rounded-lg p-3 border border-border/50">
                                        <p className="font-medium">{hall.currentMovie}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Showtime: {hall.currentShowtime}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-secondary/50 rounded-lg p-3 text-center text-muted-foreground border border-border/50">
                                        {hall.status === 'cleaning' && 'Cleaning in progress...'}
                                        {hall.status === 'maintenance' && 'Under maintenance'}
                                        {hall.status === 'idle' && 'No screenings scheduled'}
                                    </div>
                                )}

                                {/* Occupancy */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="flex items-center gap-1">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            Occupancy
                                        </span>
                                        <span className="font-medium">
                                            {hall.bookedSeats}/{hall.totalSeats} ({hall.occupancyRate.toFixed(1)}%)
                                        </span>
                                    </div>
                                    <Progress value={hall.occupancyRate} className="h-2" />
                                </div>

                                {/* Maintenance Seats */}
                                {hall.maintenanceSeats.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <Wrench className="h-4 w-4 text-red-500" />
                                        <span className="text-sm text-red-600">
                                            {hall.maintenanceSeats.length} seat(s) under maintenance
                                        </span>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => openSeatDialog(hall)}
                                    >
                                        <Building2 className="h-4 w-4 mr-1" />
                                        Manage Seats
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Set Status
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Seat Maintenance Dialog */}
                <Dialog open={isSeatDialogOpen} onOpenChange={setIsSeatDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{selectedHall?.hallName} - Seat Maintenance</DialogTitle>
                            <DialogDescription>
                                Click on seats to toggle maintenance status. Red seats are marked for maintenance.
                            </DialogDescription>
                        </DialogHeader>
                        {selectedHall && renderSeatGrid(selectedHall.hallId)}
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setIsSeatDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsSeatDialogOpen(false)}>
                                Save Changes ({maintenanceSeats.length} seats)
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
