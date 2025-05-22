//This page was created with the help of chatGPT, I asked how to turn the matching game into a go fish game.
// I had to really consider the logistics and how it would play out, since it wouldnt be like a normal go fish game, so I thought of a way to get it as close as possible to the original while keeping it functional for the project. This was done through extensive prompting and personal editing of the code.
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const allFish = ['Salmon', 'Whitefish', 'Lake Trout']

export default function GoFishGame() {
  const [hand, setHand] = useState<string[]>([])
  const [discardPile, setDiscardPile] = useState<string[]>([])
  const [currentRequest, setCurrentRequest] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [gameOver, setGameOver] = useState(false)

  const router = useRouter()

  const initializeGame = () => {
    const shuffled = [...allFish].sort(() => 0.5 - Math.random())
    const newHand = shuffled.slice(0, 2)
    setHand(newHand)
    setDiscardPile([])
    setMessage('')
    setGameOver(false)
    const initialRequest = allFish.find(fish => !newHand.includes(fish)) || allFish[0]
    setCurrentRequest(initialRequest)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  const askForFish = () => {
    const newRequest = allFish[Math.floor(Math.random() * allFish.length)]
    setCurrentRequest(newRequest)
  }

  useEffect(() => {
    const hasAllFish = allFish.every((fish) => discardPile.includes(fish))
    if (hasAllFish) {
      setGameOver(true)
      setMessage('Congratulations, you win!')
    }
  }, [discardPile])

  const handleCardClick = (fish: string) => {
    if (!currentRequest || gameOver) return
    if (fish === currentRequest) {
      setHand(prev => prev.filter(f => f !== fish))
      setDiscardPile(prev => [...prev, fish])
      setMessage(`Correct! You gave away a ${fish}.`)
      askForFish()
    } else {
      setMessage(`Sorry, try again.`)
    }
  }

  const handleGoFish = () => {
    if (!currentRequest || gameOver) return
    if (hand.includes(currentRequest)) {
      setMessage(`But you do have a ${currentRequest}!`)
      return
    }
    
    setHand(prev => [...prev, currentRequest])
    setMessage(`You drew a ${currentRequest} from the pond!`)
    askForFish()
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/FIsh background.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-20 mt-10 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-2">Go Fish!</h1>
        <h2 className="text-xl font-bold text-blue-700 mb-1">
          Collect all three to win! <br />
        </h2>

        {gameOver ? (
          <>
            <p className="text-2xl text-green-800 font-bold mb-2">{message}</p>
            <div className="flex gap-4 justify-center mb-5">
              <button
                onClick={initializeGame}
                className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-xl shadow transition"
              >
                Play Again
              </button>
              <button
                onClick={() => router.push('/test2')}
                className="bg-purple-700 hover:bg-purple-900 text-white px-6 py-3 rounded-xl shadow transition"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-800 mb-4">
              {currentRequest
                ? `Do you have a ${currentRequest}?`
                : `Waiting for computer...`}
            </p>

            <div className="flex flex-wrap justify-center gap-4 my-6">
              {hand.map((fish) => (
                <button
                  key={fish}
                  onClick={() => handleCardClick(fish)}
                  className="bg-blue-100 rounded-xl p-2 hover:scale-105 transition transform duration-200 shadow"
                >
                  <Image
                    src={`/${fish}.png`}
                    alt={fish}
                    width={120}
                    height={120}
                    className="rounded-lg"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleGoFish}
              className="mt-4 bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-lg shadow transition"
            >
              Go Fish
            </button>

            <p className="mt-6 text-xl text-gray-900 font-medium min-h-[2rem]">
              {message}
            </p>
          </>
        )}

        <div className="">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">Discard Piles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center">
            {allFish.map((fishType) => {
              const fishCards = discardPile.filter((f) => f === fishType)
              return (
                <div
                  key={fishType}
                  className="border-4 border-dashed border-gray-400 rounded-xl p-4 bg-gray-100 flex flex-col items-center min-h-[150px]"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{fishType}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {fishCards.map((fish, index) => (
                      <Image
                        key={`${fish}-${index}`}
                        src={`/${fish}.png`}
                        alt={fish}
                        width={60}
                        height={60}
                        className="rounded"
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}