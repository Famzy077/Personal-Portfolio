'use client'
import '../../globals.css'
import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import ProfileImage from '../../Components/Images/profile.png';
import { LucideEyeOff, Eye } from 'lucide-react';

// --- THEME MANAGEMENT ---
// Create a context to hold the theme state and toggle function.
const ThemeContext = createContext();

// Create a provider component to wrap the app and provide the theme context.
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark'); // Default to dark mode 
    
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context easily
const useTheme = () => useContext(ThemeContext);


// --- HELPER HOOK for On-Scroll Animations ---
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentElement = ref.current;
        if (currentElement) {
            observer.observe(currentElement);
        }
        
        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [ref, options]);
    
    return [ref, isVisible];
};

// --- SVG & ICON COMPONENTS ---
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;


// --- DATA ---
const projectsData = [
    { title: "Favorite Gadget: E-commerce", category: "Backend", imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=E-commerce", description: "Built a full-featured E-commerce website using Next.js, Tailwind, Node.js, and Prisma with PostgreSQL for the database.", liveUrl: "#", githubUrl: "#", tags: ["Next.js", "Node.js", "Prisma SQL"] },
    { title: "FoodFlow: Restaurant Dashboard", category: "Backend", imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=FoodFlow", description: "A full-featured restaurant dashboard with dynamic order creation, menu settings, inventory management, and admin settings.", liveUrl: "#", githubUrl: "#", tags: ["Tailwind", "Next.js", "Node.js"] },
    { title: "HealthCare Platform", category: "Backend", imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=HealthCare", description: "A healthcare platform with a focus on delivering a seamless user experience. Integrated secure backend APIs using Node.js.", liveUrl: "#", githubUrl: "#", tags: ["React.js", "Node.js", "Tailwind"] },
    { title: "Joyvinco E-commerce Website", category: "Frontend", imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Joyvinco", description: "Developed a fully responsive e-commerce website using pure HTML, CSS, and JavaScript for a user-friendly shopping experience.", liveUrl: "#", githubUrl: "#", tags: ["HTML", "CSS", "JavaScript"] },
    { title: "Marian Hotel Website", category: "Frontend", imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Marian+Hotel", description: "Created a single-page hotel booking platform using React, focused on an intuitive UI with fast, dynamic interactions.", liveUrl: "#", githubUrl: "#", tags: ["React.js", "Tailwind", "Material UI"] },
    { title: "Personal Portfolio", category: "Frontend", imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Portfolio", description: "My personal portfolio website showcasing my skills, experience, and projects, built with Next.js and TypeScript.", liveUrl: "#", githubUrl: "#", tags: ["Next.js", "TypeScript", "Tailwind"] }
];

const skillsData = [
    { name: 'Next.js', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=Next', position: 'top-0 -left-4' },
    { name: 'Tailwind', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=TW', position: 'top-1/3 -right-10' },
    { name: 'React', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=React', position: 'bottom-8 -left-12' },
    { name: 'TypeScript', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=TS', position: 'top-0 -right-4' },
    { name: 'Node.js', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=Node', position: 'top-1/3 -left-10' },
    { name: 'Python', imageUrl: 'https://placehold.co/80x80/ffffff/1e293b?text=Py', position: 'bottom-8 -right-12' },
];


// --- UI COMPONENTS ---

const AnimatedSection = ({ children, className }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return <div ref={ref} className={`transition-all duration-700 ease-in-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>{children}</div>;
};

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
    );
};

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ["About", "Projects", "Experience", "Contact"];

    return (
        <>
            <header className={`fixed top-0 max-sm:-top-7 left-0 right-0 z-50 max-sm:borde rounded-lg transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md max-sm:border'  : 'bg-transparent'}`}>
                <nav className="containe mx-auto px-6 py-3 flex justify-between items-center">
                    <a href="#" className="text-2xl section2 font-bold text-slate-800 dark:text-slate-200">AF.dev</a>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => <a key={link} href={`#${link.toLowerCase()}`} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{link}</a>)}
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        <a href="#contact" className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">Hire Me</a>
                    </div>
                    <button onClick={() => setIsOpen(true)} className="md:hidden text-slate-800 dark:text-slate-200"><MenuIcon /></button>
                </nav>
            </header>
            
            <div className={`fixed inset-0 bg-white dark:bg-slate-900 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                 <div className="flex justify-end p-6"><button onClick={() => setIsOpen(false)} className="text-slate-800 dark:text-slate-200"><XIcon /></button></div>
                <div className="flex flex-col items-center justify-center h-full -mt-16 space-y-8">
                    {navLinks.map(link => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-3xl text-slate-700 dark:text-slate-300 font-medium hover:text-blue-600 dark:hover:text-blue-400">{link}</a>)}
                     <a href="#contact" onClick={() => setIsOpen(false)} className="mt-8 bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-xl">Hire Me</a>
                </div>
            </div>
        </>
    );
};

const SkillBubble = ({ skill }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
    return (
        <div ref={ref} className={`absolute ${skill.position} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="flex items-center gap-2 md:gap-4 font-semibold bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-2 md:p-3 rounded-full shadow-lg animate-float">
                <img className='w-6 h-6 md:w-10 md:h-10 rounded-full' src={skill.imageUrl} alt={`${skill.name} logo`} />
                <h1 className='text-xs md:text-xl text-slate-800 dark:text-slate-200'>{skill.name}</h1>
            </div>
        </div>
    );
};


const Hero = () => (
    <section className="pt-32 pb-16 md:pt-48 md:pb-24 text-center overflow-hidden">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <h2 className="text-sm md:text-xl font-medium text-blue-500 dark:text-blue-400 mb-2">A Software Engineer & Web Developer</h2>
                <h1 className="text-2xl md:text-6xl font-bold text-slate-800 dark:text-slate-100 mb-4">I'm Akinola Femi</h1>
                <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-8">Passionate about transforming the African technology industry with innovative solutions, specializing in JavaScript, Python, React, and Node.js.</p>
                <div className="flex justify-center items-center space-x-4"><a href="#projects" className="bg-blue-600 max-sm:text-[10.5px] text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md">View Projects</a><a href="#" className="border-2 border-slate-300 max-sm:text-[10.5px] dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold px-7 py-3 max-sm:py-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300">Download CV</a></div>
            </AnimatedSection>
            <AnimatedSection className="mt-16">
                 <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 dark:opacity-50"></div>
                    <img src={ProfileImage} alt="Akinola Femi Profile" className="relative w-full h-full rounded-full object-cover border-8 border-white dark:border-slate-800 shadow-2xl" />
                    {/* <img src="https://placehold.co/400x400/e2e8f0/1e293b?text=AF" alt="Akinola Femi Profile" className="relative w-full h-full rounded-full object-cover border-8 border-white dark:border-slate-800 shadow-2xl" onError={(e) => e.target.src='https://placehold.co/400/e2e8f0/334155?text=Image+Error'} /> */}
                    {/* Skills Showcase */}
                    <div className="hidden md:block">
                        {skillsData.map(skill => <SkillBubble key={skill.name} skill={skill} />)}
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </section>
);

const About = () => {
    const [readMore, setReadMove] = useState(false)
    
    const handleReadMore = () => {
        setReadMove(!readMore)
    }
    return(
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
        <div className="containe mx-auto px-6">
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">About Me</h2>
                <div className="grid md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-2">
                        <div className="relative">
                             <div className="absolute -top-4 -left-4 w-full h-full bg-slate-200 dark:bg-slate-700 rounded-lg transform -rotate-3"></div>
                             <img src="https://placehold.co/400x500/dbeafe/1e293b?text=About" alt="About Akinola Femi" className="relative rounded-lg shadow-lg w-full object-cover" onError={(e) => e.target.src='https://placehold.co/400x500/dbeafe/334155?text=Image+Error'} />
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">I'm a highly skilled full-stack developer passionate about delivering high-quality, scalable applications. With hands-on experience in backend development using Node.js, frontend expertise in Next.js and TypeScript, and contributions to fintech, I consistently strive for excellence.</p>
                        {readMore && (
                            <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">Beyond coding, I create motivational content to inspire and empower junior developers, providing them with resources, guidance, and practical advice to grow in their careers. My diverse experience in business management and technology gives me a unique perspective on driving impactful projects.</p>
                        )}
                        <div onClick={handleReadMore} className='text-center mb-4 flex place--center'>
                            <button onClick={handleReadMore} className="flex items-center gap-4 text-sm  hover:bg-gray-800 transition-all border p-1 px-2 rounded-full cursor-pointer">
                                {readMore ? <LucideEyeOff/> : <Eye/>  }
                                {readMore ? 'Show Less' : 'Read More'}
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold px-4 py-2 rounded-full">Coding</div>
                            <div className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-semibold px-4 py-2 rounded-full">Music</div>
                            <div className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold px-4 py-2 rounded-full">Vacation Trips</div>
                            <div className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 font-semibold px-4 py-2 rounded-full">Mentoring</div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    </section>
    )
}

const ProjectCard = ({ project }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
    return (
        <div ref={ref} className={`bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-2 hover:shadow-xl dark:shadow-slate-900/50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" onError={(e) => e.target.src='https://placehold.co/600x400/1e293b/ffffff?text=Image+Load+Error'} />
            <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => <span key={tag} className="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1 rounded-full">{tag}</span>)}
                </div>
                <div className="flex items-center justify-start space-x-4">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"><LinkIcon /><span>Live Demo</span></a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 font-semibold hover:text-slate-800 dark:hover:text-slate-100 transition-colors"><GithubIcon /><span>GitHub</span></a>
                </div>
            </div>
        </div>
    );
};

const ProjectSection = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Frontend', 'Backend'];
    const filteredProjects = selectedCategory === 'All' ? projectsData : projectsData.filter(p => p.category === selectedCategory);

    return (
        <section id="projects" className="py-20 bg-slate-100 dark:bg-slate-950">
            <div className="mx-auto px-6">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-4">My Work & Projects</h2>
                    <p className="text-center text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">Here are some of the projects I'm proud to have worked on. Each one represents a unique challenge and a learning opportunity.</p>
                </AnimatedSection>
                <AnimatedSection className="flex justify-center mb-12">
                    <div className="flex space-x-2 bg-slate-200 dark:bg-slate-800 p-1.5 rounded-full">
                        {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-colors ${selectedCategory === category ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-slate-100 shadow' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'}`}>{category}</button>)}
                    </div>
                </AnimatedSection>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => <ProjectCard key={index} project={project} />)}
                </div>
            </div>
        </section>
    );
};

const ExperienceSection = () => (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
        <div className="containe mx-auto px-6">
            <AnimatedSection><h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">Experience & Education</h2></AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-16">
                <div>
                    <AnimatedSection><h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8">Work Experience</h3></AnimatedSection>
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-700 pl-8 space-y-12">
                         <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 top-1.5"></div>
                        <AnimatedSection>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Software Developer @ TheFourDev</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">2024 - Present</p>
                            <p className="text-slate-600 dark:text-slate-300">Built and deployed the Joyvinco e-commerce website from scratch, focusing on a great user interface and applying all necessary functionality to meet user needs.</p>
                        </AnimatedSection>
                        <AnimatedSection>
                             <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5"></div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Backend Engineer @ Vooperative</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">2024 - Present</p>
                            <p className="text-slate-600 dark:text-slate-300">Building scalable, secure backend systems using Python, Django, and PostgreSQL. Collaborating with front-end developers to integrate APIs and database functionalities.</p>
                        </AnimatedSection>
                         <AnimatedSection>
                             <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5"></div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Web Developer Intern @ Digital World Tech</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Jul 2024 - Oct 2024</p>
                            <p className="text-slate-600 dark:text-slate-300">Trained new students on web development basics and contributed to the team’s growth by sharing resources. Implemented visual aids to support student learning.</p>
                        </AnimatedSection>
                    </div>
                </div>
                <div>
                    <AnimatedSection><h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-8">Education</h3></AnimatedSection>
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-700 pl-8 space-y-12">
                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5 top-1.5"></div>
                        <AnimatedSection>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">National Open University Of Nigeria</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">2024 - Present</p>
                            <p className="text-slate-600 dark:text-slate-300">Pursuing a BSc in Computer Science, focusing on core computer science principles and advanced topics.</p>
                        </AnimatedSection>
                        <AnimatedSection>
                            <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-1.5"></div>
                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">Digital World Tech Academy</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">2024</p>
                            <p className="text-slate-600 dark:text-slate-300">Completed a Diploma in Full-Stack Development, gaining hands-on experience with modern web technologies.</p>
                        </AnimatedSection>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Contact = () => {
    const socialLinks = [
        { name: 'LinkedIn', url: '#', color: 'bg-sky-600', hover: 'hover:bg-sky-700' },
        { name: 'GitHub', url: '#', color: 'bg-slate-800', hover: 'hover:bg-slate-900' },
        { name: 'Twitter', url: '#', color: 'bg-sky-500', hover: 'hover:bg-sky-600' },
        { name: 'Email', url: 'mailto:akinolafemi573@gmail.com', color: 'bg-red-600', hover: 'hover:bg-red-700' },
    ];
    return (
        <section id="contact" className="py-20 bg-slate-100 dark:bg-slate-950">
            <div className="containe mx-auto px-6 text-center">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">Get In Touch</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out. Let's build something amazing together!</p>
                    <div className="flex justify-center items-center flex-wrap gap-4">
                        {socialLinks.map(link => <a key={link.name} href={link.url} className={`text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md ${link.color} ${link.hover}`}>{link.name}</a>)}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-white dark:bg-slate-900 py-6">
            <div className="container mx-auto px-6 text-center text-slate-500 dark:text-slate-400">
                <p>&copy; {currentYear} Akinola Femi. All Rights Reserved.</p>
                <p className="text-sm mt-1">Designed & Built with ❤️</p>
            </div>
        </footer>
    );
};


// --- MAIN APP COMPONENT ---
// The App is wrapped in the ThemeProvider to make the theme available to all components.
export default function Page() {
    return (
        <ThemeProvider>
            <div className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-sans">
                <style>
                    {`
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }
                    .animate-float {
                        animation: float 6s ease-in-out infinite;
                    }
                    `}
                </style>
                <Header />
                <main>
                    <Hero />
                    <About />
                    <ProjectSection />
                    <ExperienceSection />
                    <Contact />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}