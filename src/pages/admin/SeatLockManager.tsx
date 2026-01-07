import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Unlock, Clock, User, Film, AlertTriangle, CheckCircle } from 'lucide-react';
import { activeSeatLocks } from '@/data/mockAdminData';
import { toast } from 'sonner';
import { KPICard } from '@/components/admin/KPICard';
import { EmptyState } from '@/components/ui/empty-state';

export default function SeatLockManager() {
    const [locks, setLocks] = useState(activeSeatLocks);
    const [unlockDialogOpen, setUnlockDialogOpen] = useState(false);
    const [selectedLock, setSelectedLock] = useState<typeof activeSeatLocks[0] | null>(null);

    const handleUnlockClick = (lock: typeof activeSeatLocks[0]) => {
        setSelectedLock(lock);
        setUnlockDialogOpen(true);
    };

    const handleConfirmUnlock = () => {
        if (selectedLock) {
            setLocks(locks.filter((l) => l.id !== selectedLock.id));
            toast.success(`Seat ${selectedLock.seatLabel} has been unlocked`, {
                description: 'The customer has been notified.',
            });
        }
        setUnlockDialogOpen(false);
        setSelectedLock(null);
    };

    const getTimeRemaining = (expirationTime: string) => {
        const expiry = new Date(expirationTime);
        const now = new Date('2026-01-04T13:50:00'); // Mock current time
        const diffMs = expiry.getTime() - now.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins <= 0) return { text: 'Expired', variant: 'destructive' as const };
        if (diffMins <= 2) return { text: `${diffMins}m left`, variant: 'destructive' as const };
        if (diffMins <= 5) return { text: `${diffMins}m left`, variant: 'secondary' as const };
        return { text: `${diffMins}m left`, variant: 'outline' as const };
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Summary Cards */}
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <KPICard
                        title="Active Locks"
                        value={locks.length}
                        icon={<Clock className="h-5 w-5 text-orange-600" />}
                        iconClassName="bg-orange-100"
                    />
                    <KPICard
                        title="Expiring Soon"
                        value={locks.filter((l) => getTimeRemaining(l.lockExpirationTime).variant === 'destructive').length}
                        valueClassName="text-red-600"
                        icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
                        iconClassName="bg-red-100"
                    />
                    <KPICard
                        title="Seats Unlocked Today"
                        value="12"
                        valueClassName="text-green-600"
                        icon={<CheckCircle className="h-5 w-5 text-green-600" />}
                        iconClassName="bg-green-100"
                    />
                </div>

                {/* Active Locks Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Unlock className="h-5 w-5" />
                            Active Seat Locks
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {locks.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Lock ID</TableHead>
                                        <TableHead>Movie / Showtime</TableHead>
                                        <TableHead>Seat</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Time Remaining</TableHead>
                                        <TableHead>Created</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {locks.map((lock) => {
                                        const timeStatus = getTimeRemaining(lock.lockExpirationTime);

                                        return (
                                            <TableRow key={lock.id}>
                                                <TableCell className="font-mono text-sm">{lock.id}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Film className="h-4 w-4 text-muted-foreground" />
                                                        <div>
                                                            <p className="font-medium">{lock.movieTitle}</p>
                                                            <p className="text-xs text-muted-foreground">{lock.showtime}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">{lock.seatLabel}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-muted-foreground" />
                                                        <div>
                                                            <p className="text-sm">{lock.userName}</p>
                                                            <p className="text-xs text-muted-foreground">{lock.userId}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={timeStatus.variant}>{timeStatus.text}</Badge>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {new Date(lock.createdAt).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => handleUnlockClick(lock)}
                                                    >
                                                        <Unlock className="h-4 w-4 mr-1" />
                                                        Force Unlock
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <EmptyState
                                icon={CheckCircle}
                                title="No Active Locks"
                                description="All seats are currently available or booked."
                                iconClassName="text-green-500"
                            />
                        )}
                    </CardContent>
                </Card>

                {/* Unlock Confirmation Dialog */}
                <AlertDialog open={unlockDialogOpen} onOpenChange={setUnlockDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                Force Unlock Seat?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {selectedLock && (
                                    <>
                                        You are about to force release the lock on seat{' '}
                                        <strong>{selectedLock.seatLabel}</strong> for{' '}
                                        <strong>{selectedLock.movieTitle}</strong>.
                                        <br /><br />
                                        The customer <strong>{selectedLock.userName}</strong> will lose their
                                        reservation and need to reselect seats. Only do this if the customer
                                        has explicitly requested or abandoned their booking.
                                    </>
                                )}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleConfirmUnlock}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Force Unlock
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AdminLayout>
    );
}
