import React, { FC, ChangeEvent, FormEvent } from "react";
import { Project } from "@/app/Data/initialData";
import { Plus, Check, X } from "lucide-react";

type ProjectFormData = Omit<Project, "id">;

interface ProjectFormProps {
  onSubmit: (e: FormEvent) => void;
  currentProject: ProjectFormData;
  setCurrentProject: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  setImageFile: (file: File | null) => void;
  isLoading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const ProjectForm: FC<ProjectFormProps> = ({
  onSubmit,
  currentProject,
  setCurrentProject,
  setImageFile,
  isLoading,
  isEditing,
  onCancel,
}) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setCurrentProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-md mb-12 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {isEditing ? "Edit Project" : "Add New Project"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage projects displayed live on your public portfolio
          </p>
        </div>
        {isEditing && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
            Editing Mode
          </span>
        )}
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={currentProject.title}
            onChange={handleInputChange}
            placeholder="e.g. QikTalk Real-Time Platform"
            required
            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Image upload */}
        <div>
          <label
            htmlFor="imageUpload"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5"
          >
            {isEditing && currentProject.imageUrl
              ? "Replace Image (Optional)"
              : "Project Thumbnail *"}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              id="imageUpload"
              name="imageFile"
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/gif"
              className="w-full p-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-950 dark:file:text-blue-300 hover:file:bg-blue-100 transition-colors"
            />
          </div>
          {currentProject.imageUrl && (
            <p className="text-[11px] font-mono text-slate-400 mt-1 truncate">
              Current URL: {currentProject.imageUrl}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Description *
          </label>
          <textarea
            name="description"
            value={currentProject.description}
            onChange={handleInputChange}
            placeholder="Describe architecture, technologies, problem solved, and key features..."
            required
            rows={4}
            className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 resize-y"
          />
        </div>

        {/* Category & Tags */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={currentProject.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white outline-none transition-all"
            >
              <option value="Frontend">Frontend</option>
              <option value="Mobile">Mobile</option>
              <option value="Backend">Backend</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Technologies / Tags (comma-separated)
            </label>
            <input
              type="text"
              name="tags"
              value={currentProject.tags}
              onChange={handleInputChange}
              placeholder="e.g. Next.js, TypeScript, PostgreSQL"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Live URL & GitHub URL */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Live Demo URL
            </label>
            <input
              type="text"
              name="liveUrl"
              value={currentProject.liveUrl}
              onChange={handleInputChange}
              placeholder="https://..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              GitHub Repository URL
            </label>
            <input
              type="text"
              name="githubUrl"
              value={currentProject.githubUrl}
              onChange={handleInputChange}
              placeholder="https://github.com/..."
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold text-sm transition-all shadow-sm hover:shadow"
          >
            {isLoading ? (
              <span>Saving Project...</span>
            ) : isEditing ? (
              <>
                <Check size={16} />
                <span>Update Project</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add Project</span>
              </>
            )}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors"
            >
              <X size={15} />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;