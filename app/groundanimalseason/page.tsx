'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function GroundAnimalSeasonPage() {
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem('currentUser')
    router.push('/')
  }

  const handleContinue = () => {
    router.push('/groundanimalfacts')
  }

  const slides = [
    {
      image: '/01_Schwarzbär.jpg',
      alt: 'Black Bear Standing',
      desc: 'As the seasons change, black bears prepare for winter by foraging and building fat reserves.'
    },
    {
      image: '/bear_curled_up_in_den.jpg',
      alt: 'Bear in Den',
      desc: 'During colder months, bears enter dens to hibernate, conserving energy while the forest sleeps.'
    },
    {
      image: '/beareating.jpg',
      alt: 'Bear Eating',
      desc: 'With spring’s arrival, bears emerge from dens, hungry and ready to feast on roots, berries, and fish.'
    },
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

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-5xl px-4 py-8">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-10 mb-4">
          Seasonal Changes for Ground Animals
        </h1>

        <div className="w-full rounded-lg overflow-hidden shadow-lg bg-amber-800 bg-opacity-80 p-4 z-30">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            interval={5000}
            className="rounded"
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="relative">
                <div className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] relative">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <p className="text-white text-lg font-semibold text-center bg-amber-950 bg-opacity-70 py-3 px-4 mt-2 rounded">
                  {slide.desc}
                </p>
              </div>
            ))}
          </Carousel>
        </div>

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
