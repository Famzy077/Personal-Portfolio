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

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200">
      <Header />
      <main>
        <Hero />
        <About />
        <SkillsShowcase />
        <ProjectSection />
        <ExperienceSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
