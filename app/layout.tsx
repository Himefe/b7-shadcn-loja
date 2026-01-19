import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";

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
        <html lang="en">
            <body className={`${fontSans.variable} antialiased`}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
