'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function CedarSeasonTest() {
  const [season, setSeason] = useState('summer');

  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-6">Western Red Cedar – Seasonal Effects</h1>

      <div className="relative w-full max-w-[1000px] aspect-[4/3] rounded-lg overflow-hidden border-4 border-white">
        <Image
          src="/western red cedar 3d2.jpg"
          alt="Western Red Cedar"
          fill
          className="object-cover"
          priority
        />

        {season === 'winter' && <div className="absolute inset-0 snow-animation pointer-events-none" />}
        {season === 'fall' && <div className="absolute inset-0 fall-animation pointer-events-none" />}
        {season === 'spring' && <div className="absolute inset-0 rain-animation pointer-events-none z-10" />}
        {season === 'summer' && <div className="absolute inset-0 sunshine-glow pointer-events-none" />}
      </div>

      <div className="flex gap-4 mt-6">
        {['spring', 'summer', 'fall', 'winter'].map((s) => (
          <button
            key={s}
            onClick={() => setSeason(s)}
            className="px-4 py-2 bg-white/20 hover:bg-white/40 rounded transition"
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
    </main>
  );
}
