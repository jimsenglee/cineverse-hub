// ============================================
// ADMIN DASHBOARD MOCK DATA
// Enterprise Cinema Management System
// ============================================

import { movies, showtimes, cinemas, concessionItems } from './mockData';

// ============================================
// STAFF & ROLES
// ============================================

export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];
}

export interface StaffUser {
    id: string;
    userId: string;
    name: string;
    email: string;
    roleId: string;
    roleName: string;
    hireDate: string;
    status: 'active' | 'inactive' | 'suspended';
    phone: string;
    avatar?: string;
}

export interface Permission {
    id: string;
    name: string;
    description: string;
}

export const permissions: Permission[] = [
    { id: 'p1', name: 'CanViewDashboard', description: 'View executive dashboard' },
    { id: 'p2', name: 'CanManageMovies', description: 'Add, edit, delete movies' },
    { id: 'p3', name: 'CanManageShowtimes', description: 'Schedule and modify showtimes' },
    { id: 'p4', name: 'CanManagePricing', description: 'Configure pricing rules' },
    { id: 'p5', name: 'CanManageStaff', description: 'Manage staff accounts' },
    { id: 'p6', name: 'CanViewAuditLogs', description: 'Access audit trail' },
    { id: 'p7', name: 'CanForceUnlock', description: 'Force release seat locks' },
    { id: 'p8', name: 'CanManageInventory', description: 'Manage concession inventory' },
    { id: 'p9', name: 'CanProcessRefunds', description: 'Process ticket refunds' },
    { id: 'p10', name: 'CanValidateTickets', description: 'Scan and validate tickets' },
];

export const roles: Role[] = [
    {
        id: 'r1',
        name: 'Admin',
        description: 'Full system access',
        permissions: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10']
    },
    {
        id: 'r2',
        name: 'Manager',
        description: 'Cinema floor management',
        permissions: ['p1', 'p2', 'p3', 'p4', 'p6', 'p7', 'p8', 'p10']
    },
    {
        id: 'r3',
        name: 'Supervisor',
        description: 'Shift supervisor duties',
        permissions: ['p1', 'p3', 'p7', 'p8', 'p10']
    },
    {
        id: 'r4',
        name: 'Cashier',
        description: 'Counter sales operations',
        permissions: ['p1', 'p10']
    },
    {
        id: 'r5',
        name: 'Usher',
        description: 'Ticket validation only',
        permissions: ['p10']
    },
];

export const staffUsers: StaffUser[] = [
    {
        id: 'staff1',
        userId: 'u101',
        name: 'Sarah Johnson',
        email: 'sarah.j@cineverse.com',
        roleId: 'r1',
        roleName: 'Admin',
        hireDate: '2022-03-15',
        status: 'active',
        phone: '+60 12-111 2222',
    },
    {
        id: 'staff2',
        userId: 'u102',
        name: 'Michael Chen',
        email: 'michael.c@cineverse.com',
        roleId: 'r2',
        roleName: 'Manager',
        hireDate: '2022-08-20',
        status: 'active',
        phone: '+60 12-333 4444',
    },
    {
        id: 'staff3',
        userId: 'u103',
        name: 'Aisha Rahman',
        email: 'aisha.r@cineverse.com',
        roleId: 'r3',
        roleName: 'Supervisor',
        hireDate: '2023-01-10',
        status: 'active',
        phone: '+60 12-555 6666',
    },
    {
        id: 'staff4',
        userId: 'u104',
        name: 'David Lee',
        email: 'david.l@cineverse.com',
        roleId: 'r4',
        roleName: 'Cashier',
        hireDate: '2023-06-05',
        status: 'active',
        phone: '+60 12-777 8888',
    },
    {
        id: 'staff5',
        userId: 'u105',
        name: 'Priya Sharma',
        email: 'priya.s@cineverse.com',
        roleId: 'r4',
        roleName: 'Cashier',
        hireDate: '2023-09-12',
        status: 'active',
        phone: '+60 12-999 0000',
    },
    {
        id: 'staff6',
        userId: 'u106',
        name: 'Ahmad Razak',
        email: 'ahmad.r@cineverse.com',
        roleId: 'r5',
        roleName: 'Usher',
        hireDate: '2024-02-01',
        status: 'inactive',
        phone: '+60 13-111 2222',
    },
];

// ============================================
// SHIFTS
// ============================================

