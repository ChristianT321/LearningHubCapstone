'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Season = 'spring' | 'summer' | 'fall' | 'winter';

const seasonData: Record<Season, { fish: string; description: string; image: string; funFact: string }[]> = {
  spring: [
    {
      fish: 'Herring',
      description: 'Herring spawn in massive schools, releasing eggs that stick to kelp.',
      image: '/herring.png',
      funFact: 'One herring can lay up to 20,000 eggs!',
    },
    {
      fish: 'Salmon Fry',
      description: 'Young salmon begin their journey downstream.',
      image: '/salmonfry.jpg',
      funFact: 'Some salmon spend over a year in freshwater before going to sea.',
    },
  ],
  summer: [
    {
      fish: 'Eulachon',
      description: 'These small oily fish return to rivers to spawn, attracting eagles and bears.',
      image: '/eulachon.jpg',
      funFact: 'Eulachon are nicknamed "candlefish" because they’re so oily they can burn like candles.',
    },
  ],
  fall: [
    {
      fish: 'Salmon',
      description: 'Adult salmon return upstream to spawn and die, feeding the entire ecosystem.',
      image: '/salmon.png',
      funFact: 'Their bodies feed over 130 species — even trees absorb salmon nutrients!',
    },
  ],
  winter: [
    {
      fish: 'Rockfish',
      description: 'Rockfish hunker down in reef crevices, barely moving during the cold months.',
      image: '/rockfish.jpg',
      funFact: 'Some rockfish live over 100 years!',
    },
  ],
};

export default function FishSeasonPage() {
  const [season, setSeason] = useState<Season>('spring');
  const [casting, setCasting] = useState(false);
  const [caughtFish, setCaughtFish] = useState<typeof seasonData.spring[0] | null>(null);

  const handleCast = () => {
    setCaughtFish(null);
    setCasting(true);
    setTimeout(() => {
      const fishOptions = seasonData[season];
      const fish = fishOptions[Math.floor(Math.random() * fishOptions.length)];
      setCaughtFish(fish);
      setCasting(false);
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 text-white flex flex-col items-center justify-start py-12 px-6">
      <h1 className="text-3xl md:text-5xl font-bold mb-6">🎣 Seasonal Fishing</h1>

      <div className="flex gap-4 mb-8">
        {(['spring', 'summer', 'fall', 'winter'] as Season[]).map((s) => (
          <button
            key={s}
            onClick={() => {
              setSeason(s);
              setCaughtFish(null);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              s === season ? 'bg-green-500 text-white' : 'bg-white/20 hover:bg-white/40'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative w-[200px] h-[200px] mb-6">
        <motion.div
          initial={false}
          animate={casting ? { rotate: [0, 60, -20, 0] } : { rotate: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="origin-top-left absolute top-0 left-0"
        >
          <Image src="/fishing-rod.png" alt="Fishing Rod" width={200} height={200} />
        </motion.div>
      </div>

      <button
        onClick={handleCast}
        disabled={casting}
        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition disabled:opacity-50 mb-8"
      >
        {casting ? 'Casting...' : 'Cast Line'}
      </button>

      <AnimatePresence mode="wait">
        {caughtFish && (
          <motion.div
            key={caughtFish.fish}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 border border-white/20 rounded-xl p-6 w-full max-w-[600px] shadow-lg flex flex-col items-center"
          >
            <Image
              src={caughtFish.image}
              alt={caughtFish.fish}
              width={300}
              height={300}
              className="object-contain mb-4"
            />
            <h2 className="text-2xl font-bold">{caughtFish.fish}</h2>
            <p className="mt-2 text-lg">{caughtFish.description}</p>
            <p className="mt-4 text-sm italic text-white/80">💡 {caughtFish.funFact}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <Link href="/fishfacts">
        <button className="mt-10 bg-white text-blue-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition">
          Continue
        </button>
      </Link>
    </main>
  );
}
