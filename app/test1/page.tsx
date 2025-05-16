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

  const handleReset = () => {
    setSelectedAnswers({})
  }

  const handleContinue = () => {
    router.push('/module2')
  }

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
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div
        className="max-w-4xl mx-auto mb-12 px-6 py-15 relative z-10 bg-white rounded-lg shadow-lg"

      >
        <h1 className="text-5xl font-bold text-center text-green-700 mb-4">Land Animal Test</h1>
        <p className="text-center mb-6 text-lg text-black">
          Test your knowledge! Score: <br /> {score} / {questions.length}
        </p>

        {questions.map((q, index) => (
          <div
            key={index}
            className="mb-6 p-4 bg-green-200/80 rounded shadow-md border border-gray-300"
          >
            <p className="font-semibold mb-3">{index + 1}. {q.question}</p>
            <div className="grid grid-cols-2 gap-3">
              {q.choices.map((choice) => {
                const isSelected = selectedAnswers[index] === choice
                const isCorrect = choice === q.answer
                const hasAnswered = index in selectedAnswers

                let buttonStyle = 'px-4 py-2 rounded border'
                if (hasAnswered) {
                  if (isSelected && isCorrect) {
                    buttonStyle += ' bg-green-500 text-white'
                  } else if (isSelected && !isCorrect) {
                    buttonStyle += ' bg-red-500 text-white'
                  } else {
                    buttonStyle += ' bg-gray-100 text-gray-600'
                  }
                } else {
                  buttonStyle += ' bg-yellow-200 hover:bg-yellow-400'
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
              <p className="mt-4 font-black text-lg text-center">
                {selectedAnswers[index] === q.answer ? (
                  <span className="text-green-600" style={{ WebkitTextStroke: '1px black' }}>
                    Correct!
                  </span>
                ) : (
                  <span className="text-red-600" style={{ WebkitTextStroke: '1px black' }}>
                    Incorrect, please try again next time.
                  </span>
                )}
              </p>
            )}
          </div>
        ))}

        <div className="text-center mt-10">
          <p className="mb-6 text-xl text-white">
            Final Score: {score} / {questions.length}
          </p>

          <button
            onClick={handleReset}
            className="bg-yellow-800 hover:bg-amber-950 text-white px-6 py-3 rounded-lg mr-4"
          >
            Reset
          </button>

          {allAnswered && allAnsweredCorrectly && (
            <button
              onClick={handleContinue}
              className="bg-green-700 hover:bg-green-900 text-white px-6 py-3 rounded-lg"
            >
              Continue
            </button>
          )}

          {allAnswered && !allAnsweredCorrectly && (
            <p className="mt-6 text-red-600 font-semibold text-lg">
              Sorry, all questions must be correct to pass. Please try again.
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
