'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDove } from 'react-icons/fa';
import '../globals.css';

type Position = { top: number; left: number };
type TrailItem = Position & { id: number };
type Bird = 'hummingbird' | 'eagle' | 'duck';

const migratoryBirdPositions: Record<Bird, Record<string, Position>> = {
  hummingbird: {
    spring: { top: 370, left: 130 },
    summer: { top: 230, left: 145 },
    fall: { top: 325, left: 133 },
    winter: { top: 516, left: 196 },
  },
  eagle: {
    spring: { top: 220, left: 130 },
    summer: { top: 150, left: 150 },
    fall: { top: 270, left: 140 },
    winter: { top: 340, left: 120 },
  },
  duck: {
    spring: { top: 200, left: 170 },
    summer: { top: 140, left: 120 },
    fall: { top: 210, left: 135 },
    winter: { top: 260, left: 140 },
  },
};

const migratoryBirdImages: Record<Bird, string> = {
  hummingbird: '/Hummingbird Cartoon.png',
  eagle: '/Bald Eagle Cartoon.png',
  duck: '/Harlequin Duck.png',
};

const trailGradientBySeason: Record<string, string> = {
  spring: 'bg-[radial-gradient(circle,_rgba(50,150,80,0.9)_0%,_rgba(30,100,50,0.6)_100%)]',
  summer: 'bg-[radial-gradient(circle,_rgba(0,80,0,0.95)_0%,_rgba(0,40,0,0.6)_100%)]',
  fall: 'bg-[radial-gradient(circle,_rgba(180,80,0,0.9)_0%,_rgba(100,40,0,0.6)_100%)]',
  winter: 'bg-[radial-gradient(circle,_rgba(80,180,255,0.9)_0%,_rgba(30,80,120,0.6)_100%)]',
};

const nonMigratoryBirds = [
  {
    name: "Steller's Jay",
    image: "/Steller's Jay.jpg",
    icon: '🌲',
    description:
      'This charismatic bird thrives year-round in the rainforest. It stores food in fall and becomes more vocal in spring, often mimicking other birds.',
    habitat: 'Rainforest',
    behavior: 'Vocal Mimic',
    bgColor: 'bg-yellow-300',
  },
  {
    name: 'Northern Spotted Owl',
    image: '/Owl.jpg',
    icon: '🌙',
    description:
      'A shy and elusive rainforest resident, this owl remains in dense old-growth forests year-round, roosting in shadows and hunting quietly at night.',
    habitat: 'Old-growth forest',
    behavior: 'Nocturnal Hunter',
    bgColor: 'bg-purple-200',
  },
  {
    name: 'Marbled Murrelet',
    image: '/marbled murrelet.webp',
    icon: '🌊',
    description:
      'Unusual among seabirds, this one nests high in rainforest trees but commutes to the ocean to feed. It stays close to the Great Bear coast year-round.',
    habitat: 'Forest Coast',
    behavior: 'Ocean Feeder',
    bgColor: 'bg-blue-200',
  },
  {
    name: 'Chestnut-backed Chickadee',
    image: '/Chestnut Chickadee2.webp',
    icon: '🍃',
    description:
      'This friendly little bird doesn’t travel far. It forages busily through mossy branches all seasons, often joining mixed-species flocks in winter.',
    habitat: 'Temperate Rainforest',
    behavior: 'Winter Forager',
    bgColor: 'bg-green-200',
  },
];

