'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const trees = [
  {
    name: 'Western red cedar',
    type: 'coniferous',
    treeImage: '/Western red cedar.jpg',
    leafImage: '/Western red cedar leaf.jpg',
    treeFact:
      'Can grow over 200 feet tall and live for over 1,000 years! Its wood resists rot and smells great.',
    leafFact:
      'Flat, scale-like leaves that smell pleasant and are naturally decay-resistant.',
  },
  {
    name: 'Douglas fir',
    type: 'coniferous',
    treeImage: '/Douglas fir.jpg',
    leafImage: '/Douglas fir leaf.jpg',
    treeFact:
      'One of the tallest trees in the Pacific Northwest, often used in lumber due to its strength.',
    leafFact:
      'Needle-like leaves grow in a spiral and give off a sweet, citrusy scent when crushed.',
  },
  {
    name: 'Western hemlock',
    type: 'coniferous',
    treeImage: '/Western hemlock.jpg',
    leafImage: '/Western hemlock leaf.jpg',
    treeFact:
      'Known for its drooping top and preference for cool, shady forest areas.',
    leafFact:
      'Short, flat needles of uneven lengths give branches a soft and fluffy look.',
  },
  {
    name: 'Bigleaf maple',
    type: 'deciduous',
    treeImage: '/Bigleafmaple.jpg',
    leafImage: '/mapleleaf.jpg',
    treeFact:
      'The largest maple in North America, growing up to 100 feet tall with broad, spreading branches.',
    leafFact:
      'Huge leaves (up to a foot across!) with 5 deeply lobed points, turning golden or reddish in fall.',
  },
  {
    name: 'Red alder',
    type: 'deciduous',
    treeImage: '/red_alder_trees.jpg',
    leafImage: '/redalderleaf.jpg',
    treeFact:
      'A fast-growing pioneer species that enriches the soil by fixing nitrogen from the air.',
    leafFact:
      'Oval, serrated leaves with a slightly rolled edge and a dull green color.',
  },
  {
    name: 'Black cottonwood',
    type: 'deciduous',
    treeImage: '/blackcottonwood.webp',
    leafImage: '/cottonwoodleaf.jpg',
    treeFact:
      'One of the largest deciduous trees in western North America, often found near rivers and wetlands.',
    leafFact:
      'Broad, triangular leaves with a shiny green top and a lighter underside that trembles in the wind.',
  },
]

export default function TreeFactsPage() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center p-6 overflow-y-auto">
      <div className="fixed inset-0 z-0">
        <Image
          src="/forest background.png"
          alt="Forest Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="max-w-6xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-950 mb-6 text-center">
          Tree Facts & Leaf ID
        </h1>
        <p className="text-lg text-gray-800 text-center max-w-2xl mx-auto mb-8">
          Learn about each tree and how to identify its leaves before you take the quiz.
        </p>

        <section className="max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-tr from-green-950 to-green-500 rounded-2xl shadow-lg p-8 text-white flex flex-col items-center text-center">
            <div className="text-6xl mb-4">🌲</div>
            <h2 className="text-3xl font-bold mb-4">Coniferous Trees</h2>
            <p className="text-lg max-w-md">
              <strong>Evergreen trees</strong> with needle-like or scale-like leaves and cones. They keep their leaves year-round, which helps them survive cold winters.
            </p>
            <p className="mt-6 italic text-green-200">
              Examples: Pines, firs, spruces, cedars
            </p>
          </div>
          <div className="bg-gradient-to-tr from-orange-900 to-yellow-500 rounded-2xl shadow-lg p-8 text-white flex flex-col items-center text-center">
            <div className="text-6xl mb-4">🍂</div>
            <h2 className="text-3xl font-bold mb-4">Deciduous Trees</h2>
            <p className="text-lg max-w-md">
              Trees that <strong>lose their leaves</strong> each fall to conserve water and energy in winter. Their broad leaves often change color before falling off.
            </p>
            <p className="mt-6 italic text-white">
              Examples: Maples, alders, cottonwoods
            </p>
          </div>
        </section>

        <div className="flex flex-col gap-10 w-full">
          {trees.map((tree) => (
            <div
              key={tree.name}
              className={`rounded-2xl shadow-md p-6 flex flex-col gap-6 w-full ${
                tree.type === 'coniferous'
                  ? 'bg-gradient-to-tr from-green-950 to-green-500 text-white'
                  : 'bg-gradient-to-tr from-orange-900 to-yellow-500 text-white'
              }`}
            >
              <h2 className="text-2xl font-bold text-center">{tree.name}</h2>

              <div className="flex flex-col md:flex-row items-stretch justify-between gap-6">
                <div className="bg-white rounded-xl p-4 flex flex-col items-center flex-1 shadow gap-3">
                  <div className="relative w-full h-52 mt-2">
                    <Image
                      src={tree.treeImage}
                      alt={tree.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-700 text-center max-w-md">
                    {tree.treeFact}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-4 flex flex-col items-center flex-1 shadow gap-3">
                  <div className="relative w-full h-52 mt-2">
                    <Image
                      src={tree.leafImage}
                      alt={`${tree.name} leaf`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm italic text-gray-600 text-center max-w-md">
                    {tree.leafFact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/matching3')}
            className="bg-green-700 hover:bg-green-950 text-white px-8 py-4 text-lg rounded-xl shadow-md transition-colors duration-300 ease-in-out"
          >
            Start the Tree Game
          </button>
        </div>
      </div>
    </main>
  )
}