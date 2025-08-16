'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Season = 'spring' | 'summer' | 'fall' | 'winter';

const seasonData: Record<Season, { fish: string; description: string; image: string; funFact: string }[]> = {
  spring: [
    {
      fish: 'Pacific Herring',
      description: 'Herring spawn in massive schools, releasing eggs that stick to kelp.',
      image: '/herring.png',
      funFact: 'One herring can lay up to 20,000 eggs!',
    },
    {
      fish: 'Salmon Fry',
      description: 'Young salmon begin their journey downstream.',
      image: '/salmonfry.webp',
      funFact: 'Some salmon spend over a year in freshwater before going to sea.',
    },
    {
      fish: 'Eulachon',
      description: 'These small oily fish return to rivers to spawn, attracting eagles and bears.',
      image: '/eulachon.png',
      funFact: 'Eulachon are nicknamed "candlefish" because they\'re so oily they can burn like candles.',
    },
    {
      fish: 'Kelp Greenling',
      description: 'Kelp greenling are often found in rocky reefs and kelp forests.',
      image: '/kelp-greenling.webp',
      funFact: 'Kelp greenling can change color based on their environment, blending in with kelp and rocks.',
    }
  ],
  summer: [
    {
      fish: 'Pacific Halibut',
      description: 'Halibut are flatfish that lie on the ocean floor, camouflaging themselves.',
      image: '/Halibut-Pacific.png',
      funFact: 'Pacific halibut can grow up to 8 feet long and weigh over 500 pounds!',
    },
    {
      fish: 'Coho Salmon',
      description: 'Coho salmon are known for their bright red flesh and delicious taste.',
      image: '/Salmon-Coho.png',
      funFact: 'Coho salmon can jump up to 10 feet out of the water!',
    },
    {
      fish: 'Pink Salmon',
      description: 'Pink salmon are the smallest of the Pacific salmon, often called "humpies" due to their humpbacked appearance during spawning.',
      image: '/Salmon-Pink.png',
      funFact: 'Pink salmon are the most abundant Pacific salmon species, with millions returning to spawn each year.',
    },
    {
      fish: 'Sea Run Cutthroat Trout',
      description: 'These trout migrate between freshwater streams and the ocean, feeding on insects and small fish.',
      image: '/cutthroat.png',
      funFact: 'Cutthroat trout are named for the distinctive red or orange slash under their jaw, which is more pronounced in',
    },
  ],
  fall: [
    {
      fish: 'Chinook Salmon',
      description: 'The largest Pacific salmon, known for its rich flavor.',
      image: '/Salmon-Chinook.png',
      funFact: 'Chinook can weigh over 100 pounds and grow up to 58 inches long!',
    },
    {
      fish: 'Sockeye Salmon',
      description: 'Sockeye salmon are famous for their vibrant red color and rich flavor.',
      image: '/Sockeye-Salmon.png',
      funFact: 'Sockeye salmon can change color dramatically during spawning, turning bright red with a green head.',
    },
    {
      fish: 'Chum Salmon',
      description: 'Chum salmon are known for their distinctive stripes and are often used for canning.',
      image: '/Salmon-Chum.png',
      funFact: 'Chum salmon are also called "dog salmon" because of their large teeth during spawning season.',
    },
    {
      fish: 'Steelhead Trout',
      description: 'Steelhead are anadromous fish, meaning they migrate from the ocean to freshwater rivers to spawn.',
      image: '/steelhead-trout.png',
      funFact: 'Steelhead can live up to 11 years and can grow to be over 30 inches long!',
    }
  ],
  winter: [
    {
      fish: 'Canary Rockfish',
      description: 'Rockfish hunker down in reef crevices, barely moving during the cold months.',
      image: '/canary_rockfish.png',
      funFact: 'Some rockfish live over 100 years!',
    },
    {
      fish: 'Black Rockfish',
      description: 'Black rockfish are known for their dark coloration and are often found in rocky habitats.',
      image: '/black-rockfish.png',
      funFact: 'Black rockfish can live up to 25 years and can grow to be over 20 inches long!',
    },
    {
      fish: ' Dungeness Crab',
      description: 'Dungeness crabs are harvested in winter, known for their sweet, tender meat.',
      image: '/Dungeness-Crab.webp',
      funFact: 'Dungeness crabs can live up to 10 years and can grow to be over 10 inches wide!',
    },
    {
      fish: 'Lingcod',
      description: 'Lingcod are fierce predators that can be found in rocky areas.',
      image: '/lingcod.png',
      funFact: 'Despite their name, lingcod are not true cod and can grow up to 5 feet long!',
    }
  ],
};

export default function FishSeasonPage() {
  const [season, setSeason] = useState<Season>('spring');
  const [casting, setCasting] = useState(false);
  const [caughtFish, setCaughtFish] = useState<typeof seasonData.spring[0] | null>(null);
  const [caughtFishList, setCaughtFishList] = useState<Record<Season, Set<string>>>({
    spring: new Set(),
    summer: new Set(),
    fall: new Set(),
    winter: new Set(),
  });

  const handleCast = () => {
    setCaughtFish(null);
    setCasting(true);
    setTimeout(() => {
      const fishOptions = seasonData[season];
      const fish = fishOptions[Math.floor(Math.random() * fishOptions.length)];
      setCaughtFish(fish);

      // Add the caught fish to the set for the current season
      setCaughtFishList((prev) => {
        const updated = { ...prev };
        updated[season] = new Set(updated[season]);
        updated[season].add(fish.fish);
        return updated;
      });

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

      {/* Fish Discovery Table */}
      <div className="w-full max-w-[800px] mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Fish Discovery for {season.charAt(0).toUpperCase() + season.slice(1)}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr className="text-left">
                <th className="bg-white/10 p-3 rounded-lg font-semibold">Fish</th>
                <th className="bg-white/10 p-3 rounded-lg font-semibold text-center">Image</th>
                <th className="bg-white/10 p-3 rounded-lg font-semibold">Description</th>
                <th className="bg-white/10 p-3 rounded-lg font-semibold">Fun Fact</th>
              </tr>
            </thead>
            <tbody>
              {seasonData[season].map((fishObj) => {
                const isCaught = caughtFishList[season].has(fishObj.fish);

                return (
                  <tr key={fishObj.fish}>
                    <td className="bg-white/10 p-3 rounded-lg font-bold">{fishObj.fish}</td>
                    <td className="bg-white/10 p-3 rounded-lg text-center">
                      <div className="flex justify-center">
                        <Image
                          src={isCaught ? fishObj.image : '/fish-silhouette.png'}
                          alt={isCaught ? fishObj.fish : 'Unknown Fish'}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    </td>
                    <td className="bg-white/10 p-3 rounded-lg">
                      {isCaught ? fishObj.description : '???'}
                    </td>
                    <td className="bg-white/10 p-3 rounded-lg italic text-white/80">
                      {isCaught ? `💡 ${fishObj.funFact}` : '???'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

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