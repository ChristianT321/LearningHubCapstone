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
      desc: 'With spring’s arrival, bears emerge from dens, hungry and ready to feast on roots, berries, and fish.',
    },
  ];

  const slidesGreatBear = [
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
      desc: 'Bears go into hibernation, usually from November to March. They sleep in dens made in hollow trees, caves, or dug-out hillsides. While hibernating, they don’t eat, drink, or go to the bathroom — they live off their body fat. The bear stays in the den until the warmer weather returns.',
    },
  ];

  const slides2 = [
    {
      image: '/sea wolf swimming.avif',
      alt: 'Sea Wolf Swimming',
      desc: 'Vancouver seawolves swim to different islands in search of food, swimming most often during the summer season.',
    },
    {
      image: '/sea wolf fall.jpg',
      alt: 'Sea Wolf in Fall',
      desc: 'In the fall, sea wolves get their largest supply of salmon from huge salmon runs, preparing for the cold months ahead.',
    },
    {
      image: '/sea wolf winter.jpg',
      alt: 'Sea Wolf in Winter',
      desc: 'Even in the harshest winters, sea wolves thrive, hunting and navigating icy waters.',
    },
    {
      image: '/sea wolf puppy.jpg',
      alt: 'Sea Wolf Puppy',
      desc: 'In springtime the pups are born, resting while the pack hunts for food nearby.',
    },
  ];

  return (
    <MantineProvider defaultColorScheme="light">
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
                disabled={step === 1}
                onClick={() => setStep(step + 1)}
              >
                Next step
              </Button>
            </Group>

            <h2 className="text-4xl font-bold text-white drop-shadow-[2px_2px_0px_black] mb-4">
              {step === 0 ? 'Black Bears' : 'Spirit Bears'}
            </h2>

            <div className="bg-amber-800 rounded-lg p-6 shadow-md mb-6">
              {step === 0 ? (
                <p className="text-white text-lg">
                  Black bears are common in the Great Bear Rainforest and play an important role in the ecosystem. They spend a lot of time near rivers and streams,
                  especially when salmon are plentiful. They help spread nutrients by carrying fish remains into the forest. Black bears eat berries, plants, insects, and fish,
                  and they usually avoid people.
                </p>
              ) : (
                <p className="text-white text-lg">
                  The Spirit Bear, also known as the Kermode bear, is a rare and special type of black bear with white fur. Found only in the Great Bear Rainforest,
                  it symbolizes the uniqueness of this ecosystem. Spirit Bears are deeply important to Indigenous cultures and are a key part of local legends and stories.
                </p>
              )}
            </div>

            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-amber-800 bg-opacity-80 p-4">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                interval={5000}
                className="rounded"
              >
                {(step === 0 ? slidesBlackBear : slidesGreatBear).map((slide, idx) => (
                  <div key={idx} className="relative">
                    <div className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] relative">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-white text-lg font-semibold text-center bg-amber-950 bg-opacity-70 py-3 px-4 mt-2 rounded">
                      {slide.desc}
                    </p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          {/* ✅ SEA WOLVES SECTION WRAPPED */}
          <div className="bg-black/40 rounded-xl p-6 w-full">
            <h2 className="text-4xl font-bold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Vancouver Coastal Sea Wolves
            </h2>

            <div className="bg-amber-800 rounded-lg p-6 shadow-md mb-6">
              <p className="text-white text-lg">
                The Vancouver Coastal Sea Wolf is a unique type of wolf that lives along the coast and islands of the Great Bear Rainforest.
                They swim a lot and eat mostly seafood like salmon, crabs, and seals. They help balance the ecosystem and are important to local Indigenous cultures.
              </p>
            </div>

            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-amber-800 bg-opacity-80 p-4">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showIndicators={true}
                interval={5000}
                className="rounded"
              >
                {slides2.map((slide2, idx) => (
                  <React.Fragment key={idx}>
                    <div className="relative">
                      <div className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] relative">
                        <Image
                          src={slide2.image}
                          alt={slide2.alt}
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <p className="text-white text-lg font-semibold text-center bg-amber-950 bg-opacity-70 py-3 px-4 mt-2 rounded">
                        {slide2.desc}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
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
