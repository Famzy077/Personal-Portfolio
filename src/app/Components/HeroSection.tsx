"use client"
import AnimatedSection from "./AnimatedSection";
import ProfileImage from '../Components/Images/profile.png';
import useOnScreen from "../Hooks/useOnScreen";
import Image from "next/image";
import { SkillsShowcase } from "./SkillsShowcase";

const skillsData = [
    { name: 'Next.js', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=Next'},
    { name: 'Tailwind', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=TW'},
    { name: 'React', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=React'},
    { name: 'TypeScript', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=TS'},
    { name: 'Node.js', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=Node'},
    { name: 'Python', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=Py'},
];

const SkillBubble = ({ skill }: { skill: { name: string; imageUrl: string; position: string } }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className={` ${skill.position} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="flex items-center gap-2 md:gap-4 font-semibold bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-1.5 md:p-2 rounded-full shadow-lg animate-float">
                <Image className='w-6 h-6 md:w-10 md:h-10 rounded-full' src={skill.imageUrl} width={100} height={100} alt={`${skill.name} logo`} />
                <h1 className='text-xs md:text-xl text-slate-800 dark:text-slate-200'>{skill.name}</h1>
            </div>
        </div>
    );
};


export const Hero = () => (
    <section className="pt-32 pb-2 md:pt-16 md:pb-10 text-center overflow-hidden">
        <div className="cotainer mx-auto px-6">
            <AnimatedSection>
                <h2 className="text-sm md:text-xl font-medium text-blue-500 dark:text-blue-400 mb-2">A Software Engineer & Web Developer</h2>
                <h1 className="text-2xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-4">I&apos;m Akinola Femi</h1>
                <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-8">Passionate about transforming the African technology industry with innovative solutions, specializing in JavaScript, Python, React, and Node.js.</p>
                <div className="flex justify-center items-center space-x-4"><a href="#projects" className="bg-blue-600 max-sm:text-[10.5px] text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md">View Projects</a><a href="#" className="border-2 border-slate-300 max-sm:text-[10.5px] dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-7 py-3 max-sm:py-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300">Download CV</a></div>
            </AnimatedSection>
            <AnimatedSection className="mt-16">
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 dark:opacity-50"></div>
                    <Image src={ProfileImage} width={100} height={100} alt="Akinola Femi Profile" className="relative w-full h-full rounded-full object-cover border-8 border-white dark:border-slate-800 shadow-2xl" />
                    {/* <img src="https://placehold.co/400x400/e2e8f0/1e293b?text=AF" alt="Akinola Femi Profile" className="relative w-full h-full rounded-full object-cover border-8 border-white dark:border-slate-800 shadow-2xl" onError={(e) => e.target.src='https://placehold.co/400/e2e8f0/334155?text=Image+Error'} /> */}
                    {/* Skills Showcase */}
                </div>
            </AnimatedSection>
            <SkillsShowcase/>
        </div>
    </section>
);
