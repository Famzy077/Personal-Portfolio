"use client"
import { useState, useEffect } from 'react';
import {MenuIcon, XIcon} from '../Icon/Icons'
import ThemeToggle from '../Theme/ThemeProvider';
export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ["About", "Projects", "Experience", "Contact"];

    return (
        <>
            <header className={`fixed max-md:top-0 top-0 max-sm:-top-7 left-0 right-0 z-50 max-sm:borde rounded-lg transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md max-sm:border'  : 'bg-transparent'}`}>
                <nav className="containe mx-auto px-6 py-3 flex justify-between items-center">
                    <a href="#" className="text-2xl section2 font-bold text-slate-800 dark:text-slate-200">AF.dev</a>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link}</a>)}
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        <a href="#contact" className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">Hire Me</a>
                    </div>
                    <button onClick={() => setIsOpen(true)} className="md:hidden text-slate-800 dark:text-slate-200"><MenuIcon /></button>
                </nav>
            </header>
            
            <div className={`fixed inset-0 bg-white dark:bg-slate-900 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                 <div className="flex justify-end p-6"><button onClick={() => setIsOpen(false)} className="text-slate-800 dark:text-slate-200"><XIcon /></button></div>
                <div className="flex flex-col items-center justify-center h-full -mt-16 space-y-8">
                    {navLinks.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-3xl text-slate-700 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400">{link}</a>)}
                     <a href="#contact" onClick={() => setIsOpen(false)} className="mt-8 bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-xl">Hire Me</a>
                </div>
            </div>
        </>
    );
};