'use client';
import React, { useState, useEffect, FormEvent } from 'react';
import { collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { useFirebase } from '../../contexts/FirebaseProvider';
import { Project } from '@/app/Data/initialData';
import ProjectForm from '../../Components/Admins/ProjectForm';
import ProjectList from '../../Components/Admins/ProjectList';
import toast from 'react-hot-toast';
import Link from 'next/link';

const AdminPage = () => {
  const { publicProjectsPath, isAuthReady } = useFirebase();
  const [projects, setProjects] = useState<Project[]>([]);
  // Include 'order' in the initial state for type consistency
  const [currentProject, setCurrentProject] = useState<Omit<Project, 'id'>>({
    title: '', description: '', category: 'Frontend', imageUrl: '', liveUrl: '', githubUrl: '', tags: '', order: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  useEffect(() => {
    if (!isAuthReady || !publicProjectsPath) return;

    const unsubscribe = onSnapshot(collection(db, publicProjectsPath), (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
      // Safely sort the projects, treating missing 'order' as a large number to place it at the end
      docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      setProjects(docs);
    });
    return () => unsubscribe();
  }, [isAuthReady, publicProjectsPath]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentProject.title) return toast.error('Project title is required.');
    if (!editingId && !imageFile) return toast.error('Image is required for new projects.');

    setIsLoading(true);
    try {
      let finalImageUrl = currentProject.imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || 'Image upload failed.');
        finalImageUrl = data.secure_url;
        toast.success('Image uploaded.');
      }

      const preparedTags = Array.isArray(currentProject.tags) ? currentProject.tags : currentProject.tags.split(',').map((tag) => tag.trim());
      const collectionRef = collection(db, publicProjectsPath!);
      
      const projectData = {
          ...currentProject,
          imageUrl: finalImageUrl,
          tags: preparedTags,
          order: Number(currentProject.order) || 0,
      };

      if (editingId) {
        await updateDoc(doc(collectionRef, editingId), projectData);
        toast.success('Project updated.');
      } else {
        projectData.order = projects.length;
        await addDoc(collectionRef, projectData);
        toast.success('Project added.');
      }
      resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setCurrentProject({
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, publicProjectsPath!, id));
      toast.success('Project deleted.');
    } catch (err: unknown) {
       if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unknown error occurred during deletion.');
      }
    }
  };

  const handleReorder = async (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    try {
      const batch = writeBatch(db);
      updatedProjects.forEach((proj, index) => {
        batch.update(doc(db, publicProjectsPath!, proj.id), { order: index });
      });
      await batch.commit();
      toast.success('Reordered successfully.');
    } catch (error: unknown) {
      toast.error('Failed to save order.');
      console.error(error);
    }
  };

  const resetForm = () => {
    setCurrentProject({ title: '', description: '', category: 'Frontend', githubUrl: '', liveUrl: '', tags: '', imageUrl: '', order: 0 });
    setImageFile(null);
    setEditingId(null);
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  if (!isAuthReady) {
    return <div className="flex justify-center items-center min-h-screen"><p className="text-xl">Initializing Admin Panel...</p></div>;
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-slate-100 dark:bg-slate-950">
      <div className='flex mx-auto max-w-4xl justify-between mb-4 items-end'>
        <h1 className="text-3xl max-sm:text-xl max-sm:font-semibold font-bold text-slate-800 dark:text-slate-100">Admin Dashboard</h1>
        <p className='text-sm to-blue-700'><Link href='/home'>← Back to home</Link></p>
      </div>
      <ProjectForm
        onSubmit={handleFormSubmit}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        setImageFile={setImageFile}
        isLoading={isLoading}
        isEditing={!!editingId}
        onCancel={resetForm}
      />
      <div className="mt-12">
        <h2 className="text-2xl max-w-4xl mx-auto font-semibold mb-4 text-slate-700 dark:text-slate-200">Projects List</h2>
        <ProjectList
          projects={projects}
          onReorder={handleReorder}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminPage;