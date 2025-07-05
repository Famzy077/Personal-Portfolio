export interface Project {
    id: string;
    title: string;
    description: string;
    category: 'Frontend' | 'Backend';
    imageUrl: string;
    liveUrl: string;
    githubUrl: string;
    order: number;
    tags: string | string[]; // Can be a comma-separated string or an array
}

export const initialProjectsData: Project[] = [
    { 
        id: "proj1", 
        title: "Favorite Gadget: E-commerce", 
        category: "Backend", 
        imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=E-commerce", 
        description: "Built a full-featured E-commerce website using Next.js, Tailwind, Node.js, and Prisma with PostgreSQL for the database.", 
        liveUrl: "#", 
        githubUrl: "#", 
        order: 0,
        tags: "Next.js, Node.js, Prisma SQL" 
    },
    { 
        id: "proj2", 
        title: "FoodFlow: Restaurant Dashboard", 
        category: "Backend", 
        imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=FoodFlow", 
        description: "A full-featured restaurant dashboard with dynamic order creation, menu settings, inventory management, and admin settings.", 
        liveUrl: "#", 
        githubUrl: "#", 
        order: 0,
        tags: "Tailwind, Next.js, Node.js" 
    },
    { 
        id: "proj3", 
        title: "HealthCare Platform", 
        category: "Backend", 
        imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=HealthCare", 
        description: "A healthcare platform with a focus on delivering a seamless user experience. Integrated secure backend APIs using Node.js.", 
        liveUrl: "#", 
        githubUrl: "#",
        order: 0,
        tags: "React.js, Node.js, Tailwind" 
    },
    { 
        id: "proj4", 
        title: "Joyvinco E-commerce Website", 
        category: "Frontend", 
        imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Joyvinco", 
        description: "Developed a fully responsive e-commerce website using pure HTML, CSS, and JavaScript for a user-friendly shopping experience.", 
        liveUrl: "#", 
        githubUrl: "#", 
        order: 0,
        tags: "HTML, CSS, JavaScript" 
    }
];