//This was originally made for my last project in webdev 2. All questions/ design have been reworked for this project.
'use client'

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { setProgress } from '@/utils/progress'

export const fullQuestionPool = [
  // === SALMON ===
  {
    question: 'Where do salmon lay their eggs?',
    choices: ['In the ocean', 'On tree roots', 'In river gravel', 'In sand dunes'],
    answer: 'In river gravel',
  },
  {
    question: 'What amazing sense helps salmon return to their birth river?',
    choices: ['Hearing', 'Touch', 'Smell', 'Sight'],
    answer: 'Smell',
  },
  {
    question: 'What direction do salmon swim to reach their spawning grounds?',
    choices: ['Downstream', 'Upstream', 'In circles', 'Across land'],
    answer: 'Upstream',
  },
  {
    question: 'What do salmon feed after they die?',
    choices: ['Other salmon', 'Oceans', 'Bears, eagles, and forests', 'Caves'],
    answer: 'Bears, eagles, and forests',
  },
  {
    question: 'Which animal relies on salmon during autumn?',
    choices: ['Owls', 'Bears', 'Sharks', 'Deer'],
    answer: 'Bears',
  },
  {
    question: 'Where are salmon born?',
    choices: ['Ocean floor', 'Freshwater rivers', 'Rock pools', 'Mountain peaks'],
    answer: 'Freshwater rivers',
  },
  {
    question: 'What do salmon do after traveling to the sea?',
    choices: ['Stay forever', 'Return to their river', 'Climb trees', 'Dig holes'],
    answer: 'Return to their river',
  },
  {
    question: 'How do salmon get past waterfalls?',
    choices: ['Swim around', 'Climb rocks', 'Leap over them', 'Wait for help'],
    answer: 'Leap over them',
  },
  {
    question: 'Why are salmon important to Indigenous communities?',
    choices: ['For their singing', 'For speed', 'As food and in ceremonies', 'As pets'],
    answer: 'As food and in ceremonies',
  },
  {
    question: 'What role do salmon play in the forest ecosystem?',
    choices: ['Pollinate flowers', 'Carry nutrients inland', 'Clean the rivers', 'Build nests'],
    answer: 'Carry nutrients inland',
  },

  // === WHITEFISH ===
  {
    question: 'Where do whitefish like to swim?',
    choices: ['Warm shallow water', 'Fast rivers', 'Cold lake bottoms', 'Ocean waves'],
    answer: 'Cold lake bottoms',
  },
  {
    question: 'What do whitefish eat?',
    choices: ['Berries', 'Other fish', 'Insects and small animals', 'Seaweed'],
    answer: 'Insects and small animals',
  },
  {
    question: 'Which animals eat whitefish?',
    choices: ['Bears', 'Sharks', 'Larger fish, birds, and humans', 'Wolves'],
    answer: 'Larger fish, birds, and humans',
  },
  {
    question: 'What helps whitefish swim quickly?',
    choices: ['Fins with claws', 'Sleek torpedo shape', 'Colorful scales', 'Feathers'],
    answer: 'Sleek torpedo shape',
  },
  {
    question: 'Do whitefish stay active in winter?',
    choices: ['No, they sleep', 'Yes, they remain active under the ice', 'Only in warm lakes', 'They leave the lake'],
    answer: 'Yes, they remain active under the ice',
  },
  {
    question: 'Why are whitefish valuable to people?',
    choices: ['They sing', 'They shine in the dark', 'They are good to eat and fished commercially', 'They glow'],
    answer: 'They are good to eat and fished commercially',
  },
  {
    question: 'What does the callout say about whitefish?',
    choices: ['They sleep in summer', 'They freeze in lakes', 'They survive where few other fish can', 'They fly over lakes'],
    answer: 'They survive where few other fish can',
  },
  {
    question: 'What does their body look like?',
    choices: ['Flat and wide', 'Spiky and long', 'Streamlined and sleek', 'Covered in fur'],
    answer: 'Streamlined and sleek',
  },
  {
    question: 'Where are whitefish often caught?',
    choices: ['In the sky', 'Near lake bottoms', 'On the shore', 'In coral reefs'],
    answer: 'Near lake bottoms',
  },
  {
    question: 'What kind of eater is a whitefish?',
    choices: ['Efficient feeder', 'Lazy eater', 'Plant muncher', 'Meat-only hunter'],
    answer: 'Efficient feeder',
  },

  // === LAKE TROUT ===
  {
    question: 'Where do lake trout prefer to live?',
    choices: ['Warm ponds', 'Coral reefs', 'Deep, cold lakes', 'Shallow streams'],
    answer: 'Deep, cold lakes',
  },
  {
    question: 'How do lake trout catch their prey?',
    choices: ['Chasing loudly', 'Jumping high', 'Ambushing quietly', 'Singing'],
    answer: 'Ambushing quietly',
  },
  {
    question: 'How long can some lake trout live?',
    choices: ['1 year', 'Over 40 years', '3 years', '10 weeks'],
    answer: 'Over 40 years',
  },
  {
    question: 'How do lake trout grow?',
    choices: ['Very quickly', 'Overnight', 'Slowly over decades', 'By eating grass'],
    answer: 'Slowly over decades',
  },
  {
    question: 'What makes lake trout powerful swimmers?',
    choices: ['Wings', 'Muscular bodies', 'Big tails', 'Helium fins'],
    answer: 'Muscular bodies',
  },
  {
    question: 'What role do lake trout play in their habitat?',
    choices: ['Clean the lake', 'Top predator', 'Nest protector', 'Egg carrier'],
    answer: 'Top predator',
  },
  {
    question: 'How much did the largest recorded lake trout weigh?',
    choices: ['10 pounds', '70 pounds', '5 pounds', '25 pounds'],
    answer: '70 pounds',
  },
  {
    question: 'Where can you find a trout hunting in a photo?',
    choices: ['In a tree', 'Near the bottom', 'On land', 'In a nest'],
    answer: 'Near the bottom',
  },
  {
    question: 'What do trout prefer in their environment?',
    choices: ['Warm salty water', 'No predators', 'Cold, clean lakes', 'Busy rivers'],
    answer: 'Cold, clean lakes',
  },
  {
    question: 'How do trout catch their food?',
    choices: ['Surprise strikes', 'Leaping dances', 'Making traps', 'Calling loudly'],
    answer: 'Surprise strikes',
  },
]

