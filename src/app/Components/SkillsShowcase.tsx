'use client';
import AnimatedSection from './AnimatedSection';
import React from 'react';
import {
  SiNextdotjs, SiReact, SiTypescript, SiNodedotjs, SiPython, SiJavascript,
  SiPostgresql, SiMongodb, SiPrisma, SiRedis, SiGit, SiGithub, SiVercel,
  SiTailwindcss, SiSass, SiHtml5, SiCss3, SiExpress, SiJsonwebtokens
} from 'react-icons/si';
import { VscTerminalPowershell } from "react-icons/vsc";


// --- 1. The Data for All Your Skills (Now Categorized) ---
const languagesAndFrameworks = [
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', textColor: 'text-black' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', textColor: 'text-white' },
  { name: 'Python', icon: <SiPython />, color: '#3776AB', textColor: 'text-white' },
  { name: 'React', icon: <SiReact />, color: '#61DAFB', textColor: 'text-black' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000', textColor: 'text-white' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', textColor: 'text-white' },
  { name: 'Express.js', icon: <SiExpress />, color: '#000000', textColor: 'text-white' },
  { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26', textColor: 'text-white' },
  { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6', textColor: 'text-white' },
  { name: 'SASS/SCSS', icon: <SiSass />, color: '#CC6699', textColor: 'text-white' },
  { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4', textColor: 'text-white' },
];

const databasesAndStorage = [
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1', textColor: 'text-white' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', textColor: 'text-white' },
  { name: 'PrismaORM', icon: <SiPrisma />, color: '#2D3748', textColor: 'text-white' },
  { name: 'Redis', icon: <SiRedis />, color: '#DC382D', textColor: 'text-white' },
];

const toolsAndDevOps = [
  { name: 'Git', icon: <SiGit />, color: '#F05032', textColor: 'text-white' },
  { name: 'GitHub', icon: <SiGithub />, color: '#181717', textColor: 'text-white' },
  { name: 'Vercel', icon: <SiVercel />, color: '#000000', textColor: 'text-white' },
  { name: 'JWT', icon: <SiJsonwebtokens />, color: '#000000', textColor: 'text-white' },
  { name: 'CLI', icon: <VscTerminalPowershell />, color: '#FFFFFF', textColor: 'text-black' },
];


// --- 2. The Reusable Skill Card Component ---
const SkillCard = ({ skill }) => (
  <AnimatedSection>
    <div
        className="flex items-center gap-4 p-4 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        style={{ backgroundColor: skill.color }}
    >
        <div className={`text-3xl max-sm:text-xl ${skill.textColor}`}>
        {skill.icon}
        </div>
        <h3 className={`text-md max-sm:text-sm font-semibold ${skill.textColor}`}>
        {skill.name}
        </h3>
    </div>
  </AnimatedSection>
);

// --- 3. The Main Skills Showcase Component ---
export const SkillsShowcase = () => {
  return (
    <section className="mb-6 md:py-5 bg-gray-50 dark:bg-slate-900">
      <div className=" lg:mx-28 mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">My Tech Stack & Skills</h2>
            <p className="text-md md:text-lg text-slate-500 dark:text-slate-400 mt-2">The tools and technologies I use to build modern web applications.</p>
        </div>
        
        {/* Languages & Frameworks Section */}
        <div className="mb-12">
            <h3 className="text-2xl max-sm:text-xl font-bold text-slate-700 dark:text-slate-200 mb-6 border-l-4 border-blue-500 pl-4">Languages & Frameworks</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {languagesAndFrameworks.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                ))}
            </div>
        </div>

        {/* Databases & Storage Section */}
        <div className="mb-12">
            <h3 className="text-2xl max-sm:text-xl font-bold text-slate-700 dark:text-slate-200 mb-6 border-l-4 border-blue-500 pl-4">Databases & Storage</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {databasesAndStorage.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                ))}
            </div>
        </div>

        {/* Tools & DevOps Section */}
        <div>
            <h3 className="text-2xl max-sm:text-xl font-bold text-slate-700 dark:text-slate-200 mb-6 border-l-4 border-blue-500 pl-4">Tools & DevOps</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {toolsAndDevOps.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
