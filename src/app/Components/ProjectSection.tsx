"use client";
import React, { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import Tilt3DCard from "./Tilt3DCard";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseProvider";
import { db } from "@/app/firebase";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import useOnScreen from "../Hooks/useOnScreen";
import {
  ExternalLink,
  Github,
  Layers,
  AlertCircle,
  Maximize2,
  X,
  Code2,
} from "lucide-react";
import { Project } from "@/app/Data/initialData";

const parseTags = (tags: string | string[]): string[] => {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
};

const ProjectCard = ({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });
  const [imageError, setImageError] = useState(false);

  const tagsArray = parseTags(project.tags);

  const hasLiveUrl =
    project.liveUrl && project.liveUrl !== "#" && project.liveUrl.trim().length > 0;
  const hasGithubUrl =
    project.githubUrl && project.githubUrl !== "#" && project.githubUrl.trim().length > 0;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-500 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } h-full`}
    >
      <Tilt3DCard maxTilt={6} scale={1.015} className="rounded-2xl h-full">
        <div className="group rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full">
          {/* Thumbnail */}
          <div
            onClick={() => onSelect(project)}
            className="relative w-full h-52 sm:h-56 bg-slate-100 dark:bg-slate-800/80 overflow-hidden cursor-pointer"
          >
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

            {/* Subtle hover overlay prompt */}
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/35 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-medium backdrop-blur-md border border-white/15 shadow-lg">
                <Maximize2 size={12} />
                <span>Inspect Project</span>
              </span>
            </div>

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
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3
                  onClick={() => onSelect(project)}
                  className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onSelect(project)}
                  className="shrink-0 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline pt-1"
                >
                  Details
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
                {project.description}
              </p>

              {/* Tech stack chips */}
              {tagsArray.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tagsArray.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium font-mono bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
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
      </Tilt3DCard>
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  // Close project detail modal on Escape & lock background scroll
  useEffect(() => {
    if (!selectedProject) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

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
      className="relative z-10 py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60"
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
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(proj) => setSelectedProject(proj)}
                />
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
            <p className="text-sm font-medium tracking-wide">
              Scroll down to see my projects!
            </p>
          </div>
        )}
      </div>

      {/* Project Architecture & Details Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <div className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] flex flex-col">
            {/* Top Image Banner */}
            <div className="relative w-full h-56 sm:h-72 bg-slate-100 dark:bg-slate-800 shrink-0">
              {selectedProject.imageUrl ? (
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Layers size={48} />
                </div>
              )}

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project details"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors backdrop-blur-md"
              >
                <X size={18} />
              </button>

              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-900/85 text-white backdrop-blur-md">
                  {selectedProject.category}
                </span>
                {selectedProject.order === 0 && (
                  <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow">
                    Featured Project
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h3
                  id="modal-project-title"
                  className="text-2xl font-extrabold text-slate-900 dark:text-white mb-3"
                >
                  {selectedProject.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {/* Full Stack Tags */}
              {parseTags(selectedProject.tags).length > 0 && (
                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    <Code2 size={14} className="text-blue-500" />
                    <span>Technologies &amp; Stack</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {parseTags(selectedProject.tags).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject.liveUrl &&
                    selectedProject.liveUrl !== "#" &&
                    selectedProject.liveUrl.trim().length > 0 && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md transition-all"
                      >
                        <span>Launch Live Application</span>
                        <ExternalLink size={14} />
                      </a>
                    )}

                  {selectedProject.githubUrl &&
                    selectedProject.githubUrl !== "#" &&
                    selectedProject.githubUrl.trim().length > 0 && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
                      >
                        <Github size={15} />
                        <span>Source Code</span>
                      </a>
                    )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};