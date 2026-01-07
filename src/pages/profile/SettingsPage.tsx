import { Bell, Moon, Globe, Lock, ChevronRight, Smartphone, Eye, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import { PageLayout } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { MenuListItem } from "@/components/ui/menu-list-item";
import { SectionTitle } from "@/components/ui/section-title";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [biometricLogin, setBiometricLogin] = useState(false);

    const handleToggle = (setting: string, value: boolean) => {
        toast.success(`${setting} ${value ? "enabled" : "disabled"}`);
    };

    return (
        <PageLayout title="Settings" showBackButton backgroundVariant="default">
            <div className="p-4 space-y-6">
                {/* Notifications */}
                <section>
                    <SectionTitle icon={Bell} variant="small">
                        Notifications
                    </SectionTitle>
                    <SectionCard noPadding className="overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-border/50">
                            <div>
                                <p className="font-medium text-foreground">Push Notifications</p>
                                <p className="text-sm text-muted-foreground">
                                    Get notified about bookings & offers
                                </p>
                            </div>
                            <Switch
                                checked={notifications}
                                onCheckedChange={(v) => {
                                    setNotifications(v);
                                    handleToggle("Push notifications", v);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div>
                                <p className="font-medium text-foreground">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">
                                    Receive booking confirmations via email
                                </p>
                            </div>
                            <Switch
                                checked={emailNotifications}
                                onCheckedChange={(v) => {
                                    setEmailNotifications(v);
                                    handleToggle("Email notifications", v);
                                }}
                            />
                        </div>
                    </SectionCard>
                </section>

                {/* Appearance */}
                <section>
                    <SectionTitle icon={Eye} variant="small">
                        Appearance
                    </SectionTitle>
                    <SectionCard noPadding className="overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <Moon className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-foreground">Dark Mode</p>
                                    <p className="text-sm text-muted-foreground">Use dark theme</p>
                                </div>
                            </div>
                            <Switch
                                checked={darkMode}
                                onCheckedChange={(v) => {
                                    setDarkMode(v);
                                    handleToggle("Dark mode", v);
                                }}
                            />
                        </div>
                        <button className="w-full flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <Globe className="w-5 h-5 text-muted-foreground" />
                                <div className="text-left">
                                    <p className="font-medium text-foreground">Language</p>
                                    <p className="text-sm text-muted-foreground">English (US)</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </SectionCard>
                </section>

                {/* Security */}
                <section>
                    <SectionTitle icon={Lock} variant="small">
                        Security
                    </SectionTitle>
                    <SectionCard noPadding className="overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <Smartphone className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-foreground">Biometric Login</p>
                                    <p className="text-sm text-muted-foreground">
                                        Use Face ID or fingerprint
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={biometricLogin}
                                onCheckedChange={(v) => {
                                    setBiometricLogin(v);
                                    handleToggle("Biometric login", v);
                                }}
                            />
                        </div>
                        <button className="w-full flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-muted-foreground" />
                                <span className="font-medium text-foreground">Change Password</span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </SectionCard>
                </section>

                {/* Danger Zone */}
                <section>
                    <SectionTitle variant="small" className="text-destructive">
                        Danger Zone
                    </SectionTitle>
                    <MenuListItem
                        icon={Trash2}
                        label="Delete Account"
                        description="Permanently delete your account and data"
                        variant="destructive"
                        showChevron={false}
                    />
                </section>
            </div>
        </PageLayout>
    );
}
