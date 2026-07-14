import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import AnimatedSection from './AnimatedSection';

const ProjectCardSkeleton = () => {
    return (
        <AnimatedSection>
            <SkeletonTheme
                baseColor="var(--skeleton-base)"
                highlightColor="var(--skeleton-highlight)"
            >
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden">
                    <Skeleton height={224} style={{ display: 'block', lineHeight: 1 }} />
                    <div className="p-6 lg:h-[17rem] flex flex-col">
                        <Skeleton height={24} width="75%" className="mb-2" />
                        <div className="mb-4 flex-1">
                            <Skeleton count={2} />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Skeleton height={24} width={64} borderRadius={999} />
                            <Skeleton height={24} width={80} borderRadius={999} />
                            <Skeleton height={24} width={56} borderRadius={999} />
                        </div>
                        <div className="flex items-center justify-between">
                            <Skeleton height={20} width={100} />
                            <Skeleton height={20} width={80} />
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        </AnimatedSection>
    );
};

export default ProjectCardSkeleton;