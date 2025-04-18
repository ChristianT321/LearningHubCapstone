'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Fact {
  ID: number
  FACT: string
}

export default function HomePage() {
  const [facts, setFacts] = useState<Fact[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/api/facts')
      .then((res) => res.json())
      .then((data) => {
        setFacts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load facts:', err)
        setLoading(false)
      })
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">

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

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-25 mb-2">
          Welcome to the Great Bear Rainforest!
        </h1>
        <p className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Today we will be learning about how:
        </p>

        {loading ? (
          <p className="text-white text-lg drop-shadow">Loading facts...</p>
        ) : (
        <ul className="space-y-8">
          {facts.map((fact) => (
            <li
              key={fact.ID}
              className="inline-flex items-start gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-md shadow text-left"
            >
              <span className="text-green-300 text-2xl drop-shadow">🌿</span>
              <span className="text-white text-base sm:text-lg font-semibold drop-shadow-[2px_2px_0px_black]">
                {fact.FACT}
              </span>
            </li>
          ))}
        </ul>
        )}

        <button
          onClick={handleSignOut}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded shadow mt-5"
        >
          Sign Out
        </button>
      </div>
    </main>
  )
}
