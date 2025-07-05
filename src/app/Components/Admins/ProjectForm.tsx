
// // ===================================================================
// // FILE 2: /src/app/Components/Admins/ProjectForm.tsx
// // This is the component for your form.
// // ===================================================================
// import React, { FC, ChangeEvent, FormEvent } from 'react';
// import { Project } from '@/app/Data/initialData';

// type ProjectFormData = Omit<Project, 'id' | 'order'>;

// interface ProjectFormProps {
//   onSubmit: (e: FormEvent) => void;
//   currentProject: ProjectFormData;
//   setCurrentProject: React.Dispatch<React.SetStateAction<ProjectFormData>>;
//   setImageFile: (file: File | null) => void;
//   isLoading: boolean;
//   isEditing: boolean;
//   onCancel: () => void;
// }

// const ProjectForm: FC<ProjectFormProps> = ({ onSubmit, currentProject, setCurrentProject, setImageFile, isLoading, isEditing, onCancel }) => {
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setCurrentProject(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg mb-12 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
//       <form onSubmit={onSubmit} className="space-y-4">
//         <input type="text" name="title" value={currentProject.title} onChange={handleInputChange} placeholder="Project Title" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
//         <div>
//           <label htmlFor="imageUpload" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
//             {isEditing && currentProject.imageUrl ? 'Upload New Image (Optional)' : 'Upload Project Image'}
//           </label>
//           <input type="file" id="imageUpload" name="imageFile" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" className="w-full p-2 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
//         </div>
//         <textarea name="description" value={currentProject.description} onChange={handleInputChange} placeholder="Description" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-32"></textarea>
//         <div className="grid md:grid-cols-2 gap-4">
//           <select name="category" value={currentProject.category} onChange={handleInputChange} className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
//             <option value="Frontend">Frontend</option>
//             <option value="Backend">Backend</option>
//           </select>
//           <input type="text" name="tags" value={currentProject.tags} onChange={handleInputChange} placeholder="Tags (comma-separated)" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md" />
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           <input type="text" name="liveUrl" value={currentProject.liveUrl} onChange={handleInputChange} placeholder="Live Demo URL" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md" />
//           <input type="text" name="githubUrl" value={currentProject.githubUrl} onChange={handleInputChange} placeholder="GitHub URL" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md" />
//         </div>
//         <div className="flex items-center gap-4">
//           <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-400">{isLoading ? 'Saving...' : 'Save Project'}</button>
//           {isEditing && <button type="button" onClick={onCancel} className="bg-slate-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-slate-600">Cancel Edit</button>}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProjectForm;


import React, { FC, ChangeEvent, FormEvent } from 'react';
import { Project } from '@/app/Data/initialData';

// The form now deals with the full Project type (minus id)
type ProjectFormData = Omit<Project, 'id'>;

interface ProjectFormProps {
  onSubmit: (e: FormEvent) => void;
  currentProject: ProjectFormData;
  setCurrentProject: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  setImageFile: (file: File | null) => void;
  isLoading: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const ProjectForm: FC<ProjectFormProps> = ({ onSubmit, currentProject, setCurrentProject, setImageFile, isLoading, isEditing, onCancel }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCurrentProject(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg mb-12 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input type="text" name="title" value={currentProject.title} onChange={handleInputChange} placeholder="Project Title" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
        <div>
          <label htmlFor="imageUpload" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {isEditing && currentProject.imageUrl ? 'Upload New Image (Optional)' : 'Upload Project Image'}
          </label>
          <input type="file" id="imageUpload" name="imageFile" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif" className="w-full p-2 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        </div>
        <textarea name="description" value={currentProject.description} onChange={handleInputChange} placeholder="Description" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-32"></textarea>
        <div className="grid md:grid-cols-2 gap-4">
          <select name="category" value={currentProject.category} onChange={handleInputChange} className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
          <input type="text" name="tags" value={currentProject.tags} onChange={handleInputChange} placeholder="Tags (comma-separated)" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" name="liveUrl" value={currentProject.liveUrl} onChange={handleInputChange} placeholder="Live Demo URL" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md" />
          <input type="text" name="githubUrl" value={currentProject.githubUrl} onChange={handleInputChange} placeholder="GitHub URL" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md" />
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-400">{isLoading ? 'Saving...' : 'Save Project'}</button>
          {isEditing && <button type="button" onClick={onCancel} className="bg-slate-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-slate-600">Cancel Edit</button>}
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;