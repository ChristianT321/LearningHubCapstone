'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Season = 'spring' | 'summer' | 'fall' | 'winter';

type FishInfo = {
  fish: string;
  description: string;
  image: string;
  funFact: string;
  active: string; // when they're typically catchable or running
  reason: string; // why they're listed in this season
};

const seasonData: Record<Season, FishInfo[]> = {
  spring: [
    {
      fish: 'Pacific Herring',
      description: 'Herring spawn in large nearshore aggregations, depositing eggs onto kelp and other vegetation.',
      image: '/herring.png',
      funFact: 'Pacific herring may spawn multiple times in their lifetime and are a keystone forage species.',
      active: 'Feb–Apr — nearshore spawning in kelp/vegetated substrates',
      reason:
        'Pacific herring form dense spring spawning aggregations in shallow, vegetated nearshore areas; their eggs and adults provide a critical seasonal food pulse for seabirds, marine mammals and shorebirds, and they strongly influence local food webs.',
    },
    {
      fish: 'Salmon Fry',
      description: 'Newly hatched juvenile salmon migrate downstream from freshwater rearing areas toward estuaries and coastal waters.',
      image: '/salmonfry.webp',
      funFact: 'Many juvenile salmon spend variable time in freshwater before moving to estuaries and the sea.',
      active: 'Mar–May — downstream migration (fry outmigration) into estuaries',
      reason:
        'In spring, recently emerged juveniles move downstream and into estuaries where they acclimate to salt water; this life-stage is seasonal and closely tied to freshwater temperature and flow regimes.',
    },
    {
      fish: 'Eulachon',
      description: 'Small, oily forage fish that make short coastal and river runs to spawn in low-gradient rivers and estuaries.',
      image: '/eulachon.png',
      funFact: 'Eulachon are sometimes called “candlefish” because of their high oil content; they support important cultural and ecological roles.',
      active: 'Mar–Jun — coastal & river spawning runs (timing varies by river)',
      reason:
        'Eulachon undertake brief spring spawning runs into rivers and estuaries. Timing varies by river and year, but spring runs are typical and are ecologically important for coastal predators and Indigenous harvests.',
    },
    {
      fish: 'Kelp Greenling',
      description: 'A reef-associated fish frequently found in kelp and rocky habitats along the coast.',
      image: '/kelp-greenling.webp',
      funFact: 'Kelp greenling can exhibit colour changes that help them blend into kelp and rocky substrates.',
      active: 'Apr–Aug — increased nearshore activity as waters warm',
      reason:
        'Kelp greenling are most visible and active in spring and summer when prey availability increases in kelp and reef habitats; warmer nearshore conditions draw them inshore.',
    },
  ],

  summer: [
    {
      fish: 'Pacific Halibut',
      description: 'Large demersal flatfish that forage along productive nearshore and shelf habitats.',
      image: '/Halibut-Pacific.png',
      funFact: 'Pacific halibut can reach very large sizes and are a major commercial and recreational target.',
      active: 'Jun–Aug — nearshore feeding and summer fisheries',
      reason:
        'Halibut move into productive nearshore feeding areas in summer, resulting in increased catchability and prominence in summer fisheries and surveys.',
    },
    {
      fish: 'Coho Salmon',
      description: 'A medium-sized Pacific salmon with distinct life-history timing; returns occur in summer and early fall in many systems.',
      image: '/Salmon-Coho.png',
      funFact: 'Coho are prized by both anglers and commercial fishers for their quality flesh.',
      active: 'Jul–Sep — coastal and freshwater runs (peaks vary by watershed)',
      reason:
        'Coho runs commonly peak from late summer into early fall in many coastal rivers; their timing is governed by stock-specific migration schedules and river conditions.',
    },
    {
      fish: 'Pink Salmon',
      description: 'The most abundant Pacific salmon species; large, often highly predictable runs in summer (odd/even year cycles).',
      image: '/Salmon-Pink.png',
      funFact: 'Pink salmon returns are often highly abundant and occur on a predictable two-year cycle.',
      active: 'Jul–Aug — large summer runs (often show strong odd/even year patterns)',
      reason:
        'Pink salmon typically return in mid–late summer with large, short-duration runs; they are often the most numerous salmon in coastal summer fisheries.',
    },
    {
      fish: 'Sea-Run Cutthroat Trout',
      description: 'Coastal trout that move between marine and freshwater habitats, feeding in estuaries and nearshore areas.',
      image: '/cutthroat.png',
      funFact: 'Sea-run cutthroat commonly feed in estuaries and nearshore kelp beds during warmer months.',
      active: 'May–Aug — estuary and nearshore activity increases with warming',
      reason:
        'Sea-run cutthroat are most active and observable from late spring through summer as they utilize estuaries and nearshore habitats for feeding and growth.',
    },
  ],

  fall: [
    {
      fish: 'Chinook (King) Salmon',
      description: 'The largest Pacific salmon species; some populations return to spawn in fall (others are spring/summer runs—timing is stock-specific).',
      image: '/Salmon-Chinook.png',
      funFact: 'Chinook populations exhibit distinct spring, summer and fall runs depending on stock.',
      active: 'Aug–Nov — many major fall spawning runs (stock-dependent timing)',
      reason:
        'Many Chinook populations make major fall migrations into rivers to spawn; however, run timing is stock-dependent—presentations should note run-specific timing for local rivers.',
    },
    {
      fish: 'Sockeye Salmon',
      description: 'Sockeye are known for their bright red spawning colour and lake-oriented life histories in some systems.',
      image: '/Sockeye-Salmon.png',
      funFact: 'Sockeye frequently undertake long migrations to lake-based spawning habitats.',
      active: 'Aug–Oct — river and lake-bound spawning runs',
      reason:
        'Sockeye typically return from late summer to early fall to enter lakes or rivers for spawning; their timing is strongly tied to stock and watershed characteristics.',
    },
    {
      fish: 'Chum Salmon',
      description: 'Chum are robust spawners that enter rivers in fall and are often a major component of fall runs.',
      image: '/Salmon-Chum.png',
      funFact: 'Chum develop pronounced jaw and tooth features during spawning.',
      active: 'Sep–Nov — river entry and spawning',
      reason:
        'Chum salmon commonly enter rivers in the fall for spawning; they are a predictable component of fall fisheries and ecosystem nutrient transfers.',
    },
    {
      fish: 'Steelhead (anadromous rainbow trout)',
      description: 'Steelhead are iteroparous trout that migrate to freshwater to spawn in fall and winter depending on the stock.',
      image: '/steelhead-trout.png',
      funFact: 'Unlike many Pacific salmon, steelhead can spawn multiple times over their lifetime.',
      active: 'Oct–Jan — freshwater runs (varies by run-type and river)',
      reason:
        'Steelhead exhibit fall–winter run timing in many northern coastal systems; timing is stock- and river-dependent and often differs from Pacific salmon.',
    },
  ],

  winter: [
    {
      fish: 'Canary Rockfish',
      description: 'Reef-associated rockfish that use rocky structure year-round and tend to be less mobile in colder months.',
      image: '/canary_rockfish.png',
      funFact: 'Some rockfish species are long-lived, reaching decades to more than a century.',
      active: 'Year-round (more sedentary in winter) — reef/structure-associated',
      reason:
        'Canary rockfish remain associated with reef structures throughout the year; winter behaviour is more sedentary, but they continue to be present and fished near structure.',
    },
    {
      fish: 'Black Rockfish',
      description: 'A common inshore rockfish that occupies rocky reefs and nearshore habitats year-round.',
      image: '/black-rockfish.png',
      funFact: 'Black rockfish support important recreational and some commercial fisheries.',
      active: 'Year-round — frequently targeted in colder months near reefs',
      reason:
        'Black rockfish are resident to inshore rocky habitat and are often targeted in winter surveys and fisheries when other species are less active.',
    },
    {
      fish: 'Dungeness Crab',
      description: 'A commercially and culturally important crab harvested in coastal British Columbia.',
      image: '/Dungeness-Crab.webp',
      funFact: 'Dungeness crab fisheries often concentrate effort in late fall and winter months.',
      active: 'Nov–Feb (peak commercial/recreational harvest season; regulations vary by area)',
      reason:
        'Dungeness crab are heavily harvested in late fall and winter months in many BC areas; seasonal management and local closures apply—refer to DFO area regulations for exact season dates.',
    },
    {
      fish: 'Lingcod',
      description: 'A predatory reef fish with seasonal behaviours linked to temperature and prey availability.',
      image: '/lingcod.png',
      funFact: 'Lingcod are ambush predators that favour rocky structure.',
      active: 'Nov–Apr — increased winter activity near structure in many areas',
      reason:
        'Lingcod are frequently targeted in winter and early spring surveys when they associate with structure and display increased catchability in some regions.',
    },
  ],
};

