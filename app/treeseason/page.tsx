'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Slider, Menu, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import '@mantine/core/styles.css';
import { useEffect } from 'react';

function WesternHemlockCard({
  image,
  short,
  long,
  season,
}: {
  image: string;
  short: string;
  long: string;
  season: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="group flex flex-col items-center bg-white/10 p-4 rounded-lg shadow-md cursor-pointer transition-all"
    >
      <div className="w-full h-[220px] relative rounded overflow-hidden shadow">
        <Image
          src={image}
          alt={`Western Hemlock in ${season}`}
          fill
          className={`object-cover transition duration-300 ease-in-out ${
            expanded ? '' : 'grayscale group-hover:grayscale-0'
          }`}
        />
      </div>
      <p className="mt-3 text-white text-center">{short}</p>

      <div
        className={`text-white text-sm text-left mt-2 transition-all duration-500 ease-in-out overflow-hidden ${
          expanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {long}
      </div>
    </div>
  );
}

function RedAlderCard({
  image,
  short,
  long,
  season,
}: {
  image: string;
  short: string;
  long: string;
  season: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded((prev) => !prev)}
      className="group flex flex-col items-center bg-white/10 p-4 rounded-lg shadow-md cursor-pointer transition-all"
    >
      <div className="w-full h-[220px] relative rounded overflow-hidden shadow">
        <Image
          src={image}
          alt={`Red Alder in ${season}`}
          fill
          className={`object-cover transition duration-300 ease-in-out ${
            expanded ? '' : 'grayscale group-hover:grayscale-0'
          }`}
        />
      </div>
      <p className="mt-3 text-white text-center">{short}</p>
      <div
        className={`text-white text-sm text-left mt-2 transition-all duration-500 ease-in-out overflow-hidden ${
          expanded ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {long}
      </div>
    </div>
  );
}


export default function TreeSeasonPage() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('border-green-700');
  const [sliderColor, setSliderColor] = useState('green'); 
  const [playing, setPlaying] = useState(false);
  const router = useRouter();

  const paddedIndex = frameIndex.toString().padStart(3, '0');
  const filename = `/tree-seasons/frame_${paddedIndex}_delay-0.04s.gif`;

const seasonColors = [
  { name: 'Summer', frame: 0, color: 'bg-green-700', border: 'border-green-700', slider: 'green' },
  { name: 'Fall', frame: 33, color: 'bg-orange-500', border: 'border-orange-500', slider: 'orange' },
  { name: 'Winter', frame: 66, color: 'bg-white border border-gray-400', border: 'border-white', slider: 'gray' },
  { name: 'Spring', frame: 99, color: 'bg-green-400', border: 'border-green-400', slider: 'lime' },
];

  const getClosestSeason = (value: number) =>
    seasonColors.reduce((prev, curr) =>
      Math.abs(curr.frame - value) < Math.abs(prev.frame - value) ? curr : prev
    );

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setFrameIndex((prev) => {
        const next = (prev + 1) % 100;
        const closest = getClosestSeason(next);
        setSelectedColor(closest.border);
        setSliderColor(closest.slider);
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [playing]);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/forest background.png"
          alt="Forest Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <Menu
          shadow="md"
          width={200}
          openDelay={100}
          closeDelay={150}
          withinPortal={false}
          styles={{ item: { color: 'black' } }}
        >
          <Menu.Target>
            <Button variant="filled" className="text-black">Menu</Button>
          </Menu.Target>
          <Menu.Dropdown style={{ display: 'flex', flexDirection: 'column', zIndex: 50 }}>
            <Menu.Item onClick={() => router.push('/home')}>Home</Menu.Item>
            <Menu.Item onClick={() => router.push('/module1')}>Module 1</Menu.Item>
            <Menu.Item onClick={() => router.push('/module2')}>Module 2</Menu.Item>
            <Menu.Item onClick={() => router.push('/module3')}>Module 3</Menu.Item>
            <Menu.Item onClick={() => router.push('/module4')}>Module 4</Menu.Item>
            <Menu.Divider />
          </Menu.Dropdown>
        </Menu>
      </div>

      <div className={`relative z-10 flex flex-col items-center gap-6 w-full max-w-3xl px-4 mt-12 border-8 rounded-xl ${selectedColor} bg-black/60`}>
        <h1 className="text-4xl font-bold text-white drop-shadow-[3px_3px_0px_black] text-center mt-4">
          Deciduous Seasons
        </h1>

        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-[400px] sm:h-[500px]">
            <Image
              src={filename}
              alt={`Season Frame ${frameIndex}`}
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="w-full max-w-xl mt-4">
          <Slider
            value={frameIndex}
            onChange={(value) => {
              setFrameIndex(value);
              const closest = getClosestSeason(value);
              setSelectedColor(closest.border);
              setSliderColor(closest.slider);
            }}
            min={0}
            max={99}
            step={1}
            color={sliderColor}
            size="lg"
            marks={[
              { value: 0, label: 'Summer' },
              { value: 33, label: 'Fall' },
              { value: 66, label: 'Winter' },
              { value: 99, label: 'Spring' },
            ]}
          />
        </div>

        <div className="flex gap-4 mt-4">
          {seasonColors.map((season) => (
            <button
              key={season.name}
              className={`w-10 h-10 rounded-full ${season.color} hover:scale-110 transition`}
              onClick={() => {
                setFrameIndex(season.frame);
                setSelectedColor(season.border);
                setSliderColor(season.slider);
              }}
              title={season.name}
            />
          ))}
        </div>

        <button
            onClick={() => setPlaying(!playing)}
            className="transition-transform hover:scale-110"
            title={playing ? 'Pause' : 'Play'}
            >
            <span className="text-[80px]">
                {playing ? '⏸️' : '▶️'}
            </span>
        </button>

        <p className="mb-6 text-sm text-white/70">
          Slide through the seasons, tap a color, or press play to animate the tree.
        </p>
      </div>
      
      <div className={`relative z-10 flex flex-col items-center gap-6 w-full max-w-3xl px-4 mt-12 border-8 rounded-xl ${selectedColor} bg-black/60`}>
        <h2 className="text-4xl font-bold text-white drop-shadow-[3px_3px_0px_black] text-center mt-4">
          Red Alder Through the Seasons
        </h2>

        <p className="text-white text-lg text-center max-w-2xl">
          The Red Alder is the most common deciduous tree in the Great Bear Rainforest. It plays a key role in supporting the forest by improving the soil through nitrogen fixation, 
          providing shade, and helping prevent erosion. Its leaves break down quickly, returning nutrients to the forest floor and supporting the plants and animals that live there. 
          Though it may not be as famous as the towering evergreens, the Red Alder is essential to the health of the rainforest ecosystem.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 w-full">
          {[
            {
              season: 'Summer',
              image: '/Red Alder Summer.jpg',
              short: 'In summer, Red Alder trees are fully leafed out, helping shade the forest floor and enrich the soil with nitrogen.',
              long: 'Summer is the peak growing season for Red Alders. Their dense green leaves help prevent soil erosion, retain moisture, and feed the soil with organic matter and nitrogen.',
            },
            {
              season: 'Fall',
              image: '/Red Alder Fall.jpg',
              short: 'In fall, Red Alder leaves turn yellow and fall, contributing to the nutrient cycle.',
              long: 'As autumn arrives, the yellowing leaves of Red Alders drop and decompose quickly, helping recycle nutrients and prepare the forest for winter.',
            },
            {
              season: 'Winter',
              image: '/Red Alder Winter.jpeg',
              short: 'In winter, Red Alder trees are bare, but their roots stay active underground.',
              long: 'Even though the Red Alder appears dormant in winter, its roots continue stabilizing the soil and maintaining underground microbial life.',
            },
            {
              season: 'Spring',
              image: '/Red Alder Spring.jpg',
              short: 'In spring, buds and fresh green leaves emerge as the tree starts fixing nitrogen.',
              long: 'Spring brings new buds and a fresh flush of leaves. The tree begins pulling nitrogen from the air, enriching the soil and boosting the growth of surrounding vegetation.',
            },
          ].map(({ season, image, short, long }) => (
            <RedAlderCard
              key={season}
              image={image}
              short={short}
              long={long}
              season={season}
            />
          ))}
        </div>
      </div>


      <div className={`relative z-10 flex flex-col items-center gap-6 w-full max-w-3xl px-4 mt-12 border-8 rounded-xl ${selectedColor} bg-black/60`}>
        <h2 className="text-4xl font-bold text-white drop-shadow-[3px_3px_0px_black] text-center mt-4">
          Western Hemlock Through the Seasons
        </h2>
        <p className="text-white text-lg text-center max-w-2xl">
          Western Hemlock is the most common coniferous tree in the Great Bear Rainforest. It provides shade, stabilizes soil, and plays a key role in maintaining the rainforest&#39;s moisture and biodiversity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 w-full">
          {[
            {
              season: 'Summer',
              image: '/western hemlock summer.jpg',
              short: 'In summer, Western Hemlock cones fully develop, hanging from branches as they mature.',
              long: 'During summer, Western Hemlock trees are in full growth mode. Their needles support photosynthesis at maximum capacity, while the cones mature and hang visibly. These cones are vital for reproduction and will eventually dry and disperse seeds.',
            },
            {
              season: 'Fall',
              image: '/western hemlock fall.jpg',
              short: 'In fall, the cones dry out and begin to release seeds into the forest.',
              long: 'In the fall season, cones on Western Hemlock trees dry out and begin releasing seeds that fall to the moist forest floor. This natural dispersal plays a major role in the tree’s life cycle and the forest’s regeneration.',
            },
            {
              season: 'Winter',
              image: '/western hemlock winter.jpg',
              short: 'In winter, Western Hemlock trees continue to hold onto mature cones while staying evergreen.',
              long: 'Western Hemlocks stay green throughout the winter, providing shelter and cover for wildlife. Even in snow, they retain their cones, which can still feed small forest animals or drop seeds slowly over time.',
            },
            {
              season: 'Spring',
              image: '/western hemlock spring.jpg',
              short: 'In spring, new needle growth begins and tiny cones start forming on the branches.',
              long: 'Spring is a time of renewal. Fresh light-green needle tips grow on the Western Hemlock, and new cones begin forming. This early growth supports the tree’s health and prepares it for the reproductive cycle ahead.',
            },
            ].map(({ season, image, short, long }) => (
              <WesternHemlockCard
              key={season}
              image={image}
              short={short}
              long={long}
              season={season}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 mb-5 z-10">
        <button
          onClick={() => router.push('/treefacts')}
          className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white text-lg font-semibold rounded-lg shadow transition"
          >
          Continue
        </button>
      </div>
    </main>
  );
}

