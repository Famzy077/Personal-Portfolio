"use client";
import AnimatedSection from "./AnimatedSection";
import Tilt3DCard from "./Tilt3DCard";
import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Code2,
  Cpu,
  Sparkles,
  Users,
  Terminal,
  UserCheck,
} from "lucide-react";

export const About = () => {
  const [readMore, setReadMore] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "portrait">("code");

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
    <section
      id="about"
      className="relative z-10 py-24 bg-transparent border-y border-slate-200/60 dark:border-slate-800/60"
    >
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Engineering Philosophy &amp; Background
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
              Building With Craftsmanship &amp; Business Focus
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Transforming complex product requirements into resilient, user-centric software that scales seamlessly.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Interactive Developer IDE & Portrait Switcher */}
          <div className="lg:col-span-5 flex justify-center">
            <AnimatedSection className="w-full max-w-md">
              <Tilt3DCard maxTilt={9} scale={1.02} className="rounded-2xl">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-2xl">
                  {/* IDE Window Top Bar with View Switcher */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                    </div>

                    <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => setActiveTab("code")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                          activeTab === "code"
                            ? "bg-blue-600 text-white font-semibold"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <Terminal size={12} />
                        <span>engineer.ts</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("portrait")}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                          activeTab === "portrait"
                            ? "bg-blue-600 text-white font-semibold"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <UserCheck size={12} />
                        <span>portrait.png</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body: Either Interactive Code Architecture or Portrait */}
                  {activeTab === "code" ? (
                    <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed bg-gradient-to-b from-slate-900 via-[#0b1120] to-slate-950">
                      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800/80">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-blue-500/40 bg-gradient-to-b from-blue-950 to-slate-900 shrink-0">
                          <Image
                            src="/Images/HeroPic.png"
                            alt="Akinola Femi"
                            fill
                            sizes="48px"
                            className="object-cover object-bottom scale-125"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-sans font-bold text-white">
                            Akinola Femi
                          </p>
                          <p className="text-[11px] text-emerald-400">
                            ● Mid-Level Full-Stack Engineer
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-slate-300 select-none">
                        <p>
                          <span className="text-purple-400">const</span>{" "}
                          <span className="text-blue-400">engineer</span> = &#123;
                        </p>
                        <p className="pl-4">
                          <span className="text-slate-400">role:</span>{" "}
                          <span className="text-amber-300">&apos;Full-Stack &amp; Team Lead&apos;</span>,
                        </p>
                        <p className="pl-4">
                          <span className="text-slate-400">frontend:</span> [
                          <span className="text-emerald-300">&apos;TS&apos;</span>,{" "}
                          <span className="text-emerald-300">&apos;React&apos;</span>,{" "}
                          <span className="text-emerald-300">&apos;Next.js&apos;</span>],
                        </p>
                        <p className="pl-4">
                          <span className="text-slate-400">backend:</span> [
                          <span className="text-emerald-300">&apos;Node.js&apos;</span>,{" "}
                          <span className="text-emerald-300">&apos;Express&apos;</span>,{" "}
                          <span className="text-emerald-300">&apos;Python&apos;</span>],
                        </p>
                        <p className="pl-4">
                          <span className="text-slate-400">database:</span> [
                          <span className="text-emerald-300">&apos;PostgreSQL&apos;</span>,{" "}
                          <span className="text-emerald-300">&apos;Prisma&apos;</span>,{" "}
                          <span className="text-emerald-300">&apos;Redis&apos;</span>],
                        </p>
                        <p className="pl-4">
                          <span className="text-slate-400">productionScale:</span>{" "}
                          <span className="text-cyan-300">&apos;5,000+ active users&apos;</span>,
                        </p>
                        <p className="pl-4">
                          <span className="text-slate-400">delivery:</span>{" "}
                          <span className="text-blue-400">async</span> () =&gt;{" "}
                          <span className="text-amber-300">&apos;Clean, Tested &amp; Scalable&apos;</span>
                        </p>
                        <p>&#125;;</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[4/4.3] w-full bg-gradient-to-b from-slate-900 via-blue-950/40 to-slate-900 overflow-hidden">
                      <Image
                        src="/Images/HeroPic.png"
                        alt="Akinola Femi"
                        fill
                        sizes="(max-width: 1024px) 100vw, 400px"
                        className="object-cover object-bottom scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Footer bar */}
                  <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">
                      Lagos, NG • Remote Globally
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
                      Full-Stack
                    </span>
                  </div>
                </div>
              </Tilt3DCard>
            </AnimatedSection>
          </div>

          {/* Right Column: Narrative & Pillars */}
          <div className="lg:col-span-7">
            <AnimatedSection>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                <p>
                  I am a results-oriented Full-Stack Software Engineer with genuine production experience designing, developing, and deploying mission-critical applications. My engineering foundation spans low-latency real-time platforms, high-conversion commercial e-commerce systems, and robust fintech integrations.
                </p>
                <p>
                  On the backend, I design reliable RESTful micro-services and event-driven APIs using{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    Node.js, Express, and Python
                  </strong>
                  , with secure role-based access controls and relational modeling in{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    PostgreSQL &amp; Prisma
                  </strong>
                  . On the client side, I architect modular, accessible, and responsive interfaces with{" "}
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    TypeScript, React, and Next.js
                  </strong>
                  .
                </p>

                {readMore && (
                  <div className="pt-2 space-y-4 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
                    <p>
                      Beyond building systems, I have actively led engineering teams—defining code review standards, managing delivery backlogs, and architecting key platform initiatives such as the QikTalk real-time chat engine serving over 5,000+ active users.
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
                  <span>
                    {readMore ? "Show Less" : "Read Full Story & Leadership Background"}
                  </span>
                  {readMore ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Core Engineering Pillars with 3D Tilt */}
              <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                {pillars.map((pillar) => (
                  <Tilt3DCard key={pillar.title} maxTilt={7} className="rounded-xl">
                    <div className="h-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500/40 transition-colors">
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
                  </Tilt3DCard>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};