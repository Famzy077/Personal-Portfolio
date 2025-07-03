"use client"
import AnimatedSection from "./AnimatedSection";
import { useState } from "react";
import Image from "next/image";
import { EyeOffIcon, Eye } from "lucide-react";
import AboutImage from '/public/aboutImage.png'


export const About = () => {
    const [readMore, setReadMove] = useState(false)
    
    const handleReadMore = () => {
        setReadMove(!readMore)
    }
    return(
    <section id="about" className="py-20 pt-10 bg-white dark:bg-slate-900">
        <div className="containe mx-auto px-6">
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">About Me</h2>
                <div className="grid md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-2">
                        <div className="relative">
                             <div className="absolute -top-4 -left-4 w-full h-full bg-slate-200 dark:bg-slate-700 rounded-lg transform -rotate-3"></div>
                             <Image src={AboutImage} alt="About Akinola Femi" width={100} height={100} className="relative w-[fit-content] bg-zinc-300 rounded-lg shadow-lg h-[97vh] max-sm:h-fit  object-cover" />
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">I&apos;m a highly skilled full-stack developer passionate about delivering high-quality, scalable applications. With hands-on experience in backend development using Node.js, frontend expertise in Next.js and TypeScript, and contributions to fintech, I consistently strive for excellence.</p>
                        {readMore && (
                            <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">Beyond coding, I create motivational content to inspire and empower junior developers, providing them with resources, guidance, and practical advice to grow in their careers. My diverse experience in business management and technology gives me a unique perspective on driving impactful projects.</p>
                        )}
                        <div onClick={handleReadMore} className='text-center mb-4 flex place--center'>
                            <button onClick={handleReadMore} className="flex items-center gap-4 text-sm  hover:bg-gray-800 transition-all border p-1 px-2 rounded-full cursor-pointer">
                                {readMore ? <EyeOffIcon/> : <Eye/>  }
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