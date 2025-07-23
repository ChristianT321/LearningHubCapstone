'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

const birds = [
  {
    name: '🦅 Bald Eagle',
    slug: 'bald-eagle',
    images: {
      main: { src: '/Bald eagle.jpg', alt: 'Bald Eagle' },
      feather: { src: '/Bald eagle feather.jpg', alt: 'Bald Eagle Feather' },
      extra: { src: '/Bald eagle nest.jpg', alt: 'Eagle Nest' },
    },
    facts: [
      '🪶 Can spot prey from over 3 kilometers away.',
      '🏞 Builds the largest nests in North America.',
      '🦴 Talons can exert 400 lbs of pressure!',
      '👀 Despite the name, they’re not bald!',
    ],
    didYouKnow: 'Bald eagles return to the same nest every year — sometimes for decades!',
  },
  {
    name: '🐦 Hummingbird',
    slug: 'hummingbird',
    images: {
      main: { src: '/Hummingbird.jpg', alt: 'Hummingbird' },
      feather: { src: '/Hummingbird feather.jpg', alt: 'Hummingbird Feather' },
      extra: { src: '/Hummingbird hovering.jpg', alt: 'Hummingbird Hovering' },
    },
    facts: [
      '🕊 Flaps wings up to 80 times per second.',
      '🔁 Can hover and even fly backward.',
      '💡 Weighs less than a nickel!',
      '✨ Shimmers with iridescent feathers.',
    ],
    didYouKnow: 'Hummingbirds remember every flower they visit — and when they visited it!',
  },
  {
    name: '🦆 Duck',
    slug: 'duck',
    images: {
      main: { src: '/Duck.webp', alt: 'Duck' },
      feather: { src: '/Duck feather.jpg', alt: 'Duck Feather' },
      extra: { src: '/Ducklings.jpg', alt: 'Ducklings' },
    },
    facts: [
      '💧 Feathers are waterproof!',
      '🍼 Ducklings swim hours after hatching.',
      '😴 Ducks can sleep with one eye open.',
      '📣 Each quack means something different.',
    ],
    didYouKnow: 'Some ducks migrate thousands of kilometers every year!',
  },
];

export default function BirdNotebook() {
  const [activeIndex, setActiveIndex] = useState(0);
  const bird = birds[activeIndex];
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full overflow-hidden">

      {/* 🌄 Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/sky background.png"
          alt="Sky Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen w-full px-4 py-10">

        {/* 🪺 Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[2px_2px_0px_black] mb-2">
            Welcome to the Bird Explorer’s Guide
          </h1>
          <p className="text-white text-lg drop-shadow-[1px_1px_0px_black]">
            Learn about these amazing birds before you play the matching game!
          </p>
        </div>

        {/* 🧾 Notebook */}
        <div className="flex max-w-7xl w-full rounded-3xl shadow-2xl border-[6px] border-yellow-700 overflow-hidden relative bg-gradient-to-br from-[#fdf5e6] via-[#f5f0d6] to-[#f1e7c0]/90">

          {/* Tabs */}
          <div className="w-28 bg-green-800 flex flex-col justify-center items-center gap-6 py-6">
            {birds.map((b, idx) => (
              <button
                key={b.slug}
                onClick={() => setActiveIndex(idx)}
                className={clsx(
                  'w-20 h-20 rounded-full overflow-hidden border-4 transition-all',
                  idx === activeIndex
                    ? 'border-yellow-400 scale-110 ring-4 ring-yellow-200'
                    : 'border-green-400 hover:scale-105'
                )}
              >
                <Image
                  src={b.images.main.src}
                  alt={b.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* Spine */}
          <div className="w-2 bg-yellow-900" />

          {/* Pages */}
          <div className="flex-1 grid grid-cols-2 gap-0 p-6 text-black">
            {/* Left Page */}
            <div className="pr-6 border-r-[3px] border-yellow-800 flex flex-col">
              <h2 className="text-4xl font-bold mb-4 text-green-900">{bird.name}</h2>
              <div className="relative w-full h-96 rounded-xl overflow-hidden border-4 border-yellow-700 shadow-md mb-4">
                <Image src={bird.images.main.src} alt={bird.images.main.alt} fill className="object-contain p-2" />
              </div>
              <ul className="list-disc text-lg text-gray-800 pl-6 space-y-2">
                {bird.facts.slice(0, 2).map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </div>

            {/* Right Page */}
            <div className="pl-6 flex flex-col justify-between">
              <div className="flex gap-4 mb-4">
                {[bird.images.feather, bird.images.extra].map((img, i) => (
                  <div
                    key={i}
                    className="relative flex-1 h-64 rounded-xl overflow-hidden border-4 border-green-700 shadow-md"
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-contain p-2" />
                  </div>
                ))}
              </div>

              <ul className="list-disc text-lg text-gray-800 pl-6 space-y-2">
                {bird.facts.slice(2, 4).map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>

              <div className="bg-yellow-100 border-l-4 border-yellow-600 p-4 italic text-sm text-gray-700 mt-4 shadow-sm rounded-md">
                🔍 <strong>Did you know?</strong> {bird.didYouKnow}
              </div>

              <div className="text-right text-sm italic text-gray-500 mt-4">Explorer’s Notebook • Page {activeIndex + 1}</div>
            </div>
          </div>
        </div>

        {/* 🔽 Start Matching Button */}
        <button
          onClick={() => router.push('/matching2')}
          className="mt-8 bg-green-700 hover:bg-green-900 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition"
        >
          Start Matching Game →
        </button>
      </div>
    </main>
  );
}
