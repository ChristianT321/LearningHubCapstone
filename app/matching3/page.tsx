// ChatGPT helped generate this page. I asked to change the matching game I originally had to a Name That Tree game, and explained how it would work. Essentially more quiz oriented with the possibility of a highschore for future database work, every question you see was requested. 
// The generated responce wast mostly correct, but had some minor issues that needed fixiing functionality wise, such as added unecesarry buttons and only half questions on tree types. 
// Right now for filler I only have coniferous trees, when I add deciduous trees I will have it so that once you answer either coniferous or deciduous, the next question will show only asnwers of trees from those categories, rather than having 6 trees to chose from. This will also make it more difficut to randomly spam and guess the answers to pass.
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import JSConfetti from 'js-confetti'
//AUDIT NOTE for Ryan: type is a custom type declaration that tells variable with this type what can be stored in this variable. 
type TreeItem = {
  name: string
  image: string
  type: 'Coniferous' | 'Deciduous'
}
//Will give error if type doesn't match declaration.
const allItems: TreeItem[] = [
  // Coniferous trees
  { name: 'Western red cedar', image: '/Western red cedar.jpg', type: 'Coniferous' },
  { name: 'Douglas fir', image: '/Douglas fir.jpg', type: 'Coniferous' },
  { name: 'Western hemlock', image: '/Western hemlock.jpg', type: 'Coniferous' },
  { name: 'Douglas fir', image: '/Douglas fir leaf.jpg', type: 'Coniferous' },
  { name: 'Western hemlock', image: '/Western hemlock leaf.jpg', type: 'Coniferous' },
  { name: 'Western red cedar', image: '/Western red cedar leaf.jpg', type: 'Coniferous' },

  // Deciduous trees
  { name: 'Bigleaf maple', image: '/Bigleafmaple.jpg', type: 'Deciduous' },
  { name: 'Bigleaf maple', image: '/mapleleaf.jpg', type: 'Deciduous' },
  { name: 'Red alder', image: '/red_alder_trees.jpg', type: 'Deciduous' },
  { name: 'Red alder', image: '/redalderleaf.jpg', type: 'Deciduous' },
  { name: 'Black cottonwood', image: '/blackcottonwood.webp', type: 'Deciduous' },
  { name: 'Black cottonwood', image: '/cottonwoodleaf.jpg', type: 'Deciduous' },
]
//AUDIT NOTE: const is a key word in JS/TS.
export default function NameThatTreeGame() {
  const router = useRouter()
  const [shuffledQuestions, setShuffledQuestions] = useState<TreeItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedType, setSelectedType] = useState<'Coniferous' | 'Deciduous' | null>(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [highScore, setHighScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [passed, setPassed] = useState(false)

  useEffect(() => {
    const shuffled = [...allItems].sort(() => Math.random() - 0.5).slice(0, 6)
    setShuffledQuestions(shuffled)
  }, [])

  useEffect(() => {
    if (showResult && passed) {
      const jsConfetti = new JSConfetti()
      jsConfetti.addConfetti({
        emojis: ['🌲', '🌳', '🍃', '🌿', '✨', '🍂'],
        emojiSize: 30,
        confettiNumber: 60,
      })
    }
  }, [showResult, passed])

  const currentQuestion = shuffledQuestions[currentIndex]

  const handleAnswerAndAdvance = () => {
    if (!selectedType) return

    let questionScore = 0

    if (selectedType === currentQuestion.type) {
      questionScore += 1
    }

    if (selectedName === currentQuestion.name) {
      questionScore += 1
    }

    const newScore = score + questionScore
    setScore(newScore)

    setSelectedType(null)
    setSelectedName(null)

    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      const hasPassed = newScore >= 6
      setPassed(hasPassed)
      setShowResult(true)
      setHighScore((prev) => Math.max(prev, newScore))
    }
  }

  const handleRetake = () => {
    const reshuffled = [...allItems].sort(() => Math.random() - 0.5).slice(0, 6)
    setShuffledQuestions(reshuffled)
    setCurrentIndex(0)
    setScore(0)
    setSelectedType(null)
    setSelectedName(null)
    setShowResult(false)
    setPassed(false)
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      <div className="fixed inset-0 z-0">
        <Image
          src="/forest background.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 mt-10 z-10">
        <h1 className="text-3xl font-bold text-blue-950 mb-4">Name That Tree</h1>

        {!showResult && currentQuestion && (
          <>
            <p className="text-lg mb-4 font-semibold">Question {currentIndex + 1} of 6</p>
            <div className="w-64 h-64 mx-auto relative mb-6 border-4 border-blue-900 rounded-lg bg-white overflow-hidden shadow">
              <Image
                src={currentQuestion.image}
                alt={currentQuestion.name}
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="mb-4">
              <p className="mb-2 font-semibold">Is this tree type:</p>
              <div className="flex justify-center gap-4">
                {['Coniferous', 'Deciduous'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type as 'Coniferous' | 'Deciduous')}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedType === type
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-black'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

              <div className="mb-4">
                <p className="mb-2 font-semibold">Which tree does this leaf belong to?</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {[...new Set(allItems.map((item) => item.name))].map((name) => (
                    <button
                      key={name}
                      onClick={() => setSelectedName(name)}
                      className={`px-4 py-2 rounded-lg border ${
                        selectedName === name
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-black'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

            <button
              onClick={handleAnswerAndAdvance}
              className="mt-6 bg-blue-700 hover:bg-blue-950 text-white px-6 py-3 rounded-xl shadow transition-colors duration-300 ease-in-out"
            >
              {currentIndex + 1 < shuffledQuestions.length ? 'Submit & Next' : 'Submit & View Results'}
            </button>
          </>
        )}

        {showResult && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mt-4">
              You scored {score}/12
            </h2>
            <p className="text-lg mb-2">
              {passed ? 'Great job! You passed!' : 'Try again to beat your score.'}
            </p>
            {passed && (
              <button
                onClick={() => router.push('/test4')}
                className="bg-blue-700 hover:bg-blue-950 text-white px-6 py-3 rounded-xl shadow mt-4 transition-colors duration-300 ease-in-out"
              >
                Continue
              </button>
            )}
            <button
              onClick={handleRetake}
              className="bg-red-700 hover:bg-red-950 text-white px-6 py-3 rounded-xl shadow mt-4 transition-colors duration-300 ease-in-out"
            >
              Retake Quiz
            </button>
            <p className="text-sm mt-2 text-gray-600">High Score: {highScore}/12</p>
          </div>
        )}
      </div>
    </main>
  )
}