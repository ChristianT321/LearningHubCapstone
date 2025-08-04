'use client';

import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

type Bird = {
  name: string;
  slug: string;
  images: {
    main: { src: string; alt: string };
    feather: { src: string; alt: string };
    extra: { src: string; alt: string };
    food: { src: string; alt: string };
  };
  intro: string;
  featherInfo: string;
  nesting: {
    image: string;
    caption: string;
    fact: string;
  };
  food: {
    text: string;
    unique: string;
  };
  didYouKnow: string;
};

type BirdGroups = {
  [groupName: string]: Bird[];
};

const birdGroups: BirdGroups = {
  'Birds of Prey': [
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
        fact: 'Some eagle nests can reach up to 2.5 meters in diameter and weigh over a ton!'
      },
      food: {
        text: 'Bald eagles primarily hunt fish, swooping down with incredible speed and precision. They also scavenge and sometimes steal food from other birds.',
        unique: 'They can spot prey from over 3 kilometers away, thanks to their incredible eyesight.'
      },
      didYouKnow: 'Bald eagles return to the same nest every year — sometimes for decades!'
    },
    {
      name: '🦉 Great Horned Owl',
      slug: 'great-horned-owl',
      images: {
        main: { src: '/great horned owl.webp', alt: 'Great Horned Owl' },
        feather: { src: '/great horned owl feather.jpg', alt: 'Great Horned Owl Feather' },
        extra: { src: '/Great horned owl nest.jpg', alt: 'Great Horned Owl Nest' },
        food: { src: '/Great horned owl hunting.jpg', alt: 'Great Horned Owl Hunting' },
      },
      intro: 'Great Horned Owls are powerful nocturnal hunters with tufted ears and piercing yellow eyes. They live in forests, deserts, and urban areas across the Americas.',
      featherInfo: 'Their soft-edged feathers allow for silent flight — perfect for sneaking up on prey in the dark.',
      nesting: {
        image: '/Great horned owl nest.jpg',
        caption: 'These owls often reuse nests built by other large birds or squirrels.',
        fact: 'They are one of the first birds to nest in the year, sometimes as early as January.'
      },
      food: {
        text: 'They hunt small to medium-sized animals like rabbits, mice, and even skunks.',
        unique: 'Their powerful grip can exert 500 psi — stronger than the bite of a large dog!'
      },
      didYouKnow: 'Their deep hoots can be heard from miles away on quiet nights.'
    },
    {
      name: '🪶 Northern Goshawk',
      slug: 'northern-goshawk',
      images: {
        main: { src: '/Norther goshawk.webp', alt: 'Northern Goshawk' },
        feather: { src: '/Northern goshawk feather.jpg', alt: 'Goshawk Feather' },
        extra: { src: '/northern goshawk nest.jpg', alt: 'Goshawk Nest' },
        food: { src: '/Northern goshwak hunting.webp', alt: 'Goshawk Hunting' },
      },
      intro: 'Northern Goshawks are powerful forest-dwelling raptors known for their speed and agility among trees.',
      featherInfo: 'Their feathers are designed for silent flight and quick maneuvers through dense forests.',
      nesting: {
        image: '/Northern goshawk nest.jpg',
        caption: 'They build large stick nests high in mature trees, often reusing them each year.',
        fact: 'Goshawks can aggressively defend their nests, even against humans!',
      },
      food: {
        text: 'They hunt birds and small mammals like squirrels with sudden bursts of speed.',
        unique: 'Their long tails and short wings help them twist through forest branches at high speed.',
      },
      didYouKnow: 'The name “goshawk” comes from the Old English for “goose hawk” due to their hunting strength.'
    },
    {
        name: '⚡ Peregrine Falcon',
        slug: 'peregrine-falcon',
        images: {
          main: { src: '/Peregrine falcon.webp', alt: 'Peregrine Falcon' },
          feather: { src: '/Peregrine falcon feather.jpg', alt: 'Falcon Feather' },
          extra: { src: '/Peregrine falcon nest.jpg', alt: 'Falcon Nest' },
          food: { src: '/Peregrine falcon hunting.jpg', alt: 'Falcon Hunting' },
        },
        intro: 'Peregrine Falcons are the fastest animals on Earth, capable of diving at over 300 km/h.',
        featherInfo: 'Their aerodynamic feathers reduce drag and allow for unmatched speed.',
        nesting: {
          image: '/Peregrine falcon nest.jpg',
          caption: 'They nest on high cliffs or skyscrapers in urban areas.',
          fact: 'Unlike many birds, peregrines don’t build nests but lay eggs on bare surfaces.',
        },
        food: {
          text: 'They feed almost exclusively on birds, catching them mid-flight with dramatic stoops.',
          unique: 'Their nostrils have special bony structures to help them breathe at high speeds.',
        },
        didYouKnow: 'Peregrine Falcons have adapted well to cities, using tall buildings like cliffs.'
      },
      {
        name: '🐟 Osprey',
        slug: 'osprey',
        images: {
          main: { src: '/Osprey.webp', alt: 'Osprey' },
          feather: { src: '/Osprey feather.webp', alt: 'Osprey Feather' },
          extra: { src: '/Osprey nest.jpg', alt: 'Osprey Nest' },
          food: { src: '/Osprey hunting.jpg', alt: 'Osprey Hunting' },
        },
        intro: 'Ospreys are large raptors found near water, known for their fish-catching talents.',
        featherInfo: 'Their feathers are oily and dense to keep them dry when diving.',
        nesting: {
          image: '/Osprey nest.jpg',
          caption: 'They often build large platform nests atop poles, trees, or cliffs.',
          fact: 'Ospreys return to the same nest year after year, adding new material each season.',
        },
        food: {
          text: 'Ospreys eat almost exclusively fish, diving feet-first into water to catch them.',
          unique: 'Their feet have backward-facing toes and barbed pads to grip slippery fish.',
        },
        didYouKnow: 'Ospreys have a unique reversible outer toe to better grasp their prey.'
      }
  ],
  'Water Birds': [
    {
      name: '🦆 Mallard Duck',
      slug: 'mallard-duck',
      images: {
        main: { src: '/Duck.webp', alt: 'Mallard Duck' },
        feather: { src: '/Duck feather.jpg', alt: 'Duck Feather' },
        extra: { src: '/Ducklings.jpg', alt: 'Ducklings' },
        food: { src: '/Duck feeding.jpg', alt: 'Duck Feeding' },
      },
      intro: 'Mallards are one of the most common ducks found in North America. They are known for their green heads and cheerful quacking.',
      featherInfo: 'Their feathers are waterproof thanks to oils from a special gland near the tail.',
      nesting: {
        image: '/Ducklings.jpg',
        caption: 'They nest on the ground near water and care closely for their ducklings.',
        fact: 'Ducklings can swim just hours after hatching!'
      },
      food: {
        text: 'They feed on aquatic vegetation, insects, and small fish using their flat bills.',
        unique: 'Some Mallards travel thousands of kilometers during seasonal migrations.'
      },
      didYouKnow: 'Mallards can sleep with one eye open to stay alert for predators.'
    },
    {
      name: '🐧 Marbled Murrelet',
      slug: 'marbled-murrelet',
      images: {
        main: { src: '/Marbled murrelet.webp', alt: 'Marbled Murrelet' },
        feather: { src: '/Marbled murrelet feather.webp', alt: 'Murrelet Feather' },
        extra: { src: '/Marbled murrelet nest.jpg', alt: 'Murrelet Nest' },
        food: { src: '/Marbled murrelet feeding.webp', alt: 'Murrelet Feeding' },
      },
      intro: 'Marbled Murrelets are small seabirds that live at sea but nest deep in old-growth forests — a rare combination!',
      featherInfo: 'Their feathers are waterproof and provide excellent insulation in cold ocean waters.',
      nesting: {
        image: '/Marbled murrelet nest.jpg',
        caption: 'Unlike most seabirds, they nest on mossy branches high in coastal forests.',
        fact: 'They fly up to 80 km inland to nest on a single tree branch!',
      },
      food: {
        text: 'They dive underwater to catch small fish and crustaceans.',
        unique: 'They use their wings to “fly” through the water while chasing prey.',
      },
      didYouKnow: 'Scientists didn’t know where they nested until the 1970s!'
    },
    {
      name: '🪶 Sandhill Crane',
      slug: 'sandhill-crane',
      images: {
        main: { src: '/Sandhill crane.jpg', alt: 'Sandhill Crane' },
        feather: { src: '/Sandhill crane feather.jpg', alt: 'Crane Feather' },
        extra: { src: '/Sandhill crane nest.jpg', alt: 'Crane Nest' },
        food: { src: '/Sandhill crane feeding.jpg', alt: 'Crane Feeding' },
      },
      intro: 'Sandhill Cranes are tall, elegant birds known for their loud trumpeting calls and impressive migrations.',
      featherInfo: 'Their long, gray feathers are often stained with mud during preening.',
      nesting: {
        image: '/Sandhill crane nest.jpg',
        caption: 'They nest in wetlands, building mounds of vegetation above the waterline.',
        fact: 'Chicks are able to leave the nest and walk just a day after hatching!',
      },
      food: {
        text: 'Cranes eat a mix of grains, insects, frogs, and small mammals.',
        unique: 'They forage by probing the ground with their long bills.',
      },
      didYouKnow: 'Some populations migrate over 6,000 kilometers each year!'
    },
    {
      name: '🪻 Great Blue Heron',
      slug: 'great-blue-heron',
      images: {
        main: { src: '/Great blue heron.jpg', alt: 'Great Blue Heron' },
        feather: { src: '/Great blue heron feather.jpg', alt: 'Heron Feather' },
        extra: { src: '/Great blue heron nest.jpg', alt: 'Heron Nest' },
        food: { src: '/Great blue heron feeding.jpg', alt: 'Heron Feeding' },
      },
      intro: 'The Great Blue Heron is a tall, graceful wading bird often seen stalking fish in shallow water.',
      featherInfo: 'They have long, elegant feathers that drape from their chest and back.',
      nesting: {
        image: '/Great blue heron nest.jpg',
        caption: 'Herons nest in colonies high up in trees, often near water.',
        fact: 'A single tree may hold dozens of large heron nests!',
      },
      food: {
        text: 'They hunt fish, frogs, and small animals by standing still and striking quickly.',
        unique: 'They can swallow prey whole — even large ones!',
      },
      didYouKnow: 'Herons have a wingspan of nearly 2 meters!'
    }

  ],
  'Forest Birds': [
    {
      name: '🧠 Common Raven',
      slug: 'raven',
      images: {
        main: { src: '/Raven.jpg', alt: 'Raven' },
        feather: { src: '/Raven feather.png', alt: 'Raven Feather' },
        extra: { src: '/Raven nest.jpg', alt: 'Raven Nest' },
        food: { src: '/Raven eating.jpg', alt: 'Raven Eating' },
      },
      intro: 'Ravens are highly intelligent birds known for problem-solving and mimicry. They can mimic sounds, including human speech.',
      featherInfo: 'Raven feathers are sleek, jet-black, and slightly iridescent, aiding in flight and warmth.',
      nesting: {
        image: '/Raven nest.jpg',
        caption: 'Ravens build large nests high in trees or cliffs using sticks and moss.',
        fact: 'They sometimes decorate nests with shiny objects!'
      },
      food: {
        text: 'Omnivores and scavengers — they eat small animals, berries, and even garbage.',
        unique: 'They use tools and can cooperate to solve problems!'
      },
      didYouKnow: 'Ravens remember faces and can hold grudges against humans who treat them badly.'
    }
  ],
  'Small Flyers': [
    {
      name: '🐦 Rufous Hummingbird',
      slug: 'hummingbird',
      images: {
        main: { src: '/Hummingbird.jpg', alt: 'Hummingbird' },
        feather: { src: '/Hummingbird feather.jpg', alt: 'Hummingbird Feather' },
        extra: { src: '/Hummingbird nest.jpg', alt: 'Hummingbird Nest' },
        food: { src: '/Hummingbird feeding.jpg', alt: 'Hummingbird Feeding' },
      },
      intro: 'Rufous Hummingbirds are tiny, fast, and brightly colored. They migrate farther than any other hummingbird species.',
      featherInfo: 'Their iridescent feathers shimmer in the light, helping them communicate and attract mates.',
      nesting: {
        image: '/Hummingbird nest.jpg',
        caption: 'They build cup-shaped nests from spider silk and moss.',
        fact: 'Their nests are smaller than a walnut!'
      },
      food: {
        text: 'They feed on nectar using long tongues and beaks, also eating small insects.',
        unique: 'They can hover, fly backwards, and even upside down!'
      },
      didYouKnow: 'They remember every flower they’ve visited and when it will bloom again!'
    }
  ]
};


