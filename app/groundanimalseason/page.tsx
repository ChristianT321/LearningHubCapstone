'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';

import '@mantine/core/styles.css';
import { MantineProvider, Stepper, Button, Group } from '@mantine/core';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function GroundAnimalSeasonPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const handleContinue = () => {
    router.push('/groundanimalfacts');
  };

  // Embedded CSS for carousel
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

  const slidesBlackBear = [
    {
      image: '/01_Schwarzbär.jpg',
      alt: 'Black Bear Standing',
      desc: 'As the seasons change, black bears prepare for winter by foraging and building fat reserves.',
    },
    {
      image: '/bear_curled_up_in_den.jpg',
      alt: 'Bear in Den',
      desc: 'During colder months, bears enter dens to hibernate, conserving energy while the forest sleeps.',
    },
    {
      image: '/beareating.jpg',
      alt: 'Bear Eating',
      desc: "With spring's arrival, bears emerge from dens, hungry and ready to feast on roots, berries, and fish.",
    },
  ];

  const slidesSpiritBear = [
    {
      image: '/Spirit Bear Spring.avif',
      alt: 'Spirit Bear Spring',
      desc: 'Bears wake up from hibernation around March or April. They come out of their dens hungry and weak after months without eating. At first, they eat fresh grass, plants, and early berries to get energy.',
    },
    {
      image: '/Spirit Bear Summer.avif',
      alt: 'Spirit Bear Summer',
      desc: 'Summer is when food is everywhere: lots of berries, plants, insects, and clams. Bears spend lots of time eating to build up fat for the next winter.',
    },
    {
      image: '/Spirit Bear Fall.jpg',
      alt: 'Spirit Bear Fall',
      desc: 'This is the most important feeding time: the salmon runs! Bears gather at rivers and streams to catch salmon. They eat as much fatty fish as possible to store energy. They become very focused on feeding and may be seen fishing all day.',
    },
    {
      image: '/Spirit Bear Winter.jpg',
      alt: 'Spirit Bear Winter',
      desc: 'Bears go into hibernation, usually from November to March. They sleep in dens made in hollow trees, caves, or dug-out hillsides. While hibernating, they don\'t eat, drink, or go to the bathroom — they live off their body fat. The bear stays in the den until the warmer weather returns.',
    },
  ];

  const slidesGrizzlyBear = [
    {
      image: '/Grizzly Bear Spring.jpg',
      alt: 'Grizzly Bear Spring',
      desc: 'Grizzlies wake up from hibernation around March or April. They come out skinny and hungry, so they eat fresh green plants, grasses, and roots.',
    },
    {
      image: '/Grizzly Bear Summer.jpg',
      alt: 'Grizzly Bear Summer',
      desc: 'In summer, they often stay near rivers, streams, and meadows where there is the most to eat. Mothers keep cubs close while they forage for food.',
    },
    {
      image: '/Grizzly Bear Fall.jpg',
      alt: 'Grizzly Bear Fall',
      desc: 'Like the other bears, grizzlies eat a lot of salmon in the fall. Once they have enough fat, they prepare for hibernation by finding or building a den to sleep in for the winter.',
    },
    {
      image: '/Grizzly Bear Winter.png',
      alt: 'Grizzly Bear Winter',
      desc: 'Same as the other bears, Grizzlies hibernate from November to March. They sleep in dens and live off body fat until spring returns.',
    },
  ];

  return (
    <MantineProvider defaultColorScheme="light">
      {/* Embedded CSS */}
      <style jsx global>{carouselStyles}</style>
      
      <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
        <div className="fixed inset-0 z-0">
          <Image
            src="/homeback.png"
            alt="Home Background"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center' }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-5xl px-4 py-8">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-10">
            Seasonal Changes for Ground Animals
          </h1>

          <div className="bg-black/40 rounded-xl p-6 w-full">
            <h2 className="text-5xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Bears!
            </h2>

            <Stepper
              active={step}
              onStepClick={setStep}
              color="orange"
              className="w-full mb-4"
              size="md"
            >
              <Stepper.Step label="Step 1" description="Black Bear" />
              <Stepper.Step label="Step 2" description="Spirit Bear" />
              <Stepper.Step label="Step 3" description="Grizzly Bear" />
            </Stepper>

            <Group justify="center" className="mb-6">
              <Button
                variant="default"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
              <Button
                color="orange"
                disabled={step === 2}
                onClick={() => setStep(step + 1)}
              >
                Next step
              </Button>
            </Group>

            <div className="bg-amber-800 rounded-lg p-6 shadow-md mb-6">
              {step === 0 ? (
                <>
                  <h3 className="text-3xl font-bold text-white mb-4">Black Bear</h3>
                  <p className="text-white text-lg">
                    Black bears are common in the Great Bear Rainforest and play an important role in the ecosystem.
                  </p>
                </>
              ) : step === 1 ? (
                <>
                  <h3 className="text-3xl font-bold text-white mb-4">Spirit Bear</h3>
                  <p className="text-white text-lg">
                    The Spirit Bear, also known as the Kermode bear, is a rare and special type of black bear with white fur.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-white mb-4">Grizzly Bear</h3>
                  <p className="text-white text-lg">
                    Grizzly bears are larger bears found in some parts of the Great Bear Rainforest.
                  </p>
                </>
              )}
            </div>

            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-amber-800 bg-opacity-80 p-4 relative">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                interval={5000}
                transitionTime={800}
                stopOnHover={false}
                swipeable={true}
                emulateTouch={true}
                dynamicHeight={false}
                className="seamless-carousel"
                renderArrowPrev={(onClickHandler, hasPrev, label) => (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="absolute left-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="white" 
                      width="28" 
                      height="28"
                    >
                      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                    </svg>
                  </button>
                )}
                renderArrowNext={(onClickHandler, hasNext, label) => (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="absolute right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    style={{ top: '50%', transform: 'translateY(-50%)' }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="white" 
                      width="28" 
                      height="28"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                    </svg>
                  </button>
                )}
              >
                {(step === 0 ? slidesBlackBear : step === 1 ? slidesSpiritBear : slidesGrizzlyBear).map(
                  (slide, idx) => (
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
                      <p className="text-white text-lg font-semibold text-center bg-amber-950 bg-opacity-70 py-3 px-4 mt-2 rounded">
                        {slide.desc}
                      </p>
                    </div>
                  )
                )}
              </Carousel>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded shadow mt-8"
          >
            Continue
          </button>
        </div>
      </main>
    </MantineProvider>
  );
}