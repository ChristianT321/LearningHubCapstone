'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function FlyingSeasonPage() {
  const [season, setSeason] = useState('spring');

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Flying Season – Rufous Hummingbird Migration
      </h1>

      <div
        className="relative w-full max-w-[700px] h-[600px] overflow-hidden rounded border border-white"
      >
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/North america.png')",
            backgroundSize: 'contain',
            backgroundPosition: '70% center',
          }}
        />

        {season === 'spring' && (
          <Image
            src="/roufus hummingbird.png"
            alt="Rufous Hummingbird"
            width={50}
            height={50}
            className="absolute left-[12%] top-[68%]"
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