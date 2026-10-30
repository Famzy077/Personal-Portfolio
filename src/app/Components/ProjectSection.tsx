"use client";
import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
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
  Search,
  LayoutGrid,
  SlidersHorizontal,
  Server,
  Database,
  Lock,
  ArrowUpRight,
  Radio,
  Cpu,
} from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiPostgresql,
  SiPrisma,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiDocker,
  SiTailwindcss,
  SiExpo,
  SiHtml5,
  SiSass,
  SiExpress,
  SiWeb3Dotjs,
} from "react-icons/si";
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

type StrataType = "client" | "api" | "data" | "other";

interface TechMeta {
  name: string;
  layer: StrataType;
  icon: React.ReactNode;
  color?: string;
}

const getTechMeta = (rawTag: string): TechMeta => {
  const t = rawTag.trim();
  const lower = t.toLowerCase();

  // Client / Interface Layer
  if (
    lower.includes("react") ||
    lower.includes("next") ||
    lower.includes("typescript") ||
    lower.includes("tailwind") ||
    lower.includes("html") ||
    lower.includes("css") ||
    lower.includes("expo") ||
    lower.includes("javascript") ||
    lower.includes("sass")
  ) {
    let icon: React.ReactNode = <Layers size={13} />;
    let color = "#3b82f6";
    if (lower.includes("next")) {
      icon = <SiNextdotjs size={13} />;
      color = "#ffffff";
    } else if (lower.includes("react") && !lower.includes("native")) {
      icon = <SiReact size={13} />;
      color = "#61DAFB";
    } else if (lower.includes("typescript") || lower === "ts") {
      icon = <SiTypescript size={13} />;
      color = "#3178C6";
    } else if (lower.includes("tailwind")) {
      icon = <SiTailwindcss size={13} />;
      color = "#06B6D4";
    } else if (lower.includes("expo")) {
      icon = <SiExpo size={13} />;
      color = "#ffffff";
    } else if (lower.includes("html")) {
      icon = <SiHtml5 size={13} />;
      color = "#E34F26";
    } else if (lower.includes("sass")) {
      icon = <SiSass size={13} />;
      color = "#CC6699";
    } else if (lower.includes("javascript") || lower === "js") {
      icon = <SiJavascript size={13} />;
      color = "#F7DF1E";
    }
    return { name: t, layer: "client", icon, color };
  }

  // API & Services Layer
  if (
    lower.includes("node") ||
    lower.includes("express") ||
    lower.includes("python") ||
    lower.includes("fastapi") ||
    lower.includes("rest") ||
    lower.includes("web3") ||
    lower.includes("jwt") ||
    lower.includes("auth")
  ) {
    let icon: React.ReactNode = <Server size={13} />;
    let color = "#10b981";
    if (lower.includes("node")) {
      icon = <SiNodedotjs size={13} />;
      color = "#339933";
    } else if (lower.includes("express")) {
      icon = <SiExpress size={13} />;
      color = "#ffffff";
    } else if (lower.includes("python")) {
      icon = <SiPython size={13} />;
      color = "#3776AB";
    } else if (lower.includes("fastapi")) {
      icon = <SiFastapi size={13} />;
      color = "#009688";
    } else if (lower.includes("web3")) {
      icon = <SiWeb3Dotjs size={13} />;
      color = "#F16822";
    }
    return { name: t, layer: "api", icon, color };
  }

  // Data & Cloud Infrastructure Layer
  if (
    lower.includes("postgres") ||
    lower.includes("prisma") ||
    lower.includes("mongo") ||
    lower.includes("redis") ||
    lower.includes("firebase") ||
    lower.includes("sql") ||
    lower.includes("docker")
  ) {
    let icon: React.ReactNode = <Database size={13} />;
    let color = "#8b5cf6";
    if (lower.includes("postgres")) {
      icon = <SiPostgresql size={13} />;
      color = "#4169E1";
    } else if (lower.includes("prisma")) {
      icon = <SiPrisma size={13} />;
      color = "#2D3748";
    } else if (lower.includes("mongo")) {
      icon = <SiMongodb size={13} />;
      color = "#47A248";
    } else if (lower.includes("redis")) {
      icon = <SiRedis size={13} />;
      color = "#DC382D";
    } else if (lower.includes("firebase")) {
      icon = <SiFirebase size={13} />;
      color = "#FFCA28";
    } else if (lower.includes("docker")) {
      icon = <SiDocker size={13} />;
      color = "#2496ED";
    }
    return { name: t, layer: "data", icon, color };
  }

  return { name: t, layer: "other", icon: <Code2 size={13} />, color: "#64748b" };
};

