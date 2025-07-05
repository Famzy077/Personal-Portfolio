import React, { FC, useMemo } from 'react';
import Image from 'next/image';
import { Project } from '@/app/Data/initialData';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Individual Draggable Item
const SortableProjectItem: FC<{ project: Project; onEdit: () => void; onDelete: () => void; }> = ({ project, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-lg flex justify-between items-center touch-none">
      <div className='flex items-center gap-4'>
        <div {...listeners} className="w-6 text-center text-slate-400 cursor-grab">☰</div>
        <Image className="rounded-lg object-cover" src={project.imageUrl} height={60} width={80} alt={project.title} />
        <p className="font-bold text-slate-800 dark:text-slate-200">{project.title}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600">Edit</button>
        <button onClick={onDelete} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Delete</button>
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

const ProjectList: FC<ProjectListProps> = ({ projects, onReorder, onEdit, onDelete }) => {
  const projectIds = useMemo(() => projects.map(p => p.id), [projects]);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

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
      <div className="text-center bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <p className="text-slate-500 dark:text-slate-400">No projects found. Add one using the form above.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={projectIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {projects.map(project => (
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