export interface Shift {
    id: string;
    staffId: string;
    staffName: string;
    startTime: string;
    endTime: string;
    actualStart?: string;
    actualEnd?: string;
    cashDrawerStartAmount: number;
    cashDrawerEndAmount?: number;
    status: 'scheduled' | 'active' | 'completed';
}

export const shifts: Shift[] = [
    {
        id: 'shift1',
        staffId: 'staff2',
        staffName: 'Michael Chen',
        startTime: '2026-01-04T08:00:00',
        endTime: '2026-01-04T16:00:00',
        actualStart: '2026-01-04T07:55:00',
        cashDrawerStartAmount: 500.00,
        cashDrawerEndAmount: 2350.00,
        status: 'completed',
    },
    {
        id: 'shift2',
        staffId: 'staff3',
        staffName: 'Aisha Rahman',
        startTime: '2026-01-04T08:00:00',
        endTime: '2026-01-04T16:00:00',
        actualStart: '2026-01-04T08:02:00',
        cashDrawerStartAmount: 500.00,
        status: 'active',
    },
    {
        id: 'shift3',
        staffId: 'staff4',
        staffName: 'David Lee',
        startTime: '2026-01-04T12:00:00',
        endTime: '2026-01-04T20:00:00',
        actualStart: '2026-01-04T11:58:00',
        cashDrawerStartAmount: 500.00,
        status: 'active',
    },
    {
        id: 'shift4',
        staffId: 'staff5',
        staffName: 'Priya Sharma',
        startTime: '2026-01-04T16:00:00',
        endTime: '2026-01-05T00:00:00',
        cashDrawerStartAmount: 500.00,
        status: 'scheduled',
    },
];

// ============================================
// SEAT LOCKS (Active Reservations)
// ============================================

export interface SeatLock {
    id: string;
    showtimeSeatId: string;
    showtime: string;
    movieTitle: string;
    seatLabel: string;
    userId: string;
    userName: string;
    lockExpirationTime: string;
    createdAt: string;
}

export const activeSeatLocks: SeatLock[] = [
    {
        id: 'lock1',
        showtimeSeatId: 'ss1',
        showtime: '2026-01-04 14:00',
        movieTitle: 'Neon Horizon',
        seatLabel: 'E5',
        userId: 'u201',
        userName: 'John Doe',
        lockExpirationTime: '2026-01-04T13:55:00',
        createdAt: '2026-01-04T13:45:00',
    },
    {
        id: 'lock2',
        showtimeSeatId: 'ss2',
        showtime: '2026-01-04 14:00',
        movieTitle: 'Neon Horizon',
        seatLabel: 'E6',
        userId: 'u201',
        userName: 'John Doe',
        lockExpirationTime: '2026-01-04T13:55:00',
        createdAt: '2026-01-04T13:45:00',
    },
    {
        id: 'lock3',
        showtimeSeatId: 'ss3',
        showtime: '2026-01-04 16:30',
        movieTitle: 'Shadow Protocol',
        seatLabel: 'D7',
        userId: 'u202',
        userName: 'Jane Smith',
        lockExpirationTime: '2026-01-04T13:58:00',
        createdAt: '2026-01-04T13:48:00',
    },
    {
        id: 'lock4',
        showtimeSeatId: 'ss4',
        showtime: '2026-01-04 19:30',
        movieTitle: 'Eternal Echoes',
        seatLabel: 'F3',
        userId: 'u203',
        userName: 'Robert Wilson',
        lockExpirationTime: '2026-01-04T14:02:00',
        createdAt: '2026-01-04T13:52:00',
    },
];

// ============================================
// AUDIT LOGS
// ============================================

export interface AuditLog {
    id: string;
    staffId: string;
    staffName: string;
    actionType: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'FORCE_UNLOCK' | 'REFUND';
    tableName: string;
    recordId: string;
    oldValue?: string;
    newValue?: string;
    description: string;
    timestamp: string;
    ipAddress: string;
}

