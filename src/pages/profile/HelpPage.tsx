import { MessageCircle, Phone, Mail, ExternalLink, HelpCircle, FileText, Shield } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageLayout } from "@/components/layout";
import { SectionCard } from "@/components/ui/section-card";
import { MenuListItem } from "@/components/ui/menu-list-item";
import { SectionTitle } from "@/components/ui/section-title";

const faqs = [
    {
        question: "How do I cancel a booking?",
        answer: "You can cancel a booking up to 2 hours before the showtime. Go to My Tickets, select the booking, and tap 'Cancel Booking'. Refunds are processed within 3-5 business days.",
    },
    {
        question: "What are the refund policies?",
        answer: "Full refunds are available for cancellations made more than 24 hours before the showtime. Cancellations within 24 hours receive a 50% refund. No refunds within 2 hours of showtime.",
    },
    {
        question: "How do loyalty points work?",
        answer: "You earn 1 point for every RM 1 spent on tickets and concessions. Points can be redeemed for free tickets, snacks, and exclusive member benefits. Points expire after 12 months of inactivity.",
    },
    {
        question: "Can I change my seats after booking?",
        answer: "Yes, you can change seats up to 1 hour before showtime, subject to availability. Go to My Tickets, select your booking, and tap 'Change Seats'.",
    },
    {
        question: "How do I use my QR code?",
        answer: "Simply show your QR code at the cinema entrance or ticket counter. The staff will scan it to verify your booking. Make sure your screen brightness is high for easy scanning.",
    },
];

const contactOptions = [
    { icon: MessageCircle, label: "Live Chat", description: "Chat with our support team" },
    { icon: Phone, label: "Call Us", description: "+60 3-1234 5678" },
    { icon: Mail, label: "Email", description: "support@cineverse.com" },
];

export default function HelpPage() {
    return (
        <PageLayout title="Help & Support" showBackButton backgroundVariant="default">
            <div className="p-4 space-y-6">
                {/* Contact Options */}
                <section>
                    <SectionTitle variant="small">Contact Us</SectionTitle>
                    <div className="space-y-2">
                        {contactOptions.map((option) => (
                            <MenuListItem
                                key={option.label}
                                icon={option.icon}
                                label={option.label}
                                description={option.description}
                                iconClassName="text-primary"
                            />
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                <section>
                    <SectionTitle icon={HelpCircle} variant="small">
                        Frequently Asked Questions
                    </SectionTitle>
                    <SectionCard noPadding className="overflow-hidden">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-border/50"
                                >
                                    <AccordionTrigger className="px-4 text-left text-foreground hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 text-muted-foreground">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </SectionCard>
                </section>

                {/* Legal Links */}
                <section>
                    <SectionTitle variant="small">Legal</SectionTitle>
                    <div className="space-y-2">
                        <SectionCard className="flex items-center gap-4 hover:bg-secondary/30 transition-colors cursor-pointer">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                            <span className="flex-1 text-left text-foreground">Terms of Service</span>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </SectionCard>
                        <SectionCard className="flex items-center gap-4 hover:bg-secondary/30 transition-colors cursor-pointer">
                            <Shield className="w-5 h-5 text-muted-foreground" />
                            <span className="flex-1 text-left text-foreground">Privacy Policy</span>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </SectionCard>
                    </div>
                </section>

                {/* App Version */}
                <div className="text-center py-4">
                    <p className="text-xs text-muted-foreground">CineVerse v1.0.0</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        © 2026 CineVerse. All rights reserved.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
