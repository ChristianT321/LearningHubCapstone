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
      extra: { src: '/Bald eagle nest.jpg', alt: 'Bald Eagle Nest' },
      food: { src: '/Bald eagle hunting.jpg', alt: 'Bald Eagle Hunting' },
    },
    intro: 'The bald eagle is a powerful bird of prey native to North America. It is known for its white head, yellow beak, and strong wingspan that allows it to soar high above lakes and rivers.',
    featherInfo: 'Bald eagle feathers are broad and stiff, ideal for gliding and soaring at high altitudes. These feathers are sacred in many Indigenous cultures.',
    nesting: {
      image: '/Bald eagle nest.jpg',
      caption: 'Bald eagles build enormous nests in tall trees, returning to them year after year.',
      fact: 'Some eagle nests can reach up to 2.5 meters in diameter and weigh over a ton!',
    },
    food: {
      text: 'Bald eagles primarily hunt fish, swooping down with incredible speed and precision. They also scavenge and sometimes steal food from other birds.',
      unique: 'They can spot prey from over 3 kilometers away, thanks to their incredible eyesight.',
    },
    didYouKnow: 'Bald eagles return to the same nest every year — sometimes for decades!',
  },
  {
    name: '🐦 Hummingbird',
    slug: 'hummingbird',
    images: {
      main: { src: '/Hummingbird.jpg', alt: 'Hummingbird' },
      feather: { src: '/Hummingbird feather.jpg', alt: 'Hummingbird Feather' },
      extra: { src: '/Hummingbird nest.jpg', alt: 'Hummingbird Nest' },
      food: { src: '/Hummingbird feeding.jpg', alt: 'Hummingbird Feeding' },
    },
    intro: 'Hummingbirds are tiny birds with incredible speed and agility. Their wings move so fast they create a humming sound, which gives them their name.',
    featherInfo: 'Hummingbird feathers shimmer with iridescent colors that change with the light. Their feathers are light and flexible to allow rapid wing movement.',
    nesting: {
      image: '/Hummingbird nest.jpg',
      caption: 'Hummingbirds build cup-shaped nests from plant fibers and spider silk, often attaching them to branches with camouflage.',
      fact: 'Their nests are so small they can fit in the palm of your hand!',
    },
    food: {
      text: 'Hummingbirds feed on nectar from flowers, using their long beaks and tongues. They also eat small insects for protein.',
      unique: 'They can fly backward and hover in midair, thanks to their unique wing structure.',
    },
    didYouKnow: 'Hummingbirds remember every flower they visit — and when they visited it!',
  },
  {
    name: '🦆 Duck',
    slug: 'duck',
    images: {
      main: { src: '/Duck.webp', alt: 'Duck' },
      feather: { src: '/Duck feather.jpg', alt: 'Duck Feather' },
      extra: { src: '/Ducklings.jpg', alt: 'Ducklings' },
      food: { src: '/Duck feeding.jpg', alt: 'Duck Feeding' },
    },
    intro: 'Ducks are water-loving birds known for their waddling walk and loud quacks. They live in ponds, lakes, and rivers around the world.',
    featherInfo: 'Duck feathers are coated in a special oil that keeps them waterproof, helping ducks float and stay dry even in wet conditions.',
    nesting: {
      image: '/Ducklings.jpg',
      caption: 'Ducks nest on the ground near water, laying several eggs at a time and caring closely for their ducklings.',
      fact: 'Ducklings can swim just a few hours after hatching!',
    },
    food: {
      text: 'Ducks eat a variety of foods, including aquatic plants, insects, and small fish. They use their flat bills to filter food from the water.',
      unique: 'Some ducks migrate thousands of kilometers every year to find better feeding grounds.',
    },
    didYouKnow: 'Some ducks migrate thousands of kilometers every year!',
  },
  {
    name: '🧠 Raven',
    slug: 'raven',
    images: {
      main: { src: '/Raven.jpg', alt: 'Raven' },
      feather: { src: '/Raven feather.png', alt: 'Raven Feather' },
      extra: { src: '/Raven nest.jpg', alt: 'Raven Nest' },
      food: { src: '/Raven eating.jpg', alt: 'Raven Eating' },
    },
    intro: 'Ravens are highly intelligent birds known for their problem-solving skills and complex social behaviors. With glossy black feathers and a deep croaking call, they are both mysterious and fascinating.',
    featherInfo: 'Raven feathers are sleek, jet-black, and slightly iridescent. These feathers help them blend into their environment and play a role in flight agility and warmth.',
    nesting: {
      image: '/Raven nest.jpg',
      caption: 'Ravens build large, bulky nests high in trees or on cliffs, using sticks, moss, and animal hair.',
      fact: 'Ravens sometimes use shiny objects to decorate their nests!',
    },
    food: {
      text: 'Ravens are omnivores and scavengers, eating everything from small animals and insects to berries and human leftovers. They use tools and can work together to access food.',
      unique: 'They can mimic sounds from their surroundings, including human speech!',
    },
    didYouKnow: 'Ravens can remember faces and hold grudges against people who treat them badly!'
  },
];

