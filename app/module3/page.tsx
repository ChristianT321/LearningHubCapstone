'use client'

import { Button, Menu } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { FaHome, FaBook, FaDove, FaPaw, FaWater, FaTree } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function HomePage() {
  const router = useRouter()

  const headerLinks = [
      { link: '/module1', label: 'Module 1', icon: FaPaw },
      { link: '/module2', label: 'Module 2', icon: FaWater },
      { link: '/module3', label: 'Module 3', icon: FaDove},
      { link: '/module4', label: 'Module 4', icon: FaTree },
    ];
  
    const [active, setActive] = useState(headerLinks[0].link);

  const handleContinue = () => {
    router.push('/birdfacts')
  }

  const slides = [
    {
      image: '/bald-eagle.jpg',
      alt: 'Bald Eagle diving',
      desc: 'Bald eagles can spot fish from hundreds of feet in the air'
    },
    {
      image: '/great-horned-owl.jpg',
      alt: 'Great Horned Owl',
      desc: 'Owls hunt silently with specialized feathers'
    },
    {
      image: '/rufous-hummingbird.jpg',
      alt: 'Rufous Hummingbird',
      desc: 'Hummingbirds migrate thousands of miles annually'
    },
    {
      image: '/raven.jpg',
      alt: 'Raven',
      desc: 'Ravens are among the smartest birds'
    }
  ]

  const headerItems = headerLinks.map(({link, label, icon: Icon}) => (
      <motion.button
      key={label}
      onClick={(e) => {
        e.preventDefault();
        setActive(link);
        router.push(link);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-lg font-bold transition-all duration-300 ${
        active === link ? 'bg-amber-900 shadow-md' : 'bg-amber-900'
      }`}
    >
      <Icon className="text-yellow-300" />
      {label}
    </motion.button>
    ));

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4" style={{paddingTop: '80px'}}>

      {/* Header */}
        <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '72px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 1000,
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          padding: '12px, 0', 
        }}
      >
      <div
          style={{
            maxWidth: '1200px',
            height: '100%',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
        <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/home')}
          >
            <FaPaw className="text-yellow-400 text-2xl" />
            <h1 className="text-white text-xl font-bold">Great Bear Rainforest</h1>
          </motion.div>

        <div className="flex items-center gap-2">
            {headerItems}
          </div>
      </div>
    </header>

      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/sky background.png"
          alt="Sky Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-8 mb-2">
          MODULE 3:
        </h1>
        <h2 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mb-8">
          BIRDS OF THE RAINFOREST
        </h2>

        {/* Carousel */}
        <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg bg-blue-800 bg-opacity-70 p-4 z-30">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={5000}
            className="rounded"
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="relative">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-80 w-full object-cover rounded-md"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover', 
                    borderRadius: '12px'
                  }}
                />
                <p className="text-white text-lg font-semibold absolute bottom-0 left-0 right-0 bg-blue-600 bg-opacity-60 py-2 px-4">
                  {slide.desc}
                </p>
              </div>
            ))}
          </Carousel>
        </div>

        <p className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2 mt-8">
          In this module you will learn about:
        </p>

        <ul className="space-y-6 w-full max-w-2xl">
          {[
            "Bald eagles dive into the water to catch fish",
            "Great horned owls hunt at night using silent wings and sharp hearing",
            "Rufous hummingbirds migrate thousands of miles every summer",
            "Ravens are smart and steal food from other animals"
          ].map((fact, index) => (
            <motion.li
              key={index}
              className="bg-blue-800 bg-opacity-60 p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-blue-200 text-2xl drop-shadow">🦅</span>
                <span className="text-white text-lg font-semibold drop-shadow-[1px_1px_0px_black] text-left">
                  {fact}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.button
          onClick={handleContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded shadow mt-8 mb-12"
        >
          Continue Learning
        </motion.button>
      </div>
    </main>
  )
}