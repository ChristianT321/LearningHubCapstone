'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const fishData = [
  {
    name: 'Salmon',
    image: '/Salmon.png',
    fact: `Salmon are truly incredible fish known for their long-distance upstream migrations. 
They are born in freshwater, travel to the ocean to mature, and return—often hundreds of miles—
to the exact spot where they were born to spawn. Their journey includes leaping up waterfalls 
and navigating dangerous predators, all guided by an amazing internal navigation system.`,
  },
  {
    name: 'Whitefish',
    image: '/Whitefish.png',
    fact: `Whitefish are native to cold, deep freshwater lakes and are bottom dwellers, 
feeding mostly on small invertebrates and plankton. They're an important part of the food chain 
and are prized by both commercial and recreational fishers. Their silvery, torpedo-shaped bodies 
help them glide gracefully near the lakebed, making them efficient and stealthy hunters.`,
  },
  {
    name: 'Lake Trout',
    image: '/Lake Trout.png',
    fact: `Lake trout are deep-water fish that thrive in large, cold lakes across North America. 
They can live for several decades—some recorded to be over 40 years old—and can grow to 
astonishing sizes. Lake trout are ambush predators and have a voracious appetite, 
feeding on smaller fish like ciscoes and even other trout.`,
  },
]

export default function FishFactsPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start text-center p-6 relative">
      <div className="fixed inset-0 z-0">
        <Image
          src="/FIsh background.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="z-10 w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-10">Learn About the Fish</h1>

        {fishData.map((fish) => (
          <div key={fish.name} className="mb-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-4">{fish.name}</h2>
            <Image
              src={fish.image}
              alt={fish.name}
              width={320}
              height={320}
              className="rounded-xl shadow-lg mb-6 object-contain"
            />
            <p className="text-lg text-gray-800 leading-relaxed px-2 text-left max-w-xl">
              {fish.fact}
            </p>
          </div>
        ))}
        <button
          onClick={() => router.push('/gofish')}
          className=" bg-blue-700 hover:bg-blue-950 text-gray-100 50 font-semibold px-6 py-3 rounded-xl shadow transition-colors duration-300 ease-in-out"
        >
          Play Go Fish
        </button>
      </div>
    </main>
  )
}
