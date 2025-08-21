"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';

type Bird = {
  id: string;
  name: string;
  image: string;
  icon: string;
  level: 1 | 2 | 3 | 4| 5;
  bgColor: string;
  description: string;  // Added
  habitat: string;      // Added
  behavior: string;     // Added
  featherImage: string; // Added
};

type Feather = {
  id: string;
  birdName: string; // must match Bird.name to be playable
  icon: string;
  featherImage: string; // Added,
  // visual styling can be derived from the bird
};

export default function BirdCardGamePage() {
  const router = useRouter();

  /** ---------------------------
   *  MASTER BIRD POOL (1–4 levels)
   *  --------------------------- */
  const birdPool: Bird[] = useMemo(
    () => [
      {
  id: "worm",
  name: "Earthworm",
  image: "/worm.jpg",
  icon: "🪱",
  level: 1,
  bgColor: "bg-amber-100",
  description:
    "A vital decomposer that aerates soil and recycles nutrients, forming the foundation of many food webs.",
  habitat: "Soil and leaf litter",
  behavior: "Soil Engineer",
  featherImage: "/worm-feather.png",
},
{
  id: "cricket",
  name: "Field Cricket",
  image: "/crickets.webp",
  icon: "🦗",
  level: 1,
  bgColor: "bg-yellow-100",
  description:
    "A small chirping insect that feeds on plants and decay, serving as key protein for predators.",
  habitat: "Grasslands and fields",
  behavior: "Nocturnal Singer",
  featherImage: "/cricket-feather.png",
},
{
  id: "seed",
  name: "Wildflower Seed",
  image: "/wildflower.jpg",
  icon: "🌹",
  level: 1,
  bgColor: "bg-green-100",
  description:
    "Wildflowers provide food and shelter, nourishing countless creatures in the ecosystem.",
  habitat: "Meadows and forests",
  behavior: "Plant Propagator",
  featherImage: "/seed-feather.png",
},
{
  id: "berry",
  name: "Forest Berry",
  image: "/forestberry.jpg",
  icon: "🍓",
  level: 1,
  bgColor: "bg-red-100",
  description:
    "A nutritious fruit eaten by birds and mammals, crucial for feeding wildlife and dispersing seeds.",
  habitat: "Woodlands and forests",
  behavior: "Wildlife Food",
  featherImage: "/berry-feather.png",
},
      {
        id: "chickadee",
        name: "Chickadee",
        image: "/Chestnut Chickadee2.webp",
        icon: "🍃",
        level: 2,
        bgColor: "bg-green-200",
        description: "A small, energetic songbird with distinctive chestnut coloring on its back and sides.",
        habitat: "Coniferous forest",
        behavior: "Acrobatic Forager",
        featherImage: "/chikadee-feather.jpg",
      },
      {
        id: "varied thrush",
        name: "Varied Thrush",
        image: "/Varied-Thrush2.jpg",
        icon: "🌿",
        level: 2,
        bgColor: "bg-orange-200",
        description: "A striking forest bird with bold orange and black plumage, known for its haunting, melodic song.",
        habitat: "Dense forests",
        behavior: "Melodic Singer",
        featherImage: "/thrush-feather.jpg",
      },
      {
        id: "american goldfinch",
        name: "American Goldfinch",
        image: "/American-Goldfinch2.jpg",
        icon: "🌻",
        level: 2,
        bgColor: "bg-yellow-200",
        description: "A small, vibrant yellow bird known for its cheerful song and acrobatic flight patterns.",
        habitat: "Open fields and gardens",
        behavior: "Seed Specialist",
        featherImage: "/goldfinch-feather.jpg",
      },
      {
        id: "Rufous Hummingbird",
        name: "Rufous Hummingbird",
        image: "/r-hummingbird.webp",
        icon: "🌺",
        level: 2,
        bgColor: "bg-pink-200",
        description: "A feisty, brightly colored hummingbird known for its aggressive behavior and long migratory journey.",
        habitat: "Flower-rich areas",
        behavior: "Nectar Forager",
        featherImage: "/hummingbird-feather.jpg",
      },
      {
        id: "stellerjay",
        name: "Steller's Jay",
        image: "/Steller's Jay.jpg",
        icon: "🌲",
        level: 3,
        bgColor: "bg-lime-300",
        description: "A bold, intelligent corvid with striking blue and black plumage found in western forests.",
        habitat: "Mountain forest",
        behavior: "Opportunistic Omnivore",
        featherImage: "/jay-feather.webp",
      },
      {
        id: "harlequin duck",
        name: "Harlequin Duck",
        image: "/Harlequin-Duck.jpg",
        icon: "🦆",
        level: 3,
        bgColor: "bg-teal-300",
        description: "A strikingly patterned sea duck that thrives in turbulent coastal waters, known for its agile swimming.",
        habitat: "Coastal waters",
        behavior: "Rock Hopper",
        featherImage: "/hduck-feather.png",
      },
      {
        id: "sandhillcrane",
        name: "Sandhill Crane",
        image: "/Sandhill Crane.jpg",
        icon: "🌾",
        level: 3,
        bgColor: "bg-lime-300",
        description: "A tall, graceful bird with a red crown, famed for its trumpeting calls and courtship dances.",
        habitat: "Wetlands and Grasslands",
        behavior: "Vocal Dancer",
        featherImage: "/sandhill-feather.webp",
      },
      {
        id: "mallard duck",
        name: "Mallard Duck",
        image: "/mallard-duck.jpg",
        icon: "🦆",
        level: 3,
        bgColor: "bg-sky-300",
        description: "An adaptable waterfowl with a green head found in many habitats.",
        habitat: "Lakes, Ponds, and Rivers",
        behavior: "Dabbling Forager",
        featherImage: "/mduck-feather.jpg",
      },
      {
        id: "murrelet",
        name: "Marbled Murrelet",
        image: "/marbled murrelet.webp",
        icon: "🌊",
        level: 4, 
        bgColor: "bg-blue-500",
        description: "A mysterious seabird that nests in old-growth coastal forests but feeds in marine waters.",
        habitat: "Coastal waters",
        behavior: "Deep Diver",
        featherImage: "/Marbled Murrelet Feather.png",
      },
      {
        id: "Great Blue Heron",
        name: "Great Blue Heron",
        image: "/Blue Heron.jpg",
        icon: "💙",               // blue for its colo
        level: 4,
        bgColor: "bg-slate-600",  // deep blue for its habitat
        description:
          "A majestic wading bird with long legs and a sharp beak, often seen hunting fish in shallow waters.",
        habitat: "Wetlands and Shorelines",
        behavior: "Silent Stalker",
        featherImage: "/heron-feather.avif",
      },
      {
        id: "osprey",
        name: "Osprey", 
        image: "/osprey-hunting.jpg",
        icon: "🐟",               // wave for its fish-hunting over water
        level: 4,
        bgColor: "bg-teal-500",  // bright cyan for coastal waters
        description:
          "A specialist fish-eater, plunging talons-first into water then lifting prey skyward with unmatched skill.",
        habitat: "Coastal Waters",
        behavior: "Tide Diver",
        featherImage: "/osprey-feather.jpg",
      },
      {
        id: "american white pelican",
        name: "American White Pelican",
        image: "/pelican2.jpg",
        icon: "🏝️",               // pink for its distinctive color
        level: 4,
        bgColor: "bg-orange-500",  // light pink for its feathers
        description:
          "A large white bird with a long bill, gliding gracefully over lakes and rivers.",
        habitat: "Lakes and Rivers",
        behavior: "Graceful Glider",
        featherImage: "/pelican-feather.jpg",
      },
      {
        id: "spottedowl",
        name: "Northern Spotted Owl",
        image: "/spottedowl4.png",
        icon: "🌙",
        level: 5,
        bgColor: "bg-yellow-950",
        description: "A shy rainforest owl that roosts in shadows and hunts quietly at night.",
        habitat: "Old-growth forest",
        behavior: "Nocturnal Hunter",
        featherImage: "/spottedowl-feather.jpg",
      },
      {
        id: "baldeagle",
        name: "Bald Eagle",
        image: "/bald-eagle.jpg",
        icon: "🗻",          
        level: 5,
        bgColor: "bg-slate-900",
        description:
          "America’s iconic raptor—powerful wings span wide as it soars over lakes and forests, hunting with piercing eyesight.",
        habitat: "Cliffside Peaks",
        behavior: "Sky Sovereign",
        featherImage: "/eagle-feather.webp",
      },
      {
        id: "Northern Goshawk",
        name: "Northern Goshawk",
        image: "/Goshawk.jpg",
        icon: "🎯",
        level: 5,
        bgColor: "bg-gray-900",
        description:
          "A fierce and agile predator of the forest, this hawk hunts with unmatched speed and precision, dominating its woodland domain.",
        habitat: "Dense Forests",
        behavior: "Forest Phantom",
        featherImage: "/Goshawks-feather.jpg",
      },
      {
        id: "peregrine falcon",
        name: "Peregrine Falcon",
        image: "/Peregrine-Falcons.jpg",
        icon: "⚡",
        level: 5,
        bgColor: "bg-indigo-950",
        description:
          "The fastest bird on the planet, this falcon dives at incredible speeds to catch prey mid-air, a true master of the skies.",
        habitat: "Open Skies",
        behavior: "Sky Hunter",
        featherImage: "/falcon-feather.jpg",
      },
    ],
    []
  );


  /** ---------------------------
   *  HELPERS
   *  --------------------------- */
  const shuffle = <T,>(arr: T[]): T[] => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

const makeFeatherDeck = (birds: Bird[]): Feather[] => {
  const base = birds.map((b) => ({
    id: `feather-${b.id}`,
    birdName: b.name,
    icon: b.icon,
    featherImage: b.featherImage,
  }));
  return shuffle(base);
};

  const handleContinue = () => {
    router.push('/test3');
  };

  /** ---------------------------
   *  GAME STATE
   *  --------------------------- */
  // Player hand: exactly one of each level (use the pool directly)
  const [birdHand, setBirdHand] = useState<Bird[]>([]);
  const [birdDiscard, setBirdDiscard] = useState<Bird[]>([]);

  // Opponents: exactly one of each level, shuffled order
  const [opponentDeck, setOpponentDeck] = useState<Bird[]>([]);
  const [opponentIndex, setOpponentIndex] = useState(0);
  const currentOpponent = opponentDeck[opponentIndex] || null;

  // Opponent card flipping
  const [opponentFlipped, setOpponentFlipped] = useState(false);

  // Feathers
  const [featherDeck, setFeatherDeck] = useState<Feather[]>([]);
  const [featherHand, setFeatherHand] = useState<Feather[]>([]);
  const [featherDiscard, setFeatherDiscard] = useState<Feather[]>([]);
  const [selectedFeatherId, setSelectedFeatherId] = useState<string | null>(null);

  // Turn flow flags
  const [mustDrawFeather, setMustDrawFeather] = useState(false); // click deck to draw at start of each round
  const [gameEnded, setGameEnded] = useState(false);
  const [gameMessage, setGameMessage] = useState<string | null>(null);

  /** ---------------------------
   *  INITIALIZE GAME
   *  --------------------------- */
  const resetGame = () => {
  // Helper: get one random bird per level from a specific level range
  const getRandomBirdsByLevels = (levels: number[]) => {
    return levels.map(level => {
      const birdsOfLevel = birdPool.filter((b) => b.level === level);
      const randIdx = Math.floor(Math.random() * birdsOfLevel.length);
      return birdsOfLevel[randIdx];
    });
  };

  // Player gets one card per level 2-5
  const playerHand = getRandomBirdsByLevels([2, 3, 4, 5]);

  // Opponent gets one card per level 1-4
  const opponentHand = getRandomBirdsByLevels([1, 2, 3, 4]);

  // Feather deck only for player's birds
  const fDeck = makeFeatherDeck(playerHand);

  setBirdHand(playerHand);
  setBirdDiscard([]);

  setOpponentDeck(opponentHand);
  setOpponentIndex(0);
  setOpponentFlipped(false);

  setFeatherDeck(fDeck);

  const firstFeather = fDeck.length > 0 ? fDeck[0] : null;
  setFeatherHand(firstFeather ? [firstFeather] : []);
  setFeatherDeck(fDeck.slice(1));
  setFeatherDiscard([]);
  setSelectedFeatherId(null);

  setMustDrawFeather(true);
  setGameEnded(false);
  setGameMessage(null);
};

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ---------------------------
   *  ACTIONS
   *  --------------------------- */
  const drawFeather = () => {
    if (!mustDrawFeather || gameEnded) return;
    if (featherDeck.length === 0) {
      // No card to draw; you just proceed with what you have
      setMustDrawFeather(false);
      return;
    }
    const top = featherDeck[0];
    setFeatherHand((prev) => [...prev, top]);
    setFeatherDeck((prev) => prev.slice(1));
    setMustDrawFeather(false);
  };

  const flipOpponentCard = () => {
    if (gameEnded) return;
    setOpponentFlipped(true);
  };

  const selectFeather = (id: string) => {
    if (gameEnded) return;
    setSelectedFeatherId((prev) => (prev === id ? null : id));
  };

  const handlePlayBird = (bird: Bird) => {
    if (gameEnded) return;

    if (!opponentFlipped || !currentOpponent) {
      setGameMessage("Flip the opponent card first.");
      return;
    }

    if (mustDrawFeather) {
      setGameMessage("Draw a feather card first.");
      return;
    }

    if (!selectedFeatherId) {
      setGameMessage("Select a feather card first.");
      return;
    }

    const feather = featherHand.find((f) => f.id === selectedFeatherId);
    if (!feather) {
      setGameMessage("Selected feather not found.");
      return;
    }

    // WRONG CARD rule: feather must match the bird you're trying to play
    if (feather.birdName !== bird.name) {
      setGameEnded(true);
      setGameMessage("❌ Wrong feather for that bird. Game Over. Restart?");
      return;
    }

    // Battle resolution: immediate loss if <= ; win only if bird.level > opponent.level
    if (bird.level <= currentOpponent.level) {
      setGameEnded(true);
      setGameMessage(
        `❌ Your ${bird.name} (Lv ${bird.level}) cannot defeat ${currentOpponent.name} (Lv ${currentOpponent.level}). Game Over. Restart?`
      );
      return;
    }

    // ✅ Win round
    // Move the played bird + used feather to discard piles
    setBirdDiscard((prev) => [...prev, bird]);
    setBirdHand((prev) => prev.filter((b) => b.id !== bird.id));

    setFeatherDiscard((prev) => [...prev, feather]);
    setFeatherHand((prev) => prev.filter((f) => f.id !== feather.id));
    setSelectedFeatherId(null);

    // Advance to next opponent automatically
    const nextIndex = opponentIndex + 1;
    if (nextIndex >= opponentDeck.length) {
      // All opponents defeated
      setGameEnded(true);
      setGameMessage("🎉 You defeated all opponents! You win! Play again?");
      return;
    }

    // Go to next opponent
    setOpponentIndex(nextIndex);
    setOpponentFlipped(false);

    // Start of next round: require a draw
    setMustDrawFeather(true);
    setGameMessage("✅ Round won! Draw a feather for the next round.");
  };

  /** ---------------------------
   *  CARD VISUALS
   *  --------------------------- */
  const CardBack = ({ className = "", onClick }: { className?: string; onClick?: () => void }) => (
    <div
      className={`relative w-[120px] h-[180px] rounded-xl border-[3px] border-yellow-500 overflow-hidden bg-[#083D5E] flex items-center justify-center shadow-xl ${onClick ? "cursor-pointer hover:scale-[1.02] transition" : ""} ${className}`}
      onClick={onClick}
    >
      <Image src="/great bear card new.png" alt="Card Back" fill className="object-contain" />
    </div>
  );

  const BirdCard = ({
  bird,
  flipped,
  onClick,
  className = "",
}: {
  bird: Bird;
  flipped: boolean; // true = show face, false = show back
  onClick?: () => void;
  className?: string;
}) => (
  <div
    className={`w-[230px] h-[380px] perspective ${className}`}
    onClick={onClick}
    style={{ cursor: onClick ? "pointer" : "default" }}
  >
    <div
      className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
        flipped ? "rotate-y-180" : ""
      }`}
    >
      {/* Back */}
      <div className="absolute w-full h-full backface-hidden border-yellow-500 border-[3px] rounded-[10px] overflow-hidden bg-[#083D5E] z-10 flex items-center justify-center">
        <Image
          src="/great bear card new.png"
          alt="Card Back"
          fill
          className="object-contain"
        />
      </div>

      {/* Front */}
      <div
        className={`absolute w-full h-full backface-hidden rotate-y-180 ${bird.bgColor} border-[3px] border-yellow-500 rounded-[10px] p-3 flex flex-col`}
      >
        {/* Header with name and icon */}
        <div className="mb-1">
          <div className="flex justify-between items-center text-black bg-white/70 border border-black rounded px-1 py-0.5 text-[16px] font-bold leading-tight">
            <span>{bird.name}</span>
            <span>{bird.icon}</span>
          </div>
        </div>

        {/* Image section */}
        <div className="border-[3px] border-black bg-white mb-2 flex-shrink-0">
          <Image
            src={bird.image}
            alt={bird.name}
            width={220}
            height={130}
            className="object-cover w-full h-[130px]"
          />
        </div>

        {/* Level box */}
        <div className="text-[14px] text-black bg-white/30 border-[1px] border-black p-2 rounded-sm mb-2 text-center font-semibold">
          Level: {bird.level}
        </div>

        {/* Description section */}
        <div className="text-[12px] text-black bg-white/70 border-[1px] border-black p-2 rounded-sm mb-2 flex-grow">
          {bird.description}
        </div>

        {/* Habitat and Behavior section */}
        <div className="flex justify-between gap-1 text-[11px] mt-auto">
          <div className="flex-1 bg-white/70 border border-black rounded px-1 py-0.5">
            <div className="font-bold text-black text-[11px] leading-tight">Habitat:</div>
            <div className="text-black leading-tight">{bird.habitat}</div>
          </div>
          <div className="flex-1 bg-white/70 border border-black rounded px-1 py-0.5 text-right">
            <div className="font-bold text-black text-[11px] leading-tight">Behavior:</div>
            <div className="leading-tight text-black">{bird.behavior}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeatherCard = ({
  feather,
  selected,
  onClick,
}: {
  feather: Feather;
  selected: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-[160px] h-[260px] rounded-2xl border-4 ${
        selected ? "border-yellow-400" : "border-yellow-700"
      } bg-gradient-to-b from-yellow-200 to-yellow-500 shadow-xl flex flex-col items-center justify-center gap-3 ${
        onClick ? "cursor-pointer hover:scale-105 transition" : ""
      }`}
    >
      <div className="text-6xl">{feather.icon}</div> {/* Slightly smaller emoji */}
      <Image
        src={feather.featherImage}
        alt={`${feather.birdName} Feather`}
        width={120}
        height={120}
        className="rounded mb-3 object-contain"
      />
      <div className="text-center text-black font-extrabold leading-tight text-base px-2">
        {feather.birdName} Feather
      </div>
    </div>
  );
};
  /** ---------------------------
   *  RENDER
   *  --------------------------- */
  const remainingOpponents = Math.max(0, opponentDeck.length - opponentIndex - (currentOpponent ? 1 : 0));

