//This was originally made for my last project in webdev 2. All questions/ design have been reworked for this project.
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const questions = [
  {
    question: 'What makes the Spirit Bear have white fur?',
    choices: ['It’s albino', 'Its genes', 'Its diet', 'Its a type of polar bear'],
    answer: 'Its genes',
  },
  {
    question: 'Which animal is the top hunter (no natural predators) in the Great Bear Rainforest?',
    choices: ['Black bear', 'Spirit bear', 'Gray wolf', 'Red fox'],
    answer: 'Gray wolf',
  },
  {
    question: 'Which small animal turns white in winter to hide in the snow?',
    choices: ['Raccoon', 'Short-tailed weasel', 'Groundhog', 'Chipmunk'],
    answer: 'Short-tailed weasel',
  },
  {
    question: 'Which large plant-eating animal lives in the Great Bear Rainforest?',
    choices: ['Roosevelt elk', 'Grizzly bear', 'Coyote', 'Red fox'],
    answer: 'Roosevelt elk',
  },
]

export default function Test1() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const router = useRouter()

  const score = Object.entries(selectedAnswers).filter(
    ([index, answer]) => answer === questions[Number(index)].answer
  ).length

  const handleAnswer = (index: number, choice: string) => {
    if (selectedAnswers[index]) return
    setSelectedAnswers({ ...selectedAnswers, [index]: choice })
  }

  const handleReset = () => setSelectedAnswers({})
  const handleContinue = () => router.push('/module2')

  const allAnswered = Object.keys(selectedAnswers).length === questions.length
  const allAnsweredCorrectly = score === questions.length

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/GBR home back.png"
          alt="Home Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-20 mt-10 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-700 mb-6">Land Animal Test</h1>
        <p className="text-lg text-gray-700 mb-8">Test your knowledge! Score: {score} / {questions.length}</p>

        {questions.map((q, index) => (
          <div
            key={index}
            className="mb-8 p-6 bg-green-100 rounded-xl shadow border border-green-300"
          >
            <p className="font-semibold text-left text-gray-800 mb-4 text-lg">{index + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.choices.map((choice) => {
                const isSelected = selectedAnswers[index] === choice
                const isCorrect = choice === q.answer
                const hasAnswered = index in selectedAnswers

                let buttonClasses = 'px-4 py-3 rounded-lg transition-all duration-200 font-medium'

                if (hasAnswered) {
                  if (isSelected && isCorrect) {
                    buttonClasses += ' bg-green-600 text-white'
                  } else if (isSelected && !isCorrect) {
                    buttonClasses += ' bg-red-500 text-white'
                  } else {
                    buttonClasses += ' bg-gray-200 text-gray-600 cursor-not-allowed'
                  }
                } else {
                  buttonClasses += ' bg-green-300 hover:bg-green-400 text-gray-950'
                }

                return (
                  <button
                    key={choice}
                    className={buttonClasses}
                    onClick={() => handleAnswer(index, choice)}
                    disabled={hasAnswered}
                  >
                    {choice}
                  </button>
                )
              })}
            </div>

            {selectedAnswers[index] && (
              <p className="mt-5 font-bold text-center text-lg">
                {selectedAnswers[index] === q.answer ? (
                  <span className="text-green-700 drop-shadow-md">✅ Correct!</span>
                ) : (
                  <span className="text-red-600 drop-shadow-md">❌ Incorrect, try again next time.</span>
                )}
              </p>
            )}
          </div>
        ))}

        <div className="text-center mt-10 space-y-4">
          <p className="text-xl font-semibold text-gray-800">
            Final Score: {score} / {questions.length}
          </p>

          <div className="space-x-4">
            <button
              onClick={handleReset}
              className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow transition"
            >
              Reset
            </button>

            {allAnswered && allAnsweredCorrectly && (
              <button
                onClick={handleContinue}
                className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow transition"
              >
                Continue
              </button>
            )}
          </div>

          {allAnswered && !allAnsweredCorrectly && (
            <p className="text-red-700 font-semibold mt-6">
              You must get all questions correct to pass. Try again!
            </p>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <Image
          src="/Forest infront2.png"
          alt="Foreground Grass"
          width={1920}
          height={300}
          className="w-full h-auto object-bottom"
        />
      </div>
    </main>
  )
}

