"use client";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AnimatedSection from "./AnimatedSection";

interface ProjectCardSkeletonProps {
  layoutMode?: "showcase" | "grid";
}

const ProjectCardSkeleton = ({ layoutMode = "grid" }: ProjectCardSkeletonProps) => {
  return (
    <AnimatedSection className="h-full">
      <SkeletonTheme
        baseColor="var(--skeleton-base, #e2e8f0)"
        highlightColor="var(--skeleton-highlight, #f1f5f9)"
      >
        {layoutMode === "showcase" ? (
          <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm grid lg:grid-cols-12 gap-0">
            {/* Left Browser Mockup Skeleton */}
            <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton circle width={10} height={10} />
                <Skeleton circle width={10} height={10} />
                <Skeleton circle width={10} height={10} />
                <div className="flex-1 ml-2">
                  <Skeleton height={20} borderRadius={6} />
                </div>
              </div>
              <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden">
                <Skeleton height="100%" borderRadius={12} style={{ display: "block" }} />
              </div>
            </div>

            {/* Right Architecture Specs Skeleton */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton width={80} height={22} borderRadius={6} />
                  <Skeleton width={70} height={22} borderRadius={6} />
                </div>
                <Skeleton height={32} width="85%" className="mb-4" />
                <div className="space-y-2 mb-6">
                  <Skeleton height={14} count={4} />
                </div>
                {/* Tech strata skeleton */}
                <div className="space-y-3 mb-6">
                  <Skeleton height={26} borderRadius={8} />
                  <Skeleton height={26} borderRadius={8} />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <Skeleton width={110} height={36} borderRadius={10} />
                <Skeleton width={110} height={36} borderRadius={10} />
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm flex flex-col h-full">
            {/* Terminal Top Bar Skeleton */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Skeleton circle width={8} height={8} />
                <Skeleton circle width={8} height={8} />
                <Skeleton circle width={8} height={8} />
              </div>
              <Skeleton width={80} height={14} borderRadius={4} />
            </div>

            {/* Thumbnail skeleton */}
            <div className="w-full h-52 sm:h-56">
              <Skeleton height="100%" borderRadius={0} style={{ display: "block" }} />
            </div>

            {/* Content skeleton */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                {/* Category & order badge skeleton */}
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton width={70} height={20} borderRadius={6} />
                  <Skeleton width={60} height={20} borderRadius={6} />
                </div>

                {/* Title skeleton */}
                <Skeleton height={26} width="80%" className="mb-3" />

                {/* Description skeleton */}
                <div className="space-y-1.5 mb-6">
                  <Skeleton height={14} count={3} />
                </div>

                {/* Tags skeleton */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <Skeleton width={64} height={22} borderRadius={6} />
                  <Skeleton width={80} height={22} borderRadius={6} />
                  <Skeleton width={56} height={22} borderRadius={6} />
                </div>
              </div>

              {/* Action buttons skeleton */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <Skeleton width={96} height={32} borderRadius={8} />
                <Skeleton width={96} height={32} borderRadius={8} />
              </div>
            </div>
          </div>
        )}
      </SkeletonTheme>
    </AnimatedSection>
  );
};

export default ProjectCardSkeleton;