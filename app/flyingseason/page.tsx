'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDove } from 'react-icons/fa';

type Position = { top: number; left: number };
type TrailItem = Position & { id: number };

export default function FlyingSeasonPage() {
  const [season, setSeason] = useState('spring');
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const router = useRouter();

  const birdPositions: Record<string, Position> = {
    spring: { top: 370, left: 130 },
    summer: { top: 230, left: 145 },
    fall: { top: 325, left: 133 },
    winter: { top: 516, left: 196 },
  };

  const prevSeasonRef = useRef(season);

  useEffect(() => {
    const prevSeason = prevSeasonRef.current;
    const from = birdPositions[prevSeason];
    const to = birdPositions[season];

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
  }, [season]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10 px-4">
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
          padding: '10px 0',
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
        </div>
      </header>

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

      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center z-10 mt-20">
        Flying Season – Rufous Hummingbird Migration
      </h1>

      <div className="relative w-[530px] h-[600px] overflow-hidden rounded-xl border border-white z-10 shadow-lg">
        <div className="absolute inset-0 z-0">
          <Image
            src="/waves.gif"
            alt="Waves"
            fill
            className="object-cover brightness-75"
          />
        </div>

        <div
          className="absolute inset-0 bg-no-repeat z-10"
          style={{
            backgroundImage: "url('/North america.png')",
            backgroundSize: 'auto 100%',
            backgroundPosition: '105% center',
            filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))',
          }}
        />

        <AnimatePresence>
          {trail.map((pos) => (
            <motion.div
              key={pos.id}
              className="absolute pointer-events-none"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                top: `${pos.top}px`,
                left: `${pos.left}px`,
                zIndex: 20,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-black/100 shadow-md blur-sm" />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          className="absolute"
          animate={{
            top: birdPositions[season].top,
            left: birdPositions[season].left,
          }}
          transition={{
            duration: 1.1,
            ease: 'easeInOut',
          }}
          style={{
            zIndex: 30,
            position: 'absolute',
          }}
        >
          <Image
            src="/roufus hummingbird.png"
            alt="Rufous Hummingbird"
            width={50}
            height={50}
            className="drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]"
          />
        </motion.div>
      </div>

      <div className="flex gap-4 mt-6 z-10">
        {['spring', 'summer', 'fall', 'winter'].map((s) => (
          <motion.button
            key={s}
            onClick={() => setSeason(s)}
            whileHover={{ scale: 1.07 }}
            className={`px-4 py-2 rounded transition font-medium ${
              season === s ? 'bg-green-600' : 'bg-white/20 hover:bg-white/40'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </motion.button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-white/70 max-w-md z-10">
        Choose a season to see where the Rufous Hummingbird migrates.
      </p>

      <motion.button
        onClick={() => router.push('/birdfacts')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-lg shadow mt-8 z-10"
      >
        Learn Bird Facts
      </motion.button>
    </main>
  );
}
