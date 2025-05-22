//This was originally made for my last project in webdev 2. All questions/ design have been reworked for this project.
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const questions = [
  {
    question: 'Why are salmon especially important to the Great Bear Rainforest?',
    choices: ['They eat sharks', 'Their bodies feed forests when they die', 'They build dams for other animals', 'They scare away bears'],
    answer: 'Their bodies feed forests when they die',
  },
  {
    question: 'Which whale uses bubble nets to trap fish in the Great Bear Rainforest’s waters?',
    choices: ['Humpback whale', 'Blue whale', 'Orca (Killer whale)', 'Beluga whale'],
    answer: 'Humpback whale',
  },
  {
    question: 'What do sea otters in the Great Bear Rainforest use to crack open shellfish?',
    choices: ['Sharp teeth', 'Rocks', 'Coral reefs', 'Driftwood sticks'],
    answer: 'Rocks',
  },
  {
    question: 'Which animal can change its color and texture to hide from predators?',
    choices: ['Giant Pacific octopus', 'Jellyfish', 'Starfish', 'Sea urchin'],
    answer: 'Giant Pacific octopus',
  },
]

export default function AquaticAnimalTest() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const router = useRouter()

  const score = Object.entries(selectedAnswers).filter(
    ([index, answer]) => answer === questions[Number(index)].answer
  ).length

  const handleAnswer = (index: number, choice: string) => {
    if (selectedAnswers[index]) return
    setSelectedAnswers({ ...selectedAnswers, [index]: choice })
  }

  const handleReset = () => {
    setSelectedAnswers({})
  }

  const handleContinue = () => {
    router.push('/module3')
  }

  const allAnswered = Object.keys(selectedAnswers).length === questions.length
  const allAnsweredCorrectly = score === questions.length

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/FIsh background.png"
          alt="Home Background"
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
          Test your knowledge! <br />
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
              className="bg-blue-800 hover:bg-blue-950 text-white px-6 py-3 rounded-xl shadow-md transition"
            >
              Reset
            </button>

            {allAnswered && allAnsweredCorrectly && (
              <button
                onClick={handleContinue}
                className="bg-green-700 hover:bg-green-900 text-white px-6 py-3 rounded-xl shadow-md transition"
              >
                Continue
              </button>
            )}
          </div>

          {allAnswered && !allAnsweredCorrectly && (
            <p className="mt-6 text-red-600 font-semibold text-lg">
              Sorry, all questions must be correct to pass. Please try again.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
