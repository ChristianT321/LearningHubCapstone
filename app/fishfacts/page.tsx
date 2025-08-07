'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';
import '@mantine/core/styles.css';
import { MantineProvider, Stepper, Group } from '@mantine/core';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFish } from 'react-icons/fa';

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
      { src: '/salmon-closeup.webp', caption: "A salmon's jaw during spawning." },
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
  const [expandedFact, setExpandedFact] = useState<number | null>(null);
  const currentFish = fishData[step];

  return (
    <MantineProvider>
      <main className="relative min-h-screen w-full flex flex-col items-center text-center overflow-y-auto p-4" style={{ paddingTop: '80px' }}>
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

        <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-5xl px-4 py-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-10">
            Learn About the Fish
          </h1>

          {/* Enhanced Stepper */}
          <Stepper 
            active={step} 
            onStepClick={setStep} 
            color="blue" 
            className="w-full mb-4" 
            size="md"
            styles={{
              stepBody: { marginTop: 8 },
              stepLabel: { color: 'white', fontWeight: 'bold', fontSize: '1rem' },
              stepDescription: { color: '#bfdbfe', fontSize: '0.9rem' },
            }}
          >
            {fishData.map((fish, index) => (
              <Stepper.Step 
                key={index} 
                label={`Step ${index + 1}`} 
                description={fish.name}
                icon={<FaFish className="text-yellow-300" />}
              />
            ))}
          </Stepper>

          {/* Enhanced Navigation Buttons */}
          <Group justify="center" className="mb-6 gap-4">
            <motion.button
              onClick={() => setStep(step - 1)}
              disabled={step === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold px-6 py-2"
              style={{
                borderRadius: '12px',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #3b82f6, #1d4ed8, #1e40af)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                opacity: step === 0 ? 0.5 : 1,
                cursor: step === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Back
            </motion.button>
            <motion.button
              onClick={() => setStep(step + 1)}
              disabled={step === fishData.length - 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white font-bold px-6 py-2"
              style={{
                borderRadius: '12px',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #3b82f6, #1d4ed8, #1e40af)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                opacity: step === fishData.length - 1 ? 0.5 : 1,
                cursor: step === fishData.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Next
            </motion.button>
          </Group>

          {/* Enhanced Main Content Container */}
          <motion.div 
            className="rounded-2xl p-8 w-full shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              border: '3px solid transparent',
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #3b82f6, #1d4ed8, #1e40af)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h2 className="text-4xl font-extrabold text-yellow-300 mb-2">
              {currentFish.emoji} {currentFish.name}
            </h2>
            <p className="text-lg text-blue-200 italic mb-6">{currentFish.intro}</p>

            {/* Enhanced Carousel without indicators */}
            <div className="rounded-xl overflow-hidden shadow-lg mb-8">
              <div style={{
                border: '2px solid rgba(100, 200, 255, 0.3)',
                borderRadius: '16px',
                background: 'rgba(0, 0, 0, 0.4)',
                padding: '4px'
              }}>
                <Carousel 
                  autoPlay 
                  infiniteLoop 
                  showThumbs={false} 
                  showStatus={false}
                  showIndicators={false}
                  interval={5000}
                  className="rounded-lg"
                >
                  {currentFish.carousel.map((src, i) => (
                    <div key={i} className="flex items-center justify-center bg-blue-950 rounded-lg h-[500px] p-6">
                      <Image 
                        src={src} 
                        alt={`${currentFish.name} ${i}`} 
                        width={1000} 
                        height={500} 
                        className="object-cover w-full h-full rounded-md"
                        style={{ border: '1px solid rgba(100, 200, 255, 0.2)' }}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            {/* Enhanced Facts Section with Expandable Buttons */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {currentFish.facts.map((fact, i) => (
                <motion.div 
                  key={i}
                  className="rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    border: '2px solid transparent',
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #3b82f6, #1d4ed8, #1e40af)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <button
                    onClick={() => setExpandedFact(expandedFact === i ? null : i)}
                    className="w-full text-left p-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{fact.icon}</span>
                      <h4 className="text-xl font-semibold text-yellow-200">
                        {fact.title}
                      </h4>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFact === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="bg-blue-600 bg-opacity-70"
                      >
                        <div className="p-4 pt-2">
                          <p className="text-blue-100">{fact.desc}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Gallery Section */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {currentFish.gallery.map((img, i) => (
                <motion.div 
                  key={i} 
                  className="rounded-xl overflow-hidden shadow-md"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div style={{
                    border: '2px solid rgba(100, 200, 255, 0.3)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                  }}>
                    <Image 
                      src={img.src} 
                      alt={img.caption} 
                      width={400} 
                      height={250} 
                      className="object-cover w-full h-[200px]"
                    />
                    <p className="text-sm text-white text-center mt-2 bg-blue-800/80 px-3 py-2 rounded-md font-medium shadow">
                      {img.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Callout */}
            <motion.div 
              className="text-lg font-semibold text-center p-4 rounded-xl shadow"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
              style={{
                background: 'linear-gradient(to right, rgba(253, 230, 138, 0.9), rgba(254, 240, 138, 0.9))',
                color: '#92400e',
                border: '2px solid rgba(245, 158, 11, 0.5)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              {currentFish.callout}
            </motion.div>
          </motion.div>

          {/* Enhanced Compare Button */}
          <motion.button
            onClick={() => router.push('/comparefish')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-bold px-6 py-3 mt-8"
            style={{
              borderRadius: '12px',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #3b82f6, #1d4ed8, #1e40af)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span className="relative z-10">Compare Fish</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 hover:opacity-20"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </main>
    </MantineProvider>
  );
}