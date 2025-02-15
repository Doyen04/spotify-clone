import React from "react";
import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import SuperbaseProvider from "@/providers/SuperbaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

// import {} from "react-hot-toast"

import getSongsByUserId from "@/actions/getSongsByUserId";

import Player from "@/components/Player";
import Sidebar from "../components/Sidebar";

export const revalidate = 0;

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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userSongs = await getSongsByUserId();
    return (
        <html lang="en">
            <body
                className={`${fig.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SuperbaseProvider>
                    <UserProvider>
                        <ModalProvider />
                            <Sidebar songs={userSongs}>
                                {children}
                            </Sidebar>
                            <Player />
                    </UserProvider>
                </SuperbaseProvider>


            </body>
        </html>
    );
}
