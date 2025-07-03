import React from 'react'

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-white dark:bg-slate-900 py-6">
            <div className="containe mx-auto px-6 py-3 text-center text-slate-500 dark:text-slate-400">
                <p>&copy; {currentYear} Akinola Femi. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
