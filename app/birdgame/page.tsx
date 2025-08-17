"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

type Bird = {
  name: string;
  image: string;
  icon: string;
  level: number;
  bgColor: string;
};

export default function BirdCardGamePage() {
  const birds: Bird[] = [
    {
      name: "Steller's Jay",
      image: "/StellersJay.jpg",
      icon: "🌲",
      level: 2,
      bgColor: "bg-lime-300",
    },
    {
      name: "Northern Spotted Owl",
      image: "/Owl.jpg",
      icon: "🌙",
      level: 3,
      bgColor: "bg-purple-300",
    },
    {
      name: "Marbled Murrelet",
      image: "/MarbledMurrelet.webp",
      icon: "🌊",
      level: 2,
      bgColor: "bg-blue-300",
    },
    {
      name: "Chestnut-backed Chickadee",
      image: "/ChestnutChickadee.webp",
      icon: "🍃",
      level: 1,
      bgColor: "bg-green-300",
    },
  ];

  const [opponentCard, setOpponentCard] = useState<Bird | null>(null);
  const [opponentFlipped, setOpponentFlipped] = useState(false);
  const [playerFeather, setPlayerFeather] = useState<string | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const random = birds[Math.floor(Math.random() * birds.length)];
    setOpponentCard(random);
  }, []);

  const flipOpponentCard = () => {
    if (!opponentFlipped) setOpponentFlipped(true);
  };

  const selectFeather = (bird: Bird) => {
    setPlayerFeather(playerFeather === bird.name ? null : bird.name);
  };

  const handlePlayCard = (bird: Bird, index: number) => {
    if (!opponentCard || flippedIndex !== null) return;

    if (!playerFeather) {
      alert("Select the matching feather card first!");
      return;
    }
    if (playerFeather !== bird.name) {
      alert("That feather doesn't match this bird!");
      return;
    }

    setFlippedIndex(index);

    if (bird.level > opponentCard.level) {
      setResult(`You win! Your ${bird.name} defeats ${opponentCard.name}.`);
    } else if (bird.level < opponentCard.level) {
      setResult(`You lose! Your ${bird.name} cannot defeat ${opponentCard.name}.`);
    } else {
      setResult(`Tie! Both ${bird.name} and ${opponentCard.name} are equal.`);
    }
  };

  const nextRound = () => {
    const random = birds[Math.floor(Math.random() * birds.length)];
    setOpponentCard(random);
    setOpponentFlipped(false);
    setPlayerFeather(null);
    setFlippedIndex(null);
    setResult(null);
  };

  // Reusable card component styled like non-migratory section
  const BirdCard = ({
    bird,
    flipped,
    onClick,
  }: {
    bird: Bird;
    flipped: boolean;
    onClick?: () => void;
  }) => (
    <div
      className="w-[230px] h-[380px] perspective cursor-pointer"
      onClick={onClick}
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
          className={`absolute w-full h-full backface-hidden rotate-y-180 ${bird.bgColor} border-[3px] border-yellow-500 rounded-[10px] p-3 flex flex-col justify-between`}
        >
          <div className="text-[18px] font-bold flex justify-between items-center text-black">
            <span>{bird.name}</span>
            <span>{bird.icon}</span>
          </div>
          <div className="border-[3px] border-black bg-white my-2">
            <Image
              src={bird.image}
              alt={bird.name}
              width={220}
              height={130}
              className="object-cover w-full h-[130px]"
            />
          </div>
          <div className="text-[14px] text-black bg-white/40 border-[1px] border-black p-2 rounded-sm">
            Level: {bird.level}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">
        Bird Top-of-Food-Chain Card Game
      </h1>

      {/* Opponent's Card */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-semibold mb-2">Opponent&apos;s Card</h2>
        {opponentCard && (
          <BirdCard
            bird={opponentCard}
            flipped={opponentFlipped}
            onClick={flipOpponentCard}
          />
        )}
      </div>

      {/* Feather Cards */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Your Feather Cards</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {birds.map((bird, i) => (
            <button
              key={i}
              onClick={() => selectFeather(bird)}
              className={`px-3 py-2 border-2 rounded ${
                playerFeather === bird.name
                  ? "border-yellow-300 bg-yellow-600 text-black"
                  : "border-white bg-white/10"
              }`}
            >
              {bird.icon} Feather - {bird.name}
            </button>
          ))}
        </div>
      </div>

      {/* Player's Bird Cards */}
      <div>
        <h3 className="text-lg font-medium mb-2">Your Bird Cards</h3>
        <div className="grid grid-cols-2 gap-6">
          {birds.map((bird, index) => (
            <BirdCard
              key={index}
              bird={bird}
              flipped={flippedIndex === index}
              onClick={() => handlePlayCard(bird, index)}
            />
          ))}
        </div>
      </div>

      {/* Result + Next Round */}
      <div className="mt-6">
        {result && (
          <>
            <div className="text-xl font-semibold mb-4">{result}</div>
            <button
              className="px-4 py-2 bg-green-600 rounded text-white"
              onClick={nextRound}
            >
              Next Round
            </button>
          </>
        )}
      </div>
    </div>
  );
}