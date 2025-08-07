import type { Metadata } from "next";
import localFont from "next/font/local";

//
import "swiper/css";
import "./globals.css";

const gotu = localFont({
    src: "./fonts/Gotu-Regular.ttf",
    display: "swap",
    weight: "400"
});

export const metadata: Metadata = {
    title: "AISEE",
    description: "AISEE"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${gotu.className} antialiased`}>{children}</body>
        </html>
    );
}
