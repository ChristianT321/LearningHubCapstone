'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';

import '@mantine/core/styles.css';
import { MantineProvider, Stepper, Button, Group } from '@mantine/core';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function BirdFactsPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const birdNames = ['Bald Eagle', 'Hummingbird', 'Duck'];

  const birdSlides = [
  [
    {
      image: '/Bald eagle.jpg',
      alt: 'Bald Eagle',
      desc: 'The bald eagle can spot prey from over 3 kilometers away!',
    },
    {
      image: '/Bald eagle feather.jpg',
      alt: 'Bald Eagle Feather',
      desc: 'Broad, dark feather with a white tip — perfect for soaring.',
    },
    {
      image: '/Bald eagle nest.jpg',
      alt: 'Bald Eagle Nest',
      desc: 'Bald eagles build the largest nests of any bird in North America.',
    },
  ],
  [
    {
      image: '/Hummingbird.jpg',
      alt: 'Hummingbird',
      desc: 'Hummingbirds can flap their wings up to 80 times per second!',
    },
    {
      image: '/Hummingbird feather.jpg',
      alt: 'Hummingbird Feather',
      desc: 'Tiny, iridescent feather — shimmers with color and light.',
    },
    {
      image: '/Hummingbird hovering.jpg',
      alt: 'Hummingbird Hovering',
      desc: 'They can hover in place and even fly backward — a rare skill among birds.',
    },
  ],
  [
    {
      image: '/Duck.webp',
      alt: 'Duck',
      desc: 'Ducks have waterproof feathers thanks to natural oils.',
    },
    {
      image: '/Duck feather.jpg',
      alt: 'Duck Feather',
      desc: 'Soft, layered feather that helps keep water out.',
    },
    {
      image: '/Ducklings.jpg',
      alt: 'Ducklings',
      desc: 'Baby ducks, called ducklings, can swim just hours after hatching.',
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
  `;

  return (
    <MantineProvider>
      <style jsx global>{carouselStyles}</style>

      <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/sky background.png"
            alt="Sky Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-5xl px-4 py-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-10">
            Bird Facts & Feather ID
          </h1>
          <p className="text-white text-lg max-w-2xl">
            Learn cool facts about each bird and how to recognize its feathers before you play the matching game.
          </p>

          <div className="bg-black/40 rounded-xl p-6 w-full">
            <h2 className="text-4xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Meet the Birds
            </h2>

            <Stepper active={step} onStepClick={setStep} color="cyan" className="w-full mb-4" size="md">
              {birdNames.map((name, index) => (
                <Stepper.Step key={index} label={`Step ${index + 1}`} description={name} />
              ))}
            </Stepper>

            <Group justify="center" className="mb-6">
              <Button variant="default" disabled={step === 0} onClick={() => setStep(step - 1)}>
                Back
              </Button>
              <Button color="cyan" disabled={step === birdNames.length - 1} onClick={() => setStep(step + 1)}>
                Next
              </Button>
            </Group>

            <div className="bg-cyan-900 rounded-lg p-6 shadow-md mb-6">
              <h3 className="text-3xl font-bold text-white mb-4">{birdNames[step]}</h3>
              <p className="text-white text-lg">Swipe through to see both the bird and its feather!</p>
            </div>

            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-cyan-800 bg-opacity-80 p-4 relative">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                interval={5000}
                transitionTime={800}
                stopOnHover
                swipeable
                emulateTouch
                className="seamless-carousel"
              >
                {birdSlides[step].map((slide, idx) => (
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
                    <p className="text-white text-lg font-semibold text-center bg-cyan-950 bg-opacity-70 py-3 px-4 mt-2 rounded">
                      {slide.desc}
                    </p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <button
            onClick={() => router.push('/matching2')}
            className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold px-6 py-3 rounded shadow mt-8"
          >
            Start Matching Game
          </button>
        </div>
      </main>
    </MantineProvider>
  );
}
