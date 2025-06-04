'use client'

import Image from 'next/image'
import Link from 'next/link'

const coniferousTrees = [
  { name: 'Western red cedar', image: '/Western red cedar.jpg', fact: 'Can grow over 200 feet tall and live for over 1,000 years!' },
  { name: 'Douglas fir', image: '/Douglas fir.jpg', fact: 'One of the tallest trees in the Pacific Northwest, often used for lumber.' },
  { name: 'Western hemlock', image: '/Western hemlock.jpg', fact: 'Prefers shady areas and is known for its droopy top branch.' },
  { name: 'Douglas fir (leaf)', image: '/Douglas fir leaf.jpg', fact: 'Needle-like leaves grow in a spiral pattern and have a sweet smell.' },
  { name: 'Western hemlock (leaf)', image: '/Western hemlock leaf.jpg', fact: 'Short flat needles with unequal lengths give it a fluffy appearance.' },
  { name: 'Western red cedar (leaf)', image: '/Western red cedar leaf.jpg', fact: 'Its flat, scale-like leaves smell pleasant and resist decay.' },
]

export default function LearnTreesPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/forest background.png"
          alt="Forest Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mt-10 z-10">
        <h1 className="text-4xl font-bold text-green-800 mb-6">Learn About Trees</h1>

        <section className="mb-10 text-left">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">Coniferous vs Deciduous</h2>
          <p className="text-gray-800 mb-2">
            🌲 <strong>Coniferous trees</strong> have needles instead of leaves and keep them all year round. They produce cones instead of flowers.
          </p>
          <p className="text-gray-800 mb-2">
            🍁 <strong>Deciduous trees</strong> have flat leaves that change color in the fall and drop off in winter.
          </p>
          <p className="text-sm text-gray-600 italic">Only coniferous trees are included for now — deciduous trees will be added soon!</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-green-700 mb-6">Coniferous Trees in the Quiz</h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {coniferousTrees.map((tree, index) => (
              <div key={index} className="bg-green-100 border border-green-200 rounded-xl p-4 shadow-sm">
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border border-green-300">
                  <Image
                    src={tree.image}
                    alt={tree.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-2">{tree.name}</h3>
                <p className="text-gray-700 text-sm">{tree.fact}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/test3">
            <button className="bg-blue-900 hover:bg-blue-950 text-white px-6 py-3 rounded-xl shadow">
              Try the Tree Quiz!
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
