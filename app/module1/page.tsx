'use client'

import { Button, Menu } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  const handleContinue = () => {
    router.push('/groundanimalseason')
  }

  const facts = [
    "Beavers are excellent builders and create dams that shape ecosystems.",
    "Vancouver Wolves are key predators maintaining forest health.",
    "Spirit Bears are a rare subspecies of black bears with white fur.",
  ]

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

      <div className="absolute top-4 right-4 z-20">
        <Menu
          shadow="md"
          width={200}
          openDelay={100}
          closeDelay={150}
          withinPortal={false}
          styles={{ item: { color: 'black' } }}
        >
          <Menu.Target>
            <Button variant="filled" className="text-black">Menu</Button>
          </Menu.Target>

          <Menu.Dropdown style={{ display: 'flex', flexDirection: 'column', zIndex: 50 }}>
            <Menu.Item onClick={() => router.push('/home')}>Home</Menu.Item>
            <Menu.Item onClick={() => router.push('/module1')}>Module 1</Menu.Item>
            <Menu.Item onClick={() => router.push('/module2')}>Module 2</Menu.Item>
            <Menu.Item onClick={() => router.push('/module3')}>Module 3</Menu.Item>
            <Menu.Item onClick={() => router.push('/module4')}>Module 4</Menu.Item>
            <Menu.Divider />
          </Menu.Dropdown>
        </Menu>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-6xl px-4">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-18 mb-2">
          MODULE 1:
        </h1>
        <h2 className="text-4xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mb-2">
          GROUND ANIMALS
        </h2>
        <p className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Today we will be learning about how:
        </p>

        <ul className="space-y-8">
          {facts.map((fact, index) => (
            <li
              key={index}
              className=""
            >
              <span className="text-green-300 text-2xl drop-shadow">🌿</span>
              <span className="text-white text-base sm:text-lg font-semibold drop-shadow-[2px_2px_0px_black]">
                {fact}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSignOut}
          className="fixed left-5 bottom-5 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded shadow"
        >
          Sign Out
        </button>

        <button
          onClick={handleContinue}
          className="bg-amber-800 hover:bg-amber-900 text-white font-bold px-6 py-3 rounded shadow mt-5"
        >
          Continue
        </button>
      </div>
    </main>
  )
}
