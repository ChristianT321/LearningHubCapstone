'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function GroundAnimalSeasonPage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/groundanimalfacts')
  }

  const slides1 = [
    {
      image: '/01_Schwarzbär.jpg',
      alt: 'Black Bear Standing',
      desc: 'As the seasons change, black bears prepare for winter by foraging and building fat reserves.'
    },
    {
      image: '/bear_curled_up_in_den.jpg',
      alt: 'Bear in Den',
      desc: 'During colder months, bears enter dens to hibernate, conserving energy while the forest sleeps.'
    },
    {
      image: '/beareating.jpg',
      alt: 'Bear Eating',
      desc: 'With spring’s arrival, bears emerge from dens, hungry and ready to feast on roots, berries, and fish.'
    },
  ]
  const slides2 = [
    {
      image: '/sea wolf swimming.avif',
      alt: 'Sea Wolf Swimming',
      desc: "Vancouver seawolves swim to different islands in search of food, swimming most often during the summer season."
    },
    {
      image: '/sea wolf fall.jpg',
      alt: 'Sea Wolf in Fall',
      desc: 'In the fall, sea wolves get their largest supply of salmon from huge salmon runs, preparing for the cold months ahead.'
    },
    {
      image: '/sea wolf winter.jpg',
      alt: 'Sea Wolf in Winter',
      desc: 'Even in the harshest winters, sea wolves thrive, hunting and navigating icy waters.'
    },
    {
      image: '/sea wolf puppy.jpg',
      alt: 'Sea Wolf Puppy',
      desc: 'In springtime the pups are born, resting while the pack hunts for food nearby.'
    }
  ]

  return (
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

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-5xl px-4 py-8">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-10 mb-4">
          Seasonal Changes for Ground Animals
        </h1>

        <h2 className="text-4xl font-bold text-white drop-shadow-[2px_2px_0px_black]">
          Black Bears
        </h2>

        <div className="bg-amber-800 rounded-lg p-6 shadow-md">
          <p className="text-white text-lg">
            Black bears are common in the Great Bear Rainforest and play an important role in the ecosystem. They spend a lot of time near rivers and streams, 
            especially when during high salmon seasons. The bears help spread nutrients through the forest when they carry fish into the trees and leave leftovers behind. 
            Black bears eat berries, plants, insects, and fish, and they usually avoid people. They are an important symbol of the rainforest and show how healthy the habitat is.
          </p>
        </div>

        <div className="w-full rounded-lg overflow-hidden shadow-lg bg-amber-800 bg-opacity-80 p-4 z-30">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            interval={5000}
            className="rounded"
          >
            {slides1.map((slide1, idx) => (
              <div key={idx} className="relative">
                <div className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] relative">
                  <Image
                    src={slide1.image}
                    alt={slide1.alt}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <p className="text-white text-lg font-semibold text-center bg-amber-950 bg-opacity-70 py-3 px-4 mt-2 rounded">
                  {slide1.desc}
                </p>
              </div>
            ))}
          </Carousel>
        </div>

        <h2 className="text-4xl font-bold text-white drop-shadow-[2px_2px_0px_black] mt-6 mb-6">
          Vancouver Costal Sea Wolves
        </h2>

        <div className="bg-amber-800 rounded-lg p-6 shadow-md">
          <p className="text-white text-lg">
            The Vancouver Coastal Sea Wolf is a special type of wolf that lives along the coast and islands of the Great Bear Rainforest. 
            These wolves are different from other wolves because they swim a lot and eat mostly seafood like salmon, crabs, and even seals. 
            They travel along beaches and swim between islands to find food. Coastal sea wolves help keep the ecosystem balanced and are important 
            to local Indigenous cultures. They are wild, shy animals and rarely seen by people.
          </p>
        </div>

        <div className="w-full rounded-lg overflow-hidden shadow-lg bg-amber-800 bg-opacity-80 p-4 z-30">
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
        <button
          onClick={handleContinue}
          className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded shadow mt-5"
        >
          Continue
        </button>
    </div>
    </main>
  )
}
