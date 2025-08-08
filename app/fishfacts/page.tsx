'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import '@mantine/core/styles.css';
import { MantineProvider, Stepper, Button, Group } from '@mantine/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const fishData = [
  {
    name: 'Salmon',
    emoji: '🐟',
    intro: 'The legendary upstream traveler of the Great Bear Rainforest.',
    carousel: ['/salmon1.png', '/salmon2.png', '/salmon4.png'],
    facts: [
      { title: 'Extreme Migration', icon: '🌊', desc: 'Salmon swim from the ocean to rivers to lay their eggs.' },
      { title: 'Ecosystem Heroes', icon: '🌲', desc: 'Their bodies feed bears, eagles, and even trees after spawning.' },
      { title: 'Super Smellers', icon: '👃', desc: 'They return to their birth river using scent alone!' },
      { title: 'Jump Masters', icon: '💥', desc: 'They can leap up waterfalls on their way upstream.' },
      { title: 'Life Cycle Legends', icon: '🔁', desc: 'Born in freshwater, they travel to sea and back.' },
      { title: 'Indigenous Importance', icon: '🧍‍♂️', desc: 'Salmon are vital in Indigenous culture, food, and ceremony.' },
    ],
    gallery: [
      { src: '/salmon-closeup.webp', caption: 'A salmon’s jaw during spawning.' },
      { src: '/salmon-fry.jpg', caption: 'Salmon fry begin life in river gravel.' },
      { src: '/salmon-bear.jpg', caption: 'Bears rely on salmon during autumn.' },
    ],
    callout: '🧠 Did you know? Salmon carry nutrients from the ocean deep into forest ecosystems!',
  },
  {
    name: 'Whitefish',
    emoji: '🐟',
    intro: 'A sleek swimmer that glides near lake bottoms.',
    carousel: ['/whitefish1.jpg', '/whitefish2.jpg', '/whitefish3.jpg'],
    facts: [
      { title: 'Bottom Dwellers', icon: '🏞️', desc: 'Whitefish prefer cold, deep lake waters near the bottom.' },
      { title: 'Efficient Feeders', icon: '🍽️', desc: 'They feed on insects, plankton, and small invertebrates.' },
      { title: 'Important Prey', icon: '🦅', desc: 'They are a key food source for larger fish, birds, and humans.' },
      { title: 'Fast Swimmers', icon: '💨', desc: 'Their torpedo-like shape makes them efficient swimmers.' },
      { title: 'Winter Activity', icon: '❄️', desc: 'Whitefish remain active under ice and continue feeding.' },
      { title: 'Commercial Value', icon: '💰', desc: 'Whitefish are popular for their mild taste and are commercially fished.' },
    ],
    gallery: [
      { src: '/whitefish-bottom.webp', caption: 'Whitefish near the lake bottom.' },
      { src: '/whitefish-sleek.jpg', caption: 'Their bodies are streamlined and sleek.' },
      { src: '/whitefish-food.jpg', caption: 'Caught as food by predators.' },
    ],
    callout: '🧠 Did you know? Whitefish can thrive in icy lakes where few other fish can survive!',
  },
  {
    name: 'Lake Trout',
    emoji: '🐟',
    intro: 'A deep-water predator that rules cold northern lakes.',
    carousel: ['/trout1.webp', '/trout2.jpg', '/trout3.png'],
    facts: [
      { title: 'Ambush Predator', icon: '👀', desc: 'Lake trout wait patiently to strike passing prey.' },
      { title: 'Cold Water Lovers', icon: '❄️', desc: 'They live in deep, cold lakes where temperatures stay low.' },
      { title: 'Slow Growth', icon: '⏳', desc: 'Lake trout grow slowly but can reach massive sizes over decades.' },
      { title: 'Record Lifespan', icon: '🎂', desc: 'Some lake trout have lived for over 40 years.' },
      { title: 'Strong Swimmers', icon: '💪', desc: 'Their muscular bodies allow sudden bursts of speed.' },
      { title: 'Top Predator', icon: '🎣', desc: 'Lake trout are apex predators in many freshwater lakes.' },
    ],
    gallery: [
      { src: '/trout-old.jpg', caption: 'A lake trout hunting near the bottom.' },
      { src: '/trout-bottom.jpg', caption: 'Large trout can live for decades.' },
      { src: '/trout-clean.png', caption: 'They love cold, clean lakes.' },
    ],
    callout: '🧠 Did you know? The largest recorded lake trout weighed over 70 pounds!',
  },
];

export default function FishFactsPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const currentFish = fishData[step];

  return (
    <MantineProvider>
      <main className="relative min-h-screen w-full flex flex-col items-center text-center overflow-y-auto p-4">
        <div className="fixed inset-0 z-0">
          <Image
            src="/FIsh background.png"
            alt="Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-5xl px-4 py-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-10">
            Learn About the Fish
          </h1>

          <Stepper active={step} onStepClick={setStep} color="blue" className="w-full mb-4" size="md">
            {fishData.map((fish, index) => (
              <Stepper.Step key={index} label={`Step ${index + 1}`} description={fish.name} />
            ))}
          </Stepper>

          <Group justify="center" className="mb-6">
            <Button variant="default" disabled={step === 0} onClick={() => setStep(step - 1)}>
              Back
            </Button>
            <Button color="blue" disabled={step === fishData.length - 1} onClick={() => setStep(step + 1)}>
              Next
            </Button>
          </Group>

          <div className="bg-blue-950 text-white rounded-2xl p-8 w-full shadow-xl border-l-8 border-yellow-400">
            <h2 className="text-4xl font-extrabold text-yellow-300 mb-2">
              {currentFish.emoji} {currentFish.name}
            </h2>
            <p className="text-lg text-blue-200 italic mb-6">{currentFish.intro}</p>

            <div className="rounded-xl overflow-hidden shadow-lg mb-8">
              <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={5000}>
                {currentFish.carousel.map((src, i) => (
                  <div key={i} className="flex items-center justify-center bg-blue-950 rounded-lg h-[500px] p-6">
                    <Image src={src} alt={`${currentFish.name} ${i}`} width={1000} height={500} className="object-cover w-full h-full" />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {currentFish.facts.map((fact, i) => (
                <div key={i} className="bg-blue-800 rounded-xl p-4 border-l-4 border-yellow-400 shadow hover:shadow-xl transition">
                  <h4 className="text-xl font-semibold mb-2 text-yellow-200">
                    {fact.icon} {fact.title}
                  </h4>
                  <p className="text-blue-100">{fact.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {currentFish.gallery.map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden shadow-md">
                  <Image src={img.src} alt={img.caption} width={400} height={250} className="object-cover w-full h-[200px]" />
                  <p className="text-sm text-white text-center mt-2 bg-blue-800/80 px-3 py-2 rounded-md font-medium shadow">
                    {img.caption}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-200 text-yellow-900 text-lg font-semibold text-center p-4 rounded-xl shadow border border-yellow-400">
              {currentFish.callout}
            </div>
          </div>

          <button
            onClick={() => router.push('/comparefish')}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded shadow mt-8"
          >
            Compare Fish
          </button>
        </div>
      </main>
    </MantineProvider>
  );
}