const getCleanSlug = (url: string | undefined, title: string): string => {
  if (url && url !== "#" && url.trim().length > 0) {
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace(/^www\./, "");
    } catch {
      // Fallback below
    }
  }
  return `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.prod.io`;
};

// Tech Stack Chip
const TechChip = ({ tag }: { tag: string }) => {
  const meta = getTechMeta(tag);
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100/90 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:border-blue-500/50 transition-colors">
      <span
        style={{ color: meta.color === "#ffffff" ? undefined : meta.color }}
        className="text-slate-700 dark:text-slate-200"
      >
        {meta.icon}
      </span>
      <span>{meta.name}</span>
    </span>
  );
};

// =========================================================================
// 1. DUAL-PANE SHOWCASE CARD (Hero & Systems Architecture Layout)
// =========================================================================
const ProjectShowcaseCard = ({
  project,
  onSelect,
  index,
}: {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const [imageError, setImageError] = useState(false);

  const tagsArray = parseTags(project.tags);
  const techMetas = tagsArray.map(getTechMeta);

  const clientTechs = techMetas.filter((t) => t.layer === "client");
  const apiTechs = techMetas.filter((t) => t.layer === "api");
  const dataTechs = techMetas.filter((t) => t.layer === "data" || t.layer === "other");

  const hasLiveUrl =
    project.liveUrl && project.liveUrl !== "#" && project.liveUrl.trim().length > 0;
  const hasGithubUrl =
    project.githubUrl && project.githubUrl !== "#" && project.githubUrl.trim().length > 0;

  const displayDomain = getCleanSlug(project.liveUrl, project.title);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <Tilt3DCard maxTilt={4} scale={1.01} className="rounded-2xl">
        <div className="group rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md shadow-lg hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 grid lg:grid-cols-12 gap-0 relative">
          {/* Subtle Ambient Spotlight inside Card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Left Column: Interactive Terminal & Browser Frame Mockup */}
          <div className="lg:col-span-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800/80 bg-slate-900 text-slate-100 relative overflow-hidden">
            {/* macOS Browser Header Chrome */}
            <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800/90 flex items-center justify-between text-xs select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                <span className="text-[10px] font-mono text-slate-500 ml-1.5 hidden sm:inline">
                  SYS-{String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Mock Address Bar */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 max-w-[220px] sm:max-w-xs truncate">
                <Lock size={10} className="text-emerald-400 shrink-0" />
                <span className="text-slate-400">https://</span>
                <span className="text-slate-200 truncate">{displayDomain}</span>
              </div>

              {/* Status latency tag */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                {hasLiveUrl ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-radar-ripple absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="hidden sm:inline">LIVE</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="hidden sm:inline">CORE</span>
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Image Frame */}
            <div
              onClick={() => onSelect(project)}
              className="relative w-full h-64 sm:h-80 lg:h-full min-h-[280px] bg-slate-950 overflow-hidden cursor-pointer group/image"
            >
              {project.imageUrl && !imageError ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top group-hover/image:scale-105 transition-transform duration-700 ease-out"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-slate-500">
                  <Layers size={48} className="mb-3 opacity-40 text-blue-400" />
                  <span className="text-sm font-mono text-slate-400">{project.title}</span>
                  <span className="text-xs text-slate-600 mt-1">Full-Stack Architecture</span>
                </div>
              )}

              {/* Scanline Sweep Animation on Card Hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-12 bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 animate-project-scanline" />
              </div>

              {/* Badges Over Image */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10 pointer-events-none">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-slate-950/85 text-slate-200 border border-white/10 backdrop-blur-md shadow-sm">
                  {project.category}
                </span>
                {project.order === 0 && (
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-600/90 text-white backdrop-blur-md shadow-sm">
                    Featured System
                  </span>
                )}
              </div>

              {/* Click to Inspect Prompt */}
              <div className="absolute inset-0 bg-slate-950/0 group-hover/image:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover/image:opacity-100 translate-y-3 group-hover/image:translate-y-0 transition-all duration-300 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md border border-white/15 shadow-xl">
                  <Maximize2 size={13} />
                  <span>Inspect Architecture &amp; Specs</span>
                </span>
              </div>
            </div>

            {/* Bottom Status Bar in Browser Frame */}
            <div className="px-4 py-2.5 bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Radio size={12} className="text-blue-400" />
                <span>Protocol: HTTPS // REST / API</span>
              </span>
              <span className="text-slate-500">200 OK • 18ms</span>
            </div>
          </div>

          {/* Right Column: Systems Architecture Breakdown & Action Controls */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {project.category} Architecture
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Priority: #{project.order}
                </span>
              </div>

              {/* Title */}
              <h3
                onClick={() => onSelect(project)}
                className="text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer mb-3 leading-snug"
              >
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Full-Stack Strata Categorization */}
              <div className="space-y-3.5 mb-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                {/* Client / Interface */}
                {clientTechs.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                      01 · Interface &amp; Client
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {clientTechs.map((t) => (
                        <TechChip key={t.name} tag={t.name} />
                      ))}
                    </div>
                  </div>
                )}

                {/* API & Services */}
                {apiTechs.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                      02 · API &amp; Services
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {apiTechs.map((t) => (
                        <TechChip key={t.name} tag={t.name} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Data & Storage */}
                {dataTechs.length > 0 && (
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                      03 · Data &amp; Infrastructure
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dataTechs.map((t) => (
                        <TechChip key={t.name} tag={t.name} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-5 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {hasLiveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md hover:shadow-blue-500/25 transition-all"
                  >
                    <span>Launch Live App</span>
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 italic py-1.5">
                    Internal System
                  </span>
                )}

                {hasGithubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                  >
                    <Github size={14} />
                    <span>Repository</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => onSelect(project)}
                className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 hover:underline py-1.5"
              >
                <span>Specs &amp; Deep Dive</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </Tilt3DCard>
    </div>
  );
};

// =========================================================================
// 2. MATRIX GRID CARD (Compact Multi-Column Engineering View)
// =========================================================================
const ProjectGridCard = ({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
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
      <Tilt3DCard maxTilt={5} scale={1.015} className="rounded-2xl h-full">
        <div className="group rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md shadow-sm hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col h-full">
          {/* Terminal Top Bar */}
          <div className="px-4 py-2.5 bg-slate-900 text-slate-300 border-b border-slate-800 flex items-center justify-between text-xs select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/90" />
              <span className="w-2 h-2 rounded-full bg-amber-400/90" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/90" />
              <span className="text-[10px] font-mono text-slate-400 ml-1">
                {project.category}
              </span>
            </div>
            {hasLiveUrl ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </span>
            ) : (
              <span className="text-[10px] font-mono text-slate-400">INTERNAL</span>
            )}
          </div>

          {/* Thumbnail */}
          <div
            onClick={() => onSelect(project)}
            className="relative w-full h-52 sm:h-56 bg-slate-950 overflow-hidden cursor-pointer"
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
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-500">
                <Layers size={36} className="mb-2 opacity-40 text-blue-400" />
                <span className="text-xs font-mono text-slate-400">{project.title}</span>
              </div>
            )}

            {/* Scanline Sweep on hover */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-10 bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 animate-project-scanline" />
            </div>

            {/* Hover overlay prompt */}
            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/35 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-medium backdrop-blur-md border border-white/15 shadow-lg">
                <Maximize2 size={12} />
                <span>Inspect System</span>
              </span>
            </div>

            {/* Badges overlay */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
              {project.order === 0 && (
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wide uppercase bg-blue-600/90 text-white backdrop-blur-md shadow-sm">
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
                  className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer line-clamp-1"
                >
                  {project.title}
                </h3>
                <button
                  type="button"
                  onClick={() => onSelect(project)}
                  className="shrink-0 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline pt-0.5"
                >
                  Specs
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
                {project.description}
              </p>

              {/* Tech stack chips */}
              {tagsArray.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tagsArray.map((tag) => (
                    <TechChip key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </div>

            {/* Action links */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
              {hasLiveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                  Internal Core
                </span>
              )}

              {hasGithubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Github size={13} />
                  <span>Repository</span>
                </a>
              ) : (
                <span className="text-xs text-slate-400 dark:text-slate-500">Private Repo</span>
              )}
            </div>
          </div>
        </div>
      </Tilt3DCard>
    </div>
  );
};

// =========================================================================
// 3. MAIN SECTION COMPONENT
// =========================================================================
export const ProjectSection = () => {
  const [sectionRef, isSectionVisible] = useOnScreen({ threshold: 0.1 });
  const { publicProjectsPath, isAuthReady } = useFirebase();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Filter & Layout State
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [layoutMode, setLayoutMode] = useState<"showcase" | "grid">("showcase");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<"overview" | "strata" | "deployment">("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Real-time Firestore sync
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

  // Filter projects by category and search keyword
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category match
      const categoryMatch =
        selectedCategory === "All" || project.category === selectedCategory;
      if (!categoryMatch) return false;

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const titleMatch = project.title.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const tagsMatch =
        typeof project.tags === "string"
          ? project.tags.toLowerCase().includes(q)
          : Array.isArray(project.tags) &&
            project.tags.some((t) => t.toLowerCase().includes(q));

      return titleMatch || descMatch || tagsMatch;
    });
  }, [projects, selectedCategory, searchQuery]);

  // Operational metrics
  const liveCount = useMemo(
    () =>
      projects.filter(
        (p) => p.liveUrl && p.liveUrl !== "#" && p.liveUrl.trim().length > 0
      ).length,
    [projects]
  );

  const numberOfSkeletons = layoutMode === "showcase" ? 3 : 6;

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      id="projects"
      className="relative z-10 py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-800/60"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header & Architectural Subtitle */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
              <span>SYSTEMS &amp; ARCHITECTURE // 04 PRODUCTION PLATFORMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 mb-4">
              Featured Full-Stack Engineering Systems
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Production web applications, low-latency messaging platforms, and distributed microservices managed live through my administrative control plane.
            </p>
          </div>
        </AnimatedSection>

        {/* Operational Status & Metrics Bar */}
        <AnimatedSection className="mb-10">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-sm shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-700 dark:text-slate-300 font-semibold">
                  Control Plane: Active Sync
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Cpu size={14} className="text-blue-500" />
                <span>
                  Total Systems: <strong className="text-slate-900 dark:text-white font-mono">{projects.length}</strong>
                </span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Radio size={14} className="text-emerald-500" />
                <span>
                  Live Deployments: <strong className="text-slate-900 dark:text-white font-mono">{liveCount}</strong>
                </span>
              </div>
            </div>

            <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>View Mode:</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">
                {layoutMode === "showcase" ? "Dual-Pane Showcase" : "Matrix Grid"}
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Interactive Controls Bar: Category Tabs + Search + View Switcher */}
        <AnimatedSection className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 self-stretch sm:self-auto overflow-x-auto">
            {categories.map((category) => {
              const count =
                category === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>{category}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Tools: Tech Search + Layout Toggle */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by tech (e.g. Next.js, Node.js)..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Layout Mode Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setLayoutMode("showcase")}
                aria-label="Dual-Pane Showcase View"
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === "showcase"
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Dual-Pane Architectural Showcase"
              >
                <SlidersHorizontal size={16} />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("grid")}
                aria-label="Matrix Grid View"
                className={`p-2 rounded-lg transition-colors ${
                  layoutMode === "grid"
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Matrix Grid View"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Error State */}
        {fetchError && (
          <div className="max-w-md mx-auto p-4 mb-8 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 flex items-center gap-3 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <span>{fetchError}</span>
          </div>
        )}

        {/* Active Search/Filter Pill if search is active */}
        {searchQuery && (
          <div className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Filtered results for &ldquo;{searchQuery}&rdquo;:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {filteredProjects.length} systems found
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-600 dark:text-blue-400 underline hover:no-underline ml-2"
            >
              Reset filter
            </button>
          </div>
        )}

        {/* Project Rendering & Loading Skeletons */}
        {isSectionVisible ? (
          <div>
            {loading ? (
              <div
                className={
                  layoutMode === "showcase"
                    ? "space-y-12"
                    : "grid md:grid-cols-2 gap-8"
                }
              >
                {Array.from({ length: numberOfSkeletons }).map((_, index) => (
                  <ProjectCardSkeleton key={index} layoutMode={layoutMode} />
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div
                key={`${selectedCategory}-${layoutMode}-${searchQuery}`}
                className={
                  layoutMode === "showcase"
                    ? "space-y-12"
                    : "grid md:grid-cols-2 gap-8"
                }
              >
                {filteredProjects.map((project, index) =>
                  layoutMode === "showcase" ? (
                    <ProjectShowcaseCard
                      key={project.id}
                      project={project}
                      index={index}
                      onSelect={(p) => {
                        setSelectedProject(p);
                        setModalTab("overview");
                      }}
                    />
                  ) : (
                    <ProjectGridCard
                      key={project.id}
                      project={project}
                      onSelect={(p) => {
                        setSelectedProject(p);
                        setModalTab("overview");
                      }}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="text-center py-20 px-6 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800">
                <Layers size={40} className="mx-auto mb-3 text-slate-400 opacity-60" />
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  No systems matching category &ldquo;{selectedCategory}&rdquo;
                  {searchQuery ? ` and query "${searchQuery}"` : ""}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Try adjusting your search query or switch categories to explore other production systems.
                </p>
                {(selectedCategory !== "All" || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 flex flex-col items-center justify-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping mb-1" />
            <p className="text-sm font-medium tracking-wide">
              Scroll down to inspect production systems &amp; architecture.
            </p>
          </div>
        )}
      </div>

      {/* =========================================================================
          4. INTERACTIVE ARCHITECTURE CASE STUDY MODAL
          ========================================================================= */}
      {mounted &&
        selectedProject &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            {/* Backdrop */}
            <div
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-fadeIn"
            />

            {/* Modal Container */}
            <div className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden bg-white dark:bg-[#0f172a] border border-slate-200/90 dark:border-slate-800 shadow-2xl max-h-[90vh] flex flex-col animate-card-enter my-auto">
            {/* Modal Browser Header */}
            <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                <span className="font-mono text-slate-400 ml-2 text-[11px] hidden sm:inline">
                  ARCH-INSPECTOR // {selectedProject.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {selectedProject.category}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project modal"
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Top Project Preview Banner */}
            <div className="relative w-full h-56 sm:h-64 bg-slate-950 shrink-0">
              {selectedProject.imageUrl ? (
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                  <Layers size={48} className="opacity-40 text-blue-400 mb-2" />
                  <span className="text-xs font-mono">{selectedProject.title}</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-blue-400">
                    System Architecture
                  </span>
                  <h3
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5"
                  >
                    {selectedProject.title}
                  </h3>
                </div>

                {selectedProject.order === 0 && (
                  <span className="shrink-0 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Modal Tabs Bar */}
            <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center gap-4 text-xs font-mono">
              <button
                type="button"
                onClick={() => setModalTab("overview")}
                className={`py-3 border-b-2 font-semibold transition-colors ${
                  modalTab === "overview"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                01 · System Overview
              </button>
              <button
                type="button"
                onClick={() => setModalTab("strata")}
                className={`py-3 border-b-2 font-semibold transition-colors ${
                  modalTab === "strata"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                02 · Tech Strata
              </button>
              <button
                type="button"
                onClick={() => setModalTab("deployment")}
                className={`py-3 border-b-2 font-semibold transition-colors ${
                  modalTab === "deployment"
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                03 · Links &amp; Verification
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700 dark:text-slate-300">
              {modalTab === "overview" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-400">
                    System Description &amp; Engineering Focus
                  </h4>
                  <p className="text-base leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">
                    {selectedProject.description}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 grid sm:grid-cols-3 gap-4 text-xs font-mono mt-6">
                    <div>
                      <span className="block text-slate-400">Category:</span>
                      <strong className="text-slate-900 dark:text-white">
                        {selectedProject.category}
                      </strong>
                    </div>
                    <div>
                      <span className="block text-slate-400">Execution:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        Production Ready
                      </strong>
                    </div>
                    <div>
                      <span className="block text-slate-400">Control Sync:</span>
                      <strong className="text-blue-600 dark:text-blue-400">
                        Admin Live
                      </strong>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "strata" && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-400">
                    Architectural Stack Breakdown
                  </h4>

                  <div className="grid gap-4">
                    {/* Client Strata */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers size={16} className="text-blue-500" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                          Client &amp; Presentation
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {parseTags(selectedProject.tags)
                          .map(getTechMeta)
                          .filter((t) => t.layer === "client")
                          .map((t) => (
                            <TechChip key={t.name} tag={t.name} />
                          ))}
                      </div>
                    </div>

                    {/* API & Services */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Server size={16} className="text-emerald-500" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                          API &amp; Business Services
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {parseTags(selectedProject.tags)
                          .map(getTechMeta)
                          .filter((t) => t.layer === "api")
                          .map((t) => (
                            <TechChip key={t.name} tag={t.name} />
                          ))}
                      </div>
                    </div>

                    {/* Data Layer */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Database size={16} className="text-purple-500" />
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                          Data Persistence &amp; Cloud Infra
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {parseTags(selectedProject.tags)
                          .map(getTechMeta)
                          .filter((t) => t.layer === "data" || t.layer === "other")
                          .map((t) => (
                            <TechChip key={t.name} tag={t.name} />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {modalTab === "deployment" && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-400">
                    Deployment Verification &amp; Code Links
                  </h4>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="block text-xs font-bold text-slate-900 dark:text-white">
                          Live Endpoint
                        </span>
                        <span className="text-xs font-mono text-slate-500 truncate max-w-sm block">
                          {selectedProject.liveUrl && selectedProject.liveUrl !== "#"
                            ? selectedProject.liveUrl
                            : "Internal Architecture (No public preview)"}
                        </span>
                      </div>
                      {selectedProject.liveUrl && selectedProject.liveUrl !== "#" ? (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5"
                        >
                          <span>Visit</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">Private</span>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="block text-xs font-bold text-slate-900 dark:text-white">
                          Source Repository
                        </span>
                        <span className="text-xs font-mono text-slate-500 truncate max-w-sm block">
                          {selectedProject.githubUrl && selectedProject.githubUrl !== "#"
                            ? selectedProject.githubUrl
                            : "Proprietary / Private Codebase"}
                        </span>
                      </div>
                      {selectedProject.githubUrl && selectedProject.githubUrl !== "#" ? (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Github size={13} />
                          <span>View Code</span>
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-slate-400">Internal</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/40">
              <div className="flex items-center gap-2">
                {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
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
                {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <Github size={14} />
                    <span>Source Code</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                Close (ESC)
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};