export default function FishSeasonPage() {
  const [season, setSeason] = useState<Season>('spring');
  const [casting, setCasting] = useState(false);
  const [caughtFish, setCaughtFish] = useState<FishInfo | null>(null);
  const [catchCounts, setCatchCounts] = useState<Record<Season, Record<string, number>>>({
    spring: {},
    summer: {},
    fall: {},
    winter: {},
  });

  const handleCast = () => {
    setCaughtFish(null);
    setCasting(true);
    
    setTimeout(() => {
      const fishOptions = seasonData[season];
      const currentSeasonCounts = catchCounts[season];
      
      // Calculate weights: 1/(2^n) where n = catch count
      const weights = fishOptions.map(fish => {
        const count = currentSeasonCounts[fish.fish] || 0;
        return 1 / Math.pow(2, count);
      });
      
      // Calculate total weight for probability distribution
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      let random = Math.random() * totalWeight;
      
      // Select fish based on weighted probability
      let selectedFish = null;
      for (let i = 0; i < fishOptions.length; i++) {
        random -= weights[i];
        if (random <= 0) {
          selectedFish = fishOptions[i];
          break;
        }
      }
      
      // Fallback if selection fails
      if (!selectedFish) {
        selectedFish = fishOptions[Math.floor(Math.random() * fishOptions.length)];
      }
      
      setCaughtFish(selectedFish);
      
      // Update catch counts
      setCatchCounts(prev => {
        const updated = { ...prev };
        const seasonCounts = { ...updated[season] };
        const currentCount = seasonCounts[selectedFish!.fish] || 0;
        seasonCounts[selectedFish!.fish] = currentCount + 1;
        updated[season] = seasonCounts;
        return updated;
      });
      
      setCasting(false);
    }, 1800);
  };

  const isCaught = (fishName: string) => {
    return !!catchCounts[season][fishName];
  };

  const showPlaceholder = casting || !caughtFish;

  return (
    // outer main holds the fixed background and the foreground content
    <main className="relative min-h-screen w-full flex items-start justify-center text-center overflow-y-auto">
      {/* fixed background image (covers entire viewport) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/FIsh background.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* optional subtle dark overlay to help contrast the gradient section */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* content wrapper — this keeps the original gradient but sits above the background */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 py-12">
        {/* gradient "panel" that contains all your app UI */}
        <div className="min-h-screen w-full bg-gradient-to-b from-blue-900/95 to-blue-500/85 text-white flex flex-col items-center py-12 px-6 rounded-2xl shadow-2xl backdrop-blur-sm">
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

          {/* Persistent card (filler + caught fish) */}
          <div className="w-full max-w-[600px] mb-8">
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="bg-white/10 border border-white/20 rounded-xl p-6 w-full shadow-lg flex flex-col items-center mb-8 min-h-[320px]"
            >
              {showPlaceholder ? (
                // filler / placeholder content (silhouette)
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="mb-4">
                    <Image
                      src="/fish-silhouette.png"
                      alt="Fish silhouette"
                      width={280}
                      height={280}
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-2xl font-bold">{casting ? 'Casting...' : 'No fish yet'}</h2>
                  <p className="mt-2 text-lg text-center text-white/80">
                    {casting
                      ? 'The line is in the water, waiting for a bite...'
                      : 'Press "Cast Line" to try your luck.'}
                  </p>
                </div>
              ) : (
                // actual caught fish content
                <div className="flex flex-col items-center">
                  <Image
                    src={caughtFish!.image}
                    alt={caughtFish!.fish}
                    width={300}
                    height={300}
                    className="object-contain mb-4"
                  />
                  <h2 className="text-2xl font-bold">{caughtFish!.fish}</h2>
                  <p className="mt-2 text-lg">{caughtFish!.description}</p>
                  <p className="mt-4 text-sm italic text-white/80">💡 {caughtFish!.funFact}</p>
                  {/* new details shown in popup */}
                  <p className="mt-3 text-sm text-white/90">
                    <strong>Active:</strong> {caughtFish!.active}
                  </p>
                  <p className="mt-1 text-sm text-white/80 italic">Why listed: {caughtFish!.reason}</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Fish Discovery Table */}
          <div className="w-full max-w-[900px] mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Fish Discovery for {season.charAt(0).toUpperCase() + season.slice(1)}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-2">
                <thead>
                  <tr className="text-left">
                    <th className="bg-white/10 p-3 rounded-lg font-semibold">Fish</th>
                    <th className="bg-white/10 p-3 rounded-lg font-semibold text-center">Image</th>
                    <th className="bg-white/10 p-3 rounded-lg font-semibold">Description</th>
                    <th className="bg-white/10 p-3 rounded-lg font-semibold">Fun Fact</th>
                    <th className="bg-white/10 p-3 rounded-lg font-semibold">Active</th>
                    <th className="bg-white/10 p-3 rounded-lg font-semibold">Why this season?</th>
                  </tr>
                </thead>
                <tbody>
                  {seasonData[season].map((fishObj) => {
                    const caught = isCaught(fishObj.fish);
                    return (
                      <tr key={fishObj.fish}>
                        <td className="bg-white/10 p-3 rounded-lg font-bold align-top">{fishObj.fish}</td>
                        <td className="bg-white/10 p-3 rounded-lg text-center align-top">
                          <div className="flex justify-center">
                            <Image
                              src={caught ? fishObj.image : '/fish-silhouette.png'}
                              alt={caught ? fishObj.fish : 'Unknown Fish'}
                              width={80}
                              height={80}
                              className="object-contain"
                            />
                          </div>
                        </td>
                        <td className="bg-white/10 p-3 rounded-lg align-top">{caught ? fishObj.description : '???'}</td>
                        <td className="bg-white/10 p-3 rounded-lg italic text-white/80 align-top">{caught ? `💡 ${fishObj.funFact}` : '???'}</td>
                        <td className="bg-white/10 p-3 rounded-lg align-top">{caught ? fishObj.active : '???'}</td>
                        <td className="bg-white/10 p-3 rounded-lg italic text-white/80 align-top">{caught ? fishObj.reason : '???'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <Link href="/fishfacts">
            <button className="mt-10 bg-white text-blue-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition">
              Continue
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}