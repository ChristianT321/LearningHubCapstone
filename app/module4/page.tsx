'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { FaTree, FaPaw, FaFish, FaDove, FaChartLine } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const router = useRouter()
  const pathname = usePathname()

  const headerLinks = [
    { link: '/module1', label: 'Module 1', icon: FaPaw },
    { link: '/module2', label: 'Module 2', icon: FaFish },
    { link: '/module3', label: 'Module 3', icon: FaDove },
    { link: '/module4', label: 'Module 4', icon: FaTree },
  ];
  
  // Initialize active state based on current path
  const [active, setActive] = useState(pathname || headerLinks[3].link);
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
    router.push('/treeseason')
  }

  const slides = [
    {
      image: '/red cedar.jpg',
      alt: 'Western Red Cedar',
      desc: 'Western Red Cedars can live for over 1,000 years'
    },
    {
      image: '/moss.jpg',
      alt: 'Rainforest Moss',
      desc: 'Moss acts as a natural sponge in the rainforest'
    },
    {
      image: '/nurse log.jpg',
      alt: 'Nurse Log',
      desc: 'Fallen trees become nurseries for new growth'
    },
    {
      image: '/old growth.jpg',
      alt: 'Old Growth Forest',
      desc: 'Ancient forests support unique ecosystems'
    }
  ]

  const facts = [
    {
      title: "The western red cedar can grow taller than a 20 story building",
      details: [
        "Some cedars reach heights of over 200 feet (60 meters)",
        "Their bark contains natural fungicides that resist decay",
        "Indigenous peoples call it the 'tree of life' for its many uses"
      ]
    },
    {
      title: "Moss helps to keep the rainforest damp",
      details: [
        "A single square meter of moss can hold up to 20 liters of water",
        "Moss regulates humidity and temperature in the forest",
        "Over 1,000 species of moss grow in the rainforest"
      ]
    },
    {
      title: "Rotting fallen trees help create new soil",
      details: [
        "Nurse logs can take 100+ years to fully decompose",
        "They provide nutrients for seedlings to grow",
        "Up to 30% of forest biomass is in decaying wood"
      ]
    },
    {
      title: "Old growth forests are hundreds of years old",
      details: [
        "Some trees in the forest were saplings when Columbus sailed",
        "Old growth supports species that can't live elsewhere",
        "Less than 10% of original old growth remains in the region"
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
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #16a34a, #15803d, #166534)',
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
          borderBottom: '1px solid rgba(134, 239, 172, 0.3)'
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
            <FaTree className="text-yellow-400 text-2xl" />
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
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #16a34a, #15803d, #166534)',
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
                    border: '1px solid rgba(134, 239, 172, 0.2)',
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
                        borderBottom: '1px solid rgba(134, 239, 172, 0.1)',
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
          src="/forest background.png"
          alt="Forest Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-8 mb-2">
          MODULE 4:
        </h1>
        <h2 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mb-8">
          RAINFOREST VEGETATION
        </h2>

        {/* Carousel with adjusted indicator dots */}
        <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden z-30 relative" 
          style={{
            border: '3px solid transparent',
            borderRadius: '16px',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #16a34a, #15803d, #166534)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
            padding: '4px'
          }}>
          <div className="bg-green-900 bg-opacity-70 p-4 rounded-[12px] h-full">
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
                    background: isSelected ? 'linear-gradient(to right, #16a34a, #15803d)' : 'rgba(255,255,255,0.5)',
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
                      border: '2px solid rgba(134, 239, 172, 0.3)'
                    }}
                  />
                  <p className="text-white text-lg font-semibold absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-700 to-green-800 bg-opacity-80 py-2 px-4 rounded-b-md">
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
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #16a34a, #15803d, #166534)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="bg-green-800 bg-opacity-60 rounded-[10px]">
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedFact(expandedFact === index ? null : index)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 text-2xl drop-shadow">
                      <FaTree className="text-2xl"/>
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
                      className="bg-green-700 bg-opacity-70 rounded-b-[10px]"
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
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #16a34a, #15803d, #166534)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span className="relative z-10">Continue Learning</span>
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 hover:opacity-20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </main>
  )
}