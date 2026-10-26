"use client";
import AnimatedSection from "./AnimatedSection";
import Tilt3DCard from "./Tilt3DCard";
import React from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiRedis,
  SiGit,
  SiGithub,
  SiVercel,
  SiTailwindcss,
  SiSass,
  SiHtml5,
  SiExpress,
  SiJsonwebtokens,
  SiWeb3Dotjs,
  SiFastapi,
  SiDocker,
  SiExpo,
  SiCloudinary,
  SiFirebase,
  SiRender,
} from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";
import { Clock, Layers, Server, Database, Wrench } from "lucide-react";

type Skill = {
  name: string;
  icon: React.ReactNode;
  brandColor: string;
  level?: string;
};

const frontendSkills: Skill[] = [
  { name: "TypeScript", icon: <SiTypescript />, brandColor: "#3178C6" },
  { name: "JavaScript (ES6+)", icon: <SiJavascript />, brandColor: "#F7DF1E" },
  { name: "React", icon: <SiReact />, brandColor: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, brandColor: "#ffffff" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, brandColor: "#06B6D4" },
  { name: "React Native / Expo", icon: <SiExpo />, brandColor: "#ffffff" },
  { name: "HTML5 / Semantic UI", icon: <SiHtml5 />, brandColor: "#E34F26" },
  { name: "CSS3 / SCSS", icon: <SiSass />, brandColor: "#CC6699" },
];

const backendSkills: Skill[] = [
  { name: "Node.js", icon: <SiNodedotjs />, brandColor: "#339933" },
  { name: "Express.js", icon: <SiExpress />, brandColor: "#ffffff" },
  { name: "Python", icon: <SiPython />, brandColor: "#3776AB" },
  { name: "FastAPI", icon: <SiFastapi />, brandColor: "#009688" },
  { name: "RESTful APIs", icon: <Server size={22} />, brandColor: "#3b82f6" },
  { name: "JWT Auth & RBAC", icon: <SiJsonwebtokens />, brandColor: "#ffffff" },
  { name: "Web3.js Integrations", icon: <SiWeb3Dotjs />, brandColor: "#F16822" },
];

const databaseSkills: Skill[] = [
  { name: "PostgreSQL", icon: <SiPostgresql />, brandColor: "#4169E1" },
  { name: "Prisma ORM", icon: <SiPrisma />, brandColor: "#2D3748" },
  { name: "MongoDB", icon: <SiMongodb />, brandColor: "#47A248" },
  { name: "Redis", icon: <SiRedis />, brandColor: "#DC382D" },
  { name: "Firebase Firestore", icon: <SiFirebase />, brandColor: "#FFCA28" },
  { name: "Cloudinary CDN", icon: <SiCloudinary />, brandColor: "#3448C5" },
];

const devopsSkills: Skill[] = [
  { name: "Docker", icon: <SiDocker />, brandColor: "#2496ED" },
  { name: "Git", icon: <SiGit />, brandColor: "#F05032" },
  { name: "GitHub Workflows", icon: <SiGithub />, brandColor: "#ffffff" },
  { name: "Vercel Deployments", icon: <SiVercel />, brandColor: "#ffffff" },
  { name: "Render Cloud", icon: <SiRender />, brandColor: "#46E3B7" },
  { name: "Linux / Bash CLI", icon: <VscTerminalBash />, brandColor: "#4EAA25" },
  { name: "Scheduled Jobs", icon: <Clock size={20} />, brandColor: "#F59E0B" },
];

const SkillBadge = ({ skill }: { skill: Skill }) => (
  <div className="group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div
      className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-xl transition-transform group-hover:scale-110"
      style={{ color: skill.brandColor === "#ffffff" ? undefined : skill.brandColor }}
    >
      <span className="text-slate-800 dark:text-slate-100">{skill.icon}</span>
    </div>
    <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
      {skill.name}
    </span>
  </div>
);

export const SkillsShowcase = () => {
  return (
    <section id="skills" className="relative z-10 py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Technical Stack &amp; Competencies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
              Technologies I Build Production Software With
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Comprehensive full-stack engineering toolkit honed across real-time applications, commercial platforms, and scalable web architectures.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend Section */}
          <AnimatedSection>
            <Tilt3DCard maxTilt={5} className="rounded-2xl h-full">
              <div className="h-full p-6 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-200/70 dark:border-slate-800">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      Frontend Architecture
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Component design, reactive state, responsive UX
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {frontendSkills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </Tilt3DCard>
          </AnimatedSection>

          {/* Backend Section */}
          <AnimatedSection>
            <Tilt3DCard maxTilt={5} className="rounded-2xl h-full">
              <div className="h-full p-6 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-200/70 dark:border-slate-800">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <Server size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      Backend &amp; API Systems
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      REST APIs, real-time messaging, auth &amp; security
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {backendSkills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </Tilt3DCard>
          </AnimatedSection>

          {/* Database Section */}
          <AnimatedSection>
            <Tilt3DCard maxTilt={5} className="rounded-2xl h-full">
              <div className="h-full p-6 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-200/70 dark:border-slate-800">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                    <Database size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      Data Persistence &amp; Storage
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Relational SQL, document databases, caching &amp; ORMs
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {databaseSkills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </Tilt3DCard>
          </AnimatedSection>

          {/* DevOps & Tools Section */}
          <AnimatedSection>
            <Tilt3DCard maxTilt={5} className="rounded-2xl h-full">
              <div className="h-full p-6 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-200/70 dark:border-slate-800">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                      DevOps &amp; Workflow Tooling
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Containerization, CI/CD, Git workflows &amp; environments
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {devopsSkills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </Tilt3DCard>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
