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
import { Clock, Plus, User, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { shifts } from '@/data/mockAdminData';
import { KPICard } from '@/components/admin/KPICard';

export default function ShiftManagement() {
    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <Badge className="bg-green-100 text-green-700">Active</Badge>;
            case 'completed':
                return <Badge variant="secondary">Completed</Badge>;
            case 'scheduled':
                return <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const calculateVariance = (start: number, end?: number) => {
        if (!end) return null;
        const variance = end - start;
        return variance;
    };

    const activeShifts = shifts.filter(s => s.status === 'active').length;
    const completedToday = shifts.filter(s => s.status === 'completed').length;

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <KPICard
                        title="Active Shifts"
                        value={activeShifts}
                        valueClassName="text-green-600"
                        icon={<User className="h-5 w-5 text-green-600" />}
                        iconClassName="bg-green-100"
                    />
                    <KPICard
                        title="Completed Today"
                        value={completedToday}
                        icon={<CheckCircle className="h-5 w-5 text-blue-600" />}
                        iconClassName="bg-blue-100"
                    />
                    <KPICard
                        title="Scheduled"
                        value={shifts.filter(s => s.status === 'scheduled').length}
                        icon={<Clock className="h-5 w-5 text-amber-600" />}
                        iconClassName="bg-amber-100"
                    />
                </div>

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">Shift Log</h3>
                        <p className="text-sm text-muted-foreground">
                            Track staff shifts and cash drawer reconciliation
                        </p>
                    </div>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Shift
                    </Button>
                </div>

                {/* Shifts Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Today's Shifts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Staff</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Scheduled</TableHead>
                                    <TableHead>Actual</TableHead>
                                    <TableHead>Cash Drawer Start</TableHead>
                                    <TableHead>Cash Drawer End</TableHead>
                                    <TableHead>Variance</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {shifts.map((shift) => {
                                    const variance = calculateVariance(
                                        shift.cashDrawerStartAmount,
                                        shift.cashDrawerEndAmount
                                    );

                                    return (
                                        <TableRow key={shift.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <User className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <span className="font-medium">{shift.staffName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{formatDate(shift.startTime)}</TableCell>
                                            <TableCell>
                                                <span className="text-sm">
                                                    {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {shift.actualStart ? (
                                                    <span className="text-sm">
                                                        {formatTime(shift.actualStart)}
                                                        {shift.actualEnd && ` - ${formatTime(shift.actualEnd)}`}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono">
                                                    RM {shift.cashDrawerStartAmount.toFixed(2)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {shift.cashDrawerEndAmount ? (
                                                    <span className="font-mono">
                                                        RM {shift.cashDrawerEndAmount.toFixed(2)}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {variance !== null ? (
                                                    <div className="flex items-center gap-1">
                                                        {variance > 0 ? (
                                                            <>
                                                                <DollarSign className="h-3 w-3 text-green-500" />
                                                                <span className="text-green-600 font-mono">
                                                                    +RM {variance.toFixed(2)}
                                                                </span>
                                                            </>
                                                        ) : variance < 0 ? (
                                                            <>
                                                                <AlertTriangle className="h-3 w-3 text-red-500" />
                                                                <span className="text-red-600 font-mono">
                                                                    -RM {Math.abs(variance).toFixed(2)}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-muted-foreground">RM 0.00</span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(shift.status)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
