'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// ---------- Types ----------
type QA = { question: string; choices: string[]; answer: string }
type SectionKey = 'ground' | 'water' | 'birds' | 'trees'
type QAMeta = QA & { section: SectionKey }
type Deck = { order: number[]; cursor: number }
type DeckMap = Record<SectionKey, Deck>

// ---------- Helpers ----------
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeDeck(size: number): Deck {
  return { order: shuffleArray([...Array(size).keys()]), cursor: 0 }
}

// Draw `n` from the deck, preferring unused; reshuffle only when exhausted.
function drawFromDeck(deck: Deck, poolSize: number, n: number): { picked: number[]; deck: Deck } {
  let { order, cursor } = deck
  const picked: number[] = []

  while (picked.length < n) {
    if (cursor >= order.length) {
      order = shuffleArray([...Array(poolSize).keys()])
      cursor = 0
    }
    const take = Math.min(n - picked.length, order.length - cursor)
    picked.push(...order.slice(cursor, cursor + take))
    cursor += take
  }
  return { picked, deck: { order, cursor } }
}

// ---------- Question Pools ----------
const ground: QA[] = [
  { question: 'What do black bears do in preparation for winter?', choices: ['Shed all their fur', 'Sleep extra hours', 'Forage and build fat reserves', 'Migrate south'], answer: 'Forage and build fat reserves' },
  { question: 'When do black bears typically emerge from their dens?', choices: ['Late fall', 'Spring', 'Summer', 'Winter'], answer: 'Spring' },
  { question: 'Why do black bears spend time near rivers?', choices: ['To drink water', 'To catch salmon and spread nutrients', 'To swim for fun', 'To build nests'], answer: 'To catch salmon and spread nutrients' },
  { question: 'What is special about sea wolves’ diet?', choices: ['Only eat deer', '90% marine-based food', 'Eat only berries', 'Mostly insects'], answer: '90% marine-based food' },
  { question: 'What do sea wolves do in summer?', choices: ['Hibernate in caves', 'Swim between islands to find food', 'Follow bears', 'Raise cubs'], answer: 'Swim between islands to find food' },
  { question: 'When are sea wolf pups born?', choices: ['Winter', 'Spring', 'Fall', 'Summer'], answer: 'Spring' },
  { question: 'Where do cougar cubs stay in spring?', choices: ['In trees', 'Hidden in dens or rocky areas', 'At riverbanks', 'With the pack'], answer: 'Hidden in dens or rocky areas' },
  { question: 'Do cougars hibernate?', choices: ['Yes, during deep winter', 'No, they stay active year-round', 'Only young cubs do', 'Only if it snows'], answer: 'No, they stay active year-round' },
  { question: 'What skill do cougar cubs learn in fall?', choices: ['Hunting by stalking and pouncing', 'Swimming between rivers', 'Digging dens', 'Fishing'], answer: 'Hunting by stalking and pouncing' },
  { question: 'What kind of prey do wolverines eat in spring?', choices: ['Carrion and small mammals', 'Large deer', 'Mostly fish', 'Plant roots'], answer: 'Carrion and small mammals' },
]

const water: QA[] = [
  { question: 'What do salmon feed after they die?', choices: ['Other salmon', 'Oceans', 'Bears, eagles, and forests', 'Caves'], answer: 'Bears, eagles, and forests' },
  { question: 'Which animal relies on salmon during autumn?', choices: ['Owls', 'Bears', 'Sharks', 'Deer'], answer: 'Bears' },
  { question: 'Where are salmon born?', choices: ['Ocean floor', 'Freshwater rivers', 'Rock pools', 'Mountain peaks'], answer: 'Freshwater rivers' },
  { question: 'What does the callout say about whitefish?', choices: ['They sleep in summer', 'They freeze in lakes', 'They survive where few other fish can', 'They fly over lakes'], answer: 'They survive where few other fish can' },
  { question: 'How do trout catch their food?', choices: ['Surprise strikes', 'Leaping dances', 'Making traps', 'Calling loudly'], answer: 'Surprise strikes' },
  { question: 'Where are whitefish often caught?', choices: ['In the sky', 'Near lake bottoms', 'On the shore', 'In coral reefs'], answer: 'Near lake bottoms' },
  { question: 'What makes lake trout powerful swimmers?', choices: ['Wings', 'Muscular bodies', 'Big tails', 'Helium fins'], answer: 'Muscular bodies' },
  { question: 'What role do lake trout play in their habitat?', choices: ['Clean the lake', 'Top predator', 'Nest protector', 'Egg carrier'], answer: 'Top predator' },
  { question: 'How much did the largest recorded lake trout weigh?', choices: ['10 pounds', '70 pounds', '5 pounds', '25 pounds'], answer: '70 pounds' },
]

