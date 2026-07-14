"use client";
import { FC } from "react";
import AnimatedSection from "./AnimatedSection";

const experience = [
    {
        role: "Software Developer & Team Lead",
        company: "Naelix Tech Group",
        period: "October 2025 – Present",
        location: "Nigeria • Remote",
        current: true,
        points: [
            "Directed full-stack aspects of the QikTalk real-time chat platform (50,000+ users), contributing to low-latency architecture, defining code standards, and managing technical backlogs.",
            "Owned frontend architecture and delivery of scalable, data-driven React components for Givvo's \"Buy Crypto\" platform, including UI implementation and efficient local state management.",
            "Built and maintained high-performance, responsive user interfaces for the official Naelix website using React, Next.js, TypeScript, and Tailwind CSS.",
            "Engineered reusable component libraries and optimized performance through code reviews and modern frontend patterns.",
        ],
    },
    {
        role: "Full-Stack Developer (Contractor)",
        company: "Afrimercato",
        period: "3-month contract",
        location: "Nigeria • Remote",
        current: true,
        points: [
            "Architected and deployed a comprehensive commercial e-commerce platform, collaborating with a technical teammate to deliver scalable features.",
            "Implemented robust business logic separated from HTTP requests, ensuring an intuitive and highly responsive user experience.",
        ],
    },
    {
        role: "Software Developer",
        company: "Jodnah Technology",
        period: "August 2025 – December 2025",
        location: "Nigeria • Remote",
        points: [
            "Developed responsive decentralized web applications using Next.js, TypeScript, Tailwind CSS, and Web3.js.",
            "Built frontend-backend integrations with RESTful APIs using Node.js/Express, implementing secure authentication and role-based access control.",
            "Managed deployments and version control (GitHub, Vercel, Render) while maintaining documentation and peer reviews.",
        ],
    },
    {
        role: "Frontend Developer (Volunteer)",
        company: "GrundPay",
        period: "April – May 2025",
        location: "Nigeria • Remote",
        points: [
            "Developed the secure payment flow interface using React.js, integrating RESTful APIs and real-time updates on the broker dashboard.",
            "Ensured a smooth user experience for real estate installment payments through responsive and intuitive design.",
        ],
    },
    {
        role: "Frontend Developer (Freelance)",
        company: "The FourDev",
        period: "January 2025 – Present",
        location: "Lagos State, Nigeria • Remote",
        current: false,
        points: [
            "Built pixel-perfect, accessible, and responsive web interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
            "Translated Figma/UI designs into interactive, reusable components while focusing on performance and accessibility standards.",
            "Took ownership of frontend features from requirements gathering to production rollout.",
        ],
    },
    {
        role: "Web Developer Intern",
        company: "Digital World Tech",
        period: "July 2024 – October 2024",
        location: "Nigeria • On-site",
        points: [
            "Trained new students on web development basics and contributed to the team's growth by sharing resources and implementing visual aids.",
        ],
    },
];

const education = [
    {
        school: "National Open University of Nigeria",
        period: "In view",
        detail: "Pursuing a BSc in Computer Science, focusing on core computer science principles and advanced topics.",
    },
    {
        school: "Digital World Tech Academy",
        period: "2024",
        detail: "Completed a diploma in full-stack development, gaining hands-on experience with modern web technologies.",
    },
];

interface TimeLineItem {
    title: string,
    subtitle: string,
    meta: string,
    current?: boolean;
    points?: string[];
}

const TimelineItem: FC<TimeLineItem> = ({ title, subtitle, meta, current, points }) => (
    <AnimatedSection>
        <div className="group relative pb-2">
            <span
                className={`absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900 transition-transform group-hover:scale-125 ${current ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-600"
                    }`}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-1">
                <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                    {title}
                </h4>
                {current && (
                    <span className="text-[11px] font-semibold tracking-wide uppercase text-blue-600 dark:text-blue-400">
                        Current
                    </span>
                )}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                {subtitle}
                <span className="mx-2 text-slate-300 dark:text-slate-600">/</span>
                <span className="font-mono text-xs">{meta}</span>
            </p>
            {points?.length > 0 && (
                <ul className="space-y-2">
                    {points.map((point, i) => (
                        <li
                            key={i}
                            className="pl-3 border-l-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 leading-relaxed"
                        >
                            {point}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </AnimatedSection>
);

export const ExperienceSection = () => (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">
                    Experience & Education
                </h2>
            </AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16">
                <div>
                    <AnimatedSection>
                        <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8">
                            Work experience
                        </h3>
                    </AnimatedSection>
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-700 pl-8 space-y-10">
                        {experience.map((item) => (
                            <TimelineItem
                                key={item.company}
                                title={`${item.role} — ${item.company}`}
                                subtitle={item.location}
                                meta={item.period}
                                current={item.current}
                                points={item.points}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <AnimatedSection>
                        <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8">
                            Education
                        </h3>
                    </AnimatedSection>
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-700 pl-8 space-y-10">
                        {education.map((item) => (
                            <TimelineItem
                                key={item.school}
                                title={item.school}
                                subtitle={item.detail}
                                meta={item.period}
                                points={[]}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);