return (
  <>
    {/* Fixed full-screen background image */}
    <div className="fixed inset-0 z-0">
      <Image
        src="/sky background.png"
        alt="Sky Background"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: 'center' }}
      />
    </div>

    {/* Main game container with black background, border, and high z-index */}
    <div className="relative z-10 min-h-screen bg-black border-4 border-yellow-500 rounded-lg p-6 text-white flex flex-col items-center max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Bird Top-of-Food-Chain Card Game</h1>
      <p className="opacity-80 mb-6 text-center max-w-xl">
        Draw a feather, flip the opponent, then play a matching bird with a higher level.
        Wrong feather or not higher level = instant loss.
      </p>

      {/* TOP ROW: Opponent area */}
      <div className="w-full grid grid-cols-3 gap-6 items-start mb-8">
        {/* Opponent Deck (remaining backs) */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm opacity-80">Opponents Left</div>
          <div className="relative">
            {[...Array(Math.min(3, remainingOpponents))].map((_, i) => (
              <div key={i} className="absolute" style={{ top: i * 3, left: i * 3 }}>
                <CardBack />
              </div>
            ))}
            {remainingOpponents <= 0 && (
              <div className="text-xs opacity-70">None</div>
            )}
          </div>
        </div>

        {/* Current Opponent */}
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold mb-2">Opponent</div>
          {currentOpponent ? (
            <BirdCard
              bird={currentOpponent}
              flipped={opponentFlipped}
              onClick={!opponentFlipped && !gameEnded ? flipOpponentCard : undefined}
            />
          ) : (
            <div className="opacity-70">No opponent</div>
          )}
        </div>

        {/* Discard pile (backs) */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm opacity-80">Discard Pile</div>
          <div className="relative">
            <CardBack />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-80 text-center">
              {birdDiscard.length} birds • {featherDiscard.length} feathers
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE: Player birds (hand) */}
      <div className="w-full mb-8">
        <h3 className="text-lg font-medium mb-2">Your Bird Cards</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {birdHand.map((bird) => (
            <BirdCard
              key={bird.id}
              bird={bird}
              flipped={true}
              onClick={
                !gameEnded && opponentFlipped && !mustDrawFeather
                  ? () => handlePlayBird(bird)
                  : undefined
              }
              className={
                !opponentFlipped || mustDrawFeather
                  ? "opacity-50"
                  : selectedFeatherId
                  ? featherHand.find((f) => f.id === selectedFeatherId)?.birdName === bird.name
                    ? ""
                    : "opacity-50"
                  : ""
              }
            />
          ))}
        </div>
      </div>

      {/* BOTTOM: Feathers + Draw Deck */}
      <div className="w-full grid grid-cols-3 gap-6 items-start">
        {/* Feather draw deck */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm opacity-80">Feather Draw Deck</div>
          <div className="relative">
            {[...Array(Math.min(3, featherDeck.length))].map((_, i) => (
              <div key={i} className="absolute" style={{ top: i * 3, left: i * 3 }}>
                <CardBack onClick={mustDrawFeather && !gameEnded ? drawFeather : undefined} />
              </div>
            ))}
            {featherDeck.length === 0 && (
              <CardBack onClick={mustDrawFeather && !gameEnded ? drawFeather : undefined} />
            )}
          </div>
          <div className="text-xs opacity-70">
            {mustDrawFeather ? "Click a card back to draw" : "Drawn for this round"}
          </div>
        </div>

        {/* Feather hand */}
        <div className="col-span-2">
          <h3 className="text-lg font-medium mb-2">Your Feathers</h3>
          {featherHand.length === 0 ? (
            <div className="opacity-70 text-sm">No feathers in hand</div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {featherHand.map((f) => (
                <FeatherCard
                  key={f.id}
                  feather={f}
                  selected={selectedFeatherId === f.id}
                  onClick={!gameEnded ? () => selectFeather(f.id) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* STATUS / CONTROLS */}
      <div className="mt-8 flex flex-col items-center gap-3">
        {gameMessage && <div className="text-center text-base">{gameMessage}</div>}

        {gameEnded && (
          <button
            className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-500 mb-5"
            onClick={resetGame}
          >
            Restart Game
          </button>
        )}
      </div>
            <button
            onClick={handleContinue}
            className="bg-sky-600 hover:bg-sky-800 text-white font-semibold px-6 py-3 rounded-xl shadow transition-colors duration-300 ease-in-out"
          >
            Continue
          </button>

    </div>
  </>
);
}