const birds: QA[] = [
  { question: 'Which bird builds enormous nests in tall trees and returns to them every year?', choices: ['Bald Eagle', 'Great Horned Owl', 'Osprey', 'Trumpeter Swan'], answer: 'Bald Eagle' },
  { question: 'Which bird flies silently at night and has a strong grip for catching prey?', choices: ['Pacific Wren', 'Great Horned Owl', 'Canada Goose', 'Raven'], answer: 'Great Horned Owl' },
  { question: 'Which bird nests on cliffs or tall buildings without building a traditional nest?', choices: ['Bald Eagle', 'American Dipper', 'Peregrine Falcon', 'Trumpeter Swan'], answer: 'Peregrine Falcon' },
  { question: 'Which bird dives feet-first into water and has oily feathers to stay dry?', choices: ['Peregrine Falcon', 'Osprey', 'Marbled Murrelet', 'Loon'], answer: 'Osprey' },
  { question: 'Which bird has short wings and a long tail to help it twist through forests?', choices: ['Great Blue Heron', 'Northern Goshawk', 'Canada Goose', 'Goldfinch'], answer: 'Northern Goshawk' },
  { question: 'Which duck can swim just hours after hatching?', choices: ['Canada Goose', 'Mallard Duck', 'American Dipper', 'Sandhill Crane'], answer: 'Mallard Duck' },
  { question: 'Which seabird nests in trees far from the ocean and was a mystery to scientists until the 1970s?', choices: ['Common Loon', 'Marbled Murrelet', 'Mallard Duck', 'Harlequin Duck'], answer: 'Marbled Murrelet' },
  { question: 'Which intelligent forest bird can mimic human speech and remember faces?', choices: ['Steller’s Jay', 'Raven', 'Ruby-crowned Kinglet', 'Great Horned Owl'], answer: 'Raven' },
  { question: 'Which small forest bird stores food and hangs upside-down to feed?', choices: ['Chickadee', 'Common Loon', 'Canada Goose', 'Belted Kingfisher'], answer: 'Chickadee' },
]

const trees: QA[] = [
  { question: 'Which tree helps improve soil through nitrogen fixation?', choices: ['Western Red Cedar', 'Western Hemlock', 'Red Alder', 'Douglas Fir'], answer: 'Red Alder' },
  { question: 'What season do Red Alder leaves turn yellow and fall?', choices: ['Spring', 'Summer', 'Fall', 'Winter'], answer: 'Fall' },
  { question: 'What happens to Red Alder roots during winter?', choices: ['They die off', 'They stay active underground', 'They produce new leaves', 'They grow flowers'], answer: 'They stay active underground' },
  { question: 'What helps Western Red Cedar resist rot?', choices: ['Its red needles', 'Its sap', 'Its bark and oils', 'Its seeds'], answer: 'Its bark and oils' },
  { question: 'Which tree is called the "tree of life" by Indigenous peoples?', choices: ['Red Alder', 'Douglas Fir', 'Western Red Cedar', 'Western Hemlock'], answer: 'Western Red Cedar' },
  { question: 'What do Red Alder leaves do when they fall to the ground?', choices: ['Stay all winter', 'Grow back instantly', 'Decompose quickly', 'Harden into bark'], answer: 'Decompose quickly' },
  { question: 'How tall can Western Red Cedar grow?', choices: ['60 feet', '120 feet', 'Over 200 feet', 'Under 50 feet'], answer: 'Over 200 feet' },
  { question: 'What do Western Hemlock needles look like?', choices: ['Thick and long', 'Evenly spaced', 'Short and fluffy', 'Round and fat'], answer: 'Short and fluffy' },
  { question: 'Why are deciduous trees special in fall?', choices: ['They grow cones', 'They smell sweet', 'Their leaves change color and fall', 'They grow taller'], answer: 'Their leaves change color and fall' },
]

// Registry
const SECTION_POOLS: Record<SectionKey, QA[]> = { ground, water, birds, trees }
const SECTIONS: SectionKey[] = ['ground', 'water', 'birds', 'trees']

// Build one 12-question quiz (3 per section) from the current decks.
function buildQuizFromDecks(decks: DeckMap): { questions: QAMeta[]; decks: DeckMap } {
  const perSection = 3
  const out: QAMeta[] = []
  const nextDecks: DeckMap = { ...decks }

  for (const section of SECTIONS) {
    const pool = SECTION_POOLS[section]
    const { picked, deck } = drawFromDeck(nextDecks[section], pool.length, perSection)
    nextDecks[section] = deck
    for (const idx of picked) {
      const base = pool[idx]
      out.push({ ...base, section, choices: shuffleArray(base.choices) })
    }
  }
  return { questions: shuffleArray(out), decks: nextDecks }
}

