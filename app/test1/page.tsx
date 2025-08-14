//This was originally made for my last project in webdev 2. All questions/ design have been reworked for this project.
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { setProgress } from '@/utils/progress';
import JSConfetti from 'js-confetti'

export const groundAnimalQuestionPool = [
  {
    question: 'What do black bears do in preparation for winter?',
    choices: ['Shed all their fur', 'Sleep extra hours', 'Forage and build fat reserves', 'Migrate south'],
    answer: 'Forage and build fat reserves',
  },
  {
    question: 'When do black bears typically emerge from their dens?',
    choices: ['Late fall', 'Spring', 'Summer', 'Winter'],
    answer: 'Spring',
  },
  {
    question: 'Why do black bears spend time near rivers?',
    choices: ['To drink water', 'To catch salmon and spread nutrients', 'To swim for fun', 'To build nests'],
    answer: 'To catch salmon and spread nutrients',
  },
  {
    question: 'What makes the Spirit Bear unique?',
    choices: ['It’s a polar bear cousin', 'It has white fur due to a recessive gene', 'It can speak in legends', 'It’s smaller than other bears'],
    answer: 'It has white fur due to a recessive gene',
  },
  {
    question: 'What do Spirit Bears mainly eat in summer?',
    choices: ['Bark and twigs', 'Berries, insects, clams', 'Meat from other animals', 'Tree sap'],
    answer: 'Berries, insects, clams',
  },
  {
    question: 'When do Spirit Bears hibernate?',
    choices: ['Summer', 'November to March', 'Spring', 'Early October only'],
    answer: 'November to March',
  },
  {
    question: 'Where do Spirit Bears usually hibernate?',
    choices: ['Dens in trees, caves, or hillsides', 'Riverbanks', 'Open fields', 'Snow tunnels'],
    answer: 'Dens in trees, caves, or hillsides',
  },
  {
    question: 'Why is fall important for Spirit Bears?',
    choices: ['They play more', 'Salmon runs provide key fat stores', 'They begin shedding', 'Cubs are born'],
    answer: 'Salmon runs provide key fat stores',
  },
  {
    question: 'What feature helps you identify a grizzly bear?',
    choices: ['White fur', 'A large shoulder hump', 'A short tail', 'Bright orange coat'],
    answer: 'A large shoulder hump',
  },
  {
    question: 'What do grizzly bears eat in spring?',
    choices: ['Salmon', 'Fresh green plants, grasses, and roots', 'Deer', 'Insects only'],
    answer: 'Fresh green plants, grasses, and roots',
  },
  {
    question: 'What do grizzlies do before hibernating?',
    choices: ['Build nests', 'Lose weight', 'Eat lots of salmon and find dens', 'Store water'],
    answer: 'Eat lots of salmon and find dens',
  },
  {
    question: 'How do grizzlies communicate?',
    choices: ['Through growling', 'Scent marking and clawing trees', 'Loud calls', 'Scratching the ground'],
    answer: 'Scent marking and clawing trees',
  },
  {
    question: 'What is special about sea wolves’ diet?',
    choices: ['Only eat deer', '90% marine-based food', 'Eat only berries', 'Mostly insects'],
    answer: '90% marine-based food',
  },
  {
    question: 'What do sea wolves do in summer?',
    choices: ['Hibernate in caves', 'Swim between islands to find food', 'Follow bears', 'Raise cubs'],
    answer: 'Swim between islands to find food',
  },
  {
    question: 'When are sea wolf pups born?',
    choices: ['Winter', 'Spring', 'Fall', 'Summer'],
    answer: 'Spring',
  },
  {
    question: 'How do sea wolves get ready for winter?',
    choices: ['Feast on salmon during fall runs', 'Build snow shelters', 'Shed their fur', 'Travel inland'],
    answer: 'Feast on salmon during fall runs',
  },
  {
    question: 'How do cougars hunt in summer?',
    choices: ['At night or early morning', 'In large groups', 'By fishing', 'By waiting in trees'],
    answer: 'At night or early morning',
  },
  {
    question: 'Where do cougar cubs stay in spring?',
    choices: ['In trees', 'Hidden in dens or rocky areas', 'At riverbanks', 'With the pack'],
    answer: 'Hidden in dens or rocky areas',
  },
  {
    question: 'Do cougars hibernate?',
    choices: ['Yes, during deep winter', 'No, they stay active year-round', 'Only young cubs do', 'Only if it snows'],
    answer: 'No, they stay active year-round',
  },
  {
    question: 'What skill do cougar cubs learn in fall?',
    choices: ['Hunting by stalking and pouncing', 'Swimming between rivers', 'Digging dens', 'Fishing'],
    answer: 'Hunting by stalking and pouncing',
  },
  {
    question: 'What kind of prey do wolverines eat in spring?',
    choices: ['Carrion and small mammals', 'Large deer', 'Mostly fish', 'Plant roots'],
    answer: 'Carrion and small mammals',
  },
  {
    question: 'How do wolverines travel in summer?',
    choices: ['In packs', 'Alone, covering long distances', 'By digging tunnels', 'Only at night'],
    answer: 'Alone, covering long distances',
  },
  {
    question: 'What behavior helps wolverines in fall?',
    choices: ['Sleeping early', 'Caching leftover meat', 'Making nests', 'Fishing with bears'],
    answer: 'Caching leftover meat',
  },
  {
    question: 'What helps wolverines survive winter?',
    choices: ['Tree climbing', 'Thick fur and large feet', 'Snowball hoarding', 'Sleeping most of the season'],
    answer: 'Thick fur and large feet',
  },
  {
    question: 'What do wolverines eat in winter?',
    choices: ['Small prey and buried carcasses', 'Only berries', 'Mostly insects', 'Fish from frozen lakes'],
    answer: 'Small prey and buried carcasses',
  },
  {
    question: 'What do all bears do in winter?',
    choices: ['Hibernate', 'Hunt together', 'Migrate south', 'Lose fur'],
    answer: 'Hibernate',
  },
  {
    question: 'Which animals stay active in winter?',
    choices: ['Cougars and wolverines', 'Spirit Bears', 'Black Bears', 'All bears'],
    answer: 'Cougars and wolverines',
  },
  {
    question: 'Which animal is known for stealing food from others?',
    choices: ['Cougar', 'Wolverine', 'Black Bear', 'Grizzly Bear'],
    answer: 'Wolverine',
  },
  {
    question: 'What seasonal event is important for bears in fall?',
    choices: ['Tree climbing', 'Salmon runs', 'Nesting', 'Leaf color changes'],
    answer: 'Salmon runs',
  },
  {
    question: 'How are cubs and pups typically raised in spring?',
    choices: ['With fathers nearby', 'In large family groups', 'Hidden while mothers hunt', 'On open beaches'],
    answer: 'Hidden while mothers hunt',
  },
]


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

