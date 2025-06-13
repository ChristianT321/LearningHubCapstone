//This code was made with the help of chatGPT, I showed other files in this project and asked to make a relitvant matching game.
// At first it showed a card revieling game, but with further prompting (instucting how I wanted the game to work, how I wanted to be a drag and drop card game), I was able to get a matching game.
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import JSConfetti from 'js-confetti'

type MatchItem = {
  name: string
  image: string
}

const animalImages: MatchItem[] = [
  { name: 'Spirit Bear', image: '/Spirit bear.jpg' },
  { name: 'Beaver', image: '/Beaver.jpg' },
  { name: 'Vancouver Wolf', image: '/Vancouver Wolf.jpg' },
]

const pawPrintImages: MatchItem[] = [
  { name: 'Beaver', image: '/Beaver Paw.jpeg' },
  { name: 'Vancouver Wolf', image: '/Vancouver Wolf Paw.jpg' },
  { name: 'Spirit Bear', image: '/Spirit bear paw.jpg' },
]

export default function MatchingGame() {
  const router = useRouter()
  const [matches, setMatches] = useState<{ [key: string]: string | null }>({})
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({})
  const [errorMessage, setErrorMessage] = useState('')
  const [allCorrect, setAllCorrect] = useState(false)

  useEffect(() => {
    // Check if all matches are correct whenever matches change
    const correct = animalImages.every(
      (animal) => matches[animal.name] === animal.name
    )
    setAllCorrect(correct)
    
    if (correct) {
      const jsConfetti = new JSConfetti()
      jsConfetti.addConfetti({
        emojis: ['🌈', '✨', '🐾', '🐻', '🦫', '🐺'],
        emojiSize: 30,
        confettiNumber: 60,
      })
    }
  }, [matches])

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
    setAllCorrect(false)
  }

  const handleContinue = () => {
    if (allCorrect) {
      router.push('/test1')
    } else {
      setErrorMessage('Sorry, you must get all correct in order to proceed.')
    }
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/GBR home back.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-5xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-20 mt-10 z-10">
        <h1 className="text-4xl font-bold text-green-900 mb-4">Animal & Paw Print Matching</h1>
        <p className="text-lg text-gray-700 mb-6">Drag the paw prints to the correct animal!</p>

        <div className="grid grid-cols-2 gap-16">
          <div className="flex flex-col gap-6 items-center">
            <h2 className="text-xl font-semibold mb-2">Paw Prints</h2>
            {pawPrintImages.map((paw) => (
              <div
                key={paw.name}
                draggable={!Object.values(matches).includes(paw.name)}
                onDragStart={() => handleDragStart(paw.name)}
                className={`w-32 h-32 ${
                  Object.values(matches).includes(paw.name) ? 'opacity-50' : 'cursor-grab'
                } bg-white border-2 border-green-500 rounded-lg shadow-md overflow-hidden`}
              >
                <Image
                  src={paw.image}
                  alt={paw.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-10 items-center">
            <h2 className="text-xl font-semibold mb-2">Animals</h2>
            {animalImages.map((animal) => (
              <div key={animal.name} className="flex items-center gap-4">
                <div className="w-32 h-32 bg-white border-2 border-green-500 rounded-lg shadow-md overflow-hidden">
                  <Image
                    src={animal.image}
                    alt={animal.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(animal.name)}
                  className="w-32 h-32 border-4 border-dashed border-green-600 rounded-lg bg-white flex items-center justify-center shadow-inner overflow-hidden"
                >
                  {matches[animal.name] ? (
                    <Image
                      src={pawPrintImages.find((p) => p.name === matches[animal.name])?.image || ''}
                      alt="Matched paw print"
                      width={100}
                      height={100}
                      className="w-full h-full object-contain p-2"
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
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow"
          >
            Reset Game
          </button>
        </div>
      </div>

      {/* <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <Image
          src="/Forest infront2.png"
          alt="Foreground Grass"
          width={1920}
          height={300}
          className="w-full h-auto object-bottom"
        />
      </div> */}
    </main>
  )
}