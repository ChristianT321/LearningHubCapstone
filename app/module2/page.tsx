'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/test2')
  }

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

    <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl px-4"> 
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-15">
          MODULE 2:
        </h1>
        <h2 className="text-3xl font-semibold text-white drop-shadow-[2px_2px_0px_black]">
          Aquatic animals
        </h2>

        <p className="text-2xl font-semibold text-white drop-shadow-[2px_2px_0px_black]">
            In this module, you will learn how; <br />
            <li className="text-xl">Salmons bodys feed the rainforest when they die,</li>
            <li className="text-xl">Humpback whales use bubble nets trap trap fish, </li>
            <li className="text-xl">Sea otters use rocks to crack open shellfish,</li>
            <li className="text-xl">The Giant Pacific Octopus can change its color and texture to blend in with its surroundings.</li>
        </p>
        <button
          onClick={handleContinue}
          className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded shadow"
        >
          Continue
        </button>
      </div>
    </main>
  )
}
