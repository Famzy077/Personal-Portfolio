'use client'
import React, { useState, useEffect, FC, ChangeEvent, FormEvent } from 'react';
import { collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // <-- Import storage functions
import { useFirebase } from '../../contexts/FirebaseProvider';
import { db, storage } from '../../firebase'; // <-- Import storage instance
import { initialProjectsData, Project } from '../../Data/initialData';
import Link from 'next/link';
import Image from 'next/image';

const AdminPage: FC = () => {
    // Destructure all needed values from the context
    const { projectsCollectionPath, isAuthReady, userId } = useFirebase();
    const [projects, setProjects] = useState<Project[]>([]);
    const [currentProject, setCurrentProject] = useState<Omit<Project, 'id'>>({ title: '', description: '', category: 'Frontend', imageUrl: '', liveUrl: '', githubUrl: '', tags: '' });
    const [imageFile, setImageFile] = useState<File | null>(null); // <-- Add state for the file
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    
    useEffect(() => {
        if (!isAuthReady || !projectsCollectionPath) return;

        const projectsCollection = collection(db, projectsCollectionPath);
        const unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
            const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
            setProjects(projectsData);
        }, (error) => {
             console.error("AdminPage Snapshot listener error:", error);
        });
        return () => unsubscribe();
    }, [projectsCollectionPath, isAuthReady]);

    // Specific handler for the file input
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentProject(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!currentProject.title) {
            setMessage("Title is required.");
            return;
        }
        // When creating a new project, an image is required
        if (!editingId && !imageFile) {
            setMessage("An image is required for new projects.");
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            if (!projectsCollectionPath) throw new Error("Collection path is not available.");
            
            let imageUrl = currentProject.imageUrl;

            // If a new image file is selected, upload it first
            if (imageFile) {
                setMessage('Uploading image...');
                // Use userId to create a user-specific folder in storage
                const storageRef = ref(storage, `projects/${userId}/${Date.now()}_${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
                setMessage('Image uploaded! Saving project...');
            }

            // Create the final data object with the correct imageUrl
            const projectData = { ...currentProject, imageUrl };
            const projectsCollection = collection(db, projectsCollectionPath);

            if (editingId) {
                const projectDoc = doc(db, projectsCollectionPath, editingId);
                await updateDoc(projectDoc, projectData);
                setMessage("Project updated successfully!");
            } else {
                await addDoc(projectsCollection, projectData);
                setMessage("Project added successfully!");
            }
            resetForm();
        } catch (error) {
            console.error("Error saving project:", error);
            setMessage(`Error: ${(error as Error).message}`);
        }
        setIsLoading(false);
    };
    
    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setCurrentProject({ ...project, tags: Array.isArray(project.tags) ? project.tags.join(', ') : project.tags });
        setImageFile(null); // Clear any selected file when starting an edit
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                if (!projectsCollectionPath) throw new Error("Collection path is not available.");
                const projectDoc = doc(db, projectsCollectionPath, id);
                await deleteDoc(projectDoc);
                setMessage("Project deleted.");
            } catch (error) {
                console.error("Error deleting project:", error);
                setMessage(`Error: ${(error as Error).message}`);
            }
        }
    };
    
    const resetForm = () => {
        setEditingId(null);
        setCurrentProject({ title: '', description: '', category: 'Frontend', imageUrl: '', liveUrl: '', githubUrl: '', tags: '' });
        setImageFile(null);
        // Reset the file input visually
        const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleUploadInitialData = async () => {
        setIsLoading(true);
        setMessage("Uploading initial data...");
        try {
            if (!projectsCollectionPath) throw new Error("Collection path is not available.");
            for (const project of initialProjectsData) {
                const projectDoc = doc(db, projectsCollectionPath, project.id);
                await setDoc(projectDoc, project);
            }
            setMessage("Initial data uploaded successfully!");
        } catch (error) {
            console.error("Error uploading initial data:", error);
            setMessage(`Error: ${(error as Error).message}`);
        }
        setIsLoading(false);
    };

    if (!isAuthReady) {
        return (
             <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl">Initializing Admin Panel...</p>
            </div>
        )
    }

    return (
        <div className="bg-slate-100 dark:bg-slate-950 min-h-screen">
            <div className="lg:container mx-auto px-6 py-24">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Admin Panel</h1>
                    <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">← Back to Portfolio</Link>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <input type="text" name="title" value={currentProject.title} onChange={handleInputChange} placeholder="Project Title" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                        
                        {/* Corrected File Input */}
                        <div>
                            <label htmlFor="imageUpload" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                {editingId && currentProject.imageUrl ? 'Upload New Image (Optional)' : 'Upload Project Image'}
                            </label>
                            <input 
                                type="file" 
                                id="imageUpload"
                                name="imageFile" 
                                onChange={handleFileChange} // Use the specific file handler
                                className="w-full p-2 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                             {editingId && currentProject.imageUrl && !imageFile && (
                                <div className="mt-2 text-sm text-slate-500">
                                    Current image: <a href={currentProject.imageUrl} target="_blank" rel="noopener noreferrer" className="underline">View</a>
                                </div>
                            )}
                        </div>

                        <textarea name="description" value={currentProject.description} onChange={handleInputChange} placeholder="Description" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none h-32"></textarea>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                            <select name="category" value={currentProject.category} onChange={handleInputChange} className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                            </select>
                            <input type="text" name="tags" value={currentProject.tags as string} onChange={handleInputChange} placeholder="Tags (comma-separated)" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input type="text" name="liveUrl" value={currentProject.liveUrl} onChange={handleInputChange} placeholder="Live Demo URL" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                            <input type="text" name="githubUrl" value={currentProject.githubUrl} onChange={handleInputChange} placeholder="GitHub URL" className="w-full p-3 bg-slate-100 dark:bg-slate-800 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition-colors">{isLoading ? 'Saving...' : 'Save Project'}</button>
                            {editingId && <button type="button" onClick={resetForm} className="bg-slate-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-slate-600 transition-colors">Cancel Edit</button>}
                        </div>
                    </form>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Existing Projects</h2>
                    {projects.length === 0 ? (
                        <div className="text-center bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg">
                            <p className="text-slate-500 dark:text-slate-400 mb-4">No projects found. Add one above or upload the initial sample data.</p>
                            <button onClick={handleUploadInitialData} disabled={isLoading} className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-slate-400 transition-colors">{isLoading ? 'Uploading...' : 'Upload Sample Projects'}</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {projects.map(p => (
                                <div key={p.id} className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-lg flex justify-between items-center">
                                    <div className='flex items-center gap-4'>
                                        <Image className="rounded-lg" src={p.imageUrl} height={60} width={80} alt={p.title}/>
                                        <p className="font-bold text-slate-800 dark:text-slate-200">{p.title}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600">Edit</button>
                                        <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;