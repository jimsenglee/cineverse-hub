import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { QrCode, Search, CheckCircle, XCircle, AlertTriangle, Ticket } from 'lucide-react';
import { validateBookingReference, adminBookings } from '@/data/mockAdminData';

type ValidationResult = {
    status: 'valid' | 'used' | 'invalid' | 'cancelled';
    booking: typeof adminBookings[0] | null;
};

export default function QRScanner() {
    const [referenceCode, setReferenceCode] = useState('');
    const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleValidation = () => {
        setIsScanning(true);

        // Simulate scanning delay
        setTimeout(() => {
            const booking = validateBookingReference(referenceCode.toUpperCase());

            if (booking) {
                if (booking.bookingStatus === 'used') {
                    setValidationResult({ status: 'used', booking });
                } else if (booking.bookingStatus === 'cancelled') {
                    setValidationResult({ status: 'cancelled', booking });
                } else {
                    setValidationResult({ status: 'valid', booking });
                }
            } else {
                setValidationResult({ status: 'invalid', booking: null });
            }

            setIsScanning(false);
        }, 500);
    };

    const handleClear = () => {
        setReferenceCode('');
        setValidationResult(null);
    };

    const getStatusDisplay = () => {
        if (!validationResult) return null;

        switch (validationResult.status) {
            case 'valid':
                return {
                    icon: <CheckCircle className="h-16 w-16 text-green-500" />,
                    title: 'Valid Ticket',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200',
                    textColor: 'text-green-700',
                };
            case 'used':
                return {
                    icon: <AlertTriangle className="h-16 w-16 text-amber-500" />,
                    title: 'Already Used',
                    bgColor: 'bg-amber-50',
                    borderColor: 'border-amber-200',
                    textColor: 'text-amber-700',
                };
            case 'cancelled':
                return {
                    icon: <XCircle className="h-16 w-16 text-red-500" />,
                    title: 'Cancelled Booking',
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-200',
                    textColor: 'text-red-700',
                };
            case 'invalid':
                return {
                    icon: <XCircle className="h-16 w-16 text-red-500" />,
                    title: 'Invalid Code',
                    bgColor: 'bg-red-50',
                    borderColor: 'border-red-200',
                    textColor: 'text-red-700',
                };
        }
    };

    const statusDisplay = getStatusDisplay();

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Scanner Input */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <QrCode className="h-5 w-5" />
                            Ticket Validator
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-center mb-6">
                            <div className="h-32 w-32 mx-auto bg-secondary rounded-lg flex items-center justify-center mb-4">
                                <QrCode className="h-16 w-16 text-gray-400" />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Scan QR code or enter booking reference manually
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Enter booking reference (e.g., CNV-2026-001234)"
                                    value={referenceCode}
                                    onChange={(e) => setReferenceCode(e.target.value.toUpperCase())}
                                    className="pl-10 font-mono"
                                    onKeyDown={(e) => e.key === 'Enter' && handleValidation()}
                                />
                            </div>
                            <Button onClick={handleValidation} disabled={!referenceCode || isScanning}>
                                {isScanning ? 'Validating...' : 'Validate'}
                            </Button>
                            <Button variant="outline" onClick={handleClear}>
                                Clear
                            </Button>
                        </div>

                        {/* Quick Test References */}
                        <div className="pt-4 border-t">
                            <p className="text-xs text-muted-foreground mb-2">Quick test references:</p>
                            <div className="flex flex-wrap gap-2">
                                {adminBookings.slice(0, 4).map((booking) => (
                                    <Button
                                        key={booking.id}
                                        variant="outline"
                                        size="sm"
                                        className="text-xs font-mono"
                                        onClick={() => setReferenceCode(booking.referenceCode)}
                                    >
                                        {booking.referenceCode}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Validation Result */}
                {validationResult && statusDisplay && (
                    <Card className={`${statusDisplay.bgColor} ${statusDisplay.borderColor} border-2`}>
                        <CardContent className="p-6">
                            <div className="text-center mb-6">
                                {statusDisplay.icon}
                                <h2 className={`text-2xl font-bold mt-4 ${statusDisplay.textColor}`}>
                                    {statusDisplay.title}
                                </h2>
                            </div>

                            {validationResult.booking ? (
                                <div className="bg-white rounded-lg p-4 space-y-4">
                                    <div className="flex items-center justify-between border-b pb-3">
                                        <div className="flex items-center gap-2">
                                            <Ticket className="h-5 w-5 text-primary" />
                                            <span className="font-mono font-medium">
                                                {validationResult.booking.referenceCode}
                                            </span>
                                        </div>
                                        <Badge
                                            variant={
                                                validationResult.status === 'valid'
                                                    ? 'default'
                                                    : validationResult.status === 'used'
                                                        ? 'secondary'
                                                        : 'destructive'
                                            }
                                        >
                                            {validationResult.booking.bookingStatus.toUpperCase()}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Movie</p>
                                            <p className="font-medium">{validationResult.booking.movieTitle}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Hall</p>
                                            <p className="font-medium">{validationResult.booking.hall}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Showtime</p>
                                            <p className="font-medium">{validationResult.booking.showtime}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Seats</p>
                                            <div className="flex gap-1">
                                                {validationResult.booking.seats.map((seat) => (
                                                    <Badge key={seat} variant="secondary">
                                                        {seat}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Customer</p>
                                            <p className="font-medium">{validationResult.booking.userName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Total Amount</p>
                                            <p className="font-medium">RM {validationResult.booking.totalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>

                                    {validationResult.status === 'valid' && (
                                        <div className="pt-4 border-t">
                                            <Button className="w-full bg-green-600 hover:bg-green-700">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Mark as Used
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg p-4 text-center">
                                    <p className="text-muted-foreground">
                                        No booking found with reference code: <strong>{referenceCode}</strong>
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Please verify the code and try again.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Instructions */}
                <Card>
                    <CardContent className="p-4">
                        <h4 className="font-medium mb-2">How to use:</h4>
                        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                            <li>Scan the customer's QR code or enter the booking reference manually</li>
                            <li>Click "Validate" to check the ticket status</li>
                            <li>If valid, click "Mark as Used" to register entry</li>
                            <li>If already used or invalid, deny entry and assist customer</li>
                        </ol>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
