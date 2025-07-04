"use client"
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, signInAnonymously, signInWithCustomToken, User, Auth } from "firebase/auth";
import { auth } from '@/app/firebase'; // Using path alias

declare global {
    interface Window {
        __app_id?: string;
        __initial_auth_token?: string;
    }
}

interface FirebaseContextType {
    auth: Auth;
    user: User | null;
    userId: string;
    publicProjectsPath: string;
    isAuthReady: boolean;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

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

    const appId = (typeof window !== 'undefined' && window.__app_id) || 'default-app-id';
    const initialAuthToken = (typeof window !== 'undefined' && window.__initial_auth_token) || null;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                setIsAuthReady(true);
            } else {
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                    } else {
                        await signInAnonymously(auth);
                    }
                }catch (error) {
                    console.error("Anonymous Firebase auth failed — continuing as unauthenticated viewer:", error);
                    setIsAuthReady(true);
                }
            }
        });
        return () => unsubscribe();
    }, [initialAuthToken]);

    const userId = user?.uid || 'anonymous';
    const publicProjectsPath = `/artifacts/${appId}/public/data/projects`;

    const value: FirebaseContextType = { auth, user, userId, publicProjectsPath, isAuthReady };

    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    );
};