export const auditLogs: AuditLog[] = [
    {
        id: 'audit1',
        staffId: 'staff1',
        staffName: 'Sarah Johnson',
        actionType: 'UPDATE',
        tableName: 'PricingRules',
        recordId: 'pr102',
        oldValue: 'PriceAdjustment: +2.00',
        newValue: 'PriceAdjustment: +3.00',
        description: 'Updated Weekend Surcharge from RM 2.00 to RM 3.00',
        timestamp: '2026-01-04T10:30:00',
        ipAddress: '192.168.1.105',
    },
    {
        id: 'audit2',
        staffId: 'staff2',
        staffName: 'Michael Chen',
        actionType: 'CREATE',
        tableName: 'Showtimes',
        recordId: 's20',
        newValue: 'Neon Horizon @ Hall 1, 21:00',
        description: 'Added new showtime for Neon Horizon',
        timestamp: '2026-01-04T09:15:00',
        ipAddress: '192.168.1.108',
    },
    {
        id: 'audit3',
        staffId: 'staff3',
        staffName: 'Aisha Rahman',
        actionType: 'FORCE_UNLOCK',
        tableName: 'SeatLocks',
        recordId: 'lock99',
        oldValue: 'Status: locked',
        newValue: 'Status: available',
        description: 'Force released lock for seats D5, D6 (customer requested)',
        timestamp: '2026-01-04T11:45:00',
        ipAddress: '192.168.1.112',
    },
    {
        id: 'audit4',
        staffId: 'staff1',
        staffName: 'Sarah Johnson',
        actionType: 'DELETE',
        tableName: 'Movies',
        recordId: 'm99',
        oldValue: 'Title: Old Movie',
        description: 'Removed expired movie from catalog',
        timestamp: '2026-01-04T08:20:00',
        ipAddress: '192.168.1.105',
    },
    {
        id: 'audit5',
        staffId: 'staff2',
        staffName: 'Michael Chen',
        actionType: 'UPDATE',
        tableName: 'Items',
        recordId: 'ci1',
        oldValue: 'StockLevel: 50',
        newValue: 'StockLevel: 150',
        description: 'Restocked Large Popcorn',
        timestamp: '2026-01-04T07:30:00',
        ipAddress: '192.168.1.108',
    },
    {
        id: 'audit6',
        staffId: 'staff4',
        staffName: 'David Lee',
        actionType: 'LOGIN',
        tableName: 'Sessions',
        recordId: 'session123',
        description: 'Staff login',
        timestamp: '2026-01-04T11:58:00',
        ipAddress: '192.168.1.115',
    },
    {
        id: 'audit7',
        staffId: 'staff1',
        staffName: 'Sarah Johnson',
        actionType: 'REFUND',
        tableName: 'Bookings',
        recordId: 'b456',
        oldValue: 'Status: confirmed',
        newValue: 'Status: refunded',
        description: 'Processed refund for booking #B456 (RM 45.00)',
        timestamp: '2026-01-03T16:20:00',
        ipAddress: '192.168.1.105',
    },
];

// ============================================
// PRICING RULES
// ============================================

export interface PricingRule {
    id: string;
    name: string;
    description: string;
    dayOfWeek: string;
    startTimeRange?: string;
    endTimeRange?: string;
    priceAdjustment: number;
    adjustmentType: 'fixed' | 'percentage';
    isActive: boolean;
}

export const pricingRules: PricingRule[] = [
    {
        id: 'pr1',
        name: 'Weekend Surcharge',
        description: 'Additional charge for Saturday and Sunday',
        dayOfWeek: 'Saturday,Sunday',
        priceAdjustment: 3.00,
        adjustmentType: 'fixed',
        isActive: true,
    },
    {
        id: 'pr2',
        name: 'Matinee Discount',
        description: 'Morning shows discount',
        dayOfWeek: 'All',
        startTimeRange: '09:00',
        endTimeRange: '12:00',
        priceAdjustment: -2.00,
        adjustmentType: 'fixed',
        isActive: true,
    },
    {
        id: 'pr3',
        name: 'Late Night Premium',
        description: 'Shows after 9 PM',
        dayOfWeek: 'All',
        startTimeRange: '21:00',
        endTimeRange: '23:59',
        priceAdjustment: 2.00,
        adjustmentType: 'fixed',
        isActive: true,
    },
    {
        id: 'pr4',
        name: 'Wednesday Student Day',
        description: '20% off on Wednesdays',
        dayOfWeek: 'Wednesday',
        priceAdjustment: -20,
        adjustmentType: 'percentage',
        isActive: true,
    },
    {
        id: 'pr5',
        name: 'Holiday Premium',
        description: 'Public holiday surcharge',
        dayOfWeek: 'Holiday',
        priceAdjustment: 5.00,
        adjustmentType: 'fixed',
        isActive: false,
    },
];

// ============================================
// INVENTORY (Concession Items with Stock)
// ============================================

export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    unitPrice: number;
    stockLevel: number;
    lowStockThreshold: number;
    lastRestocked: string;
}

