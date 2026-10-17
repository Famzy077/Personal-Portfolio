"use client";
import AnimatedSection from "./AnimatedSection";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Code2, Cpu, Sparkles, Users } from "lucide-react";

export const About = () => {
  const [readMore, setReadMore] = useState(false);

  const pillars = [
    {
      icon: <Code2 size={18} className="text-blue-500" />,
      title: "Clean Architecture",
      desc: "Separation of concerns, modular domain services, and typed contracts.",
    },
    {
      icon: <Cpu size={18} className="text-indigo-500" />,
      title: "High Performance",
      desc: "Optimized rendering cycles, snappy interactions, and lean payloads.",
    },
    {
      icon: <Users size={18} className="text-emerald-500" />,
      title: "Team Leadership",
      desc: "Code reviews, backlog management, and mentoring junior engineers.",
    },
    {
      icon: <Sparkles size={18} className="text-amber-500" />,
      title: "Product Mindset",
      desc: "Aligning technical execution with business value and UX standards.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-[#0f172a] border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Engineering Philosophy & Background
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
              Building With Craftsmanship & Business Focus
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Transforming complex product requirements into resilient, user-centric software that scales seamlessly.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Image & Photo Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <AnimatedSection className="w-full max-w-md">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 shadow-xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/Images/aboutImage.png"
                    alt="Akinola Femi"
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Akinola Femi
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Lagos, Nigeria • Remote Globally
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                    Full-Stack
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Narrative & Pillars */}
          <div className="lg:col-span-7">
            <AnimatedSection>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                <p>
                  I am a results-oriented Full-Stack Software Engineer with genuine production experience designing, developing, and deploying mission-critical applications. My engineering foundation spans low-latency real-time platforms, high-conversion commercial e-commerce systems, and robust fintech integrations.
                </p>
                <p>
                  On the backend, I design reliable RESTful micro-services and event-driven APIs using <strong className="text-slate-900 dark:text-white font-semibold">Node.js, Express, and Python</strong>, with secure role-based access controls and relational modeling in <strong className="text-slate-900 dark:text-white font-semibold">PostgreSQL & Prisma</strong>. On the client side, I architect modular, accessible, and responsive interfaces with <strong className="text-slate-900 dark:text-white font-semibold">TypeScript, React, and Next.js</strong>.
                </p>

                {readMore && (
                  <div className="pt-2 space-y-4 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
                    <p>
                      Beyond building systems, I have actively led engineering teams—defining code review standards, managing delivery backlogs, and architecting key platform initiatives such as the QikTalk chat engine for over 50,000 users.
                    </p>
                    <p>
                      I am also dedicated to community advancement, actively publishing educational content and mentoring junior engineers to establish solid foundations in modern software design patterns and industry workflows.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 mb-8">
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span>{readMore ? "Show Less" : "Read Full Story & Leadership Background"}</span>
                  {readMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Core Engineering Pillars */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {pillar.icon}
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};