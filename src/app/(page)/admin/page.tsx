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
  const [currentProject, setCurrentProject] = useState<Omit<Project, 'id' | 'order'>>({
    title: '', description: '', category: 'Frontend', imageUrl: '', liveUrl: '', githubUrl: '', tags: '',
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
      docs.sort((a, b) => a.order - b.order);
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

      if (editingId) {
        await updateDoc(doc(collectionRef, editingId), { ...currentProject, imageUrl: finalImageUrl, tags: preparedTags });
        toast.success('Project updated.');
      } else {
        await addDoc(collectionRef, { ...currentProject, imageUrl: finalImageUrl, tags: preparedTags, order: projects.length });
        toast.success('Project added.');
      }
      resetForm();
    } catch (error: any) {
      toast.error(error.message);
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
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleReorder = async (updatedProjects: Project[]) => {
    setProjects(updatedProjects); // Optimistic UI update
    try {
      const batch = writeBatch(db);
      updatedProjects.forEach((proj, index) => {
        batch.update(doc(db, publicProjectsPath!, proj.id), { order: index });
      });
      await batch.commit();
      toast.success('Reordered successfully.');
    } catch (error: any) {
      toast.error('Failed to save order.');
    }
  };

  const resetForm = () => {
    setCurrentProject({ title: '', description: '', category: 'Frontend', githubUrl: '', liveUrl: '', tags: '', imageUrl: '' });
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
        <div className="flex justify-around items-center mb-8 ">
            <h1 className="text-3xl  md:text-4xl font-bold text-slate-800 dark:text-slate-100">Admin Panel</h1>
            <Link href="/home" className="text-blue-600 dark:text-blue-400 hover:underline">← Back to Portfolio</Link>
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
            <h2 className="text-2xl font-semibold text- max-w-5xl mx-auto mb-4 text-slate-700 dark:text-slate-200">Projects List</h2>
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