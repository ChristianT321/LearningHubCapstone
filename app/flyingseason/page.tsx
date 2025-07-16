'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function FlyingSeasonPage() {
  const [season, setSeason] = useState('spring');

  const birdPositions: Record<string, { top: string; left: string }> = {
    spring: { top: '60%', left: '24%' },
    summer: { top: '38%', left: '27%' },
    fall:   { top: '58%', left: '25%' },
    winter: { top: '86%', left: '37%' },
  };

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

        {season && (
          <Image
            src="/roufus hummingbird.png"
            alt="Rufous Hummingbird"
            width={50}
            height={50}
            className="absolute"
            style={{
              top: birdPositions[season].top,
              left: birdPositions[season].left,
            }}
          />
        )}
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
