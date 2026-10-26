"use client";
import React from "react";
import AnimatedSection from "./AnimatedSection";
import SystemsStage3D from "./SystemsStage3D";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, ExternalLink, FileText, Award } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";

export const Hero = () => {
  const resumeUrl =
    process.env.NEXT_PUBLIC_CV_URL ||
    "https://docs.google.com/document/d/16Y18WIM1lIMWcJqDB-rfylWsfgKSzY-pcB_aW857574/preview";
  const certificateUrl =
    "https://drive.google.com/file/d/1IxUaVPV8cp8ennRAEfupwEE-YYkmKkwn/view";

  return (
    <section className="portfolio-hero relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden z-10">
      {/* Background radial gradient accent */}
      <div className="hero-orb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Top Eyebrow Row */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <p className="text-[11px] font-mono font-semibold tracking-wider uppercase flex gap-2.5 items-center text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse" />
            <span>Full-Stack Software Engineer — Web, Mobile &amp; Backend</span>
          </p>
          <p className="hidden sm:block text-xs font-medium text-slate-500 dark:text-slate-400">
            Independent thinking. End-to-end production systems.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-10 items-start pb-12">
          {/* Left Column: Headline, Profile Identity & Pitch */}
          <div className="lg:col-span-6 text-left flex flex-col justify-between">
            <AnimatedSection>
              {/* Verified Engineer Identity Chip */}
              <div className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-sm mb-6">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-blue-500/40 bg-slate-100 dark:bg-slate-800 shrink-0">
                  <Image
                    src="/Images/HeroPic.png"
                    alt="Akinola Femi"
                    fill
                    priority
                    sizes="36px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Akinola Femi
                  </p>
                  <p className="text-[10px] font-mono text-blue-600 dark:text-blue-400">
                    5,000+ Platform Users Served
                  </p>
                </div>
              </div>

              {/* Main Editorial Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
                <span className="block">Real products.</span>
                <span className="block">
                  From{" "}
                  <span className="italic font-serif font-normal text-blue-600 dark:text-blue-400 underline decoration-blue-500/40 underline-offset-8">
                    interface
                  </span>
                </span>
                <span className="block">
                  to infrastructure<span className="text-blue-600 dark:text-blue-400">.</span>
                </span>
              </h1>

              {/* Subtitle / summary */}
              <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800/80">
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-7 max-w-xl">
                  I build web and mobile applications and the scalable systems behind them. From a first interaction in{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    TypeScript, React &amp; Next.js
                  </span>{" "}
                  to resilient APIs, real-time messaging, and data layers with{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Node.js, Express, Python &amp; PostgreSQL
                  </span>
                  .
                </p>

                {/* Primary & secondary CTAs */}
                <div className="flex flex-wrap gap-3 items-center mb-8">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-md bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:-translate-y-0.5"
                  >
                    <span>Explore my work</span>
                    <ArrowDown size={16} />
                  </a>

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-white/90 dark:bg-slate-900/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-xs sm:text-sm transition-all shadow-sm"
                  >
                    <FileText size={15} className="text-blue-600 dark:text-blue-400" />
                    <span>View CV</span>
                    <ExternalLink size={13} className="text-slate-400" />
                  </a>

                  <a
                    href={certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-xs sm:text-sm transition-colors"
                  >
                    <Award size={15} className="text-slate-500" />
                    <span>Credentials</span>
                  </a>
                </div>

                {/* Quick links & social verification */}
                <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-slate-400">
                    Verified Profiles:
                  </span>
                  <a
                    href="https://github.com/Famzy077"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <SiGithub size={15} />
                    <span className="font-medium">GitHub</span>
                  </a>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <a
                    href="https://www.linkedin.com/in/akinola-femi077"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <GrLinkedin size={15} />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Interactive 3D 4-Strata Systems Visualization */}
          <div className="lg:col-span-6 w-full">
            <AnimatedSection>
              <SystemsStage3D />
            </AnimatedSection>
          </div>
        </div>

        {/* Architectural Divider Bar (matches reference screenshot) */}
        <div className="relative z-10 text-[10px] font-mono font-semibold tracking-wider uppercase flex justify-between items-center border-t border-slate-200/90 dark:border-slate-800/90 py-5 text-slate-500 dark:text-slate-400">
          <span>WEB / MOBILE / BACKEND</span>
          <a
            href="#projects"
            className="hidden sm:flex items-center gap-1.5 tracking-normal normal-case font-sans text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span>A closer look at the work</span>
            <ArrowUpRight size={14} />
          </a>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>

        {/* 3-Plane Architectural Scroll Bridge & Vertical Conduit Pulse */}
        <div
          aria-hidden="true"
          className="hero-scroll-bridge relative overflow-hidden pt-4 pb-2 print:hidden"
        >
          <div className="hero-bridge-planes grid grid-cols-3 gap-3 sm:gap-5">
            <div className="hero-bridge-plane hero-bridge-plane-1 border-t border-dashed border-slate-300 dark:border-slate-800 pt-2.5 flex items-center justify-between text-[9px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
              <span>01 · Interface Layer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 opacity-85" />
            </div>
            <div className="hero-bridge-plane hero-bridge-plane-2 border-t border-dashed border-slate-300 dark:border-slate-800 pt-2.5 flex items-center justify-between text-[9px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
              <span>02 · API &amp; Runtime</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 opacity-65" />
            </div>
            <div className="hero-bridge-plane hero-bridge-plane-3 border-t border-dashed border-slate-300 dark:border-slate-800 pt-2.5 flex items-center justify-between text-[9px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">
              <span>03 · Data &amp; Cloud</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 opacity-85" />
            </div>
          </div>

          <div className="relative mx-auto mt-3 h-11 w-px bg-slate-300 dark:bg-slate-800 overflow-hidden">
            <span className="hero-conduit-pulse block w-full h-6 bg-gradient-to-b from-transparent via-blue-600 dark:via-blue-400 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
