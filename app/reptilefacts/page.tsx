'use client'

import { useRouter } from 'next/navigation'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

type Slide = { image: string; alt: string; desc: string }
type Species = {
  key: string
  name: string
  intro: string
  slides: Slide[]
  facts: string[]
}

export default function ReptilesAmphibiansSplitPage() {
  const router = useRouter()

  // ---------- DATA ----------
  const frogsToads: Species[] = [
    {
      key: 'pacific_treefrog',
      name: 'Pacific Treefrog',
      intro:
        "The classic West Coast 'ribbit'! Tiny, adaptable, and common around ponds, ditches, and wet edges of forests.",
      slides: [
        { image: '/pacific_treefrog_1.jpg', alt: 'Pacific Treefrog on reed', desc: 'Sticky toe pads help it climb reeds and shrubs.' },
        { image: '/pacific_treefrog_2.jpg', alt: 'Close-up eye stripe', desc: 'Dark eye-stripe and variable colour from green to brown.' },
      ],
      facts: [
        'Breeds in spring; eggs in small clusters on vegetation.',
        'Eats tiny insects, spiders, and flies.',
        'Very tolerant of human-made wetlands.',
      ],
    },
    {
      key: 'western_toad',
      name: 'Western Toad',
      intro:
        'A sturdy walker more than a hopper. Migrates to shallow lakes/ponds to breed in spring.',
      slides: [
        { image: '/western_toad_1.jpg', alt: 'Western Toad', desc: 'Warty skin; light dorsal stripe is common.' },
        { image: '/western_toad_2.webp', alt: 'Toad at pond', desc: 'Eggs in long gelatinous strings along the shore.' },
      ],
      facts: [
        'Tadpoles often school in dense black swarms.',
        'Special Concern in many regions; watch for road crossings.',
        'Eats ants, beetles, and other ground insects.',
      ],
    },
    {
      key: 'red_legged_frog',
      name: 'Northern Red-legged Frog',
      intro:
        'A shy forest frog of cool, shaded wetlands with a reddish wash on the hind legs.',
      slides: [
        { image: '/red_legged_1.jpg', alt: 'Red-legged Frog', desc: 'Needs intact riparian forest and clean water.' },
        { image: '/red_legged_2.jpg', alt: 'Red-legged Frog (second view)', desc: 'Reddish coloration visible on hind legs.' },
      ],
      facts: [
        'Breeds early; large jelly masses attached to sticks.',
        'Sensitive to habitat fragmentation and warming ponds.',
        'Listed as Special Concern regionally.',
      ],
    },
  ]

  const salamandersNewts: Species[] = [
    {
      key: 'rough_skinned_newt',
      name: 'Rough-skinned Newt',
      intro:
        'Dark, rough skin with a bright orange belly. Toxic skin deters predators—look, don’t handle.',
      slides: [
        { image: '/rough_newt_1.jpg', alt: 'Rough-skinned Newt', desc: 'Often near ponds and slow, shaded streams.' },
        { image: '/rough_newt_2.jpg', alt: 'Warning belly', desc: 'Orange underside is a warning (aposematic) colour.' },
      ],
      facts: [
        'Contains tetrodotoxin—keep pets away.',
        'Aquatic breeding phase; terrestrial the rest of the year.',
        'Eats aquatic invertebrates and eggs.',
      ],
    },
    {
      key: 'wandering_salamander',
      name: 'Wandering Salamander',
      intro:
        'A nimble, climbing salamander using moist logs and even canopy microhabitats; active on rainy nights.',
      slides: [
        { image: '/wandering_1.jpg', alt: 'Wandering Salamander', desc: 'Prefers cool, damp old wood and mossy bark.' },
        { image: '/wandering_2.jpg', alt: 'Wandering Salamander (second view)', desc: 'Often active along mossy logs at night.' },
      ],
      facts: [
        'Lungless—breathes through skin and mouth lining.',
        'No larval stage; direct development in eggs.',
        'Sensitive to drying of coarse woody debris.',
      ],
    },
    {
      key: 'northwestern_salamander',
      name: 'Northwestern Salamander',
      intro:
        'A larger mole salamander using forest ponds and marshy edges; larvae can overwinter.',
      slides: [
        { image: '/northwestern_1.jpg', alt: 'Northwestern Salamander', desc: 'Egg masses in jelly, wrapped around sticks.' },
        { image: '/northwester_2.jpg', alt: 'Northwestern Salamander (second view)', desc: 'Often hides beneath logs near wetlands.' },
      ],
      facts: [
        'Adults hide under logs and leaf litter.',
        'Important predator of aquatic insects (larval stage).',
        'Needs semi-permanent waterbodies to breed.',
      ],
    },
    {
      key: 'ensatina',
      name: 'Ensatina',
      intro:
        'Small woodland salamander with a pinch at the tail base; common under logs in moist forests.',
      slides: [
        { image: '/ensatina.jpg', alt: 'Ensatina', desc: 'Young hatch as miniature adults (no larval stage).' },
        { image: '/ensatina_2.jpg', alt: 'Ensatina (second view)', desc: 'Constricted tail base (“waist”) is a key ID feature.' },
      ],
      facts: [
        'Active on wet nights; rests under cover by day.',
        'Eats small invertebrates in leaf litter.',
        'Depends on coarse woody debris for nesting/cover.',
      ],
    },
  ]

  const reptiles: Species[] = [
    {
      key: 'northwestern_alligator_lizard',
      name: 'Northwestern Alligator Lizard',
      intro:
        'Cool-tolerant forest lizard of rocky edges and sunny openings; can drop its tail to escape.',
      slides: [
        { image: '/nw_lizard.jpg', alt: 'Alligator lizard', desc: 'Basks in brief sun pockets inside the forest.' },
        { image: '/nw_lizard2.jpg', alt: 'Alligator lizard close-up', desc: 'Banded look; strong jaws for insects and spiders.' },
      ],
      facts: [
        'Eats spiders, beetles, and small invertebrates.',
        'Tail autotomy; regrowth takes energy.',
        'Shelters in rock piles, stumps, and logs.',
      ],
    },
    {
      key: 'northwestern_gartersnake',
      name: 'Northwestern Gartersnake',
      intro:
        'Small, variable gartersnake of meadows, edges, and streambanks; harmless to people.',
      slides: [
        { image: '/nw_gartersnake.jpg', alt: 'Gartersnake', desc: 'Often seen after rain or basking on warm paths.' },
        { image: '/nw_gartersnake_2.jpg', alt: 'Gartersnake (second view)', desc: 'Striped pattern varies by individual and region.' },
      ],
      facts: [
        'Eats slugs, worms, amphibians, and small fish.',
        'Gives birth to live young in late summer.',
        'Uses rock cracks, roots, and logs for cover.',
      ],
    },
    {
      key: 'western_skink',
      name: 'Western Skink',
      intro:
        'Sleek, quick lizard of sunny, rocky clearings; less common in dense shade.',
      slides: [
        { image: '/skink.jpg', alt: 'Western Skink', desc: 'Juveniles often have bright blue tails.' },
        { image: '/skink_2.jpg', alt: 'Western Skink (second view)', desc: 'Active on warm days near flat rocks and boards.' },
      ],
      facts: [
        'Feeds on small insects and spiders.',
        'Thermoregulates in sun-exposed microhabitats.',
        'Hides beneath flat rocks and boards.',
      ],
    },
  ]

  // ---------- STATE (one stepper per container) ----------
  const [frogIndex, setFrogIndex] = useState(0)
  const [salamanderIndex, setSalamanderIndex] = useState(0)
  const [reptileIndex, setReptileIndex] = useState(0)

  // shared indicator
  const renderDot = (onClick: any, selected: boolean, i: number, label: string) => (
    <li
      key={i}
      role="button"
      tabIndex={0}
      aria-label={`${label} ${i + 1}`}
      onClick={onClick}
      onKeyDown={onClick}
      className={`inline-block mx-1.5 ${selected ? 'opacity-100' : 'opacity-50'}`}
      style={{
        width: 12, height: 12, borderRadius: '50%',
        background: selected ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
        transition: 'all .3s', cursor: 'pointer'
      }}
    />
  )

  // reusable section
  function Section({
    title,
    gradient,
    data,
    index,
    setIndex,
  }: {
    title: string
    gradient: string
    data: Species[]
    index: number
    setIndex: (i: number) => void
  }) {
    const species = data[index]

    return (
      <motion.div
        className="w-full rounded-xl p-6"
        style={{
          border: '3px solid transparent',
          borderRadius: '16px',
          backgroundImage: `linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), ${gradient}`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          boxShadow: '0 8px 20px rgba(0,0,0,.3)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .3 }}
      >
        <div className="bg-black/60 p-4 rounded-[12px]">
          <h2 className="text-4xl font-bold text-white drop-shadow-[2px_2px_0px_black] mb-6">
            {title}
          </h2>

          {/* species stepper */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {data.map((sp, i) => {
              const selected = i === index
              return (
                <motion.button
                  key={sp.key}
                  onClick={() => setIndex(i)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-bold text-white ${
                    selected ? 'bg-white/20' : 'bg-white/10'
                  }`}
                >
                  {sp.name}
                </motion.button>
              )
            })}
          </div>

          {/* big intro */}
          <div className="bg-white/10 rounded-lg p-6 shadow-md mb-6">
            <h3 className="text-3xl font-bold text-white mb-3">
              {species.name}
            </h3>
            <p className="text-white text-lg">{species.intro}</p>
          </div>

          {/* carousel */}
          <div className="w-full rounded-lg overflow-hidden bg-white/10 p-4 relative">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={5200}
              className="rounded-lg"
              renderIndicator={renderDot}
            >
              {species.slides.map((slide, idx) => (
                <div key={idx} className="relative">
                  <div className="w-full h-[380px] sm:h-[480px] md:h-[540px] lg:h-[600px] relative">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-white text-lg font-semibold absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black/70 to-black/60 py-2 px-4 rounded-b-md">
                    {slide.desc}
                  </p>
                </div>
              ))}
            </Carousel>
          </div>

          {/* mini fact cards */}
          <div className="bg-black/60 rounded-xl p-6 w-full mt-8">
            <h4 className="text-2xl font-bold text-white mb-4">Quick Facts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {species.facts.map((fact, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-4 text-left text-white shadow-md">
                  <div className="text-sm leading-relaxed">{fact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      {/* background */}
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
          Reptiles & Amphibians of the Great Bear Rainforest
        </motion.h1>

        {/* 1) Frogs & Toads */}
        <Section
          title="Frogs & Toads"
          gradient="linear-gradient(to right, #10b981, #059669, #047857)"
          data={frogsToads}
          index={frogIndex}
          setIndex={setFrogIndex}
        />

        {/* 2) Salamanders & Newts */}
        <Section
          title="Salamanders & Newts"
          gradient="linear-gradient(to right, #3b82f6, #2563eb, #1d4ed8)"
          data={salamandersNewts}
          index={salamanderIndex}
          setIndex={setSalamanderIndex}
        />

        {/* 3) Reptiles */}
        <Section
          title="Reptiles"
          gradient="linear-gradient(to right, #f59e0b, #d97706, #b45309)"
          data={reptiles}
          index={reptileIndex}
          setIndex={setReptileIndex}
        />

        {/* ===== HABITAT & MICROHABITAT COMPARISON ===== */}
        <motion.div
          className="w-full rounded-xl p-6"
          style={{
            border: '3px solid transparent',
            borderRadius: '16px',
            backgroundImage:
              'linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), linear-gradient(to right, #10b981, #2563eb, #f59e0b)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 8px 20px rgba(0,0,0,.3)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .35 }}
        >
          <div className="bg-black/60 p-4 rounded-[12px]">
            <h2 className="text-4xl font-bold text-white drop-shadow-[2px_2px_0px_black] mb-6">
              Habitat & Microhabitat Comparison
            </h2>

            {/* Ponds & Wetlands */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <Image src="/ponds.webp" alt="Ponds & wetlands" fill className="object-cover" />
              </div>
              <div className="bg-white/10 rounded-lg p-6 shadow-md flex items-center text-left">
                <div className="text-white text-lg">
                  <h3 className="text-2xl font-bold mb-2">Ponds & Wetlands</h3>
                  <p>
                    Calm, shallow water with plants is perfect for eggs and tadpoles.{' '}
                    <span className="font-semibold">Pacific Treefrogs</span> and{' '}
                    <span className="font-semibold">Western Toads</span> breed here. Look for egg clusters
                    on stems (frogs) and long strings (toads). Edges with grasses and reeds are frog hotspots.
                  </p>
                </div>
              </div>
            </div>

            {/* Fast, Shaded Streams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 rounded-lg p-6 shadow-md flex items-center text-left order-2 md:order-1">
                <div className="text-white text-lg">
                  <h3 className="text-2xl font-bold mb-2">Fast, Shaded Streams</h3>
                  <p>
                    Cold, oxygen-rich water under big trees is key for stream specialists.{' '}
                    <span className="font-semibold">Coastal Tailed Frogs*</span> (if present) and{' '}
                    <span className="font-semibold">Rough-skinned Newts</span> use clean, flowing water.
                    Watch your step on slick rocks—look, don’t lift rock homes.
                  </p>
                </div>
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                <Image src="/stream.jpg" alt="Fast shaded stream" fill className="object-cover" />
              </div>
            </div>

            {/* Forest Floor & Fallen Logs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <Image src="/forest_floor.jpg" alt="Forest floor and logs" fill className="object-cover" />
              </div>
              <div className="bg-white/10 rounded-lg p-6 shadow-md flex items-center text-left">
                <div className="text-white text-lg">
                  <h3 className="text-2xl font-bold mb-2">Forest Floor & Fallen Logs</h3>
                  <p>
                    Moist leaf litter and rotting wood are salamander cities.{' '}
                    <span className="font-semibold">Ensatina</span>,{' '}
                    <span className="font-semibold">Wandering Salamanders</span>, and{' '}
                    <span className="font-semibold">Northwestern Salamanders</span> hide here by day.
                    If you gently lift a log, always return it exactly as found.
                  </p>
                </div>
              </div>
            </div>

            {/* Sunny Openings & Rocky Edges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-6 shadow-md flex items-center text-left order-2 md:order-1">
                <div className="text-white text-lg">
                  <h3 className="text-2xl font-bold mb-2">Sunny Openings & Rocky Edges</h3>
                  <p>
                    Reptiles need warmth! Small sun patches in the rainforest help{' '}
                    <span className="font-semibold">Northwestern Alligator Lizards</span>,{' '}
                    <span className="font-semibold">Western Skinks</span>, and{' '}
                    <span className="font-semibold">Gartersnakes</span> warm up. Look near rock piles,
                    log edges, and trail borders on bright days.
                  </p>
                </div>
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                <Image src="/sunny.jpg" alt="Sunny rocky opening" fill className="object-cover" />
              </div>
            </div>

            {/* footer tip row */}
            <div className="bg-black/50 rounded-lg p-5 mt-8 text-left">
              <h4 className="text-xl font-bold text-white mb-2">Field Tips</h4>
              <ul className="list-disc list-inside text-white/90 space-y-1">
                <li>Best times: warm afternoons for reptiles; rainy evenings for salamanders & frogs.</li>
                <li>Hands off: amphibian skin is delicate—observe, photograph, and let them be.</li>
                <li>Replace cover objects (logs/rocks) exactly as found to protect microhabitats.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* continue */}
        <motion.button
          onClick={() => router.push('/test6')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-white font-bold px-6 py-3 mt-2"
          style={{
            borderRadius: '12px',
            border: '2px solid transparent',
            backgroundImage:
              'linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), linear-gradient(to right, #10b981, #3b82f6, #f59e0b)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 4px 10px rgba(0,0,0,.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span className="relative z-10">Continue Learning</span>
          <motion.span
            className="absolute inset-0 bg-white opacity-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.15 }}
            transition={{ duration: 0.25 }}
          />
        </motion.button>
      </div>
    </main>
  )
}
