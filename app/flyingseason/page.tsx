'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Position = { top: number; left: number };
type TrailItem = Position & { id: number };

export default function FlyingSeasonPage() {
  const [season, setSeason] = useState('spring');
  const [trail, setTrail] = useState<TrailItem[]>([]);

  const birdPositions: Record<string, Position> = {
    spring: { top: 360, left: 130 },
    summer: { top: 230, left: 145 },
    fall: { top: 348, left: 133 },
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
          }, 1000);
        }, i * interval);
      }

      prevSeasonRef.current = season;
    }
  }, [season]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Flying Season – Rufous Hummingbird Migration
      </h1>

      <div className="relative w-[530px] h-[600px] overflow-hidden rounded border border-white">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/North america.png')",
            backgroundSize: 'auto 100%',
            backgroundPosition: '105% center',
          }}
        />

        <AnimatePresence>
          {trail.map((pos) => (
            <motion.div
              key={pos.id}
              className="absolute pointer-events-none"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{
                top: `${pos.top}px`,
                left: `${pos.left}px`,
                zIndex: 1,
              }}
            >
              <div className="w-4 h-4 rounded-full bg-black/70 shadow-md blur-sm" />
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
            duration: 1.2,
            ease: 'easeInOut',
          }}
          style={{
            zIndex: 10,
            position: 'absolute',
          }}
        >
          <Image
            src="/roufus hummingbird.png"
            alt="Rufous Hummingbird"
            width={50}
            height={50}
          />
        </motion.div>
      </div>

      <div className="flex gap-4 mt-6">
        {['spring', 'summer', 'fall', 'winter'].map((s) => (
          <button
            key={s}
            onClick={() => setSeason(s)}
            className={`px-4 py-2 rounded transition ${
              season === s ? 'bg-green-600' : 'bg-white/20 hover:bg-white/40'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-white/70 max-w-md">
        Choose a season to see where the Rufous Hummingbird migrates.
      </p>
    </main>
  );
}
