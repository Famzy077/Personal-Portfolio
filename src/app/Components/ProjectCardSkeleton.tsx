import React from 'react';
import Skeleton from 'react-loading-skeleton';
import AnimatedSection from './AnimatedSection';

const ProjectCardSkeleton = () => {
    return (
        <AnimatedSection>
        <div className="bg-white dark:bg-zinc-300 rounded-xl shadow-md pt-0 overflow-hidden">
            <Skeleton height={224} className="mb-4 mt-0 bg-slate-600" />
            <div className="p-4">
                <Skeleton height={24} className="mb-2" />
                <Skeleton count={3} className="mb-4" />
                <Skeleton height={20} width={100} className="mb-4" />
                <div className="flex space-x-4">
                    <Skeleton height={24} width={100} />
                    <Skeleton height={24} width={100} />
                </div>
            </div>
        </div>
        </AnimatedSection>
    );
};
export default ProjectCardSkeleton;