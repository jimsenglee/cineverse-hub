import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Shield, Search, Filter, Download, RefreshCw } from 'lucide-react';
import { auditLogs } from '@/data/mockAdminData';

export default function AuditLogViewer() {
    const [searchQuery, setSearchQuery] = useState('');
    const [actionFilter, setActionFilter] = useState('all');
    const [staffFilter, setStaffFilter] = useState('all');

    const actionTypes = ['all', 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'FORCE_UNLOCK', 'REFUND'];
    const staffNames = ['all', ...new Set(auditLogs.map(log => log.staffName))];

    const filteredLogs = auditLogs.filter((log) => {
        const matchesSearch =
            log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.tableName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAction = actionFilter === 'all' || log.actionType === actionFilter;
        const matchesStaff = staffFilter === 'all' || log.staffName === staffFilter;
        return matchesSearch && matchesAction && matchesStaff;
    });

    const getActionBadge = (action: string) => {
        switch (action) {
            case 'CREATE':
                return <Badge className="bg-green-100 text-green-700">CREATE</Badge>;
            case 'UPDATE':
                return <Badge className="bg-amber-100 text-amber-700">UPDATE</Badge>;
            case 'DELETE':
                return <Badge className="bg-red-100 text-red-700">DELETE</Badge>;
            case 'LOGIN':
                return <Badge className="bg-blue-100 text-blue-700">LOGIN</Badge>;
            case 'LOGOUT':
                return <Badge className="bg-secondary text-muted-foreground">LOGOUT</Badge>;
            case 'FORCE_UNLOCK':
                return <Badge className="bg-purple-100 text-purple-700">UNLOCK</Badge>;
            case 'REFUND':
                return <Badge className="bg-orange-100 text-orange-700">REFUND</Badge>;
            default:
                return <Badge variant="outline">{action}</Badge>;
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search logs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={actionFilter} onValueChange={setActionFilter}>
                        <SelectTrigger className="w-40">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {actionTypes.map((action) => (
                                <SelectItem key={action} value={action}>
                                    {action === 'all' ? 'All Actions' : action}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={staffFilter} onValueChange={setStaffFilter}>
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {staffNames.map((name) => (
                                <SelectItem key={name} value={name}>
                                    {name === 'all' ? 'All Staff' : name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                    <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>

                {/* Audit Logs Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Audit Trail ({filteredLogs.length} records)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[140px]">Timestamp</TableHead>
                                    <TableHead>Staff</TableHead>
                                    <TableHead className="w-[100px]">Action</TableHead>
                                    <TableHead>Target</TableHead>
                                    <TableHead>Old Value</TableHead>
                                    <TableHead>New Value</TableHead>
                                    <TableHead className="w-[120px]">IP Address</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLogs.map((log) => {
                                    const ts = formatTimestamp(log.timestamp);
                                    return (
                                        <TableRow key={log.id}>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <p>{ts.date}</p>
                                                    <p className="text-muted-foreground">{ts.time}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p className="font-medium">{log.staffName}</p>
                                                <p className="text-xs text-muted-foreground">{log.staffId}</p>
                                            </TableCell>
                                            <TableCell>{getActionBadge(log.actionType)}</TableCell>
                                            <TableCell>
                                                <p className="font-medium">{log.tableName}</p>
                                                <p className="text-xs text-muted-foreground font-mono">{log.recordId}</p>
                                            </TableCell>
                                            <TableCell>
                                                {log.oldValue ? (
                                                    <code className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                                                        {log.oldValue}
                                                    </code>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {log.newValue ? (
                                                    <code className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                                                        {log.newValue}
                                                    </code>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <code className="text-xs text-muted-foreground">{log.ipAddress}</code>
                                            </TableCell>
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
