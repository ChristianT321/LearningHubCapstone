// ChatGPT was used to help create the footer and header in a single file. 
// Within mantine they use a file for the creation and a css file for the customization so i asked chatgpt to help integrate them into one file.
// helped create the animated buttons
// also helped create the interactive map with the popups

'use client'

import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useRouter } from 'next/navigation'
import { Anchor, Container, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { FaChartLine, FaDove, FaPaw, FaTree, FaWater } from 'react-icons/fa'
import { motion } from 'framer-motion';


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

//links to educational things within the footer
const footerLinks = [
  { link: 'https://www.youtube.com/watch?v=7ziMmDmCFbI', label: 'Videos' },
  { link: 'https://pacificwild.org/from-land-to-sea-great-bear-rainforest-story-map/', label: 'Learn' },
];

//links to each module within the header
const headerLinks = [
  { link: '/module1', label: 'Module 1', icon: FaPaw },
  { link: '/module2', label: 'Module 2', icon: FaWater },
  { link: '/module3', label: 'Module 3', icon: FaDove},
  { link: '/module4', label: 'Module 4', icon: FaTree },
];

const moduleList = ['Module 1', 'Module 2', 'Module 3', 'Module 4']

const getProgress = (): { [key: string]: boolean } => {
  const saved = localStorage.getItem('progress');
  return saved ? JSON.parse(saved) : {};
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
      setProgressState(getProgress());
    }, []);

  const completedModules = moduleList.filter((mod) => progress[mod]);

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

  const items = footerLinks.map((link) => (
    <Anchor<'a'>
      key={link.label}
      href={link.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontSize: '18px',
        fontWeight: 600,
        color: 'white',
        backgroundColor: '#78350F', 
        padding: '8px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        marginRight: '12px',
        transition: 'all 0.3s ease',
        WebkitBackdropFilter: 'blur(6px)',

      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.backgroundColor = '#78350F'; 
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.backgroundColor = '#78350F';
      }}
    >
      {link.label}
    </Anchor>
  ));

  const handleSignOut = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  const handleContinue = () => {
    router.push('/module1')
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4" style={{paddingTop: '80px'}}>

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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
        <div style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>
          Welcome
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
            {headerItems}
            <motion.button
            onClick={toggleProgressDropdown}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-lg font-bold transition-all duration-300 bg-amber-900"
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
          src="/GBR home back.png"
          alt="Home Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl px-4">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-25 mb-2">
        <FaPaw className="text-yellow-400" />
          Welcome to the Great Bear Rainforest Learning Hub!
        </h1>
        <h2 className="text-3xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Your number one source for learning about the Great Bear Rainforest!
        </h2></div>

        <div className="relative w-full max-w-6xl mx-auto mt-8 p-4"
        onClick={() => setActiveHotspot(null)}
        >

      {/* Map Image */}
      <div className="relative w-full h-[600px] rounded-lg shadow-lg overflow-hidden border-4 border-green-700" id="map-container">
        <img
          src="/rainforest.jpg"
          alt="Great Bear Rainforest Map"
          className="w-full h-full object-cover"
          draggable={false}
        />

        {/* Hotspots */}
        {hotspots.map((spot) => (
          <button
          key={spot.id}
          className="absolute bg-green-700 rounded-full w-8 h-8 border-2 border-white shadow-md hover:bg-green-500 transition"
          style={{ top: spot.top, left: spot.left, transform: 'translate(-50%, -50%)' }}
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

      {/* Popup Modal */}
      {activeHotspot?.position && (
      <div
        className="absolute z-50 bg-white rounded-lg shadow-xl w-80 p-4 transition-all"
        style={{
          top: `${Math.min(activeHotspot.position.y, 600 - 220)}px`, 
          left: `${Math.min(activeHotspot.position.x, 960 - 340)}px`, 
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setActiveHotspot(null)}
          className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2 text-green-800">{activeHotspot.label}</h2>
        {activeHotspot.imgSrc && (
          <img
            src={activeHotspot.imgSrc}
            alt={activeHotspot.label}
            className="w-full h-40 object-cover rounded mb-3"
          />
        )}
        <p className="text-gray-700 text-sm">{activeHotspot.fact}</p>
      </div>
    )}
    </div>

    <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl px-4 py-9">
        <p className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Get ready to explore one of the coolest places on Earth! This website is made just for kids like you to learn all about the animals, trees, people, and secrets of the Great Bear Rainforest. 
          You’ll play fun games, take quizzes, earn badges, and unlock new levels as you learn. Start your adventure and see how much you can discover!
        </p>

        <button
          onClick={handleSignOut}
          className="fixed left-5 bottom-5 bg-amber-900 hover:bg-amber-900 text-white font-bold px-4 py-2 rounded shadow"
        >
          Sign Out
        </button>
        <button
          onClick={handleContinue}
          className="bg-amber-900 hover:bg-amber-900 hover:scale-105 transition-all duration-300 shadow-lg rounded px-6 py-3 text-white font-fun"
        >
          Continue
        </button>
      </div>
      
      <div
      style={{
        width: '100vw',                
        marginLeft: 'calc(-50vw + 50%)',
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderTop: '1px solid var(--mantine-color-gray-2)',
        paddingTop: '12px',
        paddingBottom: '12px',
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
          gap: '12px',
          }}
        >
        <Group 
          style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            
          }}
        >
          {items}
        </Group>
      </Container>
    </div>

    
    </main>
    
  )
}