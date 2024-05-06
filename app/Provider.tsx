'use client'
import React, {ReactNode} from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/header/Navbar'

function Provider({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const disableNavbar = ['login', 'register', 'admin', 'user'];
    return (
        <main className="min-h-screen bg-slate-600">
           {!disableNavbar.includes(pathname.split('/')[1]) && <Navbar />}
            {children}
        </main>
    )
}

export default Provider