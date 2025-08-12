//This was originally made for my last project in webdev 2. All questions/ design have been reworked for this project.
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { setProgress } from '@/utils/progress'

export const treeQuestionPool = [
  {
    question: "Which tree helps improve soil through nitrogen fixation?",
    choices: ["Western Red Cedar", "Western Hemlock", "Red Alder", "Douglas Fir"],
    answer: "Red Alder",
  },
  {
    question: "What season do Red Alder leaves turn yellow and fall?",
    choices: ["Spring", "Summer", "Fall", "Winter"],
    answer: "Fall",
  },
  {
    question: "What happens to Red Alder roots during winter?",
    choices: ["They die off", "They stay active underground", "They produce new leaves", "They grow flowers"],
    answer: "They stay active underground",
  },
  {
    question: "Which tree stays green all year long and provides shelter in winter?",
    choices: ["Red Alder", "Western Hemlock", "Douglas Fir", "Maple"],
    answer: "Western Hemlock",
  },
  {
    question: "What do Western Hemlock cones do in the fall?",
    choices: ["Grow new seeds", "Drop off branches", "Dry and release seeds", "Turn yellow"],
    answer: "Dry and release seeds",
  },
  {
    question: "Which tree is known for its rot-resistant wood and cultural importance?",
    choices: ["Douglas Fir", "Red Alder", "Western Red Cedar", "Spruce"],
    answer: "Western Red Cedar",
  },
  {
    question: "What new growth begins in Western Hemlock during spring?",
    choices: ["Bark peels", "New cones and needles", "Leaves fall off", "Trunk thickens"],
    answer: "New cones and needles",
  },
  {
    question: "Which tree is deciduous?",
    choices: ["Western Hemlock", "Western Red Cedar", "Red Alder", "Douglas Fir"],
    answer: "Red Alder",
  },
  {
    question: "What helps Western Red Cedar resist rot?",
    choices: ["Its red needles", "Its sap", "Its bark and oils", "Its seeds"],
    answer: "Its bark and oils",
  },
  {
    question: "Which tree is called the \"tree of life\" by Indigenous peoples?",
    choices: ["Red Alder", "Douglas Fir", "Western Red Cedar", "Western Hemlock"],
    answer: "Western Red Cedar",
  },
  {
    question: "What do Red Alder leaves do when they fall to the ground?",
    choices: ["Stay all winter", "Grow back instantly", "Decompose quickly", "Harden into bark"],
    answer: "Decompose quickly",
  },
  {
    question: "Which tree has drooping branches and prefers shade?",
    choices: ["Douglas Fir", "Western Hemlock", "Red Alder", "Birch"],
    answer: "Western Hemlock",
  },
  {
    question: "What season shows new buds and nitrogen fixation in Red Alder?",
    choices: ["Winter", "Spring", "Fall", "Summer"],
    answer: "Spring",
  },
  {
    question: "Which tree produces “mouse tail” cones?",
    choices: ["Red Alder", "Douglas Fir", "Western Red Cedar", "Spruce"],
    answer: "Douglas Fir",
  },
  {
    question: "How tall can Western Red Cedar grow?",
    choices: ["60 feet", "120 feet", "Over 200 feet", "Under 50 feet"],
    answer: "Over 200 feet",
  },
  {
    question: "What do Western Hemlock needles look like?",
    choices: ["Thick and long", "Evenly spaced", "Short and fluffy", "Round and fat"],
    answer: "Short and fluffy",
  },
  {
    question: "Why are deciduous trees special in fall?",
    choices: ["They grow cones", "They smell sweet", "Their leaves change color and fall", "They grow taller"],
    answer: "Their leaves change color and fall",
  },
  {
    question: "Which tree is known for nitrogen-fixing leaves?",
    choices: ["Western Red Cedar", "Red Alder", "Spruce", "Douglas Fir"],
    answer: "Red Alder",
  },
  {
    question: "What do Western Hemlock cones provide?",
    choices: ["Wood for shelter", "Food and seed dispersal", "Leaves for ground cover", "Shade"],
    answer: "Food and seed dispersal",
  },
  {
    question: "Which season shows the Red Alder bare above ground?",
    choices: ["Spring", "Fall", "Winter", "Summer"],
    answer: "Winter",
  },
  {
    question: "What do the cones on Western Hemlock do during summer?",
    choices: ["Fall off branches", "Grow to full size", "Change color", "Freeze"],
    answer: "Grow to full size",
  },
  {
    question: "Which season is peak growth for Red Alder?",
    choices: ["Fall", "Winter", "Summer", "Spring"],
    answer: "Summer",
  },
  {
    question: "Which tree remains evergreen, even during snow?",
    choices: ["Red Alder", "Western Hemlock", "Birch", "Poplar"],
    answer: "Western Hemlock",
  },
  {
    question: "Why do deciduous trees lose leaves in winter?",
    choices: ["To grow faster", "To conserve water and energy", "To trap sunlight", "To make room for flowers"],
    answer: "To conserve water and energy",
  },
  {
    question: "What happens to the forest floor when Red Alder leaves fall?",
    choices: ["It's cleaned", "Nutrients are recycled", "Animals eat the leaves", "It dries out"],
    answer: "Nutrients are recycled",
  },
  {
    question: "Which tree’s cones stay on the tree even in winter?",
    choices: ["Red Alder", "Western Hemlock", "Cedar", "Douglas Fir"],
    answer: "Western Hemlock",
  },
  {
    question: "What kind of scent do Douglas Fir needles give off when crushed?",
    choices: ["Sour", "Musty", "Sweet citrus", "No scent"],
    answer: "Sweet citrus",
  },
  {
    question: "How do Red Alder trees help erosion control?",
    choices: ["Their cones block water", "Their roots stabilize soil", "Their branches break rocks", "Their needles soak water"],
    answer: "Their roots stabilize soil",
  },
  {
    question: "Which tree prefers cool, moist environments?",
    choices: ["Western Hemlock", "Douglas Fir", "Oak", "Aspen"],
    answer: "Western Hemlock",
  },
  {
    question: "What helps the Western Red Cedar survive harsh weather?",
    choices: ["Shallow roots", "Leaf color", "Rot-resistant bark", "Tall branches"],
    answer: "Rot-resistant bark",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function getRandomQuestions(pool: typeof treeQuestionPool, exclude: number[] = [], count = 10) {
  const availableIndices = pool
    .map((_, i) => i)
    .filter(i => !exclude.includes(i))

  const selected: number[] = []
  while (selected.length < count && availableIndices.length > 0) {
    const randIndex = Math.floor(Math.random() * availableIndices.length)
    selected.push(availableIndices.splice(randIndex, 1)[0])
  }

  return selected.map(i => {
    const original = pool[i]
    return {
      ...original,
      choices: shuffleArray(original.choices),
    }
  })
}

export default function TreeQuiz() {
  const router = useRouter()

  const [usedIndices, setUsedIndices] = useState<number[]>([])
  const [questions, setQuestions] = useState(() => getRandomQuestions(treeQuestionPool))
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const [showCongrats, setShowCongrats] = useState(false)

  const score = Object.entries(selectedAnswers).filter(
    ([index, answer]) => answer === questions[Number(index)].answer
  ).length

  const handleAnswer = (index: number, choice: string) => {
    if (selectedAnswers[index]) return
    setSelectedAnswers({ ...selectedAnswers, [index]: choice })
  }

  const handleReset = () => {
    const currentIndices = questions.map(q => treeQuestionPool.indexOf(q))
    const newUsed = [...usedIndices, ...currentIndices]
    const newQuestions = getRandomQuestions(treeQuestionPool, newUsed)
    setQuestions(newQuestions)
    setSelectedAnswers({})
    setUsedIndices(newUsed)
  }

  const handleQuizComplete = async () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (!user?.id) return

    try {
      const res = await fetch('http://localhost:3001/complete-module14', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: user.id, score }),
      })

      if (res.ok) {
        setProgress('Module 4')
        setShowCongrats(true)
      }
    } catch (err) {
      console.error('Module 4 request failed:', err)
    }
  }

  const allAnswered = Object.keys(selectedAnswers).length === questions.length
  const passed = score >= 8

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image src="/forest background.png" alt="Forest Background" fill priority className="object-cover" style={{ objectPosition: 'center' }} />
      </div>

      <div className="max-w-4xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-6">
          Tree Quiz
        </h1>

        <p className="text-center mb-8 text-lg text-gray-700 font-medium">
          Test your tree knowledge! <br />
          <span className="text-2xl font-bold">{score} / {questions.length}</span>
        </p>

        {questions.map((q, index) => (
          <div key={index} className="mb-8 p-6 bg-green-100 rounded-xl border border-green-200 shadow-sm">
            <p className="font-semibold text-left mb-4 text-gray-800 text-lg">{index + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.choices.map((choice) => {
                const isSelected = selectedAnswers[index] === choice
                const isCorrect = choice === q.answer
                const hasAnswered = index in selectedAnswers

                let buttonStyle = 'w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 border'

                if (hasAnswered) {
                  if (isSelected && isCorrect) {
                    buttonStyle += ' bg-green-500 text-white border-green-600'
                  } else if (isSelected && !isCorrect) {
                    buttonStyle += ' bg-red-500 text-white border-red-600'
                  } else {
                    buttonStyle += ' bg-gray-200 text-gray-600 border-gray-300'
                  }
                } else {
                  buttonStyle += ' bg-green-600 hover:bg-green-800 text-white border-green-600'
                }

                return (
                  <button
                    key={choice}
                    className={buttonStyle}
                    onClick={() => handleAnswer(index, choice)}
                    disabled={hasAnswered}
                  >
                    {choice}
                  </button>
                )
              })}
            </div>

            {selectedAnswers[index] && (
              <div className="mt-4 text-center font-bold text-lg">
                {selectedAnswers[index] === q.answer ? (
                  <span className="text-green-700">✅ Correct!</span>
                ) : (
                  <span className="text-red-700">❌ Incorrect. Try again next time!</span>
                )}
              </div>
            )}
          </div>
        ))}

        <div className="text-center mt-10">
          <p className="mb-6 text-xl text-gray-800 font-semibold">
            Final Score: {score} / {questions.length}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleReset}
              className="bg-green-700 hover:bg-green-950 text-white px-6 py-3 rounded-xl shadow-md transition"
            >
              Reset
            </button>

            {allAnswered && passed && (
              <button
                onClick={handleQuizComplete}
                className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow transition"
              >
                Complete Module 1
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
              <p className="text-lg font-semibold mb-3 text-green-600">🎉 Congrats! You completed Module 4!</p>
              <button
                onClick={() => {
                  setShowCongrats(false)
                  router.push('/certificate')
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
            <p className="mt-6 text-red-600 font-semibold text-lg">
              Sorry, you must get 8/10 questions correct to pass.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
