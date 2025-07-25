'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Carousel } from 'react-responsive-carousel';

import '@mantine/core/styles.css';
import { MantineProvider, Stepper, Button, Group, SimpleGrid, Container, Grid, Box } from '@mantine/core';

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
      desc: 'With spring\'s arrival, bears emerge from dens, hungry and ready to feast on roots, berries, and fish.',
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

  const slidesSeaWolf = [
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

  const slidesCouger = [
    {
      image: '/Couger Spring.webp',
      alt: 'Cougar in Spring',
      desc: 'In spring, Cougars hunt more actively because deer and other prey start moving to new feeding areas. Mother cougars may have young kittens hidden in a den or rocky area. Cubs stay hidden while the mother hunts and brings back food.',
    },
    {
      image: '/Cougar Summer.avif',
      alt: 'Cougar in Summer',
      desc: 'Cougars hunt mostly at night or early morning to avoid the daytime heat. They often stay near forests and rocky slopes where deer come to graze. Cubs learn to follow the mother and watch her hunt.',
    },
    {
      image: '/Cougar Fall.webp',
      alt: 'Cougar in Fall',
      desc: 'Cubs become stronger hunters and may start hunting small prey themselves. They spend more time exploring their surroundings, practicing stalking, chasing, and pouncing. These skills improve through play and observation, helping them prepare for independent hunting as they grow older.',
    },
    {
      image: '/Cougar Winter.avif',
      alt: 'Cougar in Winter',
      desc: 'Cougars stay active all winter — they do not hibernate. They use thick forest and rocky ledges for shelter from storms, and use these areas as hunting grounds.',
    },
  ];

  const slidesWolverine = [
    {
      image: '/Wolverine Spring.webp',
      alt: 'Wolverine in Spring',
      desc: 'Wolverines come out more often in daylight to look for food after winter. They eat leftovers from animals that died during winter (carrion), They may hunt small mammals like marmots, squirrels, and snowshoe hares.',
    },
    {
      image: '/Wolverine Summer.jpg',
      alt: 'Wolverine in Summer',
      desc: 'During summer, wolverines continue to hunt and forage for berries and plants, and hunt small animals. Wolverines sometimes steal kills from other predators like wolves and bears. They roam huge territories, traveling long distances each day. They are often seen in forests and mountains.',
    },
    {
      image: '/Wolverine Fall 2.png',
      alt: 'Wolverine in Fall',
      desc: 'Wolverines hunt and scavenge more to build up fat for colder months. They may bury or hide leftover meat (called caching) to eat later in winter.',
    },
    {
      image: '/Wolverine Winter 2.jpg',
      alt: 'Wolverine in Winter',
      desc: 'Wolverines stay active all winter — they do not hibernate. Thick fur and big paws help them walk on deep snow to find food. They hunt small prey, dig through snow to find buried carcasses, or steal from other predators. Winter snow helps them hide food and protect it from scavengers.',
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
                    Black bears are common in the Great Bear Rainforest and play an important role in the ecosystem. They spend a lot of time near rivers and streams,
                    especially when salmon are plentiful. They help spread nutrients by carrying fish remains into the forest. Black bears eat berries, plants, insects, and fish,
                    and they usually avoid people.
                  </p>
                </>
              ) : step === 1 ? (
                <>
                  <h3 className="text-3xl font-bold text-white mb-4">Spirit Bear</h3>
                  <p className="text-white text-lg">
                    The Spirit Bear, also known as the Kermode bear, is a rare and special type of black bear with white fur. Found only in the Great Bear Rainforest,
                    it symbolizes the uniqueness of this ecosystem. Spirit Bears are deeply important to Indigenous cultures and are a key part of local legends and stories.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-white mb-4">Grizzly Bear</h3>
                  <p className="text-white text-lg">
                    Grizzly bears are larger bears found in some parts of the Great Bear Rainforest. They are powerful fishers and eat lots of salmon in the fall.
                    They also eat berries, plants, and small animals, and they hibernate in dens through the cold winter months.
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
                className="rounded"
                renderIndicator={(onClickHandler, isSelected, index, label) => (
                  <li
                    className={`inline-block mx-1.5 ${isSelected ? 'opacity-100' : 'opacity-50'}`}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    value={index}
                    key={index}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}
                  />
                )}
              >
                {(step === 0 ? slidesBlackBear : step === 1 ? slidesSpiritBear : slidesGrizzlyBear).map(
                  (slide, idx) => (
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
                  )
                )}
              </Carousel>
              <style jsx global>{`
                .carousel .control-dots {
                  bottom: -30px !important;
                  margin: 0;
                  padding: 0;
                }
                .carousel .control-dots .dot {
                  background: white !important;
                  box-shadow: none !important;
                  width: 10px !important;
                  height: 10px !important;
                  margin: 0 5px !important;
                }
              `}</style>
            </div>

            <div className="bg-amber-950 rounded-xl p-10 w-full mt-10">
              <h3 className="text-3xl font-bold text-white mb-11">How Bears Compare By Season</h3>

              <Container>
                <Grid gutter="md" className="mb-8">
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Box className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/Spirit Bear Spring.avif"
                        alt="Spring Bear"
                        fill
                        className="object-cover"
                      />
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 8 }}>
                    <Box className="bg-amber-800 bg-opacity-80 rounded-lg p-6 shadow-md h-full flex items-center">
                      <p className="text-white text-lg">
                        As the snow melts and the forest begins to wake up, bears emerge from their dens after a long winter of hibernation.
                        They are weak, hungry, and dehydrated, so they stay near the den at first to regain their strength.
                        Early spring food includes fresh green plants like grasses, sedges, and roots, as well as insects and any animal carcasses left over from winter.
                      </p>
                    </Box>
                  </Grid.Col>
                </Grid>

                <Grid gutter="md" className="mb-8">
                  <Grid.Col span={{ base: 12, md: 8 }}>
                    <Box className="bg-amber-800 bg-opacity-80 rounded-lg p-6 shadow-md h-full flex items-center">
                      <p className="text-white text-lg">
                        Summer is all about eating. Food is more abundant, so bears spend most of their day feeding to build up fat for the next winter.
                        Their diet expands to include berries like salmonberries and blueberries, insects such as ants and beetles, and small mammals.
                        Early salmon runs may begin in some rivers, and bears will start fishing or scouting their favorite fishing spots.
                      </p>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Box className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/Spirit Bear Summer.avif"
                        alt="Summer Bear"
                        fill
                        className="object-cover"
                      />
                    </Box>
                  </Grid.Col>
                </Grid>

                <Grid gutter="md" className="mb-8">
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Box className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/Spirit Bear Fall.jpg"
                        alt="Fall Bear 1"
                        fill
                        className="object-cover"
                      />
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Box className="bg-amber-800 bg-opacity-80 rounded-lg p-6 shadow-md h-full flex items-center">
                      <p className="text-white text-lg">
                        Fall is critical: The salmon runs provide the rest of the food they need for the winter. Once fattened up, bears prepare for hibernation by finding or building a den.
                      </p>
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Box className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src="/Grizzly Bear Fall.jpg"
                        alt="Fall Bear 2"
                        fill
                        className="object-cover"
                      />
                    </Box>
                  </Grid.Col>
                </Grid>

                <Grid gutter="md">
                  {[slidesBlackBear[1], slidesSpiritBear[3], slidesGrizzlyBear[3]].map((slide, idx) => (
                    <Grid.Col key={idx} span={{ base: 12, md: 4 }}>
                      <Box className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-2">
                        <Image src={slide.image} alt={slide.alt} fill className="object-cover" />
                      </Box>
                      <p className="text-white text-lg bg-amber-800 bg-opacity-80 rounded p-4">
                        In winter, bears hibernate in dens, living off stored fat until spring.
                      </p>
                    </Grid.Col>
                  ))}
                </Grid>
              </Container>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 w-full">
            <h2 className="text-4xl font-bold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Other Carnivors
            </h2>

            <Stepper
              active={step}
              onStepClick={setStep}
              color="orange"
              className="w-full mb-4"
              size="md"
            >
              <Stepper.Step label="Step 1" description="Sea Wolf" />
              <Stepper.Step label="Step 2" description="Cougar" />
              <Stepper.Step label="Step 3" description="Wolverine" />
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
                <h3 className="text-white text-2xl font-bold mb-2">
                  Vancouver Coastal Sea Wolves
                </h3>
                <p className="text-white text-lg">
                  The Vancouver Coastal Sea Wolf is a unique type of wolf that lives along the coast and islands of the Great Bear Rainforest.
                  They swim a lot and eat mostly seafood like salmon, crabs, and seals. They help balance the ecosystem and are important to local Indigenous cultures.
                </p>
              </>
            ) : step === 1 ? (
              <>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Cougar
                </h3>
                <p className="text-white text-lg">
                  Cougars live in forested areas of the rainforest and are solitary hunters. They mainly eat deer but will also hunt smaller mammals.
                  Cougars are stealthy and use thick underbrush to stalk prey. They raise kittens in dens and teach them to hunt over time.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Wolverine
                </h3>
                  <p className="text-white text-lg">
                    Wolverines are tough scavengers that travel far across the snowy landscape. They can break into frozen carcasses and often follow larger predators to find leftovers.
                    Though small, wolverines are strong and independent. They are well adapted to the cold and can travel long distances in search of food.
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
                className="rounded"
                renderIndicator={(onClickHandler, isSelected, index, label) => (
                  <li
                    className={`inline-block mx-1.5 ${isSelected ? 'opacity-100' : 'opacity-50'}`}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    value={index}
                    key={index}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}
                  />
                )}
              >
                {(step === 0 ? slidesSeaWolf : step === 1 ? slidesCouger : slidesWolverine).map((slide, idx) => (
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
              <style jsx global>{`
                .carousel .control-dots {
                  bottom: -30px !important;
                  margin: 0;
                  padding: 0;
                }
                .carousel .control-dots .dot {
                  background: white !important;
                  box-shadow: none !important;
                  width: 10px !important;
                  height: 10px !important;
                  margin: 0 5px !important;
                }
              `}</style>
            </div>
         
            <div className="bg-amber-950 rounded-xl p-10 w-full mt-10">
              <h3 className="text-3xl font-bold text-white mb-11">
                How Wolves, Cougars, and Wolverines Compare by Season
              </h3>

              <Container my="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="lg">
                  <Box className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image src="/sea wolf puppy.jpg" alt="Spring Wolf" fill className="object-cover" />
                  </Box>
                  <Grid gutter="md">
                    <Grid.Col span={12}>
                      <Box className="bg-amber-800 bg-opacity-90 rounded-lg p-4 shadow-md text-white text-sm leading-relaxed min-h-[120px] flex items-center">
                        In spring, sea wolf pups are born and rest while the pack hunts. Cougar cubs stay hidden in dens,
                        safely tucked away while their mothers venture out to hunt. Meanwhile, wolverines take advantage of
                        the thawing landscape by scavenging carcasses left behind by other predators.
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box className="relative w-full h-[140px] rounded-lg overflow-hidden shadow-lg">
                        <Image src="/Couger Spring.webp" alt="Spring Cougar" fill className="object-cover" />
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box className="relative w-full h-[140px] rounded-lg overflow-hidden shadow-lg">
                        <Image src="/Wolverine Spring.webp" alt="Spring Wolverine" fill className="object-cover" />
                      </Box>
                    </Grid.Col>
                  </Grid>
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="lg">
                  <Grid gutter="md">
                    <Grid.Col span={12}>
                      <Box className="bg-amber-800 bg-opacity-90 rounded-lg p-4 shadow-md text-white text-sm leading-relaxed min-h-[120px] flex items-center">
                        In summer, cougars are most active during dawn and dusk, teaching their young how to stalk prey.
                        Sea wolves take to the water, swimming between islands to fish and forage.
                        Wolverines range far, scavenging widely and occasionally stealing food from other predators.
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box className="relative w-full h-[140px] rounded-lg overflow-hidden shadow-lg">
                        <Image src="/sea wolf swimming.avif" alt="Summer Wolf" fill className="object-cover" />
                      </Box>
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Box className="relative w-full h-[140px] rounded-lg overflow-hidden shadow-lg">
                        <Image src="/Wolverine Summer.jpg" alt="Summer Wolverine" fill className="object-cover" />
                      </Box>
                    </Grid.Col>
                  </Grid>

                  <Box className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image src="/Cougar Summer.avif" alt="Summer Cougar" fill className="object-cover" />
                  </Box>
                </SimpleGrid>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mb="lg">
                  <Box className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                    src="/sea wolf fall.jpg"
                    alt="Fall Wolf"
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'top center' }}
                    />
                  </Box>

                  <Box className="flex flex-col justify-between h-[300px]">
                    <Box className="bg-amber-800 bg-opacity-90 rounded-lg p-4 shadow-md text-white text-sm leading-relaxed flex items-center h-[125px]">
                    In fall, wolves gather near rivers to feast on salmon, building fat reserves for winter.
                    Cougar mothers train their cubs to hunt, an essential skill before snow arrives.
                    Wolverines begin caching meat in hidden spots.
                    </Box>
                    <div className="flex gap-4 h-[160px]">
                      <Box className="relative w-1/2 h-full rounded-lg overflow-hidden shadow-lg">
                        <Image src="/Cougar Fall.webp" alt="Fall Cougar" fill className="object-cover" />
                      </Box>
                      <Box className="relative w-1/2 h-full rounded-lg overflow-hidden shadow-lg">
                        <Image src="/Wolverine Fall 2.png" alt="Fall Wolverine" fill className="object-cover" />
                      </Box>
                    </div>
                  </Box>
                </SimpleGrid>

                <Grid gutter="md" mb="lg">
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Box className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-2">
                      <Image src="/Wolverine Winter 2.jpg" alt="Winter Wolverine" fill className="object-cover" />
                    </Box>
                    <p className="text-white text-sm bg-amber-800 bg-opacity-80 rounded p-4 leading-relaxed">
                      In winter, wolverines stay active, traveling long distances through deep snow to scavenge and hunt small prey.
                    </p>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Box className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-2">
                      <Image src="/Cougar Winter.avif" alt="Winter Cougar" fill className="object-cover" />
                    </Box>
                      <p className="text-white text-sm bg-amber-800 bg-opacity-80 rounded p-4 leading-relaxed">
                        Cougars continue hunting in winter, relying on stealth and strength to ambush prey in snowy forests and steep terrain.
                      </p>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Box className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-2">
                      <Image src="/Sea Wolf Winter.jpg" alt="Winter Sea Wolf" fill className="object-cover" />
                    </Box>
                      <p className="text-white text-sm bg-amber-800 bg-opacity-80 rounded p-4 leading-relaxed">
                        Even in winter, sea wolves remain mobile, swimming between islands and scavenging along the coastlines where food can still be found.
                      </p>
                  </Grid.Col>
                </Grid>
              </Container>
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