"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import Cursor from './Components/Cursor';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { ThemeProvider } from './Theme/ThemeProvider';
import { FirebaseProvider } from './contexts/FirebaseProvider';
import 'lucide-react';

config.autoAddCss = false;

// Dynamically import both pages
const AdminPage = dynamic(() => import('./(page)/admin/page'), { ssr: false });
const PortfolioPage = dynamic(() => import('./(page)/home/page'), { ssr: false });

const App = () => {
  const isAdmin = typeof window !== "undefined" && window.location.pathname === "/admin";

  return (
    <FirebaseProvider>
      <ThemeProvider>
        <div className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-sans">

          {isAdmin ? <AdminPage /> : <PortfolioPage />}

          <Cursor />
        </div>
      </ThemeProvider>
    </FirebaseProvider>
  );
};

export default App;
