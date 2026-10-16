import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b0f19] py-12 text-sm text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Branding & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-bold text-slate-900 dark:text-white">
            Akinola Femi
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
          <p className="text-xs">
            &copy; {currentYear} All rights reserved. Designed & built for production.
          </p>
        </div>

        {/* Quick links & Back to top */}
        <div className="flex items-center gap-6 text-xs">
          <a
            href="#projects"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Contact
          </a>
          <Link
            href="/admin"
            className="hover:text-blue-600 dark:hover:text-blue-400 font-mono transition-colors opacity-70 hover:opacity-100"
            title="Admin Management Dashboard"
          >
            Admin
          </Link>
          <a
            href="#"
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};
