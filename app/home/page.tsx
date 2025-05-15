'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, Button } from '@mantine/core'

export default function HomePage() {
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  const handleContinue = () => {
    router.push('/module1')
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">

      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/GBR home back.png"
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
          styles={{
            item: {
              color: 'black', 
          },
          }}
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

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl px-4 py-9">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-25 mb-2">
          Welcome to the Great Bear Rainforest Learning Hub!
        </h1>
        <h2 className="text-3xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Your number one source for learning about the Great Bear Rainforest!
        </h2>

        <p className="text-xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Get ready to explore one of the coolest places on Earth! This website is made just for kids like you to learn all about the animals, trees, people, and secrets of the Great Bear Rainforest. 
          You’ll play fun games, take quizzes, earn badges, and unlock new levels as you learn. Start your adventure and see how much you can discover!
        </p>

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