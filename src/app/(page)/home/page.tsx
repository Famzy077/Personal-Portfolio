"use client"
import React from 'react'
import { Header } from '@/app/Components/Header';
import { Hero } from '@/app/Components/HeroSection';
import { About } from '@/app/Components/AboutSection';
import { ExperienceSection } from '@/app/Components/ExperienceCard';
import { Contact } from '@/app/Components/Contact';
import { Footer } from '@/app/Components/Footer';
import { ProjectSection } from '@/app/Components/ProjectSection';

const PortfolioPage = () => {
    
  return (
    <div className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-sans">
        <Header/>
        <main>
            <Hero />
            <About />
            <ProjectSection />
            <ExperienceSection />
            <Contact />
        </main>
        <Footer />
        </div>
  )
}

export default PortfolioPage
