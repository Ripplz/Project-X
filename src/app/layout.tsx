import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Project X - Cinema Reimagined",
    description: "Experience exclusive film releases from anywhere in the world",
    icons: {
        icon: "/favicon.ico",
        // For Apple devices
        apple: "/apple-touch-icon.png",
    },
    // Optional: Open Graph metadata
    openGraph: {
        title: "Project X - Cinema Reimagined",
        description: "Experience exclusive film releases from anywhere in the world",
        images: ["/og-image.png"],
    },
}
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="stylesheet"
                  href="https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css"/>
            <link rel="stylesheet" href="https://cdn-uicons.flaticon.com/2.6.0/uicons-brands/css/uicons-brands.css"/>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}

