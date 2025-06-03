// This page was made by referencing slides and examples given in web dev 2, while primarily basing it off of my final project in the same class. Copilot helped fill out some details.
'use client'

import { Button, Menu } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/birdfacts')
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">

      <div className="fixed inset-0 z-0">
        <Image
          src="/sky background.png"
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

    <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-3xl px-4"> 
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-25 mb-2">
          MODULE 3:
        </h1>
        <h2 className="text-3xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
          Flying animals
        </h2>

        <p className="text-2xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-2">
            In this module, you will learn how; <br /> <br />
            <li className="text-xl">Bald eagles dive into the water to catch fish,</li>
            <li className="text-xl">Great horned owls hunt at night using silent wings and sharp hearing, </li>
            <li className="text-xl">Rufous hummingbirds migrate thousands of miles every summer,</li>
            <li className="text-xl">Ravens are smart and steal food from other animals.</li>
        </p>
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