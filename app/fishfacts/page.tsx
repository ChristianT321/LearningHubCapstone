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
    description: 'Salmon play an important role in the cultural traditions of many Indigenous peoples, symbolizing life, strength, and renewal. Their bodies, rich in nutrients, act as a natural bridge between ocean and forest, enriching riverbanks and supporting over 100 species, even after they die. During their upstream journey, they navigate countless obstacles including dams, rapids, and predators—all to return to the exact stream where they were born.',
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
    description: 'Whitefish are part of the salmonid family but are often mistaken for other fish due to their small, soft mouths and lack of visible teeth. Their taste and texture make them a staple in traditional diets of northern communities and a key feature in regional ice fishing seasons. Often found in schools near the bottom, whitefish help regulate insect populations and contribute to the balance of freshwater ecosystems.',
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
    description: 'Lake trout are highly sensitive to water quality and temperature, which makes them a strong indicator species for lake health. Their elusive nature and deep-water habitat make them prized by anglers, who often require specialized gear to catch them in the cold depths. These fish can grow to impressive sizes and have evolved to thrive in some of the most pristine and isolated lakes in the world.',
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
  const [factIndex, setFactIndex] = useState(0);
  const extraFactsMap: { [key: number]: { icon: string; title: string; desc: string; }[] } = {
  0: [
    { icon: '🌧️', title: 'Rain Boosters', desc: 'Heavy rains help salmon migrate more easily upstream by increasing river flow.' },
    { icon: '🧬', title: 'Genetic Memory', desc: 'Salmon populations develop traits that adapt to specific rivers.' },
    { icon: '🌿', title: 'Forest Partners', desc: 'Nitrogen from salmon supports tree and plant growth miles from water.' },
    { icon: '🛶', title: 'Cultural Anchor', desc: 'Salmon are central to oral histories, art, and identity of many First Nations.' },
  ],
  1: [
    { icon: '🥶', title: 'Ice Survivors', desc: 'Whitefish remain active under thick ice all winter long.' },
    { icon: '👃', title: 'Sensitive Snouts', desc: 'Whitefish use sensitive noses to forage along lakebeds.' },
    { icon: '🎣', title: 'Traditional Catch', desc: 'Ice fishing for whitefish is a tradition in many northern communities.' },
    { icon: '🧊', title: 'Cold Preference', desc: 'Whitefish are most comfortable in waters just above freezing.' },
  ],
  2: [
    { icon: '🕳️', title: 'Rocky Hideouts', desc: 'Lake trout often hide in rocky underwater crevices to ambush prey.' },
    { icon: '🔇', title: 'Stealthy Hunters', desc: 'They approach prey slowly and strike without warning.' },
    { icon: '🧓', title: 'Ancient Swimmers', desc: 'Some lake trout reach over 40 years of age.' },
    { icon: '🧭', title: 'Solitary Navigators', desc: 'Lake trout are often territorial and swim alone.' },
  ],
  };
  const extraFacts = extraFactsMap[step];
  const rotatingFacts = extraFacts;

  return (
    <MantineProvider>
      <main className="relative min-h-screen w-full flex flex-col items-center text-center overflow-y-auto p-4">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/FIsh background.png"
            alt="Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-5xl px-4 py-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-10">
            Learn About the Fish
          </h1>

          {/* Stepper */}
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

          {/* Fish Info Box */}
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

            <div className="bg-blue-800/60 rounded-xl shadow-lg p-6 mb-10 max-w-4xl mx-auto border-l-4 border-yellow-300">
              <p className="text-lg text-blue-100 leading-relaxed">
                {currentFish.description}
              </p>
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

            <div
              className="bg-yellow-200 text-yellow-900 text-lg font-semibold text-center p-4 rounded-xl shadow border border-yellow-400 cursor-pointer hover:bg-yellow-300 transition"
              onClick={() => setFactIndex((prev) => (prev + 1) % rotatingFacts.length)}
            >
              {rotatingFacts[factIndex].icon} {rotatingFacts[factIndex].title}: {rotatingFacts[factIndex].desc}
              <div className="text-sm italic text-yellow-800 mt-2">Click to change fact</div>
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

