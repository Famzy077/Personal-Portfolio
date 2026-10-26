"use client";
import React, { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import Tilt3DCard from "./Tilt3DCard";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = "akinolafemi573@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      handle: "akinola-femi077",
      url: "https://www.linkedin.com/in/akinola-femi077",
      icon: <FaLinkedin size={18} className="text-[#0A66C2]" />,
      desc: "Connect for opportunities",
    },
    {
      name: "GitHub",
      handle: "Famzy077",
      url: "https://github.com/Famzy077",
      icon: <SiGithub size={18} className="text-slate-900 dark:text-white" />,
      desc: "Code repositories & contributions",
    },
    {
      name: "X (Twitter)",
      handle: "@famzy_Tech",
      url: "https://x.com/famzy_Tech",
      icon: <SiX size={17} className="text-slate-900 dark:text-white" />,
      desc: "Tech insights & engineering updates",
    },
  ];

  return (
    <section id="contact" className="relative z-10 py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Let&apos;s Connect
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
              Get In Touch
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              I am actively open to mid-level Full-Stack Software Engineer roles, high-impact contract opportunities, and international engineering teams.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          {/* Main Email Hero Card with 3D Tilt */}
          <Tilt3DCard maxTilt={5} scale={1.01} className="rounded-3xl mb-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0f172a] border border-slate-200/90 dark:border-slate-800 shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                <Mail size={26} />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Start a Conversation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                Drop an email to discuss engineering roles, project architectures, or collaboration opportunities.
              </p>

              {/* Email display and actions */}
              <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
                <span className="px-4 py-1.5 font-mono text-sm text-slate-800 dark:text-slate-200 select-all">
                  {emailAddress}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm transition-all"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${emailAddress}`}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>Send Email</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </Tilt3DCard>

          {/* Social Profiles Grid with 3D Tilt */}
          <div className="grid sm:grid-cols-3 gap-4">
            {socialLinks.map((social) => (
              <Tilt3DCard key={social.name} maxTilt={8} className="rounded-2xl">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-full p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {social.icon}
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">
                      {social.name}
                    </h4>
                    <p className="text-xs font-mono text-blue-600 dark:text-blue-400 mb-1">
                      {social.handle}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {social.desc}
                    </p>
                  </div>
                </a>
              </Tilt3DCard>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};