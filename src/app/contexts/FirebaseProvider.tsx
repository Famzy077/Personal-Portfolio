"use client"
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, signInAnonymously, signInWithCustomToken, User, Auth } from "firebase/auth";
import { auth } from '../firebase'; // Import from your config file

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

    const appId = typeof window !== 'undefined' && (window as any).__app_id !== undefined
        ? (window as any).__app_id
        : 'default-app-id';
    // Access __initial_auth_token from the global window object to avoid TS error
    const initialAuthToken = typeof window !== 'undefined' && (window as any).__initial_auth_token !== undefined
        ? (window as any).__initial_auth_token
        : null;

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
                    setIsAuthReady(true);
                }
            }
        });
        return () => unsubscribe();
    }, [initialAuthToken]);

    const userId = user?.uid || 'anonymous';
    const projectsCollectionPath = user ? `/artifacts/${appId}/users/${userId}/projects` : null;

    const value: FirebaseContextType = { auth, user, userId, projectsCollectionPath, isAuthReady };

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    );
};
