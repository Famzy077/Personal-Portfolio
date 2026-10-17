"use client";
import React, { useState, useEffect, FormEvent } from "react";
import {
  collection,
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { useFirebase } from "../../contexts/FirebaseProvider";
import { Project } from "@/app/Data/initialData";
import ProjectForm from "../../Components/Admins/ProjectForm";
import ProjectList from "../../Components/Admins/ProjectList";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import ThemeToggle from "../../Theme/ThemeProvider";

const AdminPage = () => {
  const { publicProjectsPath, isAuthReady } = useFirebase();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    category: "Frontend",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
    tags: "",
    order: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  useEffect(() => {
    if (!isAuthReady || !publicProjectsPath) return;

    const unsubscribe = onSnapshot(
      collection(db, publicProjectsPath),
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Project)
        );
        docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setProjects(docs);
      }
    );
    return () => unsubscribe();
  }, [isAuthReady, publicProjectsPath]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentProject.title) return toast.error("Project title is required.");
    if (!editingId && !imageFile)
      return toast.error("Image is required for new projects.");

    setIsLoading(true);
    try {
      let finalImageUrl = currentProject.imageUrl;
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error?.message || "Image upload failed.");
        finalImageUrl = data.secure_url;
        toast.success("Image uploaded successfully.");
      }

      const preparedTags = Array.isArray(currentProject.tags)
        ? currentProject.tags
        : currentProject.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      const collectionRef = collection(db, publicProjectsPath!);

      const projectData = {
        ...currentProject,
        imageUrl: finalImageUrl,
        tags: preparedTags,
        order: Number(currentProject.order) || 0,
      };

      if (editingId) {
        await updateDoc(doc(collectionRef, editingId), projectData);
        toast.success("Project updated.");
      } else {
        projectData.order = projects.length;
        await addDoc(collectionRef, projectData);
        toast.success("Project added.");
      }
      resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setCurrentProject({
      ...project,
      tags: Array.isArray(project.tags)
        ? project.tags.join(", ")
        : project.tags,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteDoc(doc(db, publicProjectsPath!, id));
      toast.success("Project deleted.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred during deletion.");
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
      toast.success("Order saved.");
    } catch (error: unknown) {
      toast.error("Failed, you don't have permission to re-order.");
      console.error(error);
    }
  };

  const resetForm = () => {
    setCurrentProject({
      title: "",
      description: "",
      category: "Frontend",
      githubUrl: "",
      liveUrl: "",
      tags: "",
      imageUrl: "",
      order: 0,
    });
    setImageFile(null);
    setEditingId(null);
    const fileInput = document.getElementById("imageUpload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  if (!isAuthReady) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-700 dark:text-slate-300 gap-3">
        <Loader2 size={32} className="animate-spin text-blue-600" />
        <p className="text-sm font-medium">Initializing Admin Workspace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 sm:py-12 bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200">
      {/* Header bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <Link
            href="/home"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-2"
          >
            <ArrowLeft size={14} />
            <span>Back to Live Portfolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Project Management
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck size={12} />
              <span>Admin Mode</span>
            </span>
          </div>
          {/* <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Authenticated as: <span className="font-mono">{userId}</span>
          </p> */}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>

      {/* Project Form */}
      <ProjectForm
        onSubmit={handleFormSubmit}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        setImageFile={setImageFile}
        isLoading={isLoading}
        isEditing={!!editingId}
        onCancel={resetForm}
      />

      {/* Project List */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Current Projects ({projects.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag items to change display order on the public site
            </p>
          </div>
        </div>

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