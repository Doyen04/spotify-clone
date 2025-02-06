import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import SuperbaseProvider from "@/providers/SuperbaseProvider";
import UserProvider from "@/providers/UserProvider";

const fig = Figtree({
    subsets: ["latin"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Spotify Clone",
    description: "Listen to music",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${fig.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SuperbaseProvider>
                    <UserProvider>
                        <Sidebar>
                            {children}
                        </Sidebar>
                    </UserProvider>
                </SuperbaseProvider>


            </body>
        </html>
    );
}
