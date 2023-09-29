'use client';

import React from "react";
import Account from "@/components/Account";
import NextAuthProvider from "@/providers/NextAuthProvider";

export default function AppLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NextAuthProvider>
                <section>
                    <nav>
                        <Account/>
                    </nav>
                    {children}
                </section>
            </NextAuthProvider>
        </>
    );
}
