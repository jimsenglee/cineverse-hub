import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import {
    DollarSign,
    Ticket,
    Lock,
    Users,
    TrendingUp,
    TrendingDown,
    Clock,
    AlertTriangle,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { KPICard } from '@/components/admin/KPICard';
import {
    dashboardKPIs,
    ticketSalesByMovie,
    hourlyRevenue,
    activeSeatLocks,
    getLowStockItems,
} from '@/data/mockAdminData';



export default function AdminDashboard() {
    const lowStockItems = getLowStockItems();

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <KPICard
                        title="Total Revenue Today"
                        value={`RM ${dashboardKPIs.totalRevenueToday.toLocaleString()}`}
                        trendValue={12.5}
                        trendLabel="vs yesterday"
                        icon={<DollarSign className="h-6 w-6 text-primary" />}
                        trend="up"
                    />
                    <KPICard
                        title="Tickets Sold Today"
                        value={dashboardKPIs.ticketsSoldToday}
                        trendValue={8.2}
                        trendLabel="vs yesterday"
                        icon={<Ticket className="h-6 w-6 text-primary" />}
                        trend="up"
                    />
                    <KPICard
                        title="Low Stock Items"
                        value={lowStockItems.length}
                        trendValue={lowStockItems.length}
                        trendLabel="need attention"
                        icon={<AlertTriangle className="h-6 w-6 text-orange-500" />}
                        trend="down"
                        valueClassName="text-orange-600"
                    />
                    <KPICard
                        title="Active Seat Locks"
                        value={activeSeatLocks.length}
                        trendValue={-2}
                        trendLabel="vs last hour"
                        icon={<Lock className="h-6 w-6 text-primary" />}
                        trend="neutral"
                    />
                </div>
                {/* Secondary KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                                    <p className="text-xl font-bold">{dashboardKPIs.totalBookingsToday}</p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-green-500 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Concession Revenue</p>
                                    <p className="text-xl font-bold">RM {dashboardKPIs.concessionRevenue.toLocaleString()}</p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-green-500 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Avg. Occupancy</p>
                                    <p className="text-xl font-bold">{dashboardKPIs.averageOccupancy}%</p>
                                </div>
                                <TrendingDown className="h-8 w-8 text-amber-500 opacity-50" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Ticket Sales by Movie */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Ticket Sales by Movie</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ticketSalesByMovie} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                        <XAxis type="number" />
                                        <YAxis
                                            dataKey="movie"
                                            type="category"
                                            width={100}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(222 47% 6%)',
                                                border: '1px solid hsl(222 47% 15%)',
                                                borderRadius: '8px',
                                                color: 'hsl(210 40% 98%)',
                                            }}
                                            formatter={(value: number, name: string) => [
                                                name === 'tickets' ? `${value} tickets` : `RM ${value}`,
                                                name === 'tickets' ? 'Sold' : 'Revenue'
                                            ]}
                                        />
                                        <Bar dataKey="tickets" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hourly Revenue */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Hourly Revenue Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={hourlyRevenue}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(222 47% 6%)',
                                                border: '1px solid hsl(222 47% 15%)',
                                                borderRadius: '8px',
                                                color: 'hsl(210 40% 98%)',
                                            }}
                                            formatter={(value: number, name: string) => [
                                                name === 'revenue' ? `RM ${value}` : value,
                                                name === 'revenue' ? 'Revenue' : 'Tickets'
                                            ]}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#3B82F6"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="tickets"
                                            stroke="#10B981"
                                            strokeWidth={2}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Row - Alerts & Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Active Seat Locks */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-semibold">Active Seat Locks</CardTitle>
                            <Badge variant="secondary">{activeSeatLocks.length} active</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {activeSeatLocks.slice(0, 4).map((lock) => (
                                    <div
                                        key={lock.id}
                                        className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border/50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                <Clock className="h-4 w-4 text-orange-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{lock.seatLabel} - {lock.movieTitle}</p>
                                                <p className="text-xs text-muted-foreground">{lock.userName}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-muted-foreground">{lock.showtime}</p>
                                            <Badge variant="outline" className="text-xs">
                                                Expires soon
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Low Stock Alerts */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-semibold">Inventory Alerts</CardTitle>
                            {lowStockItems.length > 0 && (
                                <Badge variant="destructive">{lowStockItems.length} low stock</Badge>
                            )}
                        </CardHeader>
                        <CardContent>
                            {lowStockItems.length > 0 ? (
                                <div className="space-y-3">
                                    {lowStockItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/30"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                                    <AlertTriangle className="h-4 w-4 text-red-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">{item.category}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-red-600">{item.stockLevel} left</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Min: {item.lowStockThreshold}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                                        <TrendingUp className="h-6 w-6 text-green-400" />
                                    </div>
                                    <p className="text-sm font-medium">All items well stocked</p>
                                    <p className="text-xs text-muted-foreground">No inventory alerts</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
