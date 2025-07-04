"use client"
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, signInAnonymously, signInWithCustomToken, User, Auth } from "firebase/auth";
import { auth } from '../firebase'; // Adjust path as needed

// --- Type Augmentation for Global Window Object ---
declare global {
    interface Window {
        __app_id?: string;
        __initial_auth_token?: string;
    }
}

// Define the shape of the context's value
interface FirebaseContextType {
    auth: Auth;
    user: User | null;
    userId: string;
    projectsCollectionPath: string | null;
    isAuthReady: boolean;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

// Custom hook to use the context
export const useFirebase = (): FirebaseContextType => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    return context;
};

interface FirebaseProviderProps {
    children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // Safely access the global variables without using `any`
    const appId = (typeof window !== 'undefined' && window.__app_id) || 'default-app-id';
    const initialAuthToken = (typeof window !== 'undefined' && window.__initial_auth_token) || null;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("Firebase Auth: User is signed in.", user.uid);
                setUser(user);
                setIsAuthReady(true);
            } else {
                console.log("Firebase Auth: No user signed in. Attempting to sign in...");
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                        console.log("Firebase Auth: Signed in with custom token.");
                    } else {
                        await signInAnonymously(auth);
                        console.log("Firebase Auth: Signed in anonymously.");
                    }
                } catch (error) {
                    console.error("Firebase authentication error:", error);
                    setIsAuthReady(true); // Ensure app continues even on auth error
                }
            }
        });
        return () => unsubscribe();
    }, [initialAuthToken]); // Dependency array is correct

    const userId = user?.uid || 'anonymous';
    const projectsCollectionPath = user ? `/artifacts/${appId}/users/${userId}/projects` : null;

    const value: FirebaseContextType = { auth, user, userId, projectsCollectionPath, isAuthReady };

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    );
};