export default function GroundAnimalQuiz() {
  const router = useRouter()

  const [usedIndices, setUsedIndices] = useState<number[]>([])
  const [questions, setQuestions] = useState(() => getRandomQuestions(groundAnimalQuestionPool))
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
    const currentIndices = questions.map(q => groundAnimalQuestionPool.indexOf(q))
    const newUsed = [...usedIndices, ...currentIndices]
    const newQuestions = getRandomQuestions(groundAnimalQuestionPool, newUsed)
    setQuestions(newQuestions)
    setSelectedAnswers({})
    setUsedIndices(newUsed)
  }

  const handleQuizComplete = async () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}')
    if (!user?.id) return

    try {
      const res = await fetch('http://localhost:3001/complete-module1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: user.id,
          score: score,
        }),
      })

      if (res.ok) {
        setProgress('Module 1')
        setShowCongrats(true)
      } else {
        console.error('Failed to complete module 1')
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
        <Image
          src="/Forest background.png"
          alt="Forest Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="max-w-4xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-6">
          Ground Animals Quiz
        </h1>

        <p className="text-center mb-8 text-lg text-gray-700 font-medium">
          Test your knowledge! <br />
          <span className="text-2xl font-bold">{score} / {questions.length}</span>
        </p>

        {questions.map((q, index) => (
          <div key={index} className="mb-8 p-6 bg-green-100 rounded-xl border border-green-200 shadow-sm">
            <p className="font-semibold text-left mb-4 text-gray-800 text-lg">{index + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.choices.map((choice, cIndex) => {
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
                  buttonStyle += ' bg-green-500 hover:bg-green-700 text-white border-green-500'
                }

                return (
                  <button
                    key={`${index}-${cIndex}`}
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
              className="bg-green-800 hover:bg-green-950 text-white px-6 py-3 rounded-xl shadow-md transition"
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
              <p className="text-lg font-semibold mb-3 text-green-600">🎉 Congrats! You completed Module 1!</p>
              <button
                onClick={() => {
                  setShowCongrats(false)
                  router.push('/module2')
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
              Sorry, you must get at least 8 questions correct to pass.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}