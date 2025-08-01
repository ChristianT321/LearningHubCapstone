//This was originally made for my last project in webdev 2. All questions/ design have been reworked for this project.
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { setProgress } from '@/utils/progress'

const questions = [
  {
    question: 'Which tree can grow taller than a 20 story building?',
    choices: ['Pine tree', 'Yellow bark tree', 'Western red cedar', 'Red bark tree'],
    answer: 'Western red cedar',
  },
  {
    question: 'Which plant helps to keep the rainforest damp?',
    choices: ['Pine tree', 'Moss', 'Western red cedar', 'Rose bush'],
    answer: 'Moss',
  },
  {
    question: 'Which process helps create new soil?',
    choices: ['Stomping dirt', 'Forest fires', 'Rotting fallen trees', 'Digging up soil'],
    answer: 'Rotting fallen trees',
  },
  {
    question: 'Which type of forest is hundreds of years old?',
    choices: ['Ancient forest', 'Classic forest', 'Old plant forest', 'Old growth forests'],
    answer: 'Old growth forests',
  },
]

export default function VegetationTest() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const router = useRouter()
  const [showCongrats, setShowCongrats] = useState(false)

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

  const handleQuizComplete = async () => {
   const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  try {
    const res = await fetch('http://localhost:3001/complete-module4', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentId: user.id,
        score: score,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setProgress('Module 4');
      setShowCongrats(true);
    } else {
      console.error(data.error || 'Failed to update module 4');
    }
  } catch (err) {
    console.error('Module 4 request failed:', err);
  }  
  };

  const allAnswered = Object.keys(selectedAnswers).length === questions.length
  const allAnsweredCorrectly = score === questions.length

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/forest background.png"
          alt="Forest Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="max-w-4xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-6">
          Vegetation Test
        </h1>

        <p className="text-center mb-8 text-lg text-gray-700 font-medium">
          Test your knowledge! <br />
          <span className="text-2xl font-bold">{score} / {questions.length}</span>
        </p>

        {questions.map((q, index) => (
          <div key={index} className="mb-8 p-6 bg-green-300 rounded-xl border border-green-500 shadow-sm">
            <p className="font-semibold text-left mb-4 text-gray-800 text-lg">{index + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.choices.map((choice) => {
                const isSelected = selectedAnswers[index] === choice
                const isCorrect = choice === q.answer
                const hasAnswered = index in selectedAnswers

                let buttonStyle = 'w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 border'

                if (hasAnswered) {
                  if (isSelected && isCorrect) {
                    buttonStyle += ' bg-green-900 text-white border-green-950'
                  } else if (isSelected && !isCorrect) {
                    buttonStyle += ' bg-red-700 text-white border-red-950'
                  } else {
                    buttonStyle += ' bg-gray-200 text-gray-600 border-gray-300'
                  }
                } else {
                  buttonStyle += ' bg-green-700 hover:bg-green-950 text-white border-green-500'
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
                  <span className="text-green-950">✅ Correct!</span>
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
              className="bg-blue-700 hover:bg-blue-950 text-white px-6 py-3 rounded-xl shadow-md transition-colors duration-300 ease-in-out"
            >
              Reset
            </button>

            {allAnswered && allAnsweredCorrectly && (
               <button
              onClick={handleQuizComplete}
              className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow transition"
            >
               Complete Module 4
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
                setShowCongrats(false);
                router.push('/certificate');
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
