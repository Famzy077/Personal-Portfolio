"use client"
import AnimatedSection from "./AnimatedSection";
export const Contact = () => {
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
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">I&lsquo;m currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out. Let&lsquo;s build something amazing together!</p>
                    <div className="flex justify-center items-center flex-wrap gap-4">
                        {socialLinks.map(link => <a key={link.name} href={link.url} className={`text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md ${link.color} ${link.hover}`}>{link.name}</a>)}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};