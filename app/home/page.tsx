'use client'

import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useRouter } from 'next/navigation'
import { Anchor, Container, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { FaChartLine, FaDove, FaPaw, FaTree, FaFish } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion';

type Hotspot = {
  id: string
  label: string
  top: string
  left: string
  fact: string
  imgSrc?: string
  position?: { x: number; y: number }
}

const hotspots: Hotspot[] = [
  {
    id: 'bear',
    label: 'Spirit Bear Habitat',
    top: '85%',
    left: '20%',
    fact: 'Spirit Bears are rare white-furred black bears that live only in the Great Bear Rainforest.',
    imgSrc: '/Spirit bear.jpg',
  },
  {
    id: 'eagle',
    label: "Eagle's Nest",
    top: '38%',
    left: '60%',
    fact: 'Bald Eagles nest high in tall trees or cliffs and hunt fish in coastal waters.',
    imgSrc: '/Bald eagle.jpg',
  },
  {
    id: 'salmon',
    label: 'Salmon Stream',
    top: '96%',
    left: '86%',
    fact: 'Salmon return to freshwater streams to spawn, feeding many animals along the way.',
    imgSrc: '/salmon.jpg',
  },
  {
    id: 'cedar',
    label: 'Red Cedar Grove',
    top: '70%',
    left: '70%',
    fact: 'Western Red Cedar trees can grow for over 1,000 years and are sacred to Indigenous cultures.',
    imgSrc: '/red cedar.jpg',
  },
]

const footerLinks = [
  { link: 'https://www.youtube.com/watch?v=7ziMmDmCFbI', label: 'Videos' },
  { link: 'https://pacificwild.org/from-land-to-sea-great-bear-rainforest-story-map/', label: 'Learn' },
];

const headerLinks = [
  { link: '/module1', label: 'Module 1', icon: FaPaw },
  { link: '/module2', label: 'Module 2', icon: FaFish }, // Changed from FaWater to FaFish
  { link: '/module3', label: 'Module 3', icon: FaDove},
  { link: '/module4', label: 'Module 4', icon: FaTree },
];

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

export default function HomePage() {
  const router = useRouter()
  const [progress, setProgressState] = useState<{ [key: string]: boolean }>({});
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(headerLinks[0].link);
  const [progressDropdownOpen, setProgressDropdownOpen] = useState(false);

  const toggleProgressDropdown = () => {
    setProgressDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  if (currentUser?.id) {
    getProgress(currentUser.id).then((data) => setProgressState(data));
  }
}, []);

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
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #f59e0b, #d97706, #b45309)',
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

  const footerItems = footerLinks.map((link) => (
    <motion.button
      key={link.label}
      onClick={() => window.open(link.link, '_blank')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-4 py-2 text-white text-lg font-bold transition-all duration-300"
      style={{
        borderRadius: '12px',
        border: '2px solid transparent',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #f59e0b, #d97706, #b45309)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {link.label}
    </motion.button>
  ));

  const handleSignOut = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  const handleContinue = () => {
    router.push('/module1')
  }

  return (
    <div className="min-h-screen flex flex-col">
    <main className="flex-grow relative w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4" style={{ paddingTop: '80px' }}>

      {/* Header with original FaPaw logo */}
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
          borderBottom: '1px solid rgba(245, 158, 11, 0.3)'
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
            <FaPaw className="text-yellow-400 text-2xl" />
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
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #f59e0b, #d97706, #b45309)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <FaChartLine className="text-yellow-300"/> Progress Tracker
            </motion.button>
            
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
                    border: '1px solid rgba(245, 158, 11, 0.2)',
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
                        borderBottom: '1px solid rgba(245, 158, 11, 0.1)',
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
          src="/GBR home back.png"
          alt="Home Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-8 mb-2">
            Welcome to the Great Bear Rainforest Learning Hub!
          </h1>
          <FaPaw className="text-yellow-400 text-4xl mb-4" />
          <h2 className="text-3xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-8">
            Your number one source for learning about the Great Bear Rainforest!
          </h2>
        </motion.div>

        <div className="relative w-full max-w-6xl mx-auto mt-8 p-4"
          onClick={() => setActiveHotspot(null)}
        >
          {/* Map Container */}
          <div 
            className="relative w-full h-[600px] rounded-lg shadow-lg overflow-hidden"
            style={{
              border: '3px solid transparent',
              borderRadius: '16px',
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #f59e0b, #d97706, #b45309)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              padding: '4px'
            }}
            id="map-container"
          >
            <div className="bg-amber-900 bg-opacity-70 p-4 rounded-[12px] h-full">
              <img
                src="/rainforest.jpg"
                alt="Great Bear Rainforest Map"
                className="w-full h-full object-cover rounded-md"
                draggable={false}
              />

              {/* Static Hotspot Dots */}
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  className="absolute bg-green-700 rounded-full w-8 h-8 border-2 border-white shadow-md hover:bg-green-500 transition-colors"
                  style={{ 
                    top: spot.top, 
                    left: spot.left, 
                    transform: 'translate(-50%, -50%)',
                    transition: 'background-color 0.3s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const mapRect = (document.getElementById('map-container') as HTMLElement).getBoundingClientRect();
                    const btnRect = e.currentTarget.getBoundingClientRect();
                    const relativeX = btnRect.left - mapRect.left;
                    const relativeY = btnRect.top - mapRect.top;
                    setActiveHotspot({
                      ...spot,
                      position: { x: relativeX, y: relativeY },
                    });
                  }}
                  title={spot.label}
                />
              ))}
            </div>
          </div>

          {/* Smooth Popup Modal */}
          <AnimatePresence>
            {activeHotspot?.position && (
              <motion.div
                className="absolute z-50 bg-white rounded-lg shadow-xl w-80 overflow-hidden"
                style={{
                  top: `${Math.min(activeHotspot.position.y, 600 - 220)}px`,
                  left: `${Math.min(activeHotspot.position.x, 960 - 340)}px`,
                }}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  duration: 0.2
                }}
              >
                <motion.button
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>

                <div className="p-4">
                  <motion.h2 
                    className="text-xl font-bold mb-2 text-green-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    {activeHotspot.label}
                  </motion.h2>
                  
                  {activeHotspot.imgSrc && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15, duration: 0.25 }}
                    >
                      <img
                        src={activeHotspot.imgSrc}
                        alt={activeHotspot.label}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                    </motion.div>
                  )}
                  
                  <motion.p 
                    className="text-gray-700 text-sm"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  >
                    {activeHotspot.fact}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl px-4 py-9">
          <motion.p 
            className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-8 p-4 rounded-lg"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '2px solid rgba(245, 158, 11, 0.3)',
              backdropFilter: 'blur(4px)'
            }}
          >
            Get ready to explore one of the coolest places on Earth! This website is made just for kids like you to learn all about the animals, trees, people, and secrets of the Great Bear Rainforest. 
            You'll play fun games, take quizzes, earn badges, and unlock new levels as you learn. Start your adventure and see how much you can discover!
          </motion.p>

          <div className="flex gap-6 mb-12">
            <motion.button
              onClick={handleContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold px-6 py-3"
              style={{
                borderRadius: '12px',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #f59e0b, #d97706, #b45309)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span className="relative z-10">Continue Learning</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 hover:opacity-20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold px-6 py-3"
              style={{
                borderRadius: '12px',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #b45309, #78350f)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span className="relative z-10">Sign Out</span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 hover:opacity-20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </div>
      </div>
      </main>
      {/* Footer */}
      <motion.footer
        className="w-full"
        style={{
          position: 'relative',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderTop: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '16px 0',
        }}
      >

        <Container

          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {footerItems}
        </Container>
      </motion.footer>
</div>
  )
}