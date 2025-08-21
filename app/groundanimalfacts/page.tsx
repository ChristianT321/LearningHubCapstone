'use client'

import { useRouter } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

export default function GroundAnimalFactsPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  const slidesBlackBear = [
    {
      image: '/blackbear.jpg',
      alt: 'Black Bear Standing',
      desc: 'Black bears are excellent climbers and often scale trees to escape danger or find food.',
    },
    {
      image: '/bear_curled_up_in_den.jpg',
      alt: 'Bear in Den',
      desc: 'They have an incredible sense of smell, about 7 times better than a bloodhound.',
    },
    {
      image: '/beareating.jpg',
      alt: 'Bear Eating',
      desc: 'Mother black bears are fiercely protective of their cubs.',
    },
  ]

  const slidesSpiritBear = [
    {
      image: '/Spirit Bear Spring.avif',
      alt: 'Spirit Bear Spring',
      desc: 'The Spirit Bear is not an albino - it has white fur due to a recessive gene.',
    },
    {
      image: '/Spirit Bear Summer.avif',
      alt: 'Spirit Bear Summer',
      desc: 'Spirit Bears are particularly skilled fishers, often catching salmon more successfully.',
    },
    {
      image: '/Spirit Bear Fall.jpg',
      alt: 'Spirit Bear Fall',
      desc: 'These bears hold deep cultural significance for Indigenous peoples.',
    },
  ]

  const slidesGrizzlyBear = [
    {
      image: '/Grizzly Bear Spring.jpg',
      alt: 'Grizzly Bear Spring',
      desc: 'Grizzlies have a distinctive shoulder hump made of muscle.',
    },
    {
      image: '/Grizzly Bear Summer.jpg',
      alt: 'Grizzly Bear Summer',
      desc: 'They can run up to 35 mph for short distances, despite their massive size.',
    },
    {
      image: '/Grizzly Bear Fall.jpg',
      alt: 'Grizzly Bear Fall',
      desc: 'Grizzlies communicate through scent marking and clawing trees.',
    },
  ]

  const slidesSeaWolf = [
    {
      image: '/sea wolf swimming.avif',
      alt: 'Sea Wolf Swimming',
      desc: 'Vancouver Island wolves are excellent swimmers.',
    },
    {
      image: '/sea wolf fall.jpg',
      alt: 'Sea Wolf in Fall',
      desc: 'They have a unique diet consisting of about 90% marine-based food.',
    },
    {
      image: '/sea wolf puppy.jpg',
      alt: 'Sea Wolf Puppy',
      desc: 'These wolves have adapted behaviors not seen in inland populations.',
    },
  ]

  const slidesCougar = [
    {
      image: '/Couger Spring.webp',
      alt: 'Cougar in Spring',
      desc: 'Cougars are ambush predators, capable of leaping great distances.',
    },
    {
      image: '/Cougar Summer.avif',
      alt: 'Cougar in Summer',
      desc: 'They are solitary animals with large territories.',
    },
    {
      image: '/Cougar Fall.webp',
      alt: 'Cougar in Fall',
      desc: 'Cougar cubs are born with spots that help them camouflage.',
    },
  ]

  const slidesWolverine = [
    {
      image: '/Wolverine Spring.webp',
      alt: 'Wolverine in Spring',
      desc: 'Wolverines have snowshoe-like feet for traveling across deep snow.',
    },
    {
      image: '/Wolverine Summer.jpg',
      alt: 'Wolverine in Summer',
      desc: 'They have incredibly strong jaws capable of crushing frozen meat.',
    },
    {
      image: '/Wolverine Fall 2.png',
      alt: 'Wolverine in Fall',
      desc: 'Despite their stocky build, wolverines are excellent climbers.',
    },
  ]

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      {/* Background Image */}
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

      <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-5xl px-4 py-8">
        <motion.h1 
          className="text-5xl font-extrabold text-white drop-shadow-[3px_3px_0px_black] mt-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ground Animal Facts
        </motion.h1>

        {/* Bears Section */}
        <motion.div 
          className="w-full rounded-xl p-6"
          style={{
            border: '3px solid transparent',
            borderRadius: '16px',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #f59e0b, #d97706, #b45309)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-amber-900 bg-opacity-70 p-4 rounded-[12px]">
            <h2 className="text-4xl font-semibold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Bears of the Great Bear Rainforest
            </h2>

            {/* Stepper Navigation */}
            <div className="flex justify-center gap-4 mb-6">
              <motion.button
                onClick={() => setStep(0)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-bold ${step === 0 ? 'bg-yellow-600 text-white' : 'bg-amber-800 text-white'}`}
              >
                Black Bear
              </motion.button>
              <motion.button
                onClick={() => setStep(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-bold ${step === 1 ? 'bg-yellow-600 text-white' : 'bg-amber-800 text-white'}`}
              >
                Spirit Bear
              </motion.button>
              <motion.button
                onClick={() => setStep(2)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-bold ${step === 2 ? 'bg-yellow-600 text-white' : 'bg-amber-800 text-white'}`}
              >
                Grizzly Bear
              </motion.button>
            </div>

            {/* Bear Info */}
            <div className="bg-amber-800 rounded-lg p-6 shadow-md mb-6">
              {step === 0 ? (
                <>
                  <h3 className="text-3xl font-bold text-white mb-4">Black Bear</h3>
                  <p className="text-white text-lg">
                    Black bears are the most common bear in North America. They are highly adaptable omnivores with an excellent sense of smell.
                    Despite their name, black bears can be various colors including brown, cinnamon, and even white (like the Spirit Bear).
                  </p>
                </>
              ) : step === 1 ? (
                <>
                  <h3 className="text-3xl font-bold text-white mb-4">Spirit Bear</h3>
                  <p className="text-white text-lg">
                    The Spirit Bear (Kermode bear) is a rare white variant of the black bear found only in the Great Bear Rainforest.
                    Their white coat provides camouflage when fishing against cloudy skies.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-white mb-4">Grizzly Bear</h3>
                  <p className="text-white text-lg">
                    Grizzly bears are larger and more aggressive than black bears, identifiable by their shoulder hump.
                    They play a crucial role in nutrient distribution by carrying salmon into the forest.
                  </p>
                </>
              )}
            </div>

            {/* Carousel */}
            <div className="w-full rounded-lg overflow-hidden bg-amber-800 bg-opacity-80 p-4 relative">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={5000}
                className="rounded-lg"
                renderIndicator={(onClickHandler, isSelected, index, label) => (
                  <li
                    className={`inline-block mx-1.5 ${isSelected ? 'opacity-100' : 'opacity-50'}`}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    value={index}
                    key={index}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: isSelected ? 'linear-gradient(to right, #f59e0b, #d97706)' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  />
                )}
              >
                {(step === 0 ? slidesBlackBear : step === 1 ? slidesSpiritBear : slidesGrizzlyBear).map(
                  (slide, idx) => (
                    <div key={idx} className="relative">
                      <div className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] relative">
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <p className="text-white text-lg font-semibold absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-700 to-green-800 bg-opacity-80 py-2 px-4 rounded-b-md">
                        {slide.desc}
                      </p>
                    </div>
                  )
                )}
              </Carousel>
            </div>

            {/* Comparison Section */}
            <div className="bg-amber-950 rounded-xl p-6 w-full mt-10">
              <h3 className="text-3xl font-bold text-white mb-6">Comparing the Bears</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-amber-800 bg-opacity-80 rounded-lg p-6 shadow-md">
                  <h4 className="text-2xl font-bold text-white mb-4">Black Bear</h4>
                  <ul className="text-white text-left space-y-2">
                    <li>• Weight: 90-270 kg (200-600 lbs)</li>
                    <li>• Height: 1.5-1.8 m (5-6 ft) when standing</li>
                    <li>• Diet: Omnivorous (80% plants, 20% meat)</li>
                    <li>• Claws: Short, curved for climbing</li>
                  </ul>
                </div>
                <div className="bg-amber-800 bg-opacity-80 rounded-lg p-6 shadow-md">
                  <h4 className="text-2xl font-bold text-white mb-4">Spirit Bear</h4>
                  <ul className="text-white text-left space-y-2">
                    <li>• Weight: Similar to black bears</li>
                    <li>• Height: Same as black bears</li>
                    <li>• Diet: More fish-focused than black bears</li>
                    <li>• Unique: White coat from recessive gene</li>
                  </ul>
                </div>
                <div className="bg-amber-800 bg-opacity-80 rounded-lg p-6 shadow-md">
                  <h4 className="text-2xl font-bold text-white mb-4">Grizzly Bear</h4>
                  <ul className="text-white text-left space-y-2">
                    <li>• Weight: 180-360 kg (400-800 lbs)</li>
                    <li>• Height: Up to 2.4 m (8 ft) when standing</li>
                    <li>• Diet: More carnivorous than black bears</li>
                    <li>• Claws: Long, straight for digging</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Carnivores Section */}
        <motion.div 
          className="w-full rounded-xl p-6 mt-8"
          style={{
            border: '3px solid transparent',
            borderRadius: '16px',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #f59e0b, #d97706, #b45309)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-amber-900 bg-opacity-70 p-4 rounded-[12px]">
            <h2 className="text-4xl font-bold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Other Carnivores of the Rainforest
            </h2>

            {/* Stepper Navigation */}
            <div className="flex justify-center gap-4 mb-6">
              <motion.button
                onClick={() => setStep(0)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-bold ${step === 0 ? 'bg-yellow-600 text-white' : 'bg-amber-800 text-white'}`}
              >
                Sea Wolf
              </motion.button>
              <motion.button
                onClick={() => setStep(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-bold ${step === 1 ? 'bg-yellow-600 text-white' : 'bg-amber-800 text-white'}`}
              >
                Cougar
              </motion.button>
              <motion.button
                onClick={() => setStep(2)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-bold ${step === 2 ? 'bg-yellow-600 text-white' : 'bg-amber-800 text-white'}`}
              >
                Wolverine
              </motion.button>
            </div>

            {/* Carnivore Info */}
            <div className="bg-amber-800 rounded-lg p-6 shadow-md mb-6">
              {step === 0 ? (
                <>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Vancouver Coastal Sea Wolves
                  </h3>
                  <p className="text-white text-lg">
                    The Vancouver Island wolf is a unique subspecies of gray wolf adapted to coastal life.
                    Unlike inland wolves, these wolves swim between islands and have a diet that&apos;s 90% marine-based.
                  </p>
                </>
              ) : step === 1 ? (
                <>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Cougar
                  </h3>
                  <p className="text-white text-lg">
                    Cougars (also called mountain lions or pumas) are the largest cats in Canada.
                    They are solitary, territorial predators that primarily hunt deer.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-white text-2xl font-bold mb-2">
                    Wolverine
                  </h3>
                  <p className="text-white text-lg">
                    Wolverines are the largest land-dwelling members of the weasel family.
                    Despite their relatively small size, they are incredibly strong and fearless.
                  </p>
                </>
              )}
            </div>

            {/* Carousel */}
            <div className="w-full rounded-lg overflow-hidden bg-amber-800 bg-opacity-80 p-4 relative">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={5000}
                className="rounded-lg"
                renderIndicator={(onClickHandler, isSelected, index, label) => (
                  <li
                    className={`inline-block mx-1.5 ${isSelected ? 'opacity-100' : 'opacity-50'}`}
                    onClick={onClickHandler}
                    onKeyDown={onClickHandler}
                    value={index}
                    key={index}
                    role="button"
                    tabIndex={0}
                    aria-label={`${label} ${index + 1}`}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: isSelected ? 'linear-gradient(to right, #f59e0b, #d97706)' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  />
                )}
              >
                {(step === 0 ? slidesSeaWolf : step === 1 ? slidesCougar : slidesWolverine).map(
                  (slide, idx) => (
                    <div key={idx} className="relative">
                      <div className="w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] relative">
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <p className="text-white text-lg font-semibold absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-700 to-green-800 bg-opacity-80 py-2 px-4 rounded-b-md">
                        {slide.desc}
                      </p>
                    </div>
                  )
                )}
              </Carousel>
            </div>

            {/* Comparison Section */}
            <div className="bg-amber-950 rounded-xl p-6 w-full mt-10">
              <h3 className="text-3xl font-bold text-white mb-6">Comparing the Carnivores</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-amber-800 bg-opacity-80 rounded-lg p-6 shadow-md">
                  <h4 className="text-2xl font-bold text-white mb-4">Sea Wolf</h4>
                  <ul className="text-white text-left space-y-2">
                    <li>• Weight: 25-40 kg (55-88 lbs)</li>
                    <li>• Diet: 90% marine (fish, seals, shellfish)</li>
                    <li>• Unique: Excellent swimmers</li>
                    <li>• Social: Lives in packs</li>
                  </ul>
                </div>
                <div className="bg-amber-800 bg-opacity-80 rounded-lg p-6 shadow-md">
                  <h4 className="text-2xl font-bold text-white mb-4">Cougar</h4>
                  <ul className="text-white text-left space-y-2">
                    <li>• Weight: 50-100 kg (110-220 lbs)</li>
                    <li>• Diet: Primarily deer</li>
                    <li>• Unique: Largest cat in Canada</li>
                    <li>• Social: Solitary</li>
                  </ul>
                </div>
                <div className="bg-amber-800 bg-opacity-80 rounded-lg p-6 shadow-md">
                  <h4 className="text-2xl font-bold text-white mb-4">Wolverine</h4>
                  <ul className="text-white text-left space-y-2">
                    <li>• Weight: 9-25 kg (20-55 lbs)</li>
                    <li>• Diet: Scavenger and hunter</li>
                    <li>• Unique: Incredibly strong for size</li>
                    <li>• Social: Solitary</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start Matching Game Button */}
        <motion.button
          onClick={() => router.push('/matching1')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white font-bold px-6 py-3 mt-8"
          style={{
            borderRadius: '12px',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), linear-gradient(to right, #f59e0b, #d97706, #b45309)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <span className="relative z-10">Start the Matching Game</span>
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 hover:opacity-20"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </main>
  )
}