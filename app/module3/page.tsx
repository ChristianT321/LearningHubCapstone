'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { FaDove, FaPaw, FaTree, FaChartLine, FaFish } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const router = useRouter()
  const pathname = usePathname()

  const headerLinks = [
    { link: '/module1', label: 'Module 1', icon: FaPaw },
    { link: '/module2', label: 'Module 2', icon: FaFish },  // Fixed - using FaFish
    { link: '/module3', label: 'Module 3', icon: FaDove },
    { link: '/module4', label: 'Module 4', icon: FaTree },
  ];
  
  // Initialize active state based on current path
  const [active, setActive] = useState(pathname || headerLinks[2].link);
  const [expandedFact, setExpandedFact] = useState<number | null>(null);

  const moduleList = ['Module 1', 'Module 2', 'Module 3', 'Module 4']

  const getProgress = async (studentId: number): Promise<{ [key: string]: boolean }> => {
  try {
    const res = await fetch(`http://localhost:3001/progress/${studentId}`);
    if (!res.ok) throw new Error('Failed to fetch progress');
    const data = await res.json();
    return {
      'Module 1': data.module1_complete,
      'Module 2': data.module2_complete,
      'Module 3': data.module3_complete,
      'Module 4': data.module4_complete,
    };
  } catch (err) {
    console.error('Error loading progress:', err);
    return {};
  }
};


  const [progressDropdownOpen, setProgressDropdownOpen] = useState(false);
  const [progress, setProgressState] = useState<{ [key: string]: boolean }>({});
  
  const toggleProgressDropdown = () => {
    setProgressDropdownOpen((prev) => !prev);
  };
  
  useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (currentUser?.id) {
    getProgress(currentUser.id).then((data) => setProgressState(data));
  }
}, []);

  const handleContinue = () => {
    router.push('/flyingseason')
  }

  const slides = [
    {
      image: '/bald eagle hunting.jpg',
      alt: 'Bald Eagle diving',
      desc: 'Bald eagles can spot fish from hundreds of feet in the air'
    },
    {
      image: '/Great horned owl hunting.jpg',
      alt: 'Great Horned Owl',
      desc: 'Owls hunt silently with specialized feathers'
    },
    {
      image: '/Hummingbird hovering.jpg',
      alt: 'Rufous Hummingbird',
      desc: 'Hummingbirds migrate thousands of miles annually'
    },
    {
      image: '/Harlequin duck feeding.jpg',
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
      className={`flex items-center gap-2 px-4 py-2 text-white text-lg font-bold transition-all duration-300`}
      style={{
        borderRadius: '12px',
        border: '2px solid transparent',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #60a5fa, #3b82f6, #2563eb)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Icon className="text-yellow-300" />
      {label}
      {active === link && (
        <motion.span 
          className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-300"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
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
          borderBottom: '1px solid rgba(100, 200, 255, 0.3)'
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', position: 'relative' }}>
            {headerItems}
            <motion.button
              onClick={toggleProgressDropdown}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-white text-lg font-bold transition-all duration-300"
              style={{
                borderRadius: '12px',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #60a5fa, #3b82f6, #2563eb)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <FaChartLine className="text-yellow-300"/> Progress Tracker
            </motion.button>
            
            {/* Dropdown with smooth animations */}
            <AnimatePresence>
              {progressDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  style={{
                    position: 'absolute',
                    top: '110%',
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '12px',
                    border: '1px solid rgba(100, 200, 255, 0.2)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
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
                        borderBottom: '1px solid rgba(100, 200, 255, 0.1)',
                      }}
                    >
                      <span style={{ marginRight: '8px' }}>
                        {progress[mod] ? '✅' : '⬜️'}
                      </span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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

        {/* Carousel with adjusted indicator dots */}
        <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden z-30 relative" 
          style={{
            border: '3px solid transparent',
            borderRadius: '16px',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #60a5fa, #3b82f6, #2563eb)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
            padding: '4px'
          }}>
          <div className="bg-blue-800 bg-opacity-70 p-4 rounded-[12px] h-full">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={5000}
              className="rounded-lg"
              renderIndicator={(onClickHandler, isSelected, index, label) => (
                <li
                  className={`inline-block mx-1.5 ${isSelected ? 'opacity-100' : 'opacity-50'}`}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  value={index}
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-label={`${label} ${index + 1}`}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isSelected ? 'linear-gradient(to right, #60a5fa, #3b82f6)' : 'rgba(255,255,255,0.5)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                />
              )}
            >
              {slides.map((slide, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="h-80 w-full object-cover"
                    style={{
                      width: '100%',
                      height: '400px',
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      border: '2px solid rgba(100, 200, 255, 0.3)'
                    }}
                  />
                  <p className="text-white text-lg font-semibold absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 bg-opacity-80 py-2 px-4 rounded-b-md">
                    {slide.desc}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>
          <style jsx global>{`
            .carousel .control-dots {
              bottom: -30px !important;
              margin: 0;
              padding: 0;
            }
          `}</style>
        </div>

        <p className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2 mt-8">
          In this module you will learn about:
        </p>

        <ul className="space-y-6 w-full max-w-2xl">
          {facts.map((fact, index) => (
            <motion.li
              key={index}
              className="rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                border: '2px solid transparent',
                borderRadius: '12px',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #60a5fa, #3b82f6, #2563eb)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="bg-blue-800 bg-opacity-60 rounded-[10px]">
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
                
                <AnimatePresence>
                  {expandedFact === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="bg-blue-700 bg-opacity-70 rounded-b-[10px]"
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
                </AnimatePresence>
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.button
          onClick={handleContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white font-bold px-6 py-3 mt-8 mb-12"
          style={{
            borderRadius: '12px',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #60a5fa, #3b82f6, #2563eb)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span className="relative z-10">Continue Learning</span>
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 hover:opacity-20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </main>
  )
}