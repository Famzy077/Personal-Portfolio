"use client"
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseProvider";
import { db } from "@/app/firebase";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import { LinkIcon, GithubIcon } from "../Icon/Icons";
import useOnScreen from "../Hooks/useOnScreen";

type Project = {
    id: string;
    title: string;
    category: 'Frontend' | 'Backend';
    imageUrl: string;
    description: string;
    liveUrl: string;
    githubUrl: string;
    tags: string | string[];
};

const ProjectCard = ({ project }: { project: Project }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
    const tagsArray = Array.isArray(project.tags) ? project.tags : project.tags.split(',').map(tag => tag.trim());
    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl dark:shadow-slate-900/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Image src={project.imageUrl} alt={project.title} width={600} height={400} className="w-full h-56 object-cover" />
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4 h-24 overflow-hidden">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tagsArray.map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-start space-x-4">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold"><LinkIcon /><span>Live Demo</span></a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 font-semibold"><GithubIcon /><span>GitHub</span></a>
                </div>
            </div>
        </div>
    );
};

export const ProjectSection = () => {
    // Get the new public path from our context
    const { publicProjectsPath} = useFirebase();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        if (!publicProjectsPath) {
            console.error("Public projects path is not available.");
            setLoading(false);
        return;
        }
    setLoading(true);

    const projectsCollection = collection(db, publicProjectsPath);
    const unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
        const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(projectsData);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
    });

    return () => unsubscribe();
}, [publicProjectsPath]);


    const categories = ['All', 'Frontend', 'Backend'];
    const filteredProjects = selectedCategory === 'All' 
        ? projects 
        : projects.filter(p => p.category === selectedCategory);

    return (
        <section id="projects" className="py-20 bg-slate-100 dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-4">My Work & Projects</h2>
                </AnimatedSection>
                <AnimatedSection className="flex justify-center mb-12">
                    <div className="flex space-x-2 bg-slate-200 dark:bg-slate-800 p-1.5 rounded-full">
                        {categories.map(category => (
                            <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors ${selectedCategory === category ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-slate-100 shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}>
                                {category}
                            </button>
                        ))}
                    </div>
                </AnimatedSection>

                {loading ? (
                    <div className="text-center text-slate-500 dark:text-slate-400">Loading Projects...</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:mx-20 lg:grid-cols-2 gap-12">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
                        ) : (
                            <p className="text-center col-span-full text-slate-500 dark:text-slate-400">No projects found for this category.</p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};