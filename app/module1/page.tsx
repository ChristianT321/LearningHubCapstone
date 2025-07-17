'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { FaPaw, FaWater, FaDove, FaTree, FaChartLine } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';

export default function HomePage() {
  const headerLinks = [
    { link: '/module1', label: 'Module 1', icon: FaPaw },
    { link: '/module2', label: 'Module 2', icon: FaWater },
    { link: '/module3', label: 'Module 3', icon: FaDove},
    { link: '/module4', label: 'Module 4', icon: FaTree },
  ];

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
  const [expandedFact, setExpandedFact] = useState<number | null>(null);
  
  const toggleProgressDropdown = () => {
    setProgressDropdownOpen((prev) => !prev);
  };
  
  useEffect(() => {
      setProgressState(getProgress());
    }, []);

  const [active, setActive] = useState(headerLinks[0].link);
  
  const router = useRouter()

  const handleContinue = () => {
    router.push('/groundanimalseason')
  }

  const facts = [
    {
      title: "Beavers are excellent builders and create dams that shape ecosystems.",
      details: [
        "A single beaver can cut down hundreds of trees each year.",
        "Beaver dams create wetlands that support diverse wildlife.",
        "Their teeth never stop growing and are orange due to iron content."
      ]
    },
    {
      title: "Vancouver Wolves are key predators maintaining forest health.",
      details: [
        "Wolf packs typically consist of 5-10 members.",
        "They can travel up to 50km in a single day when hunting.",
        "Wolves communicate through howls, body language, and scent marking."
      ]
    },
    {
      title: "Spirit Bears are a rare subspecies of black bears with white fur.",
      details: [
        "Only about 1 in 10 black bears in the region are Spirit Bears.",
        "Their white fur provides camouflage when fishing for salmon.",
        "Spirit Bears hold cultural significance for Indigenous peoples."
      ]
    }
  ]

  const slides = [
    {
      image: '/beaver.jpg',
      alt: 'Beaver building dam',
      desc: 'Beavers are nature\'s engineers, creating complex dams',
    },
    {
      image: '/vancouver wolf.jpg',
      alt: 'Vancouver Wolf',
      desc: 'Wolves play a crucial role in the ecosystem',
    },
    {
      image: '/spirit bear.jpg',
      alt: 'Spirit Bear',
      desc: 'The rare white Spirit Bear is unique to this region',
    },
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
            height: '100%',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo and title */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/home')}
          >
            <FaPaw className="text-yellow-400 text-2xl" />
            <h1 className="text-white text-xl font-bold">Great Bear Rainforest</h1>
          </motion.div>

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
          src="/homeback.png"
          alt="Home Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-8 mb-2">
          MODULE 1:
        </h1>
        <h2 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mb-8">
          GROUND ANIMALS
        </h2>

        {/* Carousel */}
        <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg bg-amber-900 bg-opacity-70 p-4 z-30">
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
                <p className="text-white text-lg font-semibold absolute bottom-0 left-0 right-0 bg-green-700 bg-opacity-60 py-2 px-4">
                  {slide.desc}
                </p>
              </div>
            ))}
          </Carousel>
        </div>

        <p className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2 mt-8">
          Today we will be learning about:
        </p>

        <ul className="space-y-6 w-full max-w-2xl">
          {facts.map((fact, index) => (
            <motion.li
              key={index}
              className="bg-amber-900 bg-opacity-60 rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => setExpandedFact(expandedFact === index ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-green-300 text-2xl drop-shadow">🌿</span>
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
                  className="bg-amber-800 bg-opacity-70"
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

        <div className="flex gap-4 mt-8 mb-12">
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-900 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded shadow"
          >
            Continue Learning
          </motion.button>
        </div>
      </div>
    </main>
  )
}