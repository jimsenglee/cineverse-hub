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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Package, AlertTriangle, TrendingUp, Search, Plus, Filter, MoreHorizontal, Edit, Trash } from 'lucide-react';
import { inventoryItems } from '@/data/mockAdminData';
import { KPICard } from '@/components/admin/KPICard';
import { toast } from 'sonner';

export default function InventoryManager() {
    const [items, setItems] = useState(inventoryItems);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<typeof inventoryItems[0] | null>(null);
    const [restockAmount, setRestockAmount] = useState('');

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const lowStockCount = items.filter(i => i.stockLevel <= i.lowStockThreshold).length;

    const handleRestock = (item: typeof inventoryItems[0]) => {
        setSelectedItem(item);
        setRestockAmount('');
        setIsEditDialogOpen(true);
    };

    const handleConfirmRestock = () => {
        if (selectedItem && restockAmount) {
            const amount = parseInt(restockAmount);
            setItems(items.map(item =>
                item.id === selectedItem.id
                    ? { ...item, stockLevel: item.stockLevel + amount, lastRestocked: new Date().toISOString().split('T')[0] }
                    : item
            ));
            toast.success(`Restocked ${selectedItem.name}`, {
                description: `Added ${amount} units to inventory`,
            });
            setIsEditDialogOpen(false);
        }
    };

    const getStockBadge = (item: typeof inventoryItems[0]) => {
        const percentage = (item.stockLevel / (item.lowStockThreshold * 5)) * 100;
        if (item.stockLevel <= item.lowStockThreshold) {
            return <Badge variant="destructive">Low Stock</Badge>;
        } else if (percentage < 50) {
            return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30">Medium</Badge>;
        }
        return <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">In Stock</Badge>;
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <KPICard
                            title="Total Items"
                            value={items.length}
                            icon={<Package className="h-8 w-8 text-primary opacity-50" />}
                        />
                        <KPICard
                            title="Low Stock Items"
                            value={lowStockCount}
                            valueClassName="text-red-600"
                            icon={<AlertTriangle className="h-8 w-8 text-red-500 opacity-50" />}
                        />
                        <KPICard
                            title="Total Value"
                            value={`RM ${items.reduce((sum, i) => sum + i.unitPrice * i.stockLevel, 0).toLocaleString()}`}
                            icon={<TrendingUp className="h-8 w-8 text-green-500 opacity-50" />}
                        />
                    </div>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Item
                    </Button>
                </div>

                {/* Inventory Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Concession Inventory
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Unit Price</TableHead>
                                    <TableHead>Stock Level</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Restocked</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        className={item.stockLevel <= item.lowStockThreshold ? 'bg-red-500/10' : ''}
                                    >
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{item.category}</Badge>
                                        </TableCell>
                                        <TableCell>RM {item.unitPrice.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className={item.stockLevel <= item.lowStockThreshold ? 'text-red-600 font-bold' : ''}>
                                                    {item.stockLevel}
                                                </span>
                                                <span className="text-muted-foreground text-xs">
                                                    (min: {item.lowStockThreshold})
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStockBadge(item)}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {item.lastRestocked}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleRestock(item)}
                                                >
                                                    Restock
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Restock Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Restock Item</DialogTitle>
                            <DialogDescription>
                                Add stock for {selectedItem?.name}
                            </DialogDescription>
                        </DialogHeader>
                        {selectedItem && (
                            <div className="grid gap-4 py-4">
                                <div className="bg-secondary/50 rounded-lg p-3 border border-border/50">
                                    <p className="font-medium">{selectedItem.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Current stock: {selectedItem.stockLevel}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Quantity to Add</Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={restockAmount}
                                        onChange={(e) => setRestockAmount(e.target.value)}
                                        placeholder="Enter quantity"
                                    />
                                </div>
                                {restockAmount && (
                                    <p className="text-sm text-muted-foreground">
                                        New stock level: {selectedItem.stockLevel + parseInt(restockAmount || '0')}
                                    </p>
                                )}
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleConfirmRestock} disabled={!restockAmount}>
                                Confirm Restock
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
