'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { setProgress } from '@/utils/progress'

const fullQuestionPool = [
  {
    question: 'What do trees need most to grow?',
    choices: ['Sunlight', 'Rocks', 'Cars', 'Blankets'],
    answer: 'Sunlight',
  },
  {
    question: 'What season do trees usually grow new leaves?',
    choices: ['Spring', 'Winter', 'Fall', 'Summer'],
    answer: 'Spring',
  },
  {
    question: 'What happens to most trees in winter?',
    choices: ['They take a nap (go dormant)', 'They grow fruits', 'They bloom with flowers', 'Their roots fly south'],
    answer: 'They take a nap (go dormant)',
  },
  {
    question: 'What season has leaves that change color?',
    choices: ['Fall', 'Summer', 'Winter', 'Spring'],
    answer: 'Fall',
  },
  {
    question: 'What does it mean when a tree is "dormant"?',
    choices: ['It’s resting or asleep', 'It runs fast', 'It’s loud', 'It dances'],
    answer: 'It’s resting or asleep',
  },
  {
    question: 'What kind of tree is a Red Alder?',
    choices: ['Deciduous', 'Evergreen', 'Fruit tree', 'Cactus'],
    answer: 'Deciduous',
  },
  {
    question: 'What do Red Alder trees do in fall?',
    choices: ['Drop their yellow leaves', 'Bloom flowers', 'Grow fruit', 'Get taller'],
    answer: 'Drop their yellow leaves',
  },
  {
    question: 'What makes Red Alder leaves helpful when they fall?',
    choices: ['They break down and feed the soil', 'They stay crunchy forever', 'They blow away', 'They turn into dust'],
    answer: 'They break down and feed the soil',
  },
  {
    question: 'What helps the Red Alder fix the soil?',
    choices: ['Nitrogen', 'Water balloons', 'Sand', 'Butterflies'],
    answer: 'Nitrogen',
  },
  {
    question: 'What happens to Red Alder roots in winter?',
    choices: ['They keep working under the ground', 'They go away', 'They freeze solid', 'They grow apples'],
    answer: 'They keep working under the ground',
  },
  {
    question: 'In spring, what grows on the Red Alder?',
    choices: ['New buds and leaves', 'Snowballs', 'Pinecones', 'Bananas'],
    answer: 'New buds and leaves',
  },
  {
    question: 'What color are the Red Alder leaves in summer?',
    choices: ['Green', 'Blue', 'Pink', 'Brown'],
    answer: 'Green',
  },
  {
    question: 'Why are Red Alders important in the rainforest?',
    choices: ['They help other plants grow', 'They fly', 'They block the sun', 'They scare animals'],
    answer: 'They help other plants grow',
  },
  {
    question: 'What kind of tree is a Western Hemlock?',
    choices: ['Coniferous', 'Fruit tree', 'Flowering', 'Cactus'],
    answer: 'Coniferous',
  },
  {
    question: 'What grows on a Western Hemlock in summer?',
    choices: ['Cones', 'Roses', 'Berries', 'Feathers'],
    answer: 'Cones',
  },
  {
    question: 'What happens to Western Hemlock cones in fall?',
    choices: ['They dry out and drop seeds', 'They fall up', 'They melt', 'They turn blue'],
    answer: 'They dry out and drop seeds',
  },
  {
    question: 'What color are Western Hemlock needles all year?',
    choices: ['Green', 'Red', 'Yellow', 'Purple'],
    answer: 'Green',
  },
  {
    question: 'What do the cones on Western Hemlocks do?',
    choices: ['Hold seeds', 'Sing', 'Change colors', 'Eat bugs'],
    answer: 'Hold seeds',
  },
  {
    question: 'In spring, what begins growing on the Hemlock?',
    choices: ['Tiny cones and needle tips', 'Tree bark and moss', 'Red flowers', 'Hanging fruits'],
    answer: 'Tiny cones and needle tips',
  },
  {
    question: 'What do Western Hemlocks help do for animals?',
    choices: ['Give shelter', 'Chase them', 'Hide from them', 'Feed them candy'],
    answer: 'Give shelter',
  },
  {
    question: 'Why are Hemlock seeds important?',
    choices: ['They grow new trees', 'They bounce', 'They glow', 'They taste like pizza'],
    answer: 'They grow new trees',
  },
  {
    question: 'What kind of tree stays green all year?',
    choices: ['Evergreen', 'Maple tree', 'Cloud tree', 'Shrub tree'],
    answer: 'Evergreen',
  },
  {
    question: 'What is special about Western Red Cedar wood?',
    choices: ['It doesn’t rot easily', 'It glows', 'It’s squishy', 'It melts'],
    answer: 'It doesn’t rot easily',
  },
  {
    question: 'What part of the tree carries water up from the roots?',
    choices: ['The trunk', 'The leaves', 'The bark', 'The cones'],
    answer: 'The trunk',
  },
  {
    question: 'What makes the Red Cedar look different in each season?',
    choices: ['The weather', 'TV shows', 'Magic', 'Batteries'],
    answer: 'The weather',
  },
  {
    question: 'What type of tree does not lose its leaves in fall?',
    choices: ['Evergreen', 'Deciduous', 'Willow', 'Birch'],
    answer: 'Evergreen',
  },
  {
    question: 'What does a deciduous tree do each year?',
    choices: ['Drops its leaves in fall', 'Stays green all year', 'Grows fruit every month', 'Blooms only in winter'],
    answer: 'Drops its leaves in fall',
  },
  {
    question: 'Why are tree roots important?',
    choices: ['They hold the tree in place', 'They keep the bark clean', 'They help trees talk', 'They turn into branches'],
    answer: 'They hold the tree in place',
  },
  {
    question: 'Which tree has cones that fall to the forest floor?',
    choices: ['Western Hemlock', 'Red Alder', 'Oak', 'Banana Tree'],
    answer: 'Western Hemlock',
  },
  {
    question: 'What do trees give to the air?',
    choices: ['Oxygen', 'Rain', 'Dust', 'Sugar'],
    answer: 'Oxygen',
  },
];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function getRandomUniqueIndexes(total: number, count: number, exclude: number[]) {
  const pool = [...Array(total).keys()].filter(i => !exclude.includes(i));
  const selected: number[] = [];

  while (selected.length < count && pool.length > 0) {
    const randIndex = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(randIndex, 1)[0]);
  }

  return selected;
}

