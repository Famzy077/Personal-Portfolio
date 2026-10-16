"use client";
import React from "react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import { ArrowDown, ExternalLink, FileText, Award } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { GrLinkedin } from "react-icons/gr";

export const Hero = () => {
  const resumeUrl =
    process.env.NEXT_PUBLIC_CV_URL ||
    "https://docs.google.com/document/d/16Y18WIM1lIMWcJqDB-rfylWsfgKSzY-pcB_aW857574/edit?tab=t.0";
  const certificateUrl =
    "https://drive.google.com/file/d/1IxUaVPV8cp8ennRAEfupwEE-YYkmKkwn/view";

  return (
    <section className="portfolio-hero relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background radial gradient accent */}
      <div className="hero-orb absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Pitch */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <AnimatedSection>
              {/* Role badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                <span className="text-[10px] sm:text-sm">Full-Stack Software Engineer • Production & Scaled Systems</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
                Hi, I&apos;m{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-300">
                  Akinola Femi
                </span>
                .
              </h1>

              {/* Subtitle / summary */}
              <p className="text-[12.5px] sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                I build robust, scalable web architectures and real-time systems. Experienced in designing resilient backends with{" "}
                <span className="font-semibold text-slate-900 dark:text-white">Node.js, Express & Python</span>, high-performance interfaces with{" "}
                <span className="font-semibold text-slate-900 dark:text-white">TypeScript, React & Next.js</span>, and modern data layers with{" "}
                <span className="font-semibold text-slate-900 dark:text-white">PostgreSQL & Prisma</span>.
              </p>

              {/* Primary & secondary CTAs */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center mb-10">
                <a
                  href="#projects"
                  className="inline-flex items-center text-[12.5px] sm:text-sm gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <span>Explore Projects</span>
                  <ArrowDown size={16} />
                </a>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-semibold text-sm transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
                >
                  <FileText size={16} className="text-blue-600 dark:text-blue-400" />
                  <span>View Résumé</span>
                  <ExternalLink size={14} className="text-slate-400" />
                </a>

                <a
                  href={certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-colors"
                >
                  <Award size={16} className="text-slate-500" />
                  <span>Credentials</span>
                </a>
              </div>

              {/* Quick links & social verification */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-sm text-slate-500 dark:text-slate-400">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Verified Profiles:</span>
                <a
                  href="https://github.com/Famzy077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <SiGithub size={16} />
                  <span className="font-medium">GitHub</span>
                </a>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <a
                  href="http://www.linkedin.com/in/akinola-femi077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <GrLinkedin size={16} />
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Profile Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <AnimatedSection className="relative">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
                {/* Subtle backlight glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-transparent rounded-2xl blur-2xl -z-10" />

                {/* Profile frame */}
                <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl p-2">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src="/Images/HeroPic.png"
                      alt="Akinola Femi — Full-Stack Software Engineer"
                      fill
                      priority
                      sizes="(max-width: 768px) 256px, 320px"
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating engineer badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-lg rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    10K+
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                      Users Served
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Real-time Chat Platform
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Engineering Highlights Strip */}
        <AnimatedSection className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
              <p className="text-xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                Full-Stack
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                End-to-End Architecture
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
              <p className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                50,000+
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                Concurrent Platform Users
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
              <p className="text-xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                TypeScript
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                Strict Typing & Testing
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60">
              <p className="text-[17.2px] md:text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                Remote Ready
              </p>
              <p className="text-xs md:text-sm font-medium text-slate-600 dark:text-slate-400">
                Global Timezone Collaboration
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
