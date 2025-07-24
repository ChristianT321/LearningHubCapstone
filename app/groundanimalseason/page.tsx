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
  const animalSections = [
  { id: 'bears', label: 'Bears', image: '/bear_icon.webp' },
  { id: 'beaver', label: 'Beaver', image: '/beaver_icon.webp' },
  { id: 'wolf', label: 'Wolf', image: '/wolf_icon.webp' },
  { id: 'elk', label: 'Elk', image: '/elk_icon.webp' },
  { id: 'weasel', label: 'Weasel', image: '/weasel_icon.webp' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
      bottom: -30px !important;
      position: absolute !important;
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
      <div className="fixed top-1/4 left-2 z-50 flex flex-col items-center gap-4 bg-black/50 p-2 rounded-lg shadow-lg">
        {animalSections.map((animal) => (
          <button
            key={animal.id}
            onClick={() => scrollToSection(animal.id)}
            className="hover:scale-105 transition-transform"
            title={animal.label}
          >
            <Image
              src={animal.image}
              alt={animal.label}
              width={40}
              height={40}
              className="rounded-full border-2 border-white"
            />
          </button>
        ))}
      </div>
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

          <div id="bears" className="bg-black/40 rounded-xl p-6 w-full">
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

            <div className="bg-yellow-950 rounded-lg p-6 shadow-md mb-6">
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

            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-yellow-950 bg-opacity-80 p-4 relative">
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
                      <p className="text-white text-lg font-semibold text-center bg-yellow-950 bg-opacity-70 py-3 px-4 mt-2 rounded">
                        {slide.desc}
                      </p>
                    </div>
                  )
                )}
              </Carousel>
              
            </div>
              <div className="text-white bg-yellow-900 rounded-lg p-6 text-left max-w-3xl mx-auto mt-6">
              {step === 0 && (
                <>
                  <h3 className="text-2xl font-bold mb-2">Black Bear</h3>
                  <p>
                    Black bears are common in the Great Bear Rainforest and are very adaptable. They eat different foods each season—from berries and insects in spring to salmon in fall. They help the forest by spreading seeds and nutrients. In winter, they hibernate in dens and live off stored fat. Though they usually avoid humans, they’re a vital part of the ecosystem.
                  </p>
                </>
              )}
              {step === 1 && (
                <>
                  <h3 className="text-2xl font-bold mb-2">Spirit Bear</h3>
                  <p>
                    The Spirit Bear, or Kermode bear, is a rare white-furred black bear found only in the Great Bear Rainforest. It holds cultural importance to Indigenous peoples. Spirit Bears are excellent salmon hunters—some say their white fur helps them sneak up on fish! They hibernate during winter and are essential to maintaining balance in the coastal forest ecosystem.
                  </p>
                </>
              )}
              {step === 2 && (
                <>
                  <h3 className="text-2xl font-bold mb-2">Grizzly Bear</h3>
                  <p>
                    Grizzly bears are the largest bears in the Great Bear Rainforest. They eat roots, berries, salmon, and more to gain weight before winter. Grizzlies help fertilize the forest by dragging salmon into the woods, spreading nutrients. They hibernate in dens during cold months and are key to the health of the ecosystem.
                  </p>
                </>
              )}
            </div>
          </div>
          <div id="beaver" className="bg-black/40 rounded-xl p-6 w-full mt-12">
            <h2 className="text-5xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              The Beaver
            </h2>
            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-yellow-950 bg-opacity-80 p-4 relative mb-4">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={6000}
                showIndicators={true}
                transitionTime={800}
                swipeable={true}
                emulateTouch={true}
                className="seamless-carousel"
              >
                {[
                  {
                    image: '/beaver_dam.jpg',
                    alt: 'Beaver dam in river',
                    desc: 'Beavers build dams to slow down water and create wetlands.',
                  },
                  {
                    image: '/beaver_chewing.webp',
                    alt: 'Beaver chewing tree',
                    desc: 'A beaver chews through a tree using its powerful front teeth.',
                  },
                  {
                    image: '/beaver_lodge.webp',
                    alt: 'Beaver lodge',
                    desc: 'Beavers make cozy lodges where they sleep and raise kits.',
                  },
                ].map((slide, idx) => (
                  <div key={idx} className="carousel-slide">
                    <div className="w-full h-[400px] relative">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-contain rounded-lg"
                        priority={idx === 0}
                      />
                    </div>
                    <p className="text-white text-lg font-semibold text-center bg-yellow-900 bg-opacity-70 py-3 px-4 mt-2 rounded">
                      {slide.desc}
                    </p>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="text-white bg-yellow-900 rounded-lg p-6 text-left max-w-3xl mx-auto mt-6 mb-6">
                <p>
                  The beaver is one of Canada's most iconic animals and plays a key role in the ecosystem of the Great Bear Rainforest. Known as nature’s engineer, the beaver builds dams and lodges using branches, mud, and stones. These structures not only create safe homes for beavers, but also help form wetlands that support countless other animals and plants. Beavers have large orange teeth made of iron that never stop growing. They use these strong teeth to gnaw through trees and branches with ease. Their wide, flat tails act like paddles when swimming and like kickstands when standing upright to chew. Beavers live in family units and communicate through tail slaps and vocalizations. They are most active at night and spend much of their time in water, which helps protect them from predators.
                </p> 
            </div>

            <div className="w-full flex flex-col items-center mt-6">
              <h3 className="text-2xl font-bold text-white mb-4">Fun Beaver Facts:</h3>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                  <p className="text-white text-lg text-center">🦷 Beaver teeth never stop growing!</p>
                </div>

                <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                  <p className="text-white text-lg text-center">🌊 They can stay underwater for up to 15 minutes.</p>
                </div>

                <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                  <p className="text-white text-lg text-center">🏞️ Beaver dams help create clean water for other animals.</p>
                </div>
              </div>
            </div>
          </div>

          {/* VANCOUVER ISLAND WOLF SECTION */}
          <div id="wolf" className="bg-black/40 rounded-xl p-6 w-full mt-12">
            <h2 className="text-5xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Vancouver Island Wolf
            </h2>

            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-yellow-950 bg-opacity-80 p-4 relative mb-4">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={6000}
                showIndicators={true}
                transitionTime={800}
                swipeable={true}
                emulateTouch={true}
                className="seamless-carousel"
              >
                {[
                  {
                    image: '/wolf_on_beach.jpg',
                    alt: 'Wolf on rocky beach',
                    desc: 'Vancouver Island wolves often roam beaches searching for food.',
                  },
                  {
                    image: '/wolf_swimming.webp',
                    alt: 'Wolf swimming',
                    desc: 'These wolves are excellent swimmers and travel between islands.',
                  },
                  {
                    image: '/wolf_pack.jpg',
                    alt: 'Wolf pack in forest',
                    desc: 'Wolves hunt in small packs and rely on teamwork.',
                  },
                ].map((slide, idx) => (
                  <div key={idx} className="carousel-slide">
                    <div className="w-full h-[400px] relative">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-contain rounded-lg"
                        priority={idx === 0}
                      />
                    </div>
                    <p className="text-white text-lg font-semibold text-center bg-yellow-900 bg-opacity-70 py-3 px-4 mt-2 rounded">
                      {slide.desc}
                    </p>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="text-white bg-yellow-900 rounded-lg p-6 text-left max-w-3xl mx-auto mt-6 mb-6">
            <p className="text-white text-lg mb-4">
              The Vancouver Island wolf is a rare and special type of coastal wolf that lives in the Great Bear Rainforest and nearby coastal islands. Unlike other wolves, it is a strong swimmer and often travels between islands in search of food. These wolves are smaller and redder than their mainland cousins. They hunt in packs and work together to catch black-tailed deer, salmon, seals, and even shellfish along the shore. They’re most active during dawn and dusk and are very shy around humans. These wolves play a critical role in keeping prey populations in balance, which helps the forest stay healthy. Their thick fur keeps them warm in cold, wet weather, and their sharp hearing allows them to detect danger or prey from far away.
            </p>
            </div>

            <div className="w-full flex flex-col items-center mt-6">
              <h3 className="text-2xl font-bold text-white mb-4">Fun Wolf Facts:</h3>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                  <p className="text-white text-lg text-center">🐺 Vancouver Island wolves can swim over 10 kilometers!</p>
                </div>

                <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                  <p className="text-white text-lg text-center">👃 They have a keen sense of smell and hearing.</p>
                </div>

                <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                  <p className="text-white text-lg text-center">🌲 Wolves help keep ecosystems in balance.</p>
                </div>
              </div>
            </div>
          </div>
          {/* ROOSEVELT ELK SECTION */}
          <div id="elk" className="bg-black/40 rounded-xl p-6 w-full mt-12">
            <h2 className="text-5xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Roosevelt Elk
            </h2>

            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-yellow-950 bg-opacity-80 p-4 relative mb-4">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={6000}
                showIndicators={true}
                transitionTime={800}
                swipeable={true}
                emulateTouch={true}
                className="seamless-carousel"
              >
                {[
                  {
                    image: '/elk_forest.jpg',
                    alt: 'Roosevelt elk in forest',
                    desc: 'Roosevelt elk roam in herds and feed on plants and bark.',
                  },
                  {
                    image: '/elk_bugling.jpg',
                    alt: 'Elk bugling',
                    desc: 'Male elk bugle to attract mates and show dominance.',
                  },
                  {
                    image: '/elk_herd.jpg',
                    alt: 'Elk herd',
                    desc: 'Elk move together in herds to stay safe.',
                  },
                ].map((slide, idx) => (
                  <div key={idx} className="carousel-slide">
                    <div className="w-full h-[400px] relative">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-contain rounded-lg"
                        priority={idx === 0}
                      />
                    </div>
                    <p className="text-white text-lg font-semibold text-center bg-yellow-900 bg-opacity-70 py-3 px-4 mt-2 rounded">
                      {slide.desc}
                    </p>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="text-white bg-yellow-900 rounded-lg p-6 text-left max-w-3xl mx-auto mt-6 mb-6">
            <p className="text-white text-lg mb-4">
              The Roosevelt elk is the largest species of elk in North America and is native to the coastal rainforests of British Columbia, including the Great Bear Rainforest. These majestic animals can weigh up to 1,000 pounds and are known for their impressive antlers, which males grow and shed each year. Roosevelt elk live in herds and follow seasonal migration patterns, moving to lower elevations during winter and higher ones in the spring and summer. They eat grasses, shrubs, berries, and tree bark, helping to shape the vegetation of the forest. During the fall rut (mating season), male elk, called bulls, bugle loudly to attract females and challenge other males. The sound of bugling echoes through the forest like a wild trumpet. Elk are cautious animals and rely on sharp hearing and a keen sense of smell to detect danger. Their strong legs and hooves help them travel through dense forest and steep terrain.
            </p>
            </div>
              <div className="w-full flex flex-col items-center mt-6">
                <h3 className="text-2xl font-bold text-white mb-4">Fun Elk Facts:</h3>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                    <p className="text-white text-lg text-center">🌊 Roosevelt elk can swim across rivers and lakes.</p>
                  </div>

                  <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                    <p className="text-white text-lg text-center">🦌 Their antlers can grow up to 4 feet long!</p>
                  </div>

                  <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                    <p className="text-white text-lg text-center">♂️ Only male elk grow antlers—and shed them every year.</p>
                  </div>
                </div>
              </div>
          </div>
          {/* SHORT-TAILED WEASEL SECTION */}
          <div id="weasel" className="bg-black/40 rounded-xl p-6 w-full mt-12">
            <h2 className="text-5xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Short-Tailed Weasel
            </h2>

            <div className="w-full rounded-lg overflow-hidden shadow-lg bg-yellow-950 bg-opacity-80 p-4 relative mb-4">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={6000}
                showIndicators={true}
                transitionTime={800}
                swipeable={true}
                emulateTouch={true}
                className="seamless-carousel"
              >
                {[
                  {
                    image: '/weasel_summer.webp',
                    alt: 'Short-tailed weasel in summer',
                    desc: 'In summer, their reddish fur helps them blend in with the forest.',
                  },
                  {
                    image: '/weasel_winter.webp',
                    alt: 'Weasel in snow',
                    desc: 'In winter, their fur turns white for camouflage in snow.',
                  },
                  {
                    image: '/weasel_hunting.jpg',
                    alt: 'Weasel hunting',
                    desc: 'Weasels are expert hunters and move quickly through underbrush.',
                  },
                ].map((slide, idx) => (
                  <div key={idx} className="carousel-slide">
                    <div className="w-full h-[400px] relative">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        className="object-contain rounded-lg"
                        priority={idx === 0}
                      />
                    </div>
                    <p className="text-white text-lg font-semibold text-center bg-yellow-900 bg-opacity-70 py-3 px-4 mt-2 rounded">
                      {slide.desc}
                    </p>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="text-white bg-yellow-900 rounded-lg p-6 text-left max-w-3xl mx-auto mt-6 mb-6">
            <p className="text-white text-lg mb-4">
              The short-tailed weasel, also known as an ermine, is a small but fierce predator found in the Great Bear Rainforest. It has a long, slender body and a short tail with a black tip. In the summer, its fur is reddish-brown with a white belly. In the winter, it turns completely white to blend into the snow—except for the black tip on its tail. This change in color is called camouflage and helps the weasel sneak up on prey. Despite its size, the weasel is a powerful hunter that feeds on mice, voles, insects, frogs, and even rabbits. It is very fast and can squeeze into tight spaces to chase its prey. The weasel is also curious and playful, often standing on its hind legs to look around. Because it hunts so many small animals, the short-tailed weasel helps control rodent populations and keep the forest ecosystem healthy.
            </p>
            </div>

            <div className="w-full flex flex-col items-center mt-6">
              <h3 className="text-2xl font-bold text-white mb-4">Fun Weasel Facts:</h3>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                  <p className="text-white text-lg text-center">❄️ The weasel’s winter coat is called “ermine.”</p>
                </div>

                <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                  <p className="text-white text-lg text-center">💪 They can hunt animals larger than themselves!</p>
                </div>

                <div className="bg-yellow-800 rounded-lg p-4 shadow-md w-full sm:w-1/3">
                  <p className="text-white text-lg text-center">🦦 Weasels are part of the same family as otters and badgers.</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleContinue}
            className="bg-yellow-950 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded shadow mt-8"
          >
            Continue
          </button>
        </div>
      </main>
    </MantineProvider>
  );
}