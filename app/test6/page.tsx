'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { setProgress } from '@/utils/progress'

type QA = { question: string; choices: string[]; answer: string }

export const reptileAmphibianQuestionPool: QA[] = [
  // Frogs & Toads
  { question: 'What helps Pacific Treefrogs climb reeds and shrubs?', choices: ['Webbed feet', 'Sticky toe pads', 'Long claws', 'Belly suction cups'], answer: 'Sticky toe pads' },
  { question: 'Pacific Treefrogs commonly change between which colors?', choices: ['Blue & yellow', 'Green & brown', 'Red & orange', 'Black & white'], answer: 'Green & brown' },
  { question: 'Where do Pacific Treefrogs often breed?', choices: ['Fast rivers', 'Small ponds and ditches', 'Ocean shores', 'Mountain peaks'], answer: 'Small ponds and ditches' },
  { question: 'Western Toad eggs are usually laid as:', choices: ['Single eggs spread out', 'Long gelatinous strings', 'Foamy nests', 'Sticky discs on rocks'], answer: 'Long gelatinous strings' },
  { question: 'Western Toad tadpoles often appear as:', choices: ['Solitary drifters', 'Dense black swarms', 'Burrowers in mud', 'Tree climbers'], answer: 'Dense black swarms' },
  { question: 'Northern Red-legged Frogs prefer:', choices: ['Hot, open ponds', 'Cool, shaded forest wetlands', 'Dry meadows', 'Salty marshes'], answer: 'Cool, shaded forest wetlands' },
  { question: 'A field clue for Northern Red-legged Frogs is:', choices: ['Blue tongue', 'Red wash on hind legs', 'White tail tip', 'Horn-like ears'], answer: 'Red wash on hind legs' },

  // Salamanders & Newts
  { question: 'Rough-skinned Newts show a bright orange belly as a:', choices: ['Camouflage', 'Warning (aposematic) signal', 'Heat storage', 'Waterproof layer'], answer: 'Warning (aposematic) signal' },
  { question: 'Why should pets be kept away from Rough-skinned Newts?', choices: ['They jump far', 'They carry tetrodotoxin', 'They are endangered', 'They bite hard'], answer: 'They carry tetrodotoxin' },
  { question: 'Rough-skinned Newts are often near:', choices: ['Dry ridges', 'Ponds & slow, shaded streams', 'High alpine rock faces', 'Ocean surf'], answer: 'Ponds & slow, shaded streams' },
  { question: 'Wandering Salamanders mainly breathe through:', choices: ['Lungs', 'Gills', 'Skin and mouth lining', 'Tail sacs'], answer: 'Skin and mouth lining' },
  { question: 'Wandering Salamanders have which life history trait?', choices: ['Marine phase', 'Direct development (no larval stage)', 'Winged phase', 'Long desert burrowing'], answer: 'Direct development (no larval stage)' },
  { question: 'Northwestern Salamander larvae can:', choices: ['Overwinter in ponds', 'Live in saltwater', 'Skip metamorphosis entirely', 'Fly short distances'], answer: 'Overwinter in ponds' },
  { question: 'Ensatina hatchlings emerge as:', choices: ['Aquatic tadpoles', 'Gilled larvae', 'Miniature adults', 'Brooding parents'], answer: 'Miniature adults' },
  { question: 'Where do adult Ensatina typically hide during day?', choices: ['Open grass', 'Under logs in moist forests', 'Tree tops only', 'In river rapids'], answer: 'Under logs in moist forests' },

  // Reptiles
  { question: 'Northwestern Alligator Lizards can escape by:', choices: ['Swimming fast', 'Dropping their tail (autotomy)', 'Inflating throat pouches', 'Playing dead only'], answer: 'Dropping their tail (autotomy)' },
  { question: 'A common basking spot for Alligator Lizards is:', choices: ['Snowfields', 'Sunny openings inside forests', 'Underwater stems', 'Deep caves'], answer: 'Sunny openings inside forests' },
  { question: 'Western Skink juveniles often have:', choices: ['Red horns', 'Bright blue tails', 'Feathered crests', 'Transparent skin'], answer: 'Bright blue tails' },
  { question: 'Western Skinks prefer:', choices: ['Shady swamps', 'Sunny, rocky clearings', 'Glaciers', 'Dense caves'], answer: 'Sunny, rocky clearings' },
  { question: 'Northwestern Gartersnakes are:', choices: ['Dangerously venomous', 'Harmless to people', 'Marine-only snakes', 'Tree-only snakes'], answer: 'Harmless to people' },
  { question: 'Northwestern Gartersnakes primarily eat:', choices: ['Berries', 'Slugs, worms, amphibians, small fish', 'Large deer', 'Tree bark'], answer: 'Slugs, worms, amphibians, small fish' },
  { question: 'Northwestern Gartersnakes give birth by:', choices: ['Laying winter eggs', 'Live birth in late summer', 'Carrying eggs on back', 'Brooding underwater'], answer: 'Live birth in late summer' },

  // Habitats / Microhabitats
  { question: 'Ponds & wetlands are excellent for:', choices: ['Eggs and tadpoles', 'Desert scorpions', 'Sea anemones', 'Rock boas only'], answer: 'Eggs and tadpoles' },
  { question: 'Which eggs are large jelly masses attached to sticks?', choices: ['Toad eggs', 'Frog eggs (e.g., Red-legged Frog)', 'Snake eggs', 'Skink eggs'], answer: 'Frog eggs (e.g., Red-legged Frog)' },
  { question: 'Fast, shaded streams best support:', choices: ['Only reptiles', 'Only insects', 'Rough-skinned Newts & (if present) Coastal Tailed Frogs', 'Marine fish'], answer: 'Rough-skinned Newts & (if present) Coastal Tailed Frogs' },
  { question: 'Forest floor & fallen logs are vital for:', choices: ['Ensatina & Wandering Salamanders', 'Sea turtles', 'Penguins', 'Desert scorpions'], answer: 'Ensatina & Wandering Salamanders' },
  { question: 'Sunny rocky edges help reptiles because they:', choices: ['Generate sound', 'Provide warmth for thermoregulation', 'Create fog', 'Provide salt water'], answer: 'Provide warmth for thermoregulation' },

  // Safety / Field tips
  { question: 'Why avoid handling amphibians?', choices: ['They are robots', 'Delicate skin; oils/pressure harm them', 'They bite hard', 'They are invisible'], answer: 'Delicate skin; oils/pressure harm them' },
  { question: 'After lifting a log to look for salamanders, you should:', choices: ['Keep it as a souvenir', 'Flip it over', 'Return it exactly as found', 'Move it to sun'], answer: 'Return it exactly as found' },
  { question: 'Best timing: reptiles vs salamanders?', choices: ['Both midnight only', 'Both winter only', 'Reptiles warm afternoons; Salamanders rainy evenings', 'It never matters'], answer: 'Reptiles warm afternoons; Salamanders rainy evenings' },

  // Extra from your species facts
  { question: 'Alligator Lizards often shelter in:', choices: ['Rock piles, stumps, and logs', 'Tree canopies only', 'Ocean kelp', 'Burrows of marmots'], answer: 'Rock piles, stumps, and logs' },
  { question: 'Pacific Treefrogs are very tolerant of:', choices: ['Human-made wetlands', 'Saltwater only', 'High-elevation snow', 'Arid deserts'], answer: 'Human-made wetlands' },
  { question: 'Wandering Salamanders are especially sensitive to the drying of:', choices: ['Coarse woody debris', 'Seaweed mats', 'Sand dunes', 'Snow packs'], answer: 'Coarse woody debris' },
]

