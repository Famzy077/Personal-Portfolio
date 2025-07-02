import React from 'react'
import Link from 'next/link';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-white dark:bg-slate-900 py-6">
            <div className="container mx-auto px-6 text-center text-slate-500 dark:text-slate-400">
                <p>&copy; {currentYear} Akinola Femi. All Rights Reserved.</p>
                <button
                    className="text-sm mt-2 hover:underline text-blue-500"
                >
                    Admin Panel
                    <Link href={'/admin'}>Test</Link>
                </button>
            </div>
        </footer>
    );
};
