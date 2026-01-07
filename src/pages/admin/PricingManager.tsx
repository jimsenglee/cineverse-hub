import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
import { DollarSign, Plus, Edit, Trash2 } from 'lucide-react';
import { pricingRules } from '@/data/mockAdminData';
import { toast } from 'sonner';

export default function PricingManager() {
    const [rules, setRules] = useState(pricingRules);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<typeof pricingRules[0] | null>(null);

    const handleToggleActive = (ruleId: string) => {
        setRules(rules.map(rule =>
            rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
        ));
        toast.success('Pricing rule updated');
    };

    const handleEdit = (rule: typeof pricingRules[0]) => {
        setSelectedRule(rule);
        setIsEditDialogOpen(true);
    };

    const RuleForm = ({ rule }: { rule?: typeof pricingRules[0] }) => (
        <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label>Rule Name</Label>
                <Input defaultValue={rule?.name} placeholder="e.g., Weekend Surcharge" />
            </div>
            <div className="space-y-2">
                <Label>Description</Label>
                <Input defaultValue={rule?.description} placeholder="Brief description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Day of Week</Label>
                    <Select defaultValue={rule?.dayOfWeek}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select days" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Days</SelectItem>
                            <SelectItem value="Monday">Monday</SelectItem>
                            <SelectItem value="Tuesday">Tuesday</SelectItem>
                            <SelectItem value="Wednesday">Wednesday</SelectItem>
                            <SelectItem value="Thursday">Thursday</SelectItem>
                            <SelectItem value="Friday">Friday</SelectItem>
                            <SelectItem value="Saturday">Saturday</SelectItem>
                            <SelectItem value="Sunday">Sunday</SelectItem>
                            <SelectItem value="Saturday,Sunday">Weekend</SelectItem>
                            <SelectItem value="Monday,Tuesday,Wednesday,Thursday,Friday">Weekdays</SelectItem>
                            <SelectItem value="Holiday">Holiday</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Adjustment Type</Label>
                    <Select defaultValue={rule?.adjustmentType || 'fixed'}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fixed">Fixed Amount (RM)</SelectItem>
                            <SelectItem value="percentage">Percentage (%)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Start Time (Optional)</Label>
                    <Input type="time" defaultValue={rule?.startTimeRange} />
                </div>
                <div className="space-y-2">
                    <Label>End Time (Optional)</Label>
                    <Input type="time" defaultValue={rule?.endTimeRange} />
                </div>
            </div>
            <div className="space-y-2">
                <Label>Price Adjustment</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        {rule?.adjustmentType === 'percentage' ? '%' : 'RM'}
                    </span>
                    <Input
                        type="number"
                        step="0.01"
                        defaultValue={rule?.priceAdjustment}
                        className="pl-12"
                        placeholder="e.g., 3.00 or -2.00"
                    />
                </div>
                <p className="text-xs text-muted-foreground">
                    Use positive for surcharge, negative for discount
                </p>
            </div>
        </div>
    );

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold">Dynamic Pricing Rules</h3>
                        <p className="text-sm text-muted-foreground">
                            Configure price adjustments based on day, time, and special conditions
                        </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Rule
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Create Pricing Rule</DialogTitle>
                                <DialogDescription>
                                    Add a new dynamic pricing rule.
                                </DialogDescription>
                            </DialogHeader>
                            <RuleForm />
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => setIsAddDialogOpen(false)}>
                                    Create Rule
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Rules Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Active Rules ({rules.filter(r => r.isActive).length} of {rules.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rule Name</TableHead>
                                    <TableHead>Applies To</TableHead>
                                    <TableHead>Time Range</TableHead>
                                    <TableHead>Adjustment</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rules.map((rule) => (
                                    <TableRow key={rule.id} className={!rule.isActive ? 'opacity-50' : ''}>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{rule.name}</p>
                                                <p className="text-xs text-muted-foreground">{rule.description}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{rule.dayOfWeek}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {rule.startTimeRange && rule.endTimeRange ? (
                                                <span className="text-sm">
                                                    {rule.startTimeRange} - {rule.endTimeRange}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">All Day</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    rule.priceAdjustment > 0
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-green-100 text-green-700'
                                                }
                                            >
                                                {rule.priceAdjustment > 0 ? '+' : ''}
                                                {rule.adjustmentType === 'percentage'
                                                    ? `${rule.priceAdjustment}%`
                                                    : `RM ${rule.priceAdjustment.toFixed(2)}`
                                                }
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                checked={rule.isActive}
                                                onCheckedChange={() => handleToggleActive(rule.id)}
                                            />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => handleEdit(rule)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Edit Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Edit Pricing Rule</DialogTitle>
                            <DialogDescription>
                                Update the pricing rule configuration.
                            </DialogDescription>
                        </DialogHeader>
                        {selectedRule && <RuleForm rule={selectedRule} />}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsEditDialogOpen(false)}>
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
