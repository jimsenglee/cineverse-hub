import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
    LayoutDashboard,
    Film,
    Calendar,
    DollarSign,
    Users,
    Package,
    Clock,
    Shield,
    QrCode,
    Unlock,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Bell,
    Settings,
    Building2,
    Menu,
    X,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/admin',
        description: 'Executive overview'
    },
    {
        title: 'Movies',
        icon: Film,
        href: '/admin/movies',
        description: 'Movie catalog'
    },
    {
        title: 'Schedule',
        icon: Calendar,
        href: '/admin/schedule',
        description: 'Showtime scheduler'
    },
    {
        title: 'Halls',
        icon: Building2,
        href: '/admin/halls',
        description: 'Hall management'
    },
    {
        title: 'Pricing',
        icon: DollarSign,
        href: '/admin/pricing',
        description: 'Dynamic pricing rules'
    },
    {
        title: 'Inventory',
        icon: Package,
        href: '/admin/inventory',
        description: 'Concession stock'
    },
];

const operationsItems = [
    {
        title: 'Seat Locks',
        icon: Unlock,
        href: '/admin/operations/locks',
        description: 'Active reservations',
        badge: '4'
    },
    {
        title: 'QR Scanner',
        icon: QrCode,
        href: '/admin/operations/scanner',
        description: 'Ticket validation'
    },
];

const staffItems = [
    {
        title: 'Staff Directory',
        icon: Users,
        href: '/admin/staff',
        description: 'Employee management'
    },
    {
        title: 'Shifts',
        icon: Clock,
        href: '/admin/shifts',
        description: 'Shift scheduling'
    },
    {
        title: 'Audit Logs',
        icon: Shield,
        href: '/admin/audit',
        description: 'Activity history'
    },
];

export function AdminLayout({ children }: AdminLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const isActive = (href: string) => {
        if (href === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(href);
    };

    const NavItem = ({ item }: { item: typeof navItems[0] & { badge?: string } }) => (
        <Link to={item.href} onClick={() => setMobileOpen(false)}>
            <Button
                variant={isActive(item.href) ? 'secondary' : 'ghost'}
                className={cn(
                    'w-full justify-start gap-3 h-10',
                    collapsed && 'justify-center px-2',
                    isActive(item.href) && 'bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30'
                )}
            >
                <item.icon className={cn('h-4 w-4 shrink-0', isActive(item.href) && 'text-primary')} />
                {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.title}</span>
                )}
                {!collapsed && item.badge && (
                    <Badge variant="destructive" className="h-5 px-1.5 text-xs">
                        {item.badge}
                    </Badge>
                )}
            </Button>
        </Link>
    );

    const NavSection = ({ title, items }: { title: string; items: (typeof navItems[0] & { badge?: string })[] }) => (
        <div className="space-y-1">
            {!collapsed && (
                <div className="px-3 py-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {title}
                    </h4>
                </div>
            )}
            {items.map((item) => (
                <NavItem key={item.href} item={item} />
            ))}
        </div>
    );

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-border/50">
                {!collapsed ? (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center neon-glow-purple">
                            <Film className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-lg leading-none text-foreground">CineVerse</h1>
                            <p className="text-xs text-primary">Admin Panel</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto neon-glow-purple">
                        <Film className="h-5 w-5 text-white" />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-3 py-4">
                <div className="space-y-6">
                    <NavSection title="Main" items={navItems} />
                    <Separator className="bg-border/50" />
                    <NavSection title="Operations" items={operationsItems} />
                    <Separator className="bg-border/50" />
                    <NavSection title="Administration" items={staffItems} />
                </div>
            </ScrollArea>

            {/* Collapse Button - Hidden on mobile */}
            <div className="hidden lg:block p-3 border-t border-border/50">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? (
                        <ChevronRight className="h-4 w-4" />
                    ) : (
                        <>
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Collapse
                        </>
                    )}
                </Button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-background">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar - Desktop */}
            <aside
                className={cn(
                    'hidden lg:flex flex-col bg-card/50 border-r border-border/50 transition-all duration-300 backdrop-blur-xl',
                    collapsed ? 'w-16' : 'w-64'
                )}
            >
                <SidebarContent />
            </aside>

            {/* Sidebar - Mobile */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-card border-r border-border/50 transition-transform duration-300 lg:hidden',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="absolute right-2 top-4">
                    <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-card/50 border-b border-border/50 flex items-center justify-between px-4 lg:px-6 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                {navItems.find(item => isActive(item.href))?.title ||
                                    operationsItems.find(item => isActive(item.href))?.title ||
                                    staffItems.find(item => isActive(item.href))?.title ||
                                    'Dashboard'}
                            </h2>
                            <p className="text-sm text-muted-foreground hidden sm:block">
                                {navItems.find(item => isActive(item.href))?.description ||
                                    operationsItems.find(item => isActive(item.href))?.description ||
                                    staffItems.find(item => isActive(item.href))?.description ||
                                    'Executive overview'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                        </Button>

                        {/* Settings - Hidden on mobile */}
                        <Button variant="ghost" size="icon" className="hidden sm:flex">
                            <Settings className="h-5 w-5" />
                        </Button>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 px-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                                            SJ
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="text-left hidden md:block">
                                        <p className="text-sm font-medium text-foreground">Sarah Johnson</p>
                                        <p className="text-xs text-muted-foreground">Admin</p>
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                                <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem className="text-foreground hover:bg-secondary">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-foreground hover:bg-secondary">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Permissions
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto bg-background p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
