//This code was made with the help of chatGPT, I showed other files in this project and asked to make a relitvant matching game.
// At first it showed a card revieling game, but with further prompting (instucting how I wanted the game to work, how I wanted to be a drag and drop card game), I was able to get a matching game.
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import JSConfetti from 'js-confetti'
import { motion } from 'framer-motion'

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
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/homeback.png"
          alt="Home Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-5xl px-4 py-8">
        <motion.h1 
          className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Animal & Paw Print Matching
        </motion.h1>

        <motion.div 
          className="w-full rounded-xl p-6"
          style={{
            border: '3px solid transparent',
            borderRadius: '16px',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #f59e0b, #d97706, #b45309)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-amber-900 bg-opacity-70 p-4 rounded-[12px]">
            <h2 className="text-4xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Drag the paw prints to the correct animal!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="flex flex-col gap-6 items-center">
                <h2 className="text-2xl font-bold text-white mb-2">Paw Prints</h2>
                {pawPrintImages.map((paw) => (
                  <div
                    key={paw.name}
                    draggable={!Object.values(matches).includes(paw.name)}
                    onDragStart={() => handleDragStart(paw.name)}
                    className={`w-32 h-32 ${
                      Object.values(matches).includes(paw.name) ? 'opacity-50' : 'cursor-grab'
                    } bg-amber-800 border-2 border-amber-600 rounded-lg shadow-md overflow-hidden`}
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
                <h2 className="text-2xl font-bold text-white mb-2">Animals</h2>
                {animalImages.map((animal) => (
                  <div key={animal.name} className="flex items-center gap-4">
                    <div className="w-32 h-32 bg-amber-800 border-2 border-amber-600 rounded-lg shadow-md overflow-hidden">
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
                      className="w-32 h-32 border-4 border-dashed border-amber-500 rounded-lg bg-amber-900 bg-opacity-50 flex items-center justify-center shadow-inner overflow-hidden"
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
                        <span className="text-amber-200">Drop Here</span>
                      )}
                    </div>

                    <div className={`w-24 text-sm font-semibold ${
                      feedback[animal.name] === 'Correct!' ? 'text-green-300' : 'text-amber-200'
                    }`}>
                      {feedback[animal.name]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4">
              {errorMessage && (
                <motion.p 
                  className="text-red-300 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {errorMessage}
                </motion.p>
              )}

              <motion.button
                onClick={handleContinue}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow w-full max-w-xs"
              >
                Continue
              </motion.button>

              <motion.button
                onClick={resetGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-xl shadow w-full max-w-xs"
              >
                Reset Game
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}