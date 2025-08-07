'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const trees = [
  {
    name: 'Western red cedar',
    treeImage: '/Western red cedar.jpg',
    leafImage: '/Western red cedar leaf.jpg',
    treeFact: 'Can grow over 200 feet tall and live for over 1,000 years! Its wood resists rot and smells great.',
    leafFact: 'Flat, scale-like leaves that smell pleasant and are naturally decay-resistant.',
    details: [
      "Some cedars reach heights of over 200 feet (60 meters)",
      "Their bark contains natural fungicides that resist decay",
      "Indigenous peoples call it the 'tree of life' for its many uses"
    ]
  },
  {
    name: 'Douglas fir',
    treeImage: '/Douglas fir.jpg',
    leafImage: '/Douglas fir leaf.jpg',
    treeFact: 'One of the tallest trees in the Pacific Northwest, often used in lumber due to its strength.',
    leafFact: 'Needle-like leaves grow in a spiral and give off a sweet, citrusy scent when crushed.',
    details: [
      "Can grow up to 330 feet (100 meters) tall",
      "The thick bark helps protect against forest fires",
      "Produces distinctive 'mouse tail' cones"
    ]
  },
  {
    name: 'Western hemlock',
    treeImage: '/Western hemlock.jpg',
    leafImage: '/Western hemlock leaf.jpg',
    treeFact: 'Known for its drooping top and preference for cool, shady forest areas.',
    leafFact: 'Short, flat needles of uneven lengths give branches a soft and fluffy look.',
    details: [
      "Prefers shaded, moist environments",
      "The drooping leader is a distinctive feature",
      "Needles are arranged in flat sprays"
    ]
  },
]

export default function TreeFactsPage() {
  const router = useRouter()
  const [expandedTree, setExpandedTree] = useState<number | null>(null)

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center overflow-y-auto p-4 pt-8">

      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/forest background.png"
          alt="Forest Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black]">
          Tree Facts & Leaf ID
        </h1>
        <p className="text-xl text-white drop-shadow-[2px_2px_0px_black] max-w-2xl mx-auto mb-8">
          Learn about each tree and how to identify its leaves before you take the quiz.
        </p>

        <section className="max-w-5xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className="rounded-2xl shadow-lg p-8 text-white flex flex-col items-center text-center"
            style={{
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #16a34a, #15803d, #166534)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="text-6xl mb-4">🌲</div>
            <h2 className="text-3xl font-bold mb-4">Coniferous Trees</h2>
            <p className="text-lg max-w-md">
              <strong>Evergreen trees</strong> with needle-like or scale-like leaves and cones. They keep their leaves year-round, which helps them survive cold winters.
            </p>
            <p className="mt-6 italic text-green-200">
              Examples: Pines, firs, spruces, cedars
            </p>
          </div>
          <div 
            className="rounded-2xl shadow-lg p-8 text-white flex flex-col items-center text-center"
            style={{
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #b45309, #92400e, #78350f)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <div className="text-6xl mb-4">🍂</div>
            <h2 className="text-3xl font-bold mb-4">Deciduous Trees</h2>
            <p className="text-lg max-w-md">
              Trees that <strong>lose their leaves</strong> each fall to conserve water and energy in winter. Their broad leaves often change color before falling off.
            </p>
            <p className="mt-6 italic text-yellow-200">
              Examples: Maples, oaks, birches
            </p>
          </div>
        </section>

        <div className="flex flex-col gap-6 w-full max-w-5xl">
          {trees.map((tree, index) => (
            <motion.div
              key={tree.name}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-lg shadow-md overflow-hidden"
              style={{
                border: '2px solid transparent',
                borderRadius: '12px',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #16a34a, #15803d, #166534)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="bg-green-800 bg-opacity-60 rounded-[10px]">
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedTree(expandedTree === index ? null : index)}
                >
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
                      <h3 className="text-xl font-bold text-green-900">{tree.name}</h3>
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
                      <h3 className="text-xl font-bold text-green-900">Leaves</h3>
                      <p className="text-sm italic text-gray-600 text-center max-w-md">
                        {tree.leafFact}
                      </p>
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedTree === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="bg-green-700 bg-opacity-70 rounded-b-[10px]"
                    >
                      <div className="p-6 pt-0">
                        <h4 className="text-white text-lg font-semibold mb-3 text-left">More Details:</h4>
                        <ul className="space-y-2">
                          {tree.details.map((detail, i) => (
                            <li key={i} className="text-white text-left pl-4">
                              • {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={() => router.push('/matching3')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white font-bold px-6 py-3 mt-8 mb-12"
          style={{
            borderRadius: '12px',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #16a34a, #15803d, #166534)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span className="relative z-10">Start the Tree Quiz</span>
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 hover:opacity-20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </main>
  )
}