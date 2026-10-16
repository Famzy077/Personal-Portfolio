"use client";
import React, { FC, useMemo } from "react";
import Image from "next/image";
import { Project } from "@/app/Data/initialData";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2, Layers } from "lucide-react";

// Individual Draggable Item
const SortableProjectItem: FC<{
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ project, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 ${
        isDragging
          ? "bg-blue-50 dark:bg-slate-800 border-blue-500 shadow-xl opacity-80 z-20"
          : "bg-white dark:bg-[#0f172a] border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Drag handle */}
        <button
          {...listeners}
          type="button"
          aria-label="Reorder project"
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-grab active:cursor-grabbing touch-none transition-colors"
        >
          <GripVertical size={18} />
        </button>

        {/* Thumbnail preview */}
        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <Layers size={18} />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="min-w-0">
          <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
            {project.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {project.category}
            </span>
            {project.order === 0 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                #1 Featured
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
        >
          <Pencil size={13} />
          <span className="hidden sm:inline">Edit</span>
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900 hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors"
        >
          <Trash2 size={13} />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
};

// The Main List Component
interface ProjectListProps {
  projects: Project[];
  onReorder: (projects: Project[]) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectList: FC<ProjectListProps> = ({
  projects,
  onReorder,
  onEdit,
  onDelete,
}) => {
  const projectIds = useMemo(() => projects.map((p) => p.id), [projects]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = projectIds.indexOf(active.id as string);
      const newIndex = projectIds.indexOf(over.id as string);
      onReorder(arrayMove(projects, oldIndex, newIndex));
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center bg-white dark:bg-[#0f172a] p-10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 max-w-4xl mx-auto">
        <Layers size={36} className="mx-auto mb-2 text-slate-400" />
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          No projects found.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Add your first project using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={projectIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {projects.map((project) => (
              <SortableProjectItem
                key={project.id}
                project={project}
                onEdit={() => onEdit(project)}
                onDelete={() => onDelete(project.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ProjectList;
