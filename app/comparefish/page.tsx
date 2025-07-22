'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Select } from '@mantine/core';
import router from 'next/router';

const fishList = [
  {
    id: 'salmon',
    name: 'Salmon',
    image: '/salmon1.png',
    facts: {
      Habitat: 'Rivers and Ocean',
      Diet: 'Insects, plankton, small fish',
      Size: 'Up to 1.5 meters',
      Lifespan: '3–7 years',
      Behavior: 'Migrates to spawn upstream',
    },
  },
  {
    id: 'whitefish',
    name: 'Whitefish',
    image: '/whitefish1.jpg',
    facts: {
      Habitat: 'Cold lakes and rivers',
      Diet: 'Insects and bottom invertebrates',
      Size: '30–60 cm',
      Lifespan: '10–15 years',
      Behavior: 'Bottom feeder, travels in schools',
    },
  },
  {
    id: 'trout',
    name: 'Lake Trout',
    image: '/trout1.webp',
    facts: {
      Habitat: 'Cold, deep lakes',
      Diet: 'Fish, insects, crustaceans',
      Size: 'Up to 1 meter',
      Lifespan: '10–40 years',
      Behavior: 'Ambush predator, deep swimmer',
    },
  },
];

export default function CompareFishPage() {
  const [firstId, setFirstId] = useState('salmon');
  const [secondId, setSecondId] = useState('trout');

  const fish1 = fishList.find((f) => f.id === firstId)!;
  const fish2 = fishList.find((f) => f.id === secondId)!;

  return (
  <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-8">
    {/* Background Image */}
    <div className="fixed inset-0 z-0">
        <Image
            src="/FIsh background.png"
            alt="Background"
            fill
            priority
            className="object-cover object-center"
        />
    </div>
    <div className="relative z-10 w-full max-w-6xl bg-blue-950/80 rounded-xl p-10 border border-blue-700 shadow-xl text-white">
    <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-yellow-300 drop-shadow mb-2">
        🐟 Fish Comparison
        </h1>
        <p className="text-lg text-blue-100">
        Explore how different fish of the Great Bear Rainforest compare in size, habitat, and more.
        </p>
    </div>

    {/* Fish Selectors */}
    <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
        <div className="flex-1">
        <Select
            data={fishList.map((f) => ({ label: f.name, value: f.id }))}
            value={firstId}
            onChange={(val) => setFirstId(val!)}
            label="First Fish"
            size="md"
            className="w-full"
        />
        </div>
        <div className="flex-1">
        <Select
            data={fishList.map((f) => ({ label: f.name, value: f.id }))}
            value={secondId}
            onChange={(val) => setSecondId(val!)}
            label="Second Fish"
            size="md"
            className="w-full"
        />
        </div>
    </div>

    {/* Fish Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {[fish1, fish2].map((fish, i) => (
        <div key={i} className="bg-blue-800 rounded-xl p-6 shadow-lg text-center border-l-4 border-yellow-400">
            <h2 className="text-3xl font-bold mb-4 text-yellow-300">{fish.name}</h2>
            <Image
            src={fish.image}
            alt={fish.name}
            width={400}
            height={300}
            className="object-contain mx-auto rounded-lg mb-6 bg-blue-900 p-2"
            />
            <div className="text-left space-y-2 text-blue-100">
            {Object.entries(fish.facts).map(([key, value]) => (
                <p key={key}>
                <span className="font-bold text-yellow-200">{key}:</span>{' '}
                {value}
                </p>
            ))}
            </div>
        </div>
        ))}
    </div>

    {/* Navigation Button */}
    <div className="text-center">
        <button
        onClick={() => router.push('/gofish')}
        className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-6 py-3 rounded shadow transition"
        >
        🎮 Play Go Fish
        </button>
    </div>
    </div>
  </main>
);
}
