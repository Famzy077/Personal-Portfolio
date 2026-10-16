"use client";
import React, { FC } from "react";
import AnimatedSection from "./AnimatedSection";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

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
    current: false,
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
    current: false,
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
    current: false,
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
    current: true,
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
    current: false,
    points: [
      "Trained new students on web development basics and contributed to the team's growth by sharing resources and implementing visual aids.",
    ],
  },
];

const education = [
  {
    school: "National Open University of Nigeria",
    period: "In view",
    degree: "BSc in Computer Science",
    detail:
      "Pursuing a BSc in Computer Science, focusing on core computer science principles, data structures, algorithms, and advanced software topics.",
  },
  {
    school: "Digital World Tech Academy",
    period: "2024",
    degree: "Diploma in Full-Stack Development",
    detail:
      "Completed a diploma in full-stack development, gaining hands-on experience with modern web technologies, full-stack architectures, and production workflows.",
  },
];

interface TimelineProps {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
}

const TimelineCard: FC<TimelineProps> = ({
  role,
  company,
  location,
  period,
  current,
  points,
}) => (
  <div className="relative pl-8 pb-10 last:pb-0">
    {/* Milestone indicator line */}
    <div className="absolute top-2.5 left-2.5 -bottom-2.5 w-px bg-slate-200 dark:bg-slate-800 last:hidden" />

    {/* Milestone dot */}
    <div
      className={`absolute top-2 left-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${
        current
          ? "border-blue-600 bg-white dark:bg-slate-900"
          : "border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          current ? "bg-blue-600 animate-pulse" : "bg-slate-400 dark:bg-slate-500"
        }`}
      />
    </div>

    {/* Card body */}
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            {role}
          </h4>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {company}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {current && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              Current
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Calendar size={12} />
            {period}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
        <MapPin size={13} />
        <span>{location}</span>
      </div>

      {points.length > 0 && (
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-2 leading-relaxed">
              <span className="text-blue-500 mt-1 font-bold">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export const ExperienceSection = () => (
  <section id="experience" className="py-24 bg-white dark:bg-[#0f172a] border-y border-slate-200/80 dark:border-slate-800/80">
    <div className="max-w-6xl mx-auto px-6">
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Career & Qualifications
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
            Professional Experience & Education
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Track record of leadership, contractor engagements, and technical contributions in production environments.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Work Experience Column */}
        <div className="lg:col-span-7">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Briefcase size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Work Experience
              </h3>
            </div>
          </AnimatedSection>

          <div>
            {experience.map((item, idx) => (
              <AnimatedSection key={`${item.company}-${idx}`}>
                <TimelineCard
                  role={item.role}
                  company={item.company}
                  location={item.location}
                  period={item.period}
                  current={item.current}
                  points={item.points}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="lg:col-span-5">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Academic Background
              </h3>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {education.map((item) => (
              <AnimatedSection key={item.school}>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.school}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    {item.degree}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </AnimatedSection>
            ))}

            {/* International collaboration highlight box */}
            <AnimatedSection>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/80 dark:border-blue-900/60">
                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-2">
                  Global Remote Ready
                </h4>
                <p className="text-xs text-blue-800 dark:text-blue-300/90 leading-relaxed">
                  Proven remote track record across distributed agile teams, asynchronous workflows, structured GitHub pull requests, and automated deployment pipelines.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  </section>
);