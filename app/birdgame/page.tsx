"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Bird = {
  id: string;
  name: string;
  image: string;
  icon: string;
  level: 1 | 2 | 3 | 4;
  bgColor: string;
  description: string;  // Added
  habitat: string;      // Added
  behavior: string;     // Added
};

type Feather = {
  id: string;
  birdName: string; // must match Bird.name to be playable
  icon: string;
  // visual styling can be derived from the bird
};

export default function BirdCardGamePage() {
  /** ---------------------------
   *  MASTER BIRD POOL (1–4 levels)
   *  --------------------------- */
  const birdPool: Bird[] = useMemo(
    () => [
      {
        id: "chickadee",
        name: "Chestnut-backed Chickadee",
        image: "/Chestnut Chickadee2.webp",
        icon: "🍃",
        level: 2,
        bgColor: "bg-green-300",
        description: "A small, energetic songbird with distinctive chestnut coloring on its back and sides.",
        habitat: "Coniferous forest",
        behavior: "Acrobatic Forager",
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
      },
      {
        id: "murrelet",
        name: "Marbled Murrelet",
        image: "/marbled murrelet.webp",
        icon: "🌊",
        level: 3, 
        bgColor: "bg-blue-300",
        description: "A mysterious seabird that nests in old-growth coastal forests but feeds in marine waters.",
        habitat: "Coastal waters",
        behavior: "Deep Diver",
      },
      {
        id: "osprey",
        name: "Osprey",
        image: "/osprey-hunting.jpg",
        icon: "🐟",               // wave for its fish-hunting over water
        level: 3,
        bgColor: "bg-teal-300",  // bright cyan for coastal waters
        description:
          "A specialist fish-eater, plunging talons-first into water then lifting prey skyward with unmatched skill.",
        habitat: "Coastal Waters",
        behavior: "Tide Diver",
      },
      {
        id: "spottedowl",
        name: "Northern Spotted Owl",
        image: "/spottedowl3.avif",
        icon: "🌙",
        level: 4,
        bgColor: "bg-lime-950",
        description: "A shy and elusive rainforest resident, this owl remains in dense old-growth forests year-round, roosting in shadows and hunting quietly at night.",
        habitat: "Old-growth forest",
        behavior: "Nocturnal Hunter",
      },
      {
        id: "baldeagle",
        name: "Bald Eagle",
        image: "/bald-eagle.jpg",
        icon: "🗻",               // mountain for high-soaring habitat
        level: 4,
        bgColor: "bg-slate-700", // stormy-sky slate for a powerful, majestic feel
        description:
          "America’s iconic raptor—powerful wings span wide as it soars over lakes and forests, hunting with piercing eyesight.",
        habitat: "Cliffside Peaks",
        behavior: "Sky Sovereign",
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
    // finite: one feather per bird (you can add more duplicates later)
    const base = birds.map((b) => ({
      id: `feather-${b.id}`,
      birdName: b.name,
      icon: b.icon,
    }));
    return shuffle(base);
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
    const playerHand = [...birdPool]; // one of each level
    const oppDeck = shuffle([...birdPool]); // random order 1,2,3,4
    const fDeck = makeFeatherDeck(birdPool);

    setBirdHand(playerHand);
    setBirdDiscard([]);

    setOpponentDeck(oppDeck);
    setOpponentIndex(0);
    setOpponentFlipped(false);

    setFeatherDeck(fDeck);
    // start with one feather in hand
    const firstFeather = fDeck[0] ? [fDeck[0]] : [];
    setFeatherHand(firstFeather);
    setFeatherDeck(fDeck.slice(1));
    setFeatherDiscard([]);
    setSelectedFeatherId(null);

    setMustDrawFeather(true); // must click deck to draw at the start of first round
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
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${flipped ? "rotate-y-180" : ""}`}>
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden border-yellow-500 border-[3px] rounded-[10px] overflow-hidden bg-[#083D5E] z-10 flex items-center justify-center">
          <Image src="/great bear card new.png" alt="Card Back" fill className="object-contain" />
        </div>
        {/* Front */}
        <div
          className={`absolute w-full h-full backface-hidden rotate-y-180 ${bird.bgColor} border-[3px] border-yellow-500 rounded-[10px] p-3 flex flex-col`}
        >
          {/* Header with name and icon */}
          <div className="text-[18px] font-bold flex justify-between items-center text-black mb-2">
            <span className="leading-tight">{bird.name}</span>
            <span>{bird.icon}</span>
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
          <div className="text-[12px] text-black bg-white/90 border-[1px] border-black p-2 rounded-sm mb-2 flex-grow">
            {bird.description}
          </div>

          {/* Habitat and Behavior section */}
          <div className="flex justify-between text-[11px] text-black">
            <div className="flex-1">
              <div className="font-bold">Habitat:</div>
              <div>{bird.habitat}</div>
            </div>
            <div className="flex-1 text-right">
              <div className="font-bold">Behavior:</div>
              <div>{bird.behavior}</div>
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
    // find styling from its bird (for icon/color affinity)
    const bird = birdPool.find((b) => b.name === feather.birdName)!;
    return (
      <div
        onClick={onClick}
        className={`w-[150px] h-[220px] rounded-2xl border-4 ${
          selected ? "border-yellow-400" : "border-yellow-700"
        } bg-gradient-to-b from-yellow-200 to-yellow-500 shadow-xl flex flex-col items-center justify-center gap-2 ${
          onClick ? "cursor-pointer hover:scale-[1.02] transition" : ""
        }`}
      >
        <div className="text-6xl">{bird.icon}</div>
        <div className="text-center text-black font-extrabold leading-tight px-2">
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-2">Bird Top-of-Food-Chain Card Game</h1>
      <p className="opacity-80 mb-6 text-center">
        Draw a feather, flip the opponent, then play a matching bird with a higher level.
        Wrong feather or not higher level = instant loss.
      </p>

      {/* TOP ROW: Opponent area */}
      <div className="w-full max-w-5xl grid grid-cols-3 gap-6 items-start mb-8">
        {/* Opponent Deck (remaining backs) */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm opacity-80">Opponents Left</div>
          <div className="relative">
            {/* stack a few backs as a visual */}
            {[...Array(Math.min(3, remainingOpponents))].map((_, i) => (
              <div key={i} className="absolute" style={{ top: i * 3, left: i * 3 }}>
                <CardBack />
              </div>
            ))}
            {remainingOpponents <= 0 && <div className="text-xs opacity-70">None</div>}
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
            {/* Show a single back as pile visual */}
            <CardBack />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-80 text-center">
              {birdDiscard.length} birds • {featherDiscard.length} feathers
            </div>
          </div>
        </div>
      </div>

      {/* MIDDLE: Player birds (hand) */}
      <div className="w-full max-w-5xl mb-8">
        <h3 className="text-lg font-medium mb-2">Your Bird Cards</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {birdHand.map((bird) => (
            <BirdCard
              key={bird.id}
              bird={bird}
              flipped={true} // hand is face-up so you can see levels
              onClick={
                !gameEnded && opponentFlipped && !mustDrawFeather
                  ? () => handlePlayBird(bird)
                  : undefined
              }
              className={
                !opponentFlipped || mustDrawFeather
                  ? "opacity-50"
                  : selectedFeatherId
                  ? // highlight only the bird that matches selected feather
                    featherHand.find((f) => f.id === selectedFeatherId)?.birdName === bird.name
                    ? ""
                    : "opacity-50"
                  : ""
              }
            />
          ))}
        </div>
      </div>

      {/* BOTTOM: Feathers + Draw Deck */}
      <div className="w-full max-w-5xl grid grid-cols-3 gap-6 items-start">
        {/* Feather draw deck */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-sm opacity-80">Feather Draw Deck</div>
          <div className="relative">
            {/* show a stack visual */}
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
            className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-500"
            onClick={resetGame}
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
}