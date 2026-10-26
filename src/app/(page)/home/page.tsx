"use client";
import React from "react";
import { Header } from "@/app/Components/Header";
import { Hero } from "@/app/Components/HeroSection";
import { About } from "@/app/Components/AboutSection";
import { SkillsShowcase } from "@/app/Components/SkillsShowcase";
import { ProjectSection } from "@/app/Components/ProjectSection";
import { ExperienceSection } from "@/app/Components/ExperienceCard";
import { Contact } from "@/app/Components/Contact";
import { Footer } from "@/app/Components/Footer";
import { Dev3DBackground } from "@/app/Components/Dev3DBackground";

const PortfolioPage = () => {
  return (
    <div className="portfolio-blueprint-surface relative min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 overflow-x-hidden">
      <Dev3DBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <SkillsShowcase />
        <ProjectSection />
        <ExperienceSection />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default PortfolioPage;