export default function FlyingSeasonPage() {
  const [season, setSeason] = useState('spring');
  const [selectedBird, setSelectedBird] = useState<Bird>('hummingbird');
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const router = useRouter();
  const prevSeasonRef = useRef(season);

  const toggleCard = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const prevSeason = prevSeasonRef.current;
    const from = migratoryBirdPositions[selectedBird][prevSeason];
    const to = migratoryBirdPositions[selectedBird][season];

    if (prevSeason !== season) {
      const steps = 14;
      const duration = 1200;
      const interval = duration / steps;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;

        setTimeout(() => {
          const trailDot: TrailItem = {
            top: from.top + (to.top - from.top) * t,
            left: from.left + (to.left - from.left) * t,
            id: Date.now() + i,
          };

          setTrail((prev) => [...prev, trailDot]);

          setTimeout(() => {
            setTrail((prev) => prev.filter((dot) => dot.id !== trailDot.id));
          }, 2000);
        }, i * interval);
      }

      prevSeasonRef.current = season;
    }
  }, [season, selectedBird]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start py-10 px-4">
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '72px', backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 1000, boxShadow: '0 2px 6px rgba(0,0,0,0.2)', padding: '10px 0' }}>
        <div style={{ height: '100%', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/home')}>
            <FaDove className="text-yellow-400 text-2xl" />
            <h1 className="text-white text-xl font-bold">Great Bear Rainforest</h1>
          </motion.div>
        </div>
      </header>

      <div className="fixed inset-0 z-0">
        <Image src="/sky background.png" alt="Sky Background" fill priority className="object-cover" style={{ objectPosition: 'center' }} />
      </div>

      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center z-10 mt-20">
        Flying Season – {selectedBird === 'hummingbird' ? 'Rufous Hummingbird' : selectedBird === 'eagle' ? 'Bald Eagle' : 'Harlequin Duck'} Migration
      </h1>

      <div className="relative w-[530px] h-[600px] overflow-hidden rounded-xl border border-white z-10 shadow-lg">
        <div className="absolute inset-0 z-0">
          <Image src="/waves.gif" alt="Waves" fill className="object-cover brightness-75" />
        </div>

        <div className="absolute inset-0 bg-no-repeat z-10" style={{ backgroundImage: "url('/North america.png')", backgroundSize: 'auto 100%', backgroundPosition: '105% center', filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))' }} />

        <AnimatePresence>
          {trail.map((pos) => (
            <motion.div key={pos.id} className="absolute pointer-events-none" initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 1.4 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease: 'easeOut' }} style={{ top: `${pos.top}px`, left: `${pos.left}px`, zIndex: 20 }}>
              <div className={`w-3 h-3 rounded-full blur-sm shadow-md ${trailGradientBySeason[season]}`} />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div className="absolute" animate={migratoryBirdPositions[selectedBird][season]} transition={{ duration: 1.1, ease: 'easeInOut' }} style={{ zIndex: 30 }}>
          <Image src={migratoryBirdImages[selectedBird]} alt={selectedBird} width={50} height={50} className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]" />
        </motion.div>
      </div>

      <div className="flex gap-4 mt-6 z-10">
        {['spring', 'summer', 'fall', 'winter'].map((s) => (
          <motion.button key={s} onClick={() => setSeason(s)} whileHover={{ scale: 1.07 }} className={`px-4 py-2 rounded transition font-medium ${season === s ? 'bg-green-600' : 'bg-white/20 hover:bg-white/40'}`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-4 mt-4 z-10">
        {(['hummingbird', 'eagle', 'duck'] as Bird[]).map((b) => (
          <motion.button key={b} onClick={() => setSelectedBird(b)} whileHover={{ scale: 1.07 }} className={`px-4 py-2 rounded transition font-medium ${selectedBird === b ? 'bg-blue-600' : 'bg-white/20 hover:bg-white/40'}`}>
            {b === 'hummingbird' ? 'Rufous Hummingbird' : b === 'eagle' ? 'Bald Eagle' : 'Harlequin Duck'}
          </motion.button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-white/70 max-w-md z-10">
        Choose a season and bird to see their migration path.
      </p>

      <section className="grid grid-cols-2 gap-8 py-16 px-4 bg-yellow-50 max-w-[600px] mt-16 rounded-xl z-10 shadow-md">
        {nonMigratoryBirds.map((bird, index) => (
          <div key={index} className="w-[230px] h-[380px] perspective" onClick={() => toggleCard(index)}>
            <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${flippedIndex === index ? 'rotate-y-180' : ''}`}>
              <div className="absolute w-full h-full backface-hidden bg-gray-300 border-yellow-500 border-[3px] rounded-[10px] flex items-center justify-center text-xl font-bold z-10">
                Click to Reveal
              </div>

              <div className={`absolute w-full h-full backface-hidden rotate-y-180 ${bird.bgColor} border-[3px] border-yellow-500 rounded-[10px] p-3 flex flex-col justify-between z-0`} style={{ fontFamily: 'Arial, sans-serif' }}>
                <div className="text-[18px] font-bold leading-none flex justify-between items-center px-[2px]">
                  <span>{bird.name}</span>
                  <span>{bird.icon}</span>
                </div>
          
                <div className="border-[3px] border-black bg-white mt-[4px] mb-[8px]">
                  <Image 
                    src={bird.image} 
                    alt={bird.name} 
                    width={220} 
                    height={130} 
                    className="object-cover w-full h-[130px]"
                  />
                </div>

                <div className="text-[13px] text-gray-800 bg-white border-[1px] border-black p-2 mb-1 shadow-sm rounded-sm">
                  {bird.description}
                </div>

                <div className="text-[12px] text-black pt-1 border-t-[1px] border-black mt-auto leading-tight">
                  <div className="flex justify-between px-1 pt-[4px]">
                    <span><strong>Habitat:</strong> {bird.habitat}</span>
                    <span><strong>Behavior:</strong> {bird.behavior}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}