'use client'
import React from 'react'
// import PopupNav from './NavBar'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ProfileImage from './Images/profile.png';
import Secondprofile from './Images/second.jpg'
import Image from 'next/image';
import NextJsimg from './Images/NextJs.png'
import {faComputer, faBriefcase, faCalendar, faGraduationCap, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { Github, Linkedin, Facebook, Twitter, Mail, Headphones, Plane, BookOpenCheck, BadgeDollarSign, Laptop, LinkIcon } from 'lucide-react';
import {Menu} from 'lucide-react'
import { X } from 'lucide-react';
import Tailwindimg from './Images/tailwind.png';
import Reactimg from './Images/React.png';
import Nodeimg from './Images/NodeJs.png';
import Typescriptimg from './Images/Typescript.png';
import Pythonimg from './Images/Python.png';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Link from 'next/link';
import HealthCare from './Images/healthcare.png';
import JovincoImg from './Images/joyvinco-product.png';
import SnakeRestaurantImg from './Images/snake-restaurant.png';
import Hotel from './Images/Hotel.png';
import GYMImg from  './Images/GYM.jpg';
import MusicImg from './Images/Music-app.png';
import BlogImg from './Images/Blog.jpg';
import PopupImg from './Images/popup.png';
import AgeCalcImg from './Images/Age calculator.png'
import CalcImg from './Images/calculator_.png'
import JobImg from './Images/job.png';
import portfolioImg from './Images/Portfolio.png';
import FoodFlowImg from './Images/FoodFlow.jpg'
import favorite from "/public/Favorite.png"

interface HomeProps {
  children: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
    const [readMore, setReadMove] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCategory ,setSelectedCategory] = useState('all')
    const handleClick =() =>{
        setIsOpen(false)
    }
    const handleMenu = () => {
        setIsOpen(!isOpen)
    }
    const handleReadMore = () => {
        setReadMove(!readMore)
    }
  return (
    <div>
        <main className=' text-white absolute top-0'>
            <nav   className={`fixed top-0 right-0 w-full h-screen bg-blue-950 opacity-95 z-10 text-white transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <ul className="flex flex-col items-center justify-center h-full space-y-2">
                    <li><Link onClick={handleClick} className='navText' href='#'>Home</Link></li>
                    <li><Link onClick={handleClick} href='#About'>About</Link></li>
                    <li><Link onClick={handleClick} href='#Project'>Project</Link></li>
                    <li><Link onClick={handleClick} href='#Experience'>Experience</Link></li>
                    <li><Link onClick={handleClick} href='#Contact'>Contact</Link></li>
                </ul>
            </nav>
        </main>
        <header className='header bg-white  mb-10 text-black mx-[12rem] rounded-full mt-20 sticky top-4 z-20'>
            <main className='flex justify-between items-center p-2 md:p-3'>
                <div className='flex logo_box items-center gap-4'>
                    <div className=' md:w-[60px] w-[52px] h-[52px] md:h-[60px] place-items-center place-content-center rounded-full bg-black'>
                        <h1 className='section2 text-white text-2xl md:text-3xl font-semibold cursor-pointercls'>AF</h1>
                    </div>
                    <h2 className='akin text-center text-2xl md:text-4xl font-semibold'>Akinola Femi</h2>
                </div>
                <div className='flex p-2 md:p-4 rounded-full  px-3 md:px-7 bg-black gap-3 relative mr-8'>
                    <h1 className='text-white text-xl md:text-2xl font-semibold pr-2 md:pr-4'>Menu</h1>

                    <div onClick={handleMenu} className=' bg-blue-800 w-[2.5rem] md:w-[3.5rem] h-[2.5rem] md:h-[3.5rem] absolute left-[4.2rem] md:left-24 p-[0.6rem] md:p-3 top-[2px] md:top-1 rounded-full cursor-pointer'>
                        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                                {isOpen ? < X size={23} className="text-white w-[20px] h-[20px] md:w-[30px] md:h-[30px] text-2xl" /> : <Menu size={23} className='text-white w-[20px] h-[20px] md:w-[30px] md:h-[30px] text-2xl' />}
                        </button>
                    </div>
                </div>
            </main>
        </header>

        <section className='section1 h-[fit-content] p-2 md:p-5 overflow-x-hidden'>
            <div className='nameBox m-20 mb-6 md-10 md:mx-[16rem] rounded-[4rem] p-4 border-4 border-blue-800'>
                <h1 className='nameh1 text-blue-700 font-bold text-6xl flex justify-around'><span className='text-white'>I′m</span>Akinola <span>Femi</span></h1>
            </div>
            <main className='text-center mx-2 my-5 text-xl md:text-2xl text-white'>
                <h1>A Software Engineer | Web Developer with <span className='bg-blue-800 rounded-full px-2 capitalize'> years of experience</span></h1>
            </main>
            <div className='mt-3 text-center'>
                <button className='border-2 px-4 border-blue-800 text-blue-800 p-2 rounded-2xl mr-3 hover:text-white hover:bg-blue-800'><Link href='https://docs.google.com/document/d/16Y18WIM1lIMWcJqDB-rfylWsfgKSzY-pcB_aW857574'>Resume</Link></button>
                <button className='bg-blue-800 text-white p-2 rounded-2xl border-2 border-blue-800 hover:bg-transparent px-4 hover:border-blue-800'><Link href='mailto:akinolafemi573@gmail.com'>Hire me</Link></button>
            </div>
            <section className='flex gap-0 md:gap-6 justify-center p-1 md:p-4'>
                <div className='mt-10 relative'>
                    <div className='bg-white w-[90px] md:w-[170px] absolute top-[3rem] left-[2rem] md:left-[-1rem] rounded-full p-1 md:p-2 pr-0 md:pr-5 pl-3 flex items-center text-black gap-2 md:gap-4 font-semibold'>
                        <Image className='w-[1.2rem] md:w-[3rem]' src={NextJsimg} alt="skills-img" />
                        <h1 className='text-xs md:text-xl'>NextJs</h1>
                    </div>
                    <div className='bg-white w-[90px] md:w-[170px] absolute md:top-[11.5rem] top-[7rem] right-[-5.5rem] md:right-[-5.5rem] skillIcon rounded-full p-1 md:p-2 pr-0 md:pr-5 pl-1 md:pl-3 flex items-center text-black gap-1 md:gap-4 font-semibold'>
                        <Image className='w-[1.2rem] md:w-[3rem]' src={Tailwindimg} alt="skills-img" />
                        <h1 className='text-xs md:text-xl'>Tailwind</h1>
                    </div>
                    <div className='bg-white  w-[90px] md:w-[170px] absolute md:top-[20em] top-[11rem] right-[-7.5rem] md:left-[-1rem] rounded-full p-1 md:p-2 pr-0 md:pr-5 pl-3 flex items-center text-black gap-2 md:gap-4 font-semibold'>
                        <Image src={Reactimg} className='w-[1.2rem] md:w-[3rem]' alt='skills-img'/>
                        <h1 className='text-xs md:text-xl'>ReactJs</h1>
                    </div>
                </div>
                <div className="imageBox w-[60rem] md:w-[auto] mt-10 flex justify-center">
                    <Image className='w-[300px] md:w-[100%]' src={ProfileImage} alt="profileImage" />
                </div>
                <div className='mt-10 relative'>
                    <div className='bg-white w-[100px] md:w-[200px] absolute top-[3rem] right-[2rem] md:right-[-2rem] rounded-full p-1 md:p-2 pr-5 pl-3 flex items-center text-black gap-1 md:gap-4 font-semibold'>
                        <Image className='rounded-full w-[1.2rem] md:w-[3rem]' src={Typescriptimg} alt="skills-img" />
                        <h1 className='text-xs md:text-xl'>TypeScript</h1>
                    </div>
                    <div className='bg-white w-[90px] md:w-[200px] absolute md:top-[11.5rem] top-[7rem] left-[-6rem] md:left-[-7rem] rounded-full p-1 pr-2 md:pr-5 pl-3 flex items-center text-black gap-1 md:gap-4 font-semibold'>
                        <Image className='rounded-full w-[1.2rem] md:w-[3rem]' src={Nodeimg} alt="skills-img" />
                        <h1 className='text-xs md:text-xl'>NodeJs</h1>
                    </div>
                    <div className='bg-white w-[90px] md:w-[200px] absolute md:top-[20em] top-[11rem] left-[-7.5rem] md:left-[-9rem] skillIcon rounded-full md:p-2 p-1 pr-2 md:pr-5 pl-3 flex items-center text-black gap-2 md:gap-4 font-semibold'>
                        <Image className='rounded-full w-[1.2rem] md:w-[3rem]' src={Pythonimg} alt="skills-img" />
                        <h1 className='text-xs md:text-xl'>Python</h1>
                    </div>
                </div>
            </section>
        </section>

        <p id='About'></p>
        <div className='section2 my-9 mx-2 md:mx-16 p-2 md:p-7'>
            <h1 className='text-4xl md:text-7xl font-semibold text-center text-blue-400'>About me</h1>
            <h1 className='text-4xl md:text-7xl font-semibold text-center translate-x-1 md:translate-x-2 translate-y-[-2.4rem] md:translate-y-[-3.9rem]'>About me</h1>

            <main className='md:flex gap-[20px] md:gap-[40px] justify-between'>
                <div className='w-[100%] p-4'>
                    <div className='flex items-center gap-5 mb-10'>
                        <Image className='rounded-full border-4 border-blue-600 w-[4rem] h-[fit-content] object-fill' src={Secondprofile} alt='love-picture'/>
                        <h1 className='text-4xl md:text-6xl text-blue-800 font-extrabold'>I love</h1>
                    </div>
                    <div className='md:flex md:flex-wrap gap-4 items-center'>
                        <div className='flex bg-blue-100 p-2 items-center gap-4 text-2xl md:text-3xl font-semibold px-5 rounded-full text-blue-800 md:mb-0 mb-4'>
                            <Headphones size={24} className='w-[2rem]' />
                            <h2>Music</h2>
                        </div>
                        <div className='flex bg-blue-100 p-2 items-center gap-4 text-2xl md:text-3xl font-semibold px-5 rounded-full text-blue-800  md:mt-0 mt-4'>
                            <Plane size={24} className='w-[2rem]' />
                            <h2>Vacation Trip</h2>
                        </div>
                    </div>
                    <div className='md:flex md:flex-wrap mt-4 gap-4 translate-x-4'>
                        <div className='flex bg-blue-100 p-2 items-center gap-4 text-2xl md:text-3xl font-semibold px-5 rounded-full text-blue-800 md:mb-0 mb-4'>
                            <FontAwesomeIcon className='w-[2rem]' icon={faComputer}/>
                            <h2>Coding</h2>
                        </div>
                        <div className='flex bg-blue-100 p-2 items-center gap-4 text-2xl md:text-3xl font-semibold px-5 rounded-full text-blue-800 md:mt-0 mt-4'>
                            <BadgeDollarSign size={24} className='w-[1.4rem]'/>
                            <h2>Money</h2>
                        </div>
                    </div>
                </div>

                <div className='flex w-[100%] md:items-center m-0 md:m-15 md:mt-0 mt-[5rem] gap-5'>
                    <div className='bg-blue-500 h-[13rem] place-content-center rounded-2xl text-center p-1 md:p-3 w-[100%]'>
                        <h1 className='font-extrabold text-5xl text-blue-800'>Years</h1>
                        <p className='text text-xl md:text-2xl text-white'>of Experience</p>
                    </div>
                    <div className='bg-blue-500 h-[13rem] place-content-center rounded-2xl text-center p-1 md:p-3 w-[100%]'>
                        <h1 className='font-extrabold text-6xl text-blue-800'>10+</h1>
                        <p className='text-xl text md:text-2xl text-white'>Projects Completed</p>
                    </div>
                </div>
            </main>
        </div>
        <section className='p-7'>
            <div className='bg-blue-950 aboutText p-5 md:p-10 rounded-2xl font-sans text-white'>
                <p className='my-4 md:my-5 text-xl md:text-2xl '>I&apos;m Akinola Femi, A highly skilled full-stack developer with a focus on JavaScript, Python, React, and Node.js, passionate about transforming the African technology industry through innovative solutions. </p>
                
                {readMore && (
                    <div>
                        <p className='my-4 md:my-5 text-xl md:text-2xl'>With hands-on experience in backend development using Node.js, frontend expertise in Next.js and TypeScript, and contributions to fintech, I consistently deliver high-quality, scalable applications.</p>
                        <p className='my-4 md:my-5 text-xl md:text-2xl'>Additionally, I create motivational content on LinkedIn and some other social medials to inspire junior developers, empowering them with resources, guidance, and practical advice to grow in their careers.</p>
                        <p className='my-4 md:my-5 text-xl md:text-2xl'>My diverse experience in business management and technology gives me a unique perspective on driving impactful projects.</p>
                    </div>
                )}
            </div>
            <div onClick={handleReadMore} className='text-center my-5 text-3xl flex place-content-center'>
                <button onClick={handleReadMore} className="flex items-center border-2 hover:bg-white transition-all border-blue-800 text-blue-800 p-2 rounded-full cursor-pointer">
                    <FontAwesomeIcon icon={readMore ? faEyeSlash : faEye} className="mr-2" />
                    {readMore ? 'Show Less' : 'Read More'}
                </button>
            </div>
        </section>
        <section id='Project' className='mx-2'>
            <h1 className='text-blue-600 section2 text-3xl md:text-6xl text-center mt-10 font-semibold'>Works</h1>
            <main className='place-content-center gap-6 md:gap-26 flex my-10 cursor-pointer'>
                <button onClick={() => setSelectedCategory('all')} className='bg-blue-100 font-semi text-xl md:text-4xl font-semibold text-blue-800 px-2 md:px-9 p-1 hover:text-white hover:bg-blue-800 transition-all rounded-xl shadow shadow-slate-100'>All</button>
                <button onClick={() => setSelectedCategory('Frontend')} className='border-2 bg-blue-100 font-semi border-blue-800 text-xl md:text-4xl font-semibold text-blue-800 px-2 md:px-9 p-1 hover:text-white hover:bg-blue-800 transition-all rounded-xl'>Frontend</button>
                <button onClick={() => setSelectedCategory('Backend')} className='border-2 bg-blue-100 font-semi border-blue-800 text-xl md:text-4xl font-semibold text-blue-800 cursor-pointer px-1 md:px-9 p-1 hover:text-white hover:bg-blue-800 transition-all rounded-xl'>Backend</button>
            </main>
            <div className='project grid md:grid-cols-2 mx-0 m-2 md:m-10 gap-5 text-white'>
                {selectedCategory === 'all' || selectedCategory === 'Backend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='https://favourite-plug.vercel.app'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={favorite} title='favorite image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>Favorite Gadget: E-commerce</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Next.Js</h2>
                            </div>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Full Stack</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>Next.js</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>Node.js</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>Prisma SQL</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> Built a full-featured E-commerce website use Next.js, Talwind, Node.js, and Prisma PostgreSQL for database</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://favourite-plug.vercel.app'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/Favourite-Plug'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Backend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='https://food-flow-dashboard.vercel.app'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={FoodFlowImg} title='foodflow-image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>FoodFlow: Restuarant Dashboard</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Next.Js</h2>
                            </div>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Full Stack</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>Tailwind</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>Next.js</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>Node.js</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> Built a full-featured restaurant dashboard with dynamic order creation, menu settings, inventory management, procurement tracking, and admin settings.</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://food-flow-dashboard.vercel.app'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/FoodFlow'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Backend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='https://healthcareservice-client.vercel.app'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={HealthCare} title='HealthCare-project' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>HealthCare: HealthCare Website</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>React</h2>
                            </div>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Full Stack</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>Tailwind</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>React.js</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>Node.js</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span>  Built healthcare platform with a focus on delivering a seamless user experience. Integrated secure backend APIs using Node.js to ensure data security and efficient performance.</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://healthcareservice-client.vercel.app/'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/healthcareservice'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Backend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='https://blog-three-gamma-51.vercel.app'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={BlogImg} title='Blog-Image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>Blog: Blog Website</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Vanila</h2>
                            </div>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Full Stack</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>HTML</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>CSS</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>Node.js</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> Designed and implemented a blog platform utilizing Vanilla JavaScript for the frontend, with Node.js, Express, and MongoDB for backend services and data management.</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://blog-three-gamma-51.vercel.app/'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/Blogs-website'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Frontend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='https://www.joyvinco.com.ng'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={JovincoImg} title='Jovinco-Image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>Joyvinco: Joyvinco Website</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>JavaScript</h2>
                            </div>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Frontend</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>HTML</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>CSS</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>JavaScript</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> Developed a fully responsive e-commerce website using pure HTML, CSS, and JavaScript, providing a user-friendly shopping experience and seamless navigation.</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://www.joyvinco.com.ng'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/JoyVinco_E-commerce'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Frontend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='https://hotel-assesssment.akinolafemi.com.ng/'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={Hotel} title='Hotel-image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>Marian Hotel: Hotel Website</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>React</h2>
                            </div>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Frontend</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>Tailwind</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>React.js</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>Material UI</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> Created a single-page hotel booking platform using React. The project is focused on offering an intuitive user interface with fast, dynamic interactions for booking services.</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://hotel-assesssment.akinolafemi.com.ng/'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/Hotel-Assessment-Project'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Frontend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='https://www.akinolafemi.com.ng'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={portfolioImg} title='Portfolio-image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>Portfolio: My Portfolio</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Next.Js</h2>
                            </div>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Next.Js & TypeScript</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>HTML</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>CSS</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>JavaScript</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> Developed a personal portfolio website showcasing my skills, experience, and detailed information about my projects, designed to highlight my professional journey and accomplishments</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://www.akinolafemi.com.ng'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/Portfolio_Next.App'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Backend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='https://gym-client.vercel.app'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={GYMImg} title='Gym-image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>GYM: GYM Website</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Next.js</h2>
                            </div>
                            <div className='bg-white p-2 px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Frontend</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>Tailwind</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-2 md:px-3'>
                                <p>React.js</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>Next.js</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> Developed a full-stack GYM management system using TypeScript and the Next.js framework, integrating frontend and backend functionality to manage memberships, schedules, and payment processing.
                        </p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https:/.vercel.app'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/GyM'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Frontend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='Resturants/index.html'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={SnakeRestaurantImg} title='SnakeRestaurant-image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>Restaurant: Restaurant Website</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>JavaScript</h2>
                            </div>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Frontend</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>HTML</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>CSS</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>JavaScript</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> I developed a Power BI dashboard to track and analyze sales performance for a beauty store, focusing on metrics such as total sales, profit, order volume, and customer segments.</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='Resturants/restaurant.html'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center'href='https://github.com/Famzy077/Snake-Restaurants'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Frontend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='Music/index.html'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={MusicImg} title='Music-image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>Music App: Music App</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>JavaScript</h2>
                            </div>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Frontend</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>HTML</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>CSS</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>JavaScript</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> Enjoy seamless music streaming with this intuitive JavaScript-powered app. Discover your favorite tunes and playlists with ease.</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='Music/index.html'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href=''><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
               ) : null}
               {selectedCategory === 'all' || selectedCategory === 'Frontend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='Age_Calculator/AgeCalculator.html'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={AgeCalcImg} title='AgeCalculator-image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>Age Calc: Age Calculator App</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>JavaScript</h2>
                            </div>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Frontend</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>HTML</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>CSS</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>JavaScript</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> A simple, user-friendly tool that calculates exact age based on birthdate input. Displays years, months, and days, with responsive design for seamless use across devices.</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='Age_Calculator/AgeCalculator.html'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/Code-Alpha/tree/main/Code%20Alpha/Task%20Two/Music'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Frontend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='Pops_Up/index.html'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={PopupImg} title='Popup-image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>PopUp: PopUp Webpage</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>JavaScript</h2>
                            </div>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Frontend</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>HTML</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>CSS</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>JavaScript</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> I developed a dynamic pop-up modal with customizable content, triggered by user actions. Built for seamless integration into websites.</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='Pops_Up/index.html'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/Pop-up-'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
                {selectedCategory === 'all' || selectedCategory === 'Frontend' ? (
                <div className='p-5 mx-3 bg-blue-950 rounded-3xl relative'>
                    <Link href='Calculator-File/calculator.html'><LinkIcon size={20} className='absolute right-10 text-blue-800 bg-white p-[5px] cursor-pointer rounded-full top-3 w-[1.5rem] h-[1.5rem] md:w-[2rem] md:h-[2rem]'/></Link>
                    <div className='mt-10 mb-2'>
                        <Image className='rounded-2xl h-[fit-content] md:h-[19.5rem]' src={CalcImg} title='CalCulator-image' alt='project-image'/>
                    </div>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold'>Calculator: Calculator App</h1>
                        <p className='text-2xl font-semibold my-2'>Project Category</p>
                        <main className='flex gap-3'>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>JavaScript</h2>
                            </div>
                            <div className='bg-white p-2 px-2 md:px-4 rounded-full text-blue-800 flex items-center gap-2'>
                                <FontAwesomeIcon icon={faBriefcase} />
                                <h2>Frontend</h2>
                            </div>
                        </main>
                        <p className='text-2xl font-semibold my-3'>Technologies Used</p>
                        <div className='flex gap-3'>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>HTML</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>CSS</p>
                            </div>
                            <div className='bg-white text-blue-800 rounded-full p-1 px-3'>
                                <p>JavaScript</p>
                            </div>
                        </div>
                        <p className='text-white font-serif description'><span className='font-semibold'>Description:</span> I built a responsive calculator with basic to advanced arithmetic operations, featuring a sleek UI and keyboard input support</p>
                        <div className=' text-white text-xl md:text-2xl font- rounded-xl flex justify-around my-2 mt-5'>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='Calculator-File/calculator.html'><LinkIcon className='text-white mr-3'/>View</Link>
                            <Link className='bg-black text-white px-3 md:px-6 p-1 rounded-xl text-center transition-transform duration-300 hover:scale-105 hover:bg-blue-600 flex items-center' href='https://github.com/Famzy077/Calculator-File'><Github size={24} className='text-white mr-3' />GitHub</Link>
                        </div>
                    </div>
                </div>
                ) : null}
            </div>
        </section>
        <p id='Experience'></p>
        <section>
            <h1 className='text-blue-800 section2 font-semibold text-4xl md:text-5xl text-center mt-20 md:mt-15 mb-0 md:mb-[-1.3rem]'>Experiences</h1>
            <main className='exprience p-5 md:p-10 grid grid-cols-1 gap-7 md:grid-cols-2 text-white'>
                <div className=' bg-blue-800 opacity-85 rounded-3xl pb-[2rem]'>
                    <div className='md:flex flex-wrap gap-5 p-3 md:p-6 justify-between'>
                        <div className='flex bg-blue-500 rounded-full p-2 items-center'>
                            <div>
                                <Image className='bg-transparent p-2 w-[3rem] h-[3rem] rounded-full' src={JobImg} alt='job-img'></Image>
                            </div>
                            <div>
                                <p className='text-2xl font-semibold'>TheFourDev</p>
                                <p>LA, Nigeria</p>
                            </div>
                        </div>
                        <div className='text-2xl font-semibold mt-[2rem] md:mt-0 bg-black text-white h-[3rem] rounded-full p-2'>
                            <p><FontAwesomeIcon className='pr-2' icon={faCalendar}/>2024 - Present</p>
                        </div>
                    </div>
                    <h1 className='my-2 pl-4 text-2xl font-semibold'><Laptop size={25} className='mr-3'/>Software Developer</h1>
                    <div>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>I build and deploy Joyvinco website from scratch, applying great user interface that meet user needs</p>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Applying all neccessary functionality to make it stand out as E-commerce website</p>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Strong understanding of E-commerce principles, user experience design, and team management</p>
                    </div>
                </div>
                <div className=' bg-blue-800 opacity-85 rounded-3xl pb-[2rem]'>
                    <div className='md:flex flex-wrap gap-5 p-3 md:p-6 justify-between'>
                        <div className='flex bg-blue-500 rounded-full p-2 items-center'>
                            <div>
                                <Image className='bg-transparent p-2 w-[3rem] h-[3rem] rounded-full' src={JobImg} alt='job-img'></Image>
                            </div>
                            <div>
                                <p className='text-2xl font-semibold'>Vooperative</p>
                                <p>LA, Nigeria</p>
                            </div>
                        </div>
                        <div className='text-2xl font-semibold mt-[2rem] md:mt-0 bg-black text-white h-[3rem] rounded-full p-2'>
                        <p><FontAwesomeIcon className='pr-2' icon={faCalendar}/>2024 - Present</p>
                        </div>
                    </div>
                    <h1 className='my-2 pl-4 text-2xl font-semibold'><Laptop size={25} className='mr-3'/>Backend Engineer</h1>
                    <div>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Build scalable, secure backend systems using Python Django, and PostgreSQL.</p>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Collaborating with front-end developers to integrate APIs and database functionalities. </p>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Ensuring the reliability and performance of platforms.</p>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Build and maintain server-side logic, APIs, and database systems</p>
                    </div>
                </div>
                <div className=' bg-blue-800 opacity-85 rounded-3xl pb-[2rem]'>
                    <div className='md:flex flex-wrap gap-5 p-3 md:p-6 justify-between'>
                        <div className='flex bg-blue-500 rounded-full p-2 items-center'>
                            <div>
                                <Image className='bg-transparent p-2 w-[3rem] h-[3rem] rounded-full' src={JobImg} alt='job-img'></Image>
                            </div>
                            <div>
                                <p className='text-xl font-semibold'>Digital World Tech Academy</p>
                                <p>LA, Nigeria</p>
                            </div>
                        </div>
                        <div className='text-xm font-semibold mt-[2rem] md:mt-0 bg-black text-white h-[3rem] rounded-full p-2'>
                        <p><FontAwesomeIcon className='pr-2' icon={faCalendar}/>Jul/2024 - Oct/2024</p>
                        </div>
                    </div>
                    <h1 className='my-2 pl-4 text-2xl font-semibold'><Laptop size={25} className='mr-3'/>Web Developer (Intern)</h1>
                    <div>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Contributing to the team’s overall growth by sharing valuable resources and learning materials related to front-end developmentand and helping them understand the key concepts.</p>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Trained new students and interns on the basics of web development</p>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Implemented visual aids and technology-based learning tools to support student learning</p>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Monitored student improvement, productivity, attendance and followed up on absent</p>
                    </div>
                </div>
                <div className=' bg-blue-800 opacity-85 rounded-3xl pb-[2rem]'>
                    <div className='md:flex flex-wrap gap-5 p-3 md:p-6 justify-between'>
                        <div className='flex bg-blue-500 rounded-full p-2 items-center'>
                            <div>
                                <Image className='bg-transparent p-2 w-[3rem] h-[3rem] rounded-full' src={JobImg} alt='job-img'></Image>
                            </div>
                            <div>
                                <p className='text-2xl font-semibold'>Code Alpha</p>
                                <p>LA, Nigeria</p>
                            </div>
                        </div>
                        <div className='text-2xl font-semibold mt-[2rem] md:mt-0 bg-black text-white h-[3rem] rounded-full p-2'>
                        <p><FontAwesomeIcon className='pr-2' icon={faCalendar}/>June/2024 - Sept/2024</p>
                        </div>
                    </div>
                    <h1 className='my-2 pl-4 text-2xl font-semibold'><Laptop size={25} className='mr-3'/>Internship Program</h1>
                    <div>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Translating Figma designs into pixel-perfect interactive web interfaces using HTML, CSS, JavaScript and React.</p>
                        <p className='text-xl my-2 pl-4'> <Laptop size={24} className='mr-3 text-sm'/>Actively contributing to the development of key features using HTML, React.Js and Styled-Components Kept work area organized and clutter free.</p>
                    </div>
                </div>
            </main>
        </section>
        <div className='p-5 md:px-10 my-4 md:my-8'>
            <h1 className='text-5xl section2 text-center mt-4 mb-3 text-blue-800 font-bold md:mt-8'>Education</h1>
            <div className='grid md:grid-cols-2  gap-10'>
                <main className='bg-blue-200 rounded-3xl p-5 md:p-10 w-[100%]'>
                    <div className='flex-wrap md:flex justify-between'>
                        <p className='bg-black text-white text-xl md:text-2xl rounded-full p-2 pl-3'><FontAwesomeIcon className='pr-2 text-2xl' icon={faCalendar}/>2017 - 2023</p>
                        
                        <p className='bg-white mt-5 pl-3 md:mt-0 text-blue-800 font-semibold text-2xl rounded-full p-2'>High School</p>
                    </div>
                    <h1 className='my-4 flex gap-4 text-blue-900 items-center text-xl font-semibold'><FontAwesomeIcon className='bg-black text-white rounded-full text-xl p-2 w-[1.5rem] h-[1.5rem]' icon={faGraduationCap}/> O-level</h1>
                    <h1 className='my-4 flex gap-4 text-blue-900 items-center text-xl font-semibold'><FontAwesomeIcon className='bg-black text-white rounded-full text-xl w-[1.5rem] h-[1.5rem] p-2' icon={faLocationDot}/>YSEC Ogun State</h1>
                </main>
                <main className='bg-blue-200 rounded-3xl p-5 md:p-10 w-[100%]'>
                    <div className='flex-wrap md:flex justify-between'>
                        <p className='bg-black text-white text-xl md:text-2xl rounded-full p-2 pl-3'><FontAwesomeIcon className='pr-2 text-2xl' icon={faCalendar}/>2024 - 2024</p>
                        
                        <p className='bg-white mt-5 pl-3 md:mt-0 text-blue-800 font-semibold text-2xl rounded-full p-2'>Tech School</p>
                    </div>
                    <h1 className='my-4 flex gap-4 text-blue-900 items-center text-xl font-semibold'><FontAwesomeIcon className='bg-black text-white rounded-full text-xl p-2 w-[1.5rem] h-[1.5rem]' icon={faGraduationCap}/>Diploma</h1>
                    <h1 className='my-4 flex gap-4 text-blue-900 items-center text-xl font-semibold'><BookOpenCheck size={40} className='bg-black text-white rounded-full p-2'/>Full-Stack Development </h1>
                    <h1 className='my-4 flex gap-4 text-blue-900 items-center text-xl font-semibold'><FontAwesomeIcon className='bg-black text-white rounded-full text-xl w-[1.5rem] h-[1.5rem] p-2' icon={faLocationDot}/>DWT Lagos State</h1>
                </main>
                <main className='bg-blue-200 rounded-3xl p-5 md:p-10 w-[100%]'>
                    <div className='flex-wrap md:flex justify-between'>
                        <p className='bg-black text-white text-xl md:text-2xl rounded-full p-2 pl-3'><FontAwesomeIcon className='pr-2 text-2xl' icon={faCalendar}/>2024 - 2024</p>
                        <p className='bg-white mt-5 pl-3 md:mt-0 text-blue-800 font-semibold text-2xl rounded-full p-2'>University</p>
                    </div>
                    <h1 className='my-4 flex gap-4 text-blue-900 items-center text-xl font-semibold'><FontAwesomeIcon className='bg-black text-white rounded-full text-xl p-2 w-[1.5rem] h-[1.5rem]' icon={faGraduationCap}/>National Open University Of Nigeria</h1>
                    <h1 className='my-4 flex gap-4 text-blue-900 items-center text-xl font-semibold'><BookOpenCheck size={40} className='bg-black text-white rounded-full text-xl p-2'/>BSC Computer Science</h1>
                    <h1 className='my-4 flex gap-4 text-blue-900 items-center text-xl font-semibold'><FontAwesomeIcon className='bg-black text-white rounded-full text-xl w-[1.5rem] h-[1.5rem] p-2' icon={faLocationDot}/>Lagos Study Center</h1>
                </main>
            </div>
        </div>
        <section className='my-[4rem]'>
            <p id='Contact'></p>
            <h1 className='text-5xl text-center section2  text-blue-600 font-semibold'>Contact <span className='pl-2'>Me</span></h1>
            <main className='my-[2rem] mt-[-0.9rem] md:mt-[0.6rem] md:mb-[2rem] mb-0'>
                <div className='md:flex flex-wrap gap-5 justify-center p-3'>
                    <div className='md:my-0 my-[1rem]' >
                        <Link className='flex md:gap-[0.5rem] justify-between bg-white text-2xl font-semibold md:text-4xl items-center p-1 md:p-2 rounded-full' href='https://www.linkedin.com/in/akinola-femi077?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>
                            <Linkedin size={24} className='bg-blue-800 text-white p-2 w-[2.5rem] h-[2.5rem] rounded-full'/>
                            <h1 className='text-blue-800 px-4'>LinkedIn</h1>
                        </Link>
                    </div>
                    <div className='md:my-0 my-[1rem]' >
                        <Link className='flex md:gap-[0.5rem] px-2 justify-between bg-white text-2xl font-semibold md:text-4xl items-center p-1 md:p-2 rounded-full' href='https://x.com/famzy_Tech'>
                            <Twitter size={24} className='bg-black text-white p-2 w-[2.5rem] h-[2.5rem] rounded-full' />
                            <h1 className='text-black px-4'>Twitter</h1>
                        </Link>
                    </div>
                    <div className='md:my-0 my-[1rem]' >
                        <Link className='flex md:gap-[0.5rem] px-2 justify-between bg-white text-2xl font-semibold md:text-4xl items-center p-1 md:p-2 rounded-full' href='https://www.tiktok.com/@famzy_02?_t=ZM-8tbYEHIwDH3&_r=1'>
                            {/* <FontAwesomeIcon className='bg-red-700 text-white p-2 w-[2.5rem] h-[2.5rem] rounded-full' icon={faTiktok} /> */}
                            <h1 className='text-black px-4'>Tiktok</h1>
                        </Link>
                    </div>
                    <div className='md:my-0 my-[1rem] mb-0' >
                        <Link className='flex md:gap-[0.5rem] px-2 justify-between bg-white text-2xl font-semibold md:text-4xl items-center p-1 md:p-2 rounded-full' href='https://github.com/Famzy077'>
                            <Github size={24} className='bg-black text-white p-2 w-[2.5rem] h-[2.5rem] rounded-full' />
                            <h1 className='text-black px-4'>Github</h1>
                        </Link>
                    </div>
                </div>
                <div className='md:flex flex-wrap gap-5 justify-center p-3'>
                    <div className='md:my-0 mt-0 mb-[1rem]' >
                        <Link className='flex md:gap-[0.5rem] px-2 justify-between bg-white text-2xl font-semibold md:text-4xl items-center p-1 md:p-2 rounded-full' href='https://web.facebook.com/famzyCode/'>
                            <Facebook className='bg-blue-800 text-white p-2 w-[2.5rem] h-[2.5rem] rounded-full' size={24} />
                            <h1 className='text-blue-800 px-4'>Facebook</h1>
                        </Link>
                    </div>
                    <div className='md:my-0 mt-[1rem]' >
                        <Link className='flex md:gap-[0.5rem] px-2 justify-between bg-white text-2xl font-semibold md:text-4xl items-center p-1 md:p-2 rounded-full' href='https://t.me/Famzy07'>
                            {/* < className='bg-blue-700 text-white p-2 w-[2.5rem] h-[2.5rem] rounded-full' /> */}
                            <h1 className='text-blue-700 px-4'>Telegram</h1>
                        </Link>
                    </div>
                    <div className='md:my-0 my-[1rem]' >
                        <Link className='flex md:gap-[0.5rem] px-2 justify-between bg-white text-2xl font-semibold md:text-4xl items-center p-1 md:p-2 rounded-full' href='mailto:akinolafemi573@gmail.com'>
                            <Mail size={24} className='bg-gray-600 text-white p-2 w-[2.5rem] h-[2.5rem] rounded-full' />
                            <h1 className='text-gray-600 px-4'>Email</h1>
                        </Link>
                    </div>
                </div>
            </main>
        </section>
        <footer>
            <footer className='flex bg-blue-800 my-[2rem] items-center md:text-3xl font-semibold border-2 border-blue-800 p-5 px-10 rounded-full justify-between mx-[2.3rem] md:mx-[10rem]'>
                <div className=' md:w-[60px] border-2 border-white w-[52px] h-[52px] md:h-[60px] place-items-center place-content-center rounded-full bg-black'>
                    <h1 className='section2 text-white text-2xl md:text-3xl font-semibold cursor-pointercls'>AF</h1>
                </div>
                <div className='font-light text-white'>
                    <h1>Designed and Built by Akinola Femi</h1>
                </div>
            </footer>
            <p className='text-center max-sm:text-xl text-2xl my-3'>{`© copy ${date} Akinola Femi all right reserved `}</p>
        </footer>
        {children}
    </div>
  )
}
const date = new Date().getFullYear();
export default Home
