'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type MatchItem = {
  name: string
  image: string
}

const animalImages: MatchItem[] = [
  { name: 'Bald eagle', image: '/Bald eagle.jpg' },
  { name: 'Hummingbird', image: '/Hummingbird.jpg' },
  { name: 'Duck', image: '/Duck.jpg' },
]

const pawPrintImages: MatchItem[] = [
  { name: 'Hummingbird', image: '/Hummingbird feather.jpg' },
  { name: 'Duck', image: '/Duck feather.jpg' },
  { name: 'Bald eagle', image: '/Bald eagle feather.jpg' },
]

export default function MatchingGame() {
  const router = useRouter()
  const [matches, setMatches] = useState<{ [key: string]: string | null }>({})
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({})
  const [errorMessage, setErrorMessage] = useState('')

  const handleDragStart = (name: string) => {
    setDraggedItem(name)
  }

  const handleDrop = (targetName: string) => {
    if (!draggedItem) return
    const isCorrect = draggedItem === targetName
    setMatches((prev) => ({ ...prev, [targetName]: draggedItem }))
    setFeedback((prev) => ({
      ...prev,
      [targetName]: isCorrect ? 'Correct!' : 'Try again',
    }))
    setDraggedItem(null)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const resetGame = () => {
    setMatches({})
    setDraggedItem(null)
    setFeedback({})
    setErrorMessage('')
  }

  const handleContinue = () => {
    const allMatched = animalImages.every(
      (animal) => matches[animal.name] === animal.name
    )
    if (allMatched) {
      router.push('/test3')
    } else {
      setErrorMessage('Sorry, you must get all correct in order to proceed.')
    }
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/Sky background.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-5xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-20 mt-10 z-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Animal & Feather Matching</h1>
        <p className="text-lg text-gray-700 mb-6">Drag the feather to the correct animal!</p>

        <div className="grid grid-cols-2 gap-16">
          <div className="flex flex-col gap-6 items-center">
            <h2 className="text-xl font-semibold mb-2">Feathers</h2>
            {pawPrintImages.map((paw) => (
              <div
                key={paw.name}
                draggable={!Object.values(matches).includes(paw.name)}
                onDragStart={() => handleDragStart(paw.name)}
                className={`w-32 h-32 ${
                  Object.values(matches).includes(paw.name) ? 'opacity-50' : 'cursor-grab'
                } bg-white border-2 border-blue-500 rounded-lg shadow-md flex items-center justify-center`}
              >
                <Image
                  src={paw.image}
                  alt={paw.name}
                  width={128}
                  height={128}
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-10 items-center">
            <h2 className="text-xl font-semibold mb-2">Animals</h2>
            {animalImages.map((animal) => (
              <div key={animal.name} className="flex items-center gap-4">
                <div className="w-32 h-32 bg-white border-2 border-blue-500 rounded-lg shadow-md flex items-center justify-center">
                  <Image
                    src={animal.image}
                    alt={animal.name}
                    width={128}
                    height={128}
                    className="object-cover rounded-lg"
                  />
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(animal.name)}
                  className="w-32 h-32 border-4 border-dashed border-blue-600 rounded-lg bg-white flex items-center justify-center shadow-inner"
                >
                  {matches[animal.name] ? (
                    <Image
                      src={
                        pawPrintImages.find((p) => p.name === matches[animal.name])?.image || ''
                      }
                      alt="Matched paw print"
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-gray-400">Drop Here</span>
                  )}
                </div>

                <div className="w-24 text-sm font-semibold text-green-800">
                  {feedback[animal.name]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            onClick={handleContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow"
          >
            Continue
          </button>

          {errorMessage && <p className="text-red-600 font-medium">{errorMessage}</p>}

          <button
            onClick={resetGame}
            className="bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-xl shadow"
          >
            Reset Game
          </button>
        </div>
      </div>
    </main>
  )
}
