"use client";
import React, { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseProvider";
import { db } from "@/app/firebase";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import useOnScreen from "../Hooks/useOnScreen";
import { ExternalLink, Github, Layers, AlertCircle } from "lucide-react";
import { Project } from "@/app/Data/initialData";

const ProjectCard = ({ project }: { project: Project }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });
  const [imageError, setImageError] = useState(false);

  const tagsArray: string[] = Array.isArray(project.tags)
    ? project.tags
    : typeof project.tags === "string"
    ? project.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const hasLiveUrl =
    project.liveUrl && project.liveUrl !== "#" && project.liveUrl.trim().length > 0;
  const hasGithubUrl =
    project.githubUrl && project.githubUrl !== "#" && project.githubUrl.trim().length > 0;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm hover:shadow-xl hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-500 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } flex flex-col h-full`}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-52 sm:h-56 bg-slate-100 dark:bg-slate-800/80 overflow-hidden">
        {project.imageUrl && !imageError ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-400 dark:text-slate-500">
            <Layers size={36} className="mb-2 opacity-50" />
            <span className="text-xs font-mono">{project.title}</span>
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase bg-slate-900/80 dark:bg-black/80 text-white backdrop-blur-md shadow-sm">
            {project.category}
          </span>
          {project.order === 0 && (
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase bg-blue-600/90 text-white backdrop-blur-md shadow-sm">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack chips */}
          {tagsArray.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {tagsArray.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action links */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
          {hasLiveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm"
            >
              <span>Live Demo</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <span className="text-xs text-slate-400 dark:text-slate-500 italic">
              Internal / Production
            </span>
          )}

          {hasGithubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Github size={14} />
              <span>Repository</span>
            </a>
          ) : (
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Private Repo
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProjectSection = () => {
  const [sectionRef, isSectionVisible] = useOnScreen({ threshold: 0.1 });
  const { publicProjectsPath, isAuthReady } = useFirebase();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (!isAuthReady || !publicProjectsPath || !isSectionVisible) return;

    setLoading(true);
    setFetchError(null);

    const projectsCollection = collection(db, publicProjectsPath);
    const q = query(projectsCollection, orderBy("order", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const projectsData = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Project)
        );
        setProjects(projectsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching projects from Firestore:", error);
        setFetchError("Unable to load live projects. Please check connection.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isAuthReady, publicProjectsPath, isSectionVisible]);

  const categories = ["All", "Frontend", "Mobile", "Backend"];
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const numberOfSkeletons = 6;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      id="projects"
      className="py-24 bg-slate-50 dark:bg-[#0b0f19]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Selected Production Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4">
              Featured Engineering Projects
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Real-world systems, e-commerce architectures, and frontend applications managed live through my admin panel.
            </p>
          </div>
        </AnimatedSection>

        {/* Category filter tabs */}
        <AnimatedSection className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Error State */}
        {fetchError && (
          <div className="max-w-md mx-auto p-4 mb-8 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-center gap-3 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <span>{fetchError}</span>
          </div>
        )}

        {/* Scroll View & Projects / Skeleton Display */}
        {isSectionVisible ? (
          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              Array.from({ length: numberOfSkeletons }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 px-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800">
                <Layers size={36} className="mx-auto mb-3 text-slate-400" />
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  No projects found in category &ldquo;{selectedCategory}&rdquo;
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Add or categorize projects from the admin panel to display them here.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping mb-1" />
            <p className="text-sm font-medium tracking-wide">Scroll down to see my projects!</p>
          </div>
        )}
      </div>
    </section>
  );
};