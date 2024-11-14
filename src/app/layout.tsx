import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "rhappy",
    description: "らっぴーのブログです。",
};

const notosansjp = Noto_Sans_JP({
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased ${notosansjp.className}`}>
                <Header />
                <Container>{children}</Container>
                <Footer />
            </body>
        </html>
    );
}
