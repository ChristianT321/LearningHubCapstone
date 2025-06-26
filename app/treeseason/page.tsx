'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Slider } from '@mantine/core';
import '@mantine/core/styles.css';

export default function TreeSeasonPage() {
  const [frameIndex, setFrameIndex] = useState(0);

  // Pad index to 3 digits
  const paddedIndex = frameIndex.toString().padStart(3, '0');

  // Build file name
  const filename = `/tree-seasons/frame_${paddedIndex}_delay-0.04s.gif`;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-green-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Explore the Seasons</h1>

      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full h-[400px] sm:h-[500px]">
          <Image
            src={filename}
            alt={`Season Frame ${frameIndex}`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="w-full max-w-xl mt-6">
        <Slider
          value={frameIndex}
          onChange={setFrameIndex}
          min={0}
          max={99}
          step={1}
          color="orange"
          size="lg"
          marks={[
            { value: 0, label: 'Spring' },
            { value: 33, label: 'Summer' },
            { value: 66, label: 'Fall' },
            { value: 99, label: 'Winter' },
          ]}
        />
      </div>

      <p className="mt-4 text-sm text-white/70">
        Slide through the seasons to watch the tree change frame by frame.
      </p>
    </main>
  );
}