export const inventoryItems: InventoryItem[] = concessionItems.map((item, index) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    unitPrice: item.price,
    stockLevel: [150, 80, 200, 45, 60, 90, 120, 75][index] || 100,
    lowStockThreshold: 30,
    lastRestocked: '2026-01-03',
}));

// ============================================
// HALL STATUS (Real-time Occupancy)
// ============================================

export interface HallStatus {
    hallId: string;
    hallName: string;
    hallType: string;
    currentMovie: string | null;
    currentShowtime: string | null;
    totalSeats: number;
    bookedSeats: number;
    occupancyRate: number;
    status: 'showing' | 'cleaning' | 'maintenance' | 'idle';
    maintenanceSeats: string[];
}

export const hallStatuses: HallStatus[] = [
    {
        hallId: 'h1',
        hallName: 'Hall 1',
        hallType: 'IMAX',
        currentMovie: 'Neon Horizon',
        currentShowtime: '14:00',
        totalSeats: 120,
        bookedSeats: 87,
        occupancyRate: 72.5,
        status: 'showing',
        maintenanceSeats: ['A3', 'B7'],
    },
    {
        hallId: 'h2',
        hallName: 'Hall 2',
        hallType: 'Dolby',
        currentMovie: null,
        currentShowtime: null,
        totalSeats: 80,
        bookedSeats: 0,
        occupancyRate: 0,
        status: 'cleaning',
        maintenanceSeats: [],
    },
    {
        hallId: 'h3',
        hallName: 'Hall 3',
        hallType: 'Standard',
        currentMovie: 'Eternal Echoes',
        currentShowtime: '13:30',
        totalSeats: 150,
        bookedSeats: 98,
        occupancyRate: 65.3,
        status: 'showing',
        maintenanceSeats: ['J10'],
    },
    {
        hallId: 'h4',
        hallName: 'Hall 4',
        hallType: '4DX',
        currentMovie: null,
        currentShowtime: null,
        totalSeats: 60,
        bookedSeats: 0,
        occupancyRate: 0,
        status: 'maintenance',
        maintenanceSeats: ['C1', 'C2', 'C3', 'D1', 'D2', 'D3'],
    },
];

// ============================================
// BOOKINGS (For Ticket Validation)
// ============================================

export interface AdminBooking {
    id: string;
    referenceCode: string;
    userId: string;
    userName: string;
    movieTitle: string;
    showtime: string;
    hall: string;
    seats: string[];
    totalAmount: number;
    paymentStatus: 'paid' | 'pending' | 'refunded';
    bookingStatus: 'confirmed' | 'used' | 'cancelled' | 'expired';
    createdAt: string;
}

export const adminBookings: AdminBooking[] = [
    {
        id: 'ab1',
        referenceCode: 'CNV-2026-001234',
        userId: 'u201',
        userName: 'John Doe',
        movieTitle: 'Neon Horizon',
        showtime: '2026-01-04 14:00',
        hall: 'Hall 1 (IMAX)',
        seats: ['E5', 'E6'],
        totalAmount: 90.00,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        createdAt: '2026-01-04T10:30:00',
    },
    {
        id: 'ab2',
        referenceCode: 'CNV-2026-001235',
        userId: 'u202',
        userName: 'Jane Smith',
        movieTitle: 'Shadow Protocol',
        showtime: '2026-01-04 16:30',
        hall: 'Hall 2 (Dolby)',
        seats: ['D7', 'D8', 'D9'],
        totalAmount: 126.00,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        createdAt: '2026-01-04T11:15:00',
    },
    {
        id: 'ab3',
        referenceCode: 'CNV-2026-001236',
        userId: 'u203',
        userName: 'Robert Wilson',
        movieTitle: 'Eternal Echoes',
        showtime: '2026-01-03 19:30',
        hall: 'Hall 3 (Standard)',
        seats: ['F3', 'F4'],
        totalAmount: 64.00,
        paymentStatus: 'paid',
        bookingStatus: 'used',
        createdAt: '2026-01-03T15:00:00',
    },
    {
        id: 'ab4',
        referenceCode: 'CNV-2026-001237',
        userId: 'u204',
        userName: 'Emily Brown',
        movieTitle: 'Crimson Thunder',
        showtime: '2026-01-03 21:00',
        hall: 'Hall 1 (IMAX)',
        seats: ['G8'],
        totalAmount: 45.00,
        paymentStatus: 'refunded',
        bookingStatus: 'cancelled',
        createdAt: '2026-01-03T18:00:00',
    },
];

