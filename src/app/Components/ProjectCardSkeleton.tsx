"use client";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AnimatedSection from "./AnimatedSection";

const ProjectCardSkeleton = () => {
  return (
    <AnimatedSection className="h-full">
      <SkeletonTheme
        baseColor="var(--skeleton-base, #e2e8f0)"
        highlightColor="var(--skeleton-highlight, #f1f5f9)"
      >
        <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm flex flex-col h-full">
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
      </SkeletonTheme>
    </AnimatedSection>
  );
};

export default ProjectCardSkeleton;