export default function BirdNotebook() {
  const groupNames = Object.keys(birdGroups);
  const [selectedGroup, setSelectedGroup] = useState(groupNames[0]);
  const groupBirds = birdGroups[selectedGroup];
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const bird = groupBirds[activeIndex];
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Image src="/sky background.png" alt="Sky Background" fill priority className="object-cover object-center" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen w-full px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[2px_2px_0px_black] mb-2">Welcome to the Bird Explorer’s Guide</h1>
          <p className="text-white text-lg drop-shadow-[1px_1px_0px_black]">Learn about these amazing birds before you play the matching game!</p>
        </div>

        <div className="mb-4 flex gap-4 justify-center">
          {groupNames.map((group) => (
            <button
              key={group}
              onClick={() => {
                setSelectedGroup(group);
                setActiveIndex(0);
                setCurrentPage(1);
              }}
              className={clsx(
                'px-4 py-2 rounded-full font-bold border-2',
                group === selectedGroup
                  ? 'bg-yellow-600 text-white border-yellow-700'
                  : 'bg-white text-gray-800 border-gray-400 hover:bg-yellow-100'
              )}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="flex max-w-7xl w-full rounded-3xl shadow-2xl border-[6px] border-yellow-700 overflow-hidden relative bg-gradient-to-br from-[#fdf5e6] via-[#f5f0d6] to-[#f1e7c0]/90">
          <div className="w-28 bg-green-800 flex flex-col justify-center items-center gap-6 py-6">
            {groupBirds.map((b, idx) => (
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
                <Image src={b.images.main.src} alt={b.name} width={80} height={80} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>

          <div className="w-2 bg-yellow-900" />

          <div className="flex-1 grid grid-cols-2 gap-0 p-6 text-black relative">
            <button onClick={() => setCurrentPage(currentPage === 1 ? 2 : 1)} className="absolute top-4 right-4 bg-yellow-800 text-white px-4 py-2 rounded-full z-20 shadow-lg hover:bg-yellow-900 transition">
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

        <button onClick={() => router.push('/matching2')} className="mt-8 bg-green-700 hover:bg-green-900 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition">
          Start Matching Game →
        </button>
      </div>
    </main>
  );
}
