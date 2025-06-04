'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const animals = [
  {
    name: 'Spirit Bear',
    animalImage: '/Spirit bear.jpg',
    pawImage: '/Spirit bear paw.jpg',
    animalFact: 'Spirit Bears are rare white-coated bears found in the coastal rainforests of British Columbia.',
    pawFact: 'Their paw prints are large and distinctive, helping track them in the wild.',
  },
  {
    name: 'Beaver',
    animalImage: '/Beaver.jpg',
    pawImage: '/Beaver Paw.jpeg',
    animalFact: 'Beavers are known for building dams and lodges with sticks and mud.',
    pawFact: 'Their webbed paws help them swim efficiently underwater.',
  },
  {
    name: 'Vancouver Wolf',
    animalImage: '/Vancouver Wolf.jpg',
    pawImage: '/Vancouver Wolf Paw.jpg',
    animalFact: 'The Vancouver Wolf is a subspecies native to the coastal forests of Vancouver Island.',
    pawFact: 'Their paw prints are often found in forest trails and riverbanks.',
  },
]

export default function AnimalPrelearningPage() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center p-6 overflow-y-auto">
      <div className="fixed inset-0 z-0">
        <Image
          src="/GBR home back.png"
          alt="Forest Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-6xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-6 text-center">
          Animal Facts & Paw Print ID
        </h1>
        <p className="text-lg text-gray-800 text-center max-w-2xl mx-auto mb-8">
          Learn about each animal and how to identify its paw prints before you start the matching game.
        </p>
        <div className="flex flex-col gap-10 w-full">
          {animals.map((animal) => (
            <div
              key={animal.name}
              className="bg-green-900 rounded-2xl shadow-md p-6 flex flex-col gap-6 w-full"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center flex-1">
                  <div className="mb-2 bg-gradient-to-tr from-green-900 to-green-500 rounded-xl shadow-md py-2 px-4 text-white text-center">
                    <div className="text-3xl">🐻</div>
                    <h3 className="text-xl font-semibold mt-1">Animals</h3>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white text-center">{animal.name}</h2>

                <div className="flex flex-col items-center flex-1">
                  <div className="mb-2 bg-gradient-to-tr from-blue-900 to-cyan-500 rounded-xl shadow-md py-2 px-4 text-white text-center">
                    <div className="text-3xl">🐾</div>
                    <h3 className="text-xl font-semibold mt-1">Paw Prints</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-white rounded-xl p-4 w-full shadow flex flex-col items-center">
                    <div className="relative w-full h-52">
                      <Image
                        src={animal.animalImage}
                        alt={animal.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-3 text-green-900 text-center text-base">{animal.animalFact}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="bg-white rounded-xl p-4 w-full shadow flex flex-col items-center">
                    <div className="relative w-full h-52">
                      <Image
                        src={animal.pawImage}
                        alt={`${animal.name} paw print`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-3 text-green-900 text-center text-base">{animal.pawFact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/matching1')}
            className="bg-green-700 hover:bg-green-950 text-white px-8 py-4 text-lg rounded-xl shadow-md transition-colors duration-300 ease-in-out"
          >
            Start the Matching Game
          </button>
        </div>
      </div>
    </main>
  )
}

