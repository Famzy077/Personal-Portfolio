"use client";
import AnimatedSection from "./AnimatedSection";

export const ExperienceSection = () => (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
        <div className="containe mx-auto px-6">
            <AnimatedSection><h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">Experience & Education</h2></AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16">
                <div>
                    <AnimatedSection><h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8">Work Experience</h3></AnimatedSection>
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-700 pl-8 space-y-12">
                         <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 top-1.5"></div>
                        <AnimatedSection>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Software Developer @ TheFourDev</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">2024 - Present</p>
                            <p className="text-slate-600 dark:text-slate-300">Built and deployed the Joyvinco e-commerce website from scratch, focusing on a great user interface and applying all necessary functionality to meet user needs.</p>
                        </AnimatedSection>
                        <AnimatedSection>
                             <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5"></div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Backend Engineer @ Vooperative</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">2024 - Present</p>
                            <p className="text-slate-600 dark:text-slate-300">Building scalable, secure backend systems using Python, Django, and PostgreSQL. Collaborating with front-end developers to integrate APIs and database functionalities.</p>
                        </AnimatedSection>
                         <AnimatedSection>
                             <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5"></div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Web Developer Intern @ Digital World Tech</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Jul 2024 - Oct 2024</p>
                            <p className="text-slate-600 dark:text-slate-300">Trained new students on web development basics and contributed to the team’s growth by sharing resources. Implemented visual aids to support student learning.</p>
                        </AnimatedSection>
                    </div>
                </div>
                <div>
                    <AnimatedSection><h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8">Education</h3></AnimatedSection>
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-700 pl-8 space-y-12">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 top-1.5"></div>
                        <AnimatedSection>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">National Open University Of Nigeria</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">2024 - Present</p>
                            <p className="text-slate-600 dark:text-slate-300">Pursuing a BSc in Computer Science, focusing on core computer science principles and advanced topics.</p>
                        </AnimatedSection>
                        <AnimatedSection>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5"></div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Digital World Tech Academy</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">2024</p>
                            <p className="text-slate-600 dark:text-slate-300">Completed a Diploma in Full-Stack Development, gaining hands-on experience with modern web technologies.</p>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </div>
    </section>
);