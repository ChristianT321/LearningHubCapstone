'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/test4')
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">

      <div className="fixed inset-0 z-0">
        <Image
          src="/forest background.png"
          alt="Home Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

    <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-3xl px-4"> 
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-35 mb-2">
          MODULE 4:
        </h1>
        <h2 className="text-3xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Vegetation
        </h2>

        <div className="text-2xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
            In this module, you will learn how:
            <ul className="list-disc list-inside mt-4">
                <li className="text-xl">The western red ceder can grow taller than a 20 story building,</li>
                <li className="text-xl">Moss helps to keep the rainforest damp,</li>
                <li className="text-xl">Rotting fallen trees help create new soil,</li>
                <li className="text-xl">Old growth forests are hundreds of years old.</li>
            </ul>
        </div>
        <button
          onClick={handleContinue}
          className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded shadow mt-2 mb-2"
        >
          Continue
        </button>
      </div>
    </main>
  )
}