function getRandomQuestions(pool: QA[], usedIndices: number[] = []): QA[] {
  const available = pool.map((_, i) => i).filter(i => !usedIndices.includes(i))
  if (available.length < 10) return getRandomQuestions(pool, [])
  const selected: number[] = []
  while (selected.length < 10) {
    const idx = available[Math.floor(Math.random() * available.length)]
    if (!selected.includes(idx)) selected.push(idx)
  }
  return selected.map(i => {
    const q = pool[i]
    return { question: q.question, choices: [...q.choices].sort(() => Math.random() - 0.5), answer: q.answer }
  })
}

export default function ReptileAmphibianQuiz() {
  const router = useRouter()
  const [usedIndices, setUsedIndices] = useState<number[]>([])
  const [questions, setQuestions] = useState(() => getRandomQuestions(reptileAmphibianQuestionPool))
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showCongrats, setShowCongrats] = useState(false)

  const score = Object.entries(selectedAnswers).filter(
    ([i, ans]) => ans === questions[Number(i)].answer
  ).length

  const handleAnswer = (index: number, choice: string) => {
    if (selectedAnswers[index]) return
    setSelectedAnswers(prev => ({ ...prev, [index]: choice }))
  }

  const handleReset = () => {
    const currentIdx = questions.map(q => reptileAmphibianQuestionPool.findIndex(p => p.question === q.question))
    const newUsed = [...usedIndices, ...currentIdx]
    setQuestions(getRandomQuestions(reptileAmphibianQuestionPool, newUsed))
    setSelectedAnswers({})
    setUsedIndices(newUsed)
  }

  // Module 5 wiring
  const COMPLETE_ENDPOINT = 'http://localhost:3001/complete-module5'
  const NEXT_ROUTE = '/module6' // change if you want

  const handleQuizComplete = async () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (!user?.id) return
    try {
      const res = await fetch(COMPLETE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: user.id, score }),
      })
      if (res.ok) {
        setProgress('Module 5')
        setShowCongrats(true)
      } else {
        console.error('Failed to complete module 5')
      }
    } catch (err) {
      console.error('Module 5 request failed:', err)
    }
  }

  const allAnswered = Object.keys(selectedAnswers).length === questions.length
  const passed = score >= 8

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image src="/homeback.png" alt="Background" fill priority className="object-cover" style={{ objectPosition: 'center' }} />
      </div>

      <div className="max-w-4xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-6">
          Reptiles & Amphibians Quiz
        </h1>

        <p className="text-center mb-8 text-lg text-gray-700 font-medium">
          Test your knowledge! <br />
          <span className="text-2xl font-bold">{score} / {questions.length}</span>
        </p>

        {questions.map((q, index) => {
          const hasAnswered = index in selectedAnswers
          return (
            <div key={index} className="mb-8 p-6 bg-green-100 rounded-xl border border-green-200 shadow-sm">
              <p className="font-semibold text-left mb-4 text-gray-800 text-lg">{index + 1}. {q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.choices.map((choice, cIndex) => {
                  const isSelected = selectedAnswers[index] === choice
                  const isCorrect = choice === q.answer
                  let cls = 'w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 border'
                  if (hasAnswered) {
                    if (isSelected && isCorrect) cls += ' bg-green-500 text-white border-green-600'
                    else if (isSelected && !isCorrect) cls += ' bg-red-500 text-white border-red-600'
                    else cls += ' bg-gray-200 text-gray-600 border-gray-300'
                  } else {
                    cls += ' bg-green-500 hover:bg-green-700 text-white border-green-500'
                  }
                  return (
                    <button key={`${index}-${cIndex}`} className={cls} onClick={() => handleAnswer(index, choice)} disabled={hasAnswered}>
                      {choice}
                    </button>
                  )
                })}
              </div>

              {hasAnswered && (
                <div className="mt-4 text-center font-bold text-lg">
                  {selectedAnswers[index] === q.answer ? (
                    <span className="text-green-700">✅ Correct!</span>
                  ) : (
                    <span className="text-red-700">❌ Incorrect. Try again next time!</span>
                  )}
                </div>
              )}
            </div>
          )
        })}

        <div className="text-center mt-10">
          <p className="mb-6 text-xl text-gray-800 font-semibold">
            Final Score: {score} / {questions.length}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={handleReset} className="bg-green-800 hover:bg-green-950 text-white px-6 py-3 rounded-xl shadow-md transition">
              Reset
            </button>

            {allAnswered && passed && (
              <button onClick={handleQuizComplete} className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow transition">
                Complete Module 5
              </button>
            )}
          </div>

          {showCongrats && (
            <div
              style={{
                position: 'fixed',
                bottom: '190px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '16px 24px',
                borderRadius: '12px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                zIndex: 2000,
                width: '280px',
                textAlign: 'center',
              }}
            >
              <p className="text-lg font-semibold mb-3 text-green-600">🎉 Congrats! You completed Module 5!</p>
              <button
                onClick={() => {
                  setShowCongrats(false)
                  router.push(NEXT_ROUTE)
                }}
                style={{
                  backgroundColor: '#22c55e',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Continue
              </button>
            </div>
          )}

          {allAnswered && !passed && (
            <p className="mt-6 text-red-600 font-semibold text-lg">Sorry, you must get at least 8 questions correct to pass.</p>
          )}
        </div>
      </div>
    </main>
  )
}
