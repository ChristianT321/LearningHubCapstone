//used chatgpt to help with the header and the photo carousel
'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { FaDove, FaPaw, FaWater, FaTree, FaChartLine } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const router = useRouter()

  const headerLinks = [
    { link: '/module1', label: 'Module 1', icon: FaPaw },
    { link: '/module2', label: 'Module 2', icon: FaWater },
    { link: '/module3', label: 'Module 3', icon: FaDove},
    { link: '/module4', label: 'Module 4', icon: FaTree },
  ];
  
  const [active, setActive] = useState(headerLinks[0].link);
  const [expandedFact, setExpandedFact] = useState<number | null>(null);

  const moduleList = ['Module 1', 'Module 2', 'Module 3', 'Module 4']

  const getProgress = (): { [key: string]: boolean } => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('progress');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  };

  const [progressDropdownOpen, setProgressDropdownOpen] = useState(false);
  const [progress, setProgressState] = useState<{ [key: string]: boolean }>({});
  
  const toggleProgressDropdown = () => {
    setProgressDropdownOpen((prev) => !prev);
  };
  
  useEffect(() => {
    setProgressState(getProgress());
  }, []);

  const handleContinue = () => {
    router.push('/flyingseason')
  }

  const slides = [
    {
      image: '/Bald eagle.jpg',
      alt: 'Bald Eagle diving',
      desc: 'Bald eagles can spot fish from hundreds of feet in the air'
    },
    {
      image: '/ghowl.jpg',
      alt: 'Great Horned Owl',
      desc: 'Owls hunt silently with specialized feathers'
    },
    {
      image: '/Hummingbird.jpg',
      alt: 'Rufous Hummingbird',
      desc: 'Hummingbirds migrate thousands of miles annually'
    },
    {
      image: '/Duck.webp',
      alt: 'Duck',
      desc: 'Ducks have waterproof feathers'
    }
  ]

  const facts = [
    {
      title: "Bald eagles dive into the water to catch fish",
      details: [
        "They can reach speeds of 100 mph when diving",
        "Eagles mate for life and return to the same nest each year",
        "Their nests can weigh up to 1,000 pounds"
      ]
    },
    {
      title: "Great horned owls hunt at night using silent wings and sharp hearing",
      details: [
        "Their hearing is 10 times more sensitive than humans",
        "Special feather edges allow completely silent flight",
        "They can rotate their heads 270 degrees"
      ]
    },
    {
      title: "Rufous hummingbirds migrate thousands of miles every summer",
      details: [
        "They travel from Mexico to Alaska each year",
        "Their wings beat up to 70 times per second",
        "They consume more than their weight in nectar daily"
      ]
    },
    {
      title: "Each duck has a unique quack",
      details: [
        "Ducks can recognize each other by their quacks",
        "They have waterproof feathers due to special oil glands",
        "Some duck species can dive up to 60 feet underwater"
      ]
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
        active === link ? 'bg-blue-800 shadow-md' : 'bg-blue-800'
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
            <FaDove className="text-yellow-400 text-2xl" />
            <h1 className="text-white text-xl font-bold">Great Bear Rainforest</h1>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            {headerItems}
            <motion.button
              onClick={toggleProgressDropdown}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-lg font-bold transition-all duration-300 bg-blue-800"
            >
              <FaChartLine className="text-yellow-300"/> Progress Tracker
            </motion.button>
            {/* Dropdown */}
            {progressDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  zIndex: 999,
                  minWidth: '180px',
                }}
              >
                {moduleList.map((mod) => (
                  <div
                    key={mod}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '6px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span style={{ marginRight: '8px' }}>
                      {progress[mod] ? '✅' : '⬜️'}
                    </span>
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            )}
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
          {facts.map((fact, index) => (
            <motion.li
              key={index}
              className="bg-blue-800 bg-opacity-60 rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => setExpandedFact(expandedFact === index ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-yellow-400 text-2xl drop-shadow">
                    <FaDove className="text-2xl"/>
                  </span>
                  <span className="text-white text-lg font-semibold drop-shadow-[1px_1px_0px_black] text-left">
                    {fact.title}
                  </span>
                </div>
              </div>
              
              {expandedFact === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-blue-700 bg-opacity-70"
                >
                  <ul className="p-4 pt-0 space-y-2">
                    {fact.details.map((detail, i) => (
                      <li key={i} className="text-white text-left pl-8">
                        • {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
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