'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';

import '@mantine/core/styles.css';
import { MantineProvider, Stepper, Button, Group } from '@mantine/core';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function FishFactsPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const fishNames = ['Salmon', 'Whitefish', 'Lake Trout'];

  const fishSlides = [
    [
      {
        image: '/salmon1.png',
        alt: 'Salmon swimming upstream',
        desc: 'Salmon swim hundreds of miles to return to where they were born.',
      },
      {
        image: '/salmon2.png',
        alt: 'Jumping Salmon',
        desc: 'They leap over waterfalls during migration.',
      },
      {
        image: '/salmon4.png',
        alt: 'Spawning Salmon',
        desc: 'After spawning, most salmon die, providing nutrients to the forest.',
      },
    ],
    [
      {
        image: '/whitefish1.jpg',
        alt: 'Whitefish in lake',
        desc: 'Whitefish glide near lake bottoms to feed.',
      },
      {
        image: '/whitefish2.jpg',
        alt: 'Close-up of Whitefish',
        desc: 'They have torpedo-shaped bodies for fast swimming.',
      },
      {
        image: '/whitefish3.jpg',
        alt: 'Fishing Whitefish',
        desc: 'They are important to both people and predators.',
      },
    ],
    [
      {
        image: '/trout1.webp',
        alt: 'Lake Trout hunting',
        desc: 'Lake trout are ambush predators.',
      },
      {
        image: '/trout2.jpg',
        alt: 'Large Lake Trout',
        desc: 'They can live over 40 years and grow very large.',
      },
      {
        image: '/trout3.png',
        alt: 'Trout underwater',
        desc: 'They live in cold, deep lakes across Canada.',
      },
    ],
  ];

  const carouselStyles = `
    .seamless-carousel .carousel .slider {
      transition: transform 800ms ease-in-out !important;
    }
    .seamless-carousel .carousel .slide {
      min-width: 100%;
      margin: 0;
      transition: opacity 800ms ease-in-out;
    }
    .carousel-slide {
      width: 100%;
      height: 100%;
    }
    .seamless-carousel .control-arrow {
      opacity: 1 !important;
      background: rgba(0, 0, 0, 0.3) !important;
      border-radius: 50% !important;
      width: 40px !important;
      height: 40px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 200ms ease !important;
    }
    .seamless-carousel .control-arrow:hover {
      background: rgba(0, 0, 0, 0.6) !important;
      transform: scale(1.1) !important;
    }
    .seamless-carousel .control-next.control-arrow:before {
      border-left: 8px solid white !important;
      margin-left: 2px !important;
    }
    .seamless-carousel .control-prev.control-arrow:before {
      border-right: 8px solid white !important;
      margin-right: 2px !important;
    }
    .seamless-carousel .carousel .control-dots {
      bottom: 10px !important;
    }
    .seamless-carousel .carousel .control-dots .dot {
      background: white !important;
      opacity: 0.5 !important;
      box-shadow: none !important;
      width: 10px !important;
      height: 10px !important;
      margin: 0 5px !important;
    }
    .seamless-carousel .carousel .control-dots .dot.selected {
      opacity: 1 !important;
      transform: scale(1.2) !important;
    }
  `;

  return (
    <MantineProvider>
      <style jsx global>{carouselStyles}</style>

      <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
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

          <div className="bg-black/40 rounded-xl p-6 w-full">
            <h2 className="text-4xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Dive Into Their World
            </h2>

            <Stepper active={step} onStepClick={setStep} color="blue" className="w-full mb-4" size="md">
              {fishNames.map((name, index) => (
                <Stepper.Step key={index} label={`Step ${index + 1}`} description={name} />
              ))}
            </Stepper>

            <Group justify="center" className="mb-6">
              <Button variant="default" disabled={step === 0} onClick={() => setStep(step - 1)}>
                Back
              </Button>
              <Button color="blue" disabled={step === fishNames.length - 1} onClick={() => setStep(step + 1)}>
                Next
              </Button>
            </Group>

            <div className="bg-blue-900 rounded-lg p-6 shadow-md mb-6">
              <h3 className="text-3xl font-bold text-white mb-4">{fishNames[step]}</h3>
              <p className="text-white text-lg">Swipe to learn fun facts about the {fishNames[step].toLowerCase()}!</p>
            </div>

            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-blue-800 bg-opacity-80 p-4 relative">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                interval={6000}
                transitionTime={800}
                stopOnHover
                swipeable
                emulateTouch
                className="seamless-carousel"
              >
                {fishSlides[step].map((slide, idx) => (
                  <div key={idx} className="carousel-slide">
                    <div className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] relative">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-contain rounded-lg"
                        priority={idx === 0}
                      />
                    </div>
                    <p className="text-white text-lg font-semibold text-center bg-blue-950 bg-opacity-70 py-3 px-4 mt-2 rounded">
                      {slide.desc}
                    </p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <button
            onClick={() => router.push('/gofish')}
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold px-6 py-3 rounded shadow mt-8"
          >
            Play Go Fish
          </button>
        </div>
      </main>
    </MantineProvider>
  );
}