function shuffleArray(array: any) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function getRandomQuestions(
  pool: { question: string; choices: string[]; answer: string }[],
  usedIndices: number[] = []
): { question: string; choices: string[]; answer: string }[] {
  const availableIndices = pool
    .map((_, index) => index)
    .filter(index => !usedIndices.includes(index))

  if (availableIndices.length < 10) {
    usedIndices = []
    return getRandomQuestions(pool, [])
  }

  const selectedIndices: number[] = []
  while (selectedIndices.length < 10) {
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
    if (!selectedIndices.includes(randomIndex)) {
      selectedIndices.push(randomIndex)
    }
  }

  return selectedIndices.map(index => {
    const question = pool[index]
    const shuffledChoices = [...question.choices].sort(() => Math.random() - 0.5)
    return {
      question: question.question,
      choices: shuffledChoices,
      answer: question.answer,
    }
  })
}

export default function AquaticAnimalTest() {
  const router = useRouter()

  const [usedIndices, setUsedIndices] = useState<number[]>([])
  const [questions, setQuestions] = useState(() => getRandomQuestions(fullQuestionPool))
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const [showCongrats, setShowCongrats] = useState(false)

  const score = Object.entries(selectedAnswers).filter(
    ([index, answer]) => answer === questions[Number(index)].answer
  ).length

  const passed = score >= 8
  const allAnswered = Object.keys(selectedAnswers).length === questions.length

  const handleAnswer = (index: number, choice: any) => {
    if (selectedAnswers[index]) return
    setSelectedAnswers({ ...selectedAnswers, [index]: choice })
  }

  const handleReset = () => {
    const currentIndices = questions.map(q => fullQuestionPool.indexOf(q))
    const newUsed = [...usedIndices, ...currentIndices]
    const newQuestions = getRandomQuestions(fullQuestionPool, newUsed)
    setQuestions(newQuestions)
    setSelectedAnswers({})
    setUsedIndices(newUsed)
  }

  const handleQuizComplete = async () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (!user?.id) {
      console.error('User not logged in')
      return
    }

    try {
      const res = await fetch('http://localhost:3001/complete-module2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: user.id,
          score: score,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setProgress('Module 2')
        setShowCongrats(true)
      } else {
        console.error(data.error || 'Failed to complete module 2')
      }
    } catch (err) {
      console.error('Module 2 request failed:', err)
    }
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/FIsh background.png"
          alt="Fish Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="max-w-4xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-6">
          Aquatic Animal Test
        </h1>

        <p className="text-center mb-8 text-lg text-gray-700 font-medium">
          Test your fish knowledge! <br />
          <span className="text-2xl font-bold">{score} / {questions.length}</span>
        </p>

        {questions.map((q, index) => (
          <div key={index} className="mb-8 p-6 bg-blue-100 rounded-xl border border-blue-200 shadow-sm">
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
                  buttonStyle += ' bg-blue-500 hover:bg-blue-700 text-white border-blue-500'
                }

                return (
                  <button
                    key={String(choice)}
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
              className="bg-blue-800 hover:bg-blue-950 text-white px-6 py-3 rounded-xl shadow-md transition"
            >
              Reset
            </button>

            {allAnswered && passed && (
              <button
                onClick={handleQuizComplete}
                className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow transition"
              >
                Complete Module 2
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
              <p className="text-lg font-semibold mb-3 text-green-600">🎉 Congrats! You completed Module 2!</p>
              <button
                onClick={() => {
                  setShowCongrats(false)
                  router.push('/module3')
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