export default function VegetationTest() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [showCongrats, setShowCongrats] = useState(false);
  const router = useRouter();

  const score = Object.entries(selectedAnswers).filter(
    ([index, answer]) => answer === shuffledQuestions[Number(index)]?.answer
  ).length;

  const generateQuiz = () => {
    const storedUsed = JSON.parse(localStorage.getItem('usedTreeQuestions') || '[]') as number[];
    let newIndexes = getRandomUniqueIndexes(fullQuestionPool.length, 10, storedUsed);

    if (newIndexes.length < 10) {
      newIndexes = getRandomUniqueIndexes(fullQuestionPool.length, 10, []);
      localStorage.setItem('usedTreeQuestions', JSON.stringify(newIndexes));
    } else {
      const updatedUsed = [...storedUsed, ...newIndexes];
      localStorage.setItem('usedTreeQuestions', JSON.stringify(updatedUsed));
    }

    const shuffled = newIndexes.map((idx) => {
      const q = fullQuestionPool[idx];
      return {
        ...q,
        choices: shuffleArray(q.choices), // Shuffle ONCE
      };
    });

    setShuffledQuestions(shuffled);
    setSelectedAnswers({});
  };

  useEffect(() => {
    generateQuiz();
  }, []);

  const handleAnswer = (index: number, choice: string) => {
    if (selectedAnswers[index]) return;
    setSelectedAnswers({ ...selectedAnswers, [index]: choice });
  };

  const handleReset = () => {
    generateQuiz();
  };

  const handleQuizComplete = () => {
    setProgress('Module 4');
    setShowCongrats(true);
  };

  const allAnswered = Object.keys(selectedAnswers).length === shuffledQuestions.length;
  const passedQuiz = score >= 8;

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-start text-center overflow-y-auto p-4">
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

      <div className="max-w-4xl w-full mx-auto mb-20 px-6 py-12 relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-6">
          Vegetation Test
        </h1>

        <p className="text-center mb-8 text-lg text-gray-700 font-medium">
          Test your knowledge! <br />
          <span className="text-2xl font-bold">{score} / {shuffledQuestions.length}</span>
        </p>

        {shuffledQuestions.map((q, i) => {
          return (
            <div key={i} className="mb-8 p-6 bg-green-300 rounded-xl border border-green-500 shadow-sm">
              <p className="font-semibold text-left mb-4 text-gray-800 text-lg">{i + 1}. {q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {q.choices.map((choice: string) => {
                  const isSelected = selectedAnswers[i] === choice;
                  const isCorrect = choice === q.answer;
                  const hasAnswered = i in selectedAnswers;

                  let buttonStyle = 'w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 border';

                  if (hasAnswered) {
                    if (isSelected && isCorrect) {
                      buttonStyle += ' bg-green-900 text-white border-green-950';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle += ' bg-red-700 text-white border-red-950';
                    } else {
                      buttonStyle += ' bg-gray-200 text-gray-600 border-gray-300';
                    }
                  } else {
                    buttonStyle += ' bg-green-700 hover:bg-green-950 text-white border-green-500';
                  }

                  return (
                    <button
                      key={choice}
                      className={buttonStyle}
                      onClick={() => handleAnswer(i, choice)}
                      disabled={hasAnswered}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {selectedAnswers[i] && (
                <div className="mt-4 text-center font-bold text-lg">
                  {selectedAnswers[i] === q.answer ? (
                    <span className="text-green-950">✅ Correct!</span>
                  ) : (
                    <span className="text-red-700">❌ Incorrect. Try again next time!</span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <div className="text-center mt-10">
          <p className="mb-6 text-xl text-gray-800 font-semibold">
            Final Score: {score} / {shuffledQuestions.length}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={handleReset}
              className="bg-blue-700 hover:bg-blue-950 text-white px-6 py-3 rounded-xl shadow-md transition-colors duration-300 ease-in-out"
            >
              Reset
            </button>

            {allAnswered && passedQuiz && (
              <button
                onClick={handleQuizComplete}
                className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow transition"
              >
                Complete Module 4
              </button>
            )}
          </div>

          {showCongrats && (
            <div
              style={{
                position: 'fixed',
                bottom: '190px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '16px 24px',
                borderRadius: '12px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                zIndex: 2000,
                width: '280px',
                textAlign: 'center',
              }}
            >
              <p className="text-lg font-semibold mb-3 text-green-600">🎉 Congrats! You completed Module 4!</p>
              <button
                onClick={() => {
                  setShowCongrats(false);
                  router.push('/certificate');
                }}
                style={{
                  backgroundColor: '#22c55e',
                  color: 'white',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Continue
              </button>
            </div>
          )}

          {allAnswered && !passedQuiz && (
            <p className="mt-6 text-red-600 font-semibold text-lg">
              Sorry, all questions must be correct to pass. Please try again.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
