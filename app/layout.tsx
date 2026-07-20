import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/providers/theme";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ShadCN Loja",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={`${fontSans.variable} antialiased`}>
                <ThemeProvider>
                    <div className="w-full max-w-4xl mx-auto min-h-[calc(100vh-20px)] flex flex-col">
                        <Header />
                        {children}
                        <Toaster position="bottom-right" />
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