// ============================================
// DASHBOARD KPIs & ANALYTICS
// ============================================

export interface DashboardKPIs {
    totalRevenueToday: number;
    ticketsSoldToday: number;
    activeSeatLocks: number;
    staffOnDuty: number;
    totalBookingsToday: number;
    concessionRevenue: number;
    averageOccupancy: number;
}

export const dashboardKPIs: DashboardKPIs = {
    totalRevenueToday: 12450.00,
    ticketsSoldToday: 342,
    activeSeatLocks: activeSeatLocks.length,
    staffOnDuty: shifts.filter(s => s.status === 'active').length,
    totalBookingsToday: 156,
    concessionRevenue: 3280.00,
    averageOccupancy: 68.5,
};

// Ticket Sales by Movie (for Bar Chart)
export const ticketSalesByMovie = [
    { movie: 'Neon Horizon', tickets: 128, revenue: 3456 },
    { movie: 'Shadow Protocol', tickets: 98, revenue: 2744 },
    { movie: 'Eternal Echoes', tickets: 67, revenue: 1474 },
    { movie: 'Crimson Thunder', tickets: 45, revenue: 1575 },
    { movie: 'Digital Dreams', tickets: 24, revenue: 528 },
];

// Hourly Revenue (for Line Chart)
export const hourlyRevenue = [
    { hour: '09:00', revenue: 450, tickets: 12 },
    { hour: '10:00', revenue: 780, tickets: 24 },
    { hour: '11:00', revenue: 1200, tickets: 38 },
    { hour: '12:00', revenue: 1650, tickets: 52 },
    { hour: '13:00', revenue: 1890, tickets: 58 },
    { hour: '14:00', revenue: 2100, tickets: 64 },
    { hour: '15:00', revenue: 1780, tickets: 48 },
    { hour: '16:00', revenue: 1450, tickets: 42 },
    { hour: '17:00', revenue: 1680, tickets: 46 },
    { hour: '18:00', revenue: 2340, tickets: 72 },
    { hour: '19:00', revenue: 2890, tickets: 86 },
    { hour: '20:00', revenue: 3120, tickets: 94 },
    { hour: '21:00', revenue: 2650, tickets: 78 },
    { hour: '22:00', revenue: 1420, tickets: 38 },
];

// Weekly Revenue Trend
export const weeklyRevenue = [
    { day: 'Mon', revenue: 8500 },
    { day: 'Tue', revenue: 7200 },
    { day: 'Wed', revenue: 9800 },
    { day: 'Thu', revenue: 7600 },
    { day: 'Fri', revenue: 14200 },
    { day: 'Sat', revenue: 18500 },
    { day: 'Sun', revenue: 16800 },
];

// ============================================
// SHOWTIME CALENDAR DATA
// ============================================

export interface CalendarShowtime {
    id: string;
    movieId: string;
    movieTitle: string;
    hallId: string;
    hallName: string;
    startTime: string;
    endTime: string;
    color: string;
}

export const calendarShowtimes: CalendarShowtime[] = showtimes.map((st, index) => {
    const movie = movies.find(m => m.id === st.movieId);
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    const movieIndex = movies.findIndex(m => m.id === st.movieId);

    // Parse time and add duration
    const [hours, minutes] = st.time.split(':').map(Number);
    const startDate = new Date(`${st.date}T${st.time}:00`);
    const endDate = new Date(startDate.getTime() + (movie?.duration || 120) * 60000);

    return {
        id: st.id,
        movieId: st.movieId,
        movieTitle: movie?.title || 'Unknown',
        hallId: st.hallId,
        hallName: st.hallName,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        color: colors[movieIndex % colors.length],
    };
});

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getStaffById = (id: string) => staffUsers.find(s => s.id === id);
export const getRoleById = (id: string) => roles.find(r => r.id === id);
export const validateBookingReference = (code: string): AdminBooking | null => {
    return adminBookings.find(b => b.referenceCode === code) || null;
};

// Get active staff count
export const getActiveStaffCount = () =>
    shifts.filter(s => s.status === 'active').length;

// Get low stock items
export const getLowStockItems = () =>
    inventoryItems.filter(item => item.stockLevel <= item.lowStockThreshold);

// Export existing data for convenience
export { movies, showtimes, cinemas, concessionItems };