export default function BirdNotebook() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const bird = birds[activeIndex];
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Image
          src="/sky background.png"
          alt="Sky Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen w-full px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[2px_2px_0px_black] mb-2">
            Welcome to the Bird Explorer’s Guide
          </h1>
          <p className="text-white text-lg drop-shadow-[1px_1px_0px_black]">
            Learn about these amazing birds before you play the matching game!
          </p>
        </div>

        <div className="flex max-w-7xl w-full rounded-3xl shadow-2xl border-[6px] border-yellow-700 overflow-hidden relative bg-gradient-to-br from-[#fdf5e6] via-[#f5f0d6] to-[#f1e7c0]/90">
          <div className="w-28 bg-green-800 flex flex-col justify-center items-center gap-6 py-6">
            {birds.map((b, idx) => (
              <button
                key={b.slug}
                onClick={() => { setActiveIndex(idx); setCurrentPage(1); }}
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

          <div className="w-2 bg-yellow-900" />

          <div className="flex-1 grid grid-cols-2 gap-0 p-6 text-black relative">
            <button
              onClick={() => setCurrentPage(currentPage === 1 ? 2 : 1)}
              className="absolute top-4 right-4 bg-yellow-800 text-white px-4 py-2 rounded-full z-20 shadow-lg hover:bg-yellow-900 transition"
            >
              Flip Page →
            </button>

            {currentPage === 1 ? (
              <>
                <div className="pr-6 border-r-[3px] border-yellow-800 flex flex-col">
                  <h2 className="text-4xl font-bold mb-4 text-green-900">{bird.name}</h2>
                  <div className="relative w-full h-96 rounded-xl overflow-hidden border-4 border-yellow-700 shadow-md mb-4">
                    <Image src={bird.images.main.src} alt={bird.images.main.alt} fill className="object-contain p-2" />
                  </div>
                  <p className="text-lg text-gray-800">{bird.intro}</p>
                </div>
                <div className="pl-6 flex flex-col justify-between">
                  <div className="relative h-64 rounded-xl overflow-hidden border-4 border-green-700 shadow-md mb-4">
                    <Image src={bird.images.feather.src} alt={bird.images.feather.alt} fill className="object-contain p-2" />
                  </div>
                  <p className="text-lg text-gray-800 mb-4">{bird.featherInfo}</p>
                  <div className="bg-yellow-100 border-l-4 border-yellow-600 p-4 italic text-sm text-gray-700 mt-2 shadow-sm rounded-md">
                    🔍 <strong>Did you know?</strong> {bird.didYouKnow}
                  </div>
                  <div className="text-right text-sm italic text-gray-500 mt-4">Explorer’s Notebook • Page 1</div>
                </div>
              </>
            ) : (
              <>
                <div className="pr-6 border-r-[3px] border-yellow-800 flex flex-col">
                  <div className="relative w-full h-80 rounded-xl overflow-hidden border-4 border-yellow-700 shadow-md mb-4">
                    <Image src={bird.nesting.image} alt="Nesting" fill className="object-contain p-2" />
                  </div>
                  <p className="text-lg text-gray-800">{bird.nesting.caption}</p>
                  <div className="bg-blue-100 border-l-4 border-blue-600 p-4 italic text-sm text-gray-700 mt-2 shadow-sm rounded-md">
                    🪹 <strong>Fun Nest Fact:</strong> {bird.nesting.fact}
                  </div>
                </div>
                <div className="pl-6 flex flex-col justify-between">
                  <div className="relative h-64 rounded-xl overflow-hidden border-4 border-green-700 shadow-md mb-4">
                    <Image src={bird.images.food.src} alt={bird.images.food.alt} fill className="object-contain p-2" />
                  </div>
                  <p className="text-lg text-gray-800 mb-4">{bird.food.text}</p>
                  <div className="bg-green-100 border-l-4 border-green-600 p-4 italic text-sm text-gray-700 mt-2 shadow-sm rounded-md">
                    🍖 <strong>Unique Trait:</strong> {bird.food.unique}
                  </div>
                  <div className="text-right text-sm italic text-gray-500 mt-4">Explorer’s Notebook • Page 2</div>
                </div>
              </>
            )}
          </div>
        </div>

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

