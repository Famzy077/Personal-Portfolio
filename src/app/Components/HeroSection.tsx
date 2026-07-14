"use client"
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";
import { SkillsShowcase } from "./SkillsShowcase";

export const Hero = () => (
    <section className="pt-32 pb-2 lg:32 md:pt-32 md:pb-10 text-center overflow-hidden">
        <div className="mx-auto px-6">
            <AnimatedSection>
                <h2 className="max-sm:text-[18px] md:text-2xl font-medium text-blue-500 dark:text-blue-400 mb-2">A Software Engineer</h2>
                <h1 className="text-2xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-4">I&apos;m Akinola Femi</h1>
                <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-8">Engineering high-performance web applications and robust architectures for global scale. Full-stack expertise in JavaScript, Python, React, and Node.js.</p>
                <div className="flex justify-center space-x-2 sm:space-x-4 items-center">
                    <a href="#projects" className="bg-blue-600 flex gap-1 max-sm:text-[10.5px] text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"><span className="sm:block hidden">View</span> Projects</a>
                    <a download={'/https://docs.google.com/document/d/16Y18WIM1lIMWcJqDB-rfylWsfgKSzY-pcB_aW857574/edit?tab=t.0'} href="https://docs.google.com/document/d/16Y18WIM1lIMWcJqDB-rfylWsfgKSzY-pcB_aW857574/edit?tab=t.0" className="border-2 border-slate-300 max-sm:text-[10.5px] dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-7 py-3 max-sm:py-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300">Download CV</a>
                    <a href="https://drive.google.com/file/d/1IxUaVPV8cp8ennRAEfupwEE-YYkmKkwn/view" className="bg-blue-600 max-sm:text-[10.5px] flex gap-1 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md"><span className="sm:block hidden">View</span> Certificate</a>
                </div>
            </AnimatedSection>
            <AnimatedSection className="mt-16">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 dark:opacity-50"></div>
                    <Image src='/Images/HeroPic.png' width={100} height={100} alt="Akinola Femi Profile" className="relative w-full h-full sm:w-[350px] -rotate-2 rounded-full object-contain border-8 border-white dark:border-slate-800 shadow-2xl" />
                </div>
            </AnimatedSection>
            <SkillsShowcase />
        </div>
    </section>
);
