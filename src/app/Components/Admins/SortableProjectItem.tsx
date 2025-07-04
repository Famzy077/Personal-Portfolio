'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { Project } from '@/app/Data/initialData';

type Props = {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
};

const SortableProjectItem = ({ project, onEdit, onDelete }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md flex justify-between items-center"
    >
      <div className="flex items-center gap-4">
        <div className="text-gray-400 cursor-move">☰</div>
        <Image src={project.imageUrl} width={60} height={60} alt={project.title} className="rounded-md object-cover" />
        <div>
          <p className="font-semibold text-slate-800 dark:text-white">{project.title}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(project)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
        <button onClick={() => onDelete(project.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  );
};

export default SortableProjectItem;