export default function QuizClient() {
  const router = useRouter()

  // IMPORTANT: no randomness in initial render
  const [decks, setDecks] = useState<DeckMap | null>(null)
  const [questions, setQuestions] = useState<QAMeta[] | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  // Do all randomization AFTER mount
  useEffect(() => {
    const initialDecks: DeckMap = {
      ground: makeDeck(SECTION_POOLS.ground.length),
      water: makeDeck(SECTION_POOLS.water.length),
      birds: makeDeck(SECTION_POOLS.birds.length),
      trees: makeDeck(SECTION_POOLS.trees.length),
    }
    const first = buildQuizFromDecks(initialDecks)
    setDecks(first.decks)
    setQuestions(first.questions)
  }, [])

  const score = questions
    ? Object.entries(answers).filter(([i, a]) => a === questions[+i].answer).length
    : 0

  const allAnswered = questions ? Object.keys(answers).length === questions.length : false
  const passed = questions ? score >= 9 : false // 9/12

  const handleAnswer = (qIndex: number, choice: string) => {
    if (answers[qIndex]) return
    setAnswers(prev => ({ ...prev, [qIndex]: choice }))
  }

  const handleReset = () => {
    if (!decks) return
    const built = buildQuizFromDecks(decks) // continue cycling through unused first
    setDecks(built.decks)
    setQuestions(built.questions)
    setAnswers({})
  }

  // Stable initial markup for SSR to avoid hydration mismatch
  if (!questions) {
    return (
      <main className="relative min-h-screen w-full flex items-center justify-center text-center p-4">
        <div className="fixed inset-0 z-0">
          <Image
            src="/forest background.png"
            alt="Forest Background"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center' }}
          />
        </div>
        <div className="relative z-10 bg-white/90 rounded-3xl shadow-2xl px-8 py-10">
          <p className="text-lg font-semibold text-gray-700">Loading quiz…</p>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/forest background.png"
          alt="Forest Background"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      {/* Card */}
      <div className="max-w-4xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-6">
          Great Bear Rainforest — Mixed Quiz
        </h1>

        <p className="text-center mb-8 text-lg text-gray-700 font-medium">
          12 questions · 3 from each section (Ground, Water, Birds, Trees).<br />
          <span className="text-2xl font-bold">{score} / {questions.length}</span>
        </p>

        {questions.map((q, index) => {
          const hasAnswered = index in answers
          return (
            <div key={index} className="mb-8 p-6 bg-green-100 rounded-xl border border-green-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-left text-gray-800 text-lg">
                  {index + 1}. {q.question}
                </p>
                <span className="ml-4 inline-block text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full border border-green-400 text-green-700 bg-white">
                  {q.section}
                </span>
              </div>

              <div className="grid grid-cols-1 sm-grid-cols-2 sm:grid-cols-2 gap-4">
                {q.choices.map(choice => {
                  const isSelected = answers[index] === choice
                  const isCorrect = choice === q.answer

                  let btn = 'w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 border'
                  if (hasAnswered) {
                    if (isSelected && isCorrect) btn += ' bg-green-500 text-white border-green-600'
                    else if (isSelected && !isCorrect) btn += ' bg-red-500 text-white border-red-600'
                    else btn += ' bg-gray-200 text-gray-600 border-gray-300'
                  } else {
                    btn += ' bg-green-600 hover:bg-green-800 text-white border-green-600'
                  }

                  return (
                    <button
                      key={choice}
                      className={btn}
                      onClick={() => handleAnswer(index, choice)}
                      disabled={hasAnswered}
                    >
                      {choice}
                    </button>
                  )
                })}
              </div>

              {hasAnswered && (
                <div className="mt-4 text-center font-bold text-lg">
                  {answers[index] === q.answer ? (
                    <span className="text-green-700">✅ Correct!</span>
                  ) : (
                    <span className="text-red-700">❌ Incorrect. Try again next time!</span>
                  )}
                </div>
              )}
            </div>
          )
        })}

        <div className="text-center mt-10">
          <p className="mb-6 text-xl text-gray-800 font-semibold">
            Final Score: {score} / {questions.length}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleReset}
              className="bg-green-700 hover:bg-green-950 text-white px-6 py-3 rounded-xl shadow-md transition"
            >
              Reset
            </button>
          </div>

          {allAnswered && passed && (
            <button
              onClick={() => router.push('/reptilefacts')}
              className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow transition mt-4"
            >
              Continue
            </button>
          )}

          {allAnswered && (
            <p className={`mt-6 font-semibold text-lg ${passed ? 'text-green-700' : 'text-red-600'}`}>
              {passed
                ? '🎉 Great job! You passed (9/12 or better).'
                : 'Sorry, you must get 9/12 questions correct to pass.'}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}