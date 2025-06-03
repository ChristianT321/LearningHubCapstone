'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const birds = [
  {
    name: 'Bald eagle',
    fact: 'The bald eagle can spot prey from over 3 kilometers away!',
    image: '/Bald eagle.jpg',
    featherImage: '/Bald eagle feather.jpg',
    featherFact: 'Broad, dark feather with a white tip — perfect for soaring.',
  },
  {
    name: 'Hummingbird',
    fact: 'Hummingbirds can flap their wings up to 80 times per second!',
    image: '/Hummingbird.jpg',
    featherImage: '/Hummingbird feather.jpg',
    featherFact: 'Tiny, iridescent feather — shimmers with color and light.',
  },
  {
    name: 'Duck',
    fact: 'Ducks have waterproof feathers thanks to natural oils.',
    image: '/Duck.jpg',
    featherImage: '/Duck feather.jpg',
    featherFact: 'Soft, layered feather that helps keep water out.',
  },
]

export default function BirdFactsPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen z-10 w-full flex flex-col items-center p-6">

      <div className="fixed inset-0 z-0">
        <Image
          src="/sky background.png"
          alt="Home Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <h1 className="text-4xl font-bold text-sky-50 mb-6 z-10">Bird Facts & Feather ID</h1>
      <p className="text-lg text-sky-50 mb-8 text-center max-w-2xl z-10">
        Learn cool facts about each bird and how to recognize its feathers before you play the matching game.
      </p>

      <div className="flex flex-col gap-10 w-full max-w-6xl z-10">
        {birds.map((bird) => (
          <div
            key={bird.name}
            className="bg-sky-50 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-8 w-full"
          >
            <div className="flex flex-col items-center flex-1">
              <div className="max-h-[200px] flex items-center justify-center">
                <Image
                  src={bird.image}
                  alt={bird.name}
                  width={400}
                  height={400}
                  className="max-h-[200px] w-auto rounded-xl object-contain"
                />
              </div>
              <h2 className="text-xl font-bold mt-4 text-sky-800">{bird.name}</h2>
              <p className="text-sm text-gray-700 mt-2 text-center">{bird.fact}</p>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className="max-h-[200px] flex items-center justify-center">
                <Image
                  src={bird.featherImage}
                  alt={`${bird.name} feather`}
                  width={400}
                  height={400}
                  className="max-h-[200px] w-auto rounded-xl object-contain"
                />
              </div>
              <p className="text-sm mt-4 text-gray-600 italic text-center">{bird.featherFact}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push('/matching2')}
        className="mt-12 bg-gray-50 hover:bg-gray-300 text-blue-950 font-semibold px-6 py-3 rounded-xl shadow z-10 transition-colors duration-300 ease-in-out"

      >
        Start Matching Game
      </button>
    </main>
  )
}
