"use client"
import { Github, LinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import favorite from '@/assets/favorite.jpg'
import FoodFlowImg from '@/assets/foodflow.jpg'
import HealthCare from '@/assets/healthcare.jpg'
import BlogImg from '@/assets/blog.jpg'
import JovincoImg from '@/assets/jovinco.jpg'
import Hotel from '@/assets/hotel.jpg'
import portfolioImg from '@/assets/portfolio.jpg'
import GYMImg from '@/assets/gym.jpg'
import SnakeRestaurantImg from '@/assets/snake-restaurant.jpg'

export const projects = [
  {
    title: 'Favorite Gadget: E-commerce',
    category: 'Backend',
    techStack: ['Next.js', 'Node.js', 'Prisma SQL'],
    type: ['Next.Js', 'Full Stack'],
    image: favorite,
    liveLink: 'https://favourite-plug.vercel.app',
    githubLink: 'https://github.com/Famzy077/Favourite-Plug',
    description:
      'Built a full-featured E-commerce website using Next.js, Talwind, Node.js, and Prisma PostgreSQL for database',
  },
  {
    title: 'FoodFlow: Restaurant Dashboard',
    category: 'Backend',
    techStack: ['Tailwind', 'Next.js', 'Node.js'],
    type: ['Next.Js', 'Full Stack'],
    image: FoodFlowImg,
    liveLink: 'https://food-flow-dashboard.vercel.app',
    githubLink: 'https://github.com/Famzy077/FoodFlow',
    description:
      'Built a full-featured restaurant dashboard with dynamic order creation, menu settings, inventory management, procurement tracking, and admin settings.',
  },
  {
    title: 'HealthCare: HealthCare Website',
    category: 'Backend',
    techStack: ['Tailwind', 'React.js', 'Node.js'],
    type: ['React', 'Full Stack'],
    image: HealthCare,
    liveLink: 'https://healthcareservice-client.vercel.app',
    githubLink: 'https://github.com/Famzy077/healthcareservice',
    description:
      'Built healthcare platform with a focus on delivering a seamless user experience. Integrated secure backend APIs using Node.js to ensure data security and efficient performance.',
  },
  {
    title: 'Blog: Blog Website',
    category: 'Backend',
    techStack: ['HTML', 'CSS', 'Node.js'],
    type: ['Vanila', 'Full Stack'],
    image: BlogImg,
    liveLink: 'https://blog-three-gamma-51.vercel.app/',
    githubLink: 'https://github.com/Famzy077/Blogs-website',
    description:
      'Designed and implemented a blog platform utilizing Vanilla JavaScript for the frontend, with Node.js, Express, and MongoDB for backend services and data management.',
  },
  {
    title: 'Joyvinco: Joyvinco Website',
    category: 'Frontend',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    type: ['JavaScript', 'Frontend'],
    image: JovincoImg,
    liveLink: 'https://www.joyvinco.com.ng',
    githubLink: 'https://github.com/Famzy077/JoyVinco_E-commerce',
    description:
      'Developed a fully responsive e-commerce website using pure HTML, CSS, and JavaScript, providing a user-friendly shopping experience and seamless navigation.',
  },
  {
    title: 'Marian Hotel: Hotel Website',
    category: 'Frontend',
    techStack: ['Tailwind', 'React.js', 'Material UI'],
    type: ['React', 'Frontend'],
    image: Hotel,
    liveLink: 'https://hotel-assesssment.akinolafemi.com.ng/',
    githubLink: 'https://github.com/Famzy077/Hotel-Assessment-Project',
    description:
      'Created a single-page hotel booking platform using React. The project is focused on offering an intuitive user interface with fast, dynamic interactions for booking services.',
  },
  {
    title: 'Portfolio: My Portfolio',
    category: 'Frontend',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    type: ['Next.Js', 'Next.Js & TypeScript'],
    image: portfolioImg,
    liveLink: 'https://www.akinolafemi.com.ng',
    githubLink: 'https://github.com/Famzy077/Portfolio_Next.App',
    description:
      'Developed a personal portfolio website showcasing my skills, experience, and detailed information about my projects, designed to highlight my professional journey and accomplishments',
  },
  {
    title: 'GYM: GYM Website',
    category: 'Backend',
    techStack: ['Tailwind', 'React.js', 'Next.js'],
    type: ['Next.js', 'Frontend'],
    image: GYMImg,
    liveLink: 'https://gym-client.vercel.app',
    githubLink: 'https://github.com/Famzy077/GyM',
    description:
      'Developed a full-stack GYM management system using TypeScript and the Next.js framework, integrating frontend and backend functionality to manage memberships, schedules, and payment processing.',
  },
  {
    title: 'Restaurant: Restaurant Website',
    category: 'Frontend',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    type: ['JavaScript', 'Frontend'],
    image: SnakeRestaurantImg,
    liveLink: 'Resturants/restaurant.html',
    githubLink: 'https://github.com/Famzy077/Snake-Restaurants',
    description:
      'I developed a Power BI dashboard to track and analyze sales performance for a beauty store, focusing on metrics such as total sales, profit, order volume, and customer segments.',
  },
]


import type { StaticImageData } from 'next/image';

interface Project {
  title: string;
  category: string;
  techStack: string[];
  type: string[];
  image: StaticImageData;
  liveLink: string;
  githubLink: string;
  description: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
      <Link href={project.liveLink}>
        <LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[2rem] h-[2rem]' />
      </Link>

      <div className='mt-10 mb-2'>
        <Image
          className='rounded-2xl h-[fit-content] md:h-[19.5rem]'
          src={project.image}
          alt='project-image'
          title={project.title}
        />
      </div>

      <h1 className='text-2xl md:text-3xl font-extrabold'>{project.title}</h1>

      <p className='text-2xl font-semibold my-2'>Project Category</p>
      <main className='flex gap-3 flex-wrap'>
        {project.type.map((t: string, i: number) => (
          <div key={i} className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
            <h2>{t}</h2>
          </div>
        ))}
      </main>

      <p className='text-2xl font-semibold my-3'>Technologies Used</p>
      <div className='flex gap-3 flex-wrap'>
        {project.techStack.map((tech: string, i: number) => (
          <div key={i} className='bg-white text-blue-800 rounded-full p-1 px-3'>
            <p>{tech}</p>
          </div>
        ))}
      </div>

      <p className='text-white font-serif description mt-2'>
        <span className='font-semibold'>Description:</span> {project.description}
      </p>

      <div className=' text-white text-xl md:text-2xl rounded-xl flex justify-around my-2 mt-5'>
        <Link href={project.liveLink} className='bg-black text-white px-6 p-1 rounded-xl hover:scale-105 hover:bg-blue-600 transition-transform flex items-center'>
          <LinkIcon className='mr-3' /> View
        </Link>
        <Link href={project.githubLink} className='bg-black text-white px-6 p-1 rounded-xl hover:scale-105 hover:bg-blue-600 transition-transform flex items-center'>
          <Github size={24} className='mr-3' /> GitHub
        </Link>
      </div>
    </div>
  )
}
