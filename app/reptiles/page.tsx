'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    reptileGameInstance?: Phaser.Game | null
  }
}

export default function ReptileGamePage() {
  const [score, setScore] = useState(0)
  const [highscore, setHighscore] = useState<number | null>(null)
  const [isGameOver, setIsGameOver] = useState(false)
  const [studentId, setStudentId] = useState<number | null>(null)
  const [gameKey, setGameKey] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('currentUser')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed?.id) setStudentId(parsed.id)
    }
  }, [])

  useEffect(() => {
    if (!studentId) return

    async function fetchHighscore() {
      try {
        const res = await fetch(`http://localhost:3001/student/${studentId}/highscore/reptiles`)
        const text = await res.text()
        if (!res.ok) {
          console.error('Highscore fetch failed:', text || res.statusText)
          return
        }
        const data = text ? JSON.parse(text) : {}
        setHighscore(data.highscore ?? 0)
      } catch (err) {
        console.error('Failed to fetch highscore:', err)
      }
    }

    fetchHighscore()
  }, [studentId])

  useEffect(() => {
    if (!studentId || highscore === null) return

    setIsGameOver(false)
    const highscoreAtStart = highscore
    let game: Phaser.Game | null = null

    async function initGame(highscoreAtStart: number) {
      const Phaser = await import('phaser')

      if (window.reptileGameInstance) {
        window.reptileGameInstance.destroy(true)
      }

      const laneCount = 3
      const laneWidth = 150
      const gameHeight = 600
      const gameWidth = laneCount * laneWidth

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: gameWidth,
        height: gameHeight,
        parent: 'game-container',
        physics: {
          default: 'arcade',
          arcade: { gravity: { x: 0, y: 0 }, debug: false },
        },
        scene: { preload, create, update },
      }

      let frog: Phaser.Physics.Arcade.Sprite
      let cursors: Phaser.Types.Input.Keyboard.CursorKeys
      let currentLane = 1
      let logs: Phaser.Physics.Arcade.Group
      let logTimer = 0
      let localScore = 0
      let gameOver = false
      let gameOverText: Phaser.GameObjects.Text
      let logSpeedMultiplier = 1 

      game = new Phaser.Game(config)
      window.reptileGameInstance = game

      function preload(this: Phaser.Scene) {
        this.load.image('frog', '/pacific tree frog.png')
        this.load.image('log', '/log.png')
        this.load.image('bg', '/waterbackground.png')
      }

      function create(this: Phaser.Scene) {
        this.add.tileSprite(gameWidth / 2, gameHeight / 2, gameWidth, gameHeight, 'bg')

        cursors = this.input.keyboard!.createCursorKeys()

        frog = this.physics.add.sprite(getLaneX(currentLane), gameHeight - 50, 'frog')
        frog.setScale(0.1)
        frog.setCollideWorldBounds(true)

        if (frog.body) {
          frog.body.setSize(frog.width * 0.8, frog.height * 0.8)
          frog.body.setOffset(frog.width * 0.1, frog.height * 0.1)
        }

        logs = this.physics.add.group()

        gameOverText = this.add
          .text(gameWidth / 2, gameHeight / 2, 'GAME OVER', {
            fontSize: '48px',
            color: '#ff0000',
          })
          .setOrigin(0.5)
          .setVisible(false)

        this.physics.add.overlap(frog, logs, () => {
          if (!gameOver) {
            gameOver = true
            gameOverText.setVisible(true)
            frog.setTint(0xff0000)

            logs.getChildren().forEach((log) => {
              const logBody = (log as Phaser.Physics.Arcade.Sprite).body
              if (logBody instanceof Phaser.Physics.Arcade.Body) {
                logBody.setVelocity(0)
              }
            })

            setTimeout(() => {
              if (studentId) saveHighscore(studentId, localScore, highscoreAtStart)
              setScore(localScore)
              setIsGameOver(true)
            }, 500)
          }
        })
      }

      function update(this: Phaser.Scene, time: number, delta: number) {
        if (gameOver) return

        if (Phaser.Input.Keyboard.JustDown(cursors.left!) && currentLane > 0) currentLane--
        else if (Phaser.Input.Keyboard.JustDown(cursors.right!) && currentLane < laneCount - 1)
          currentLane++

        frog.x = getLaneX(currentLane)

        logTimer += delta
        const spawnInterval = 1000 / logSpeedMultiplier
        if (logTimer > spawnInterval) {
          logTimer = 0
          spawnLog(this)
        }

        logSpeedMultiplier += delta * 0.00006

        logs.getChildren().forEach((log: Phaser.GameObjects.GameObject) => {
          const sprite = log as Phaser.Physics.Arcade.Sprite
          sprite.y += delta * 0.3 * logSpeedMultiplier

          if (sprite.y > gameHeight + 50) {
            sprite.destroy()
            localScore++
            setScore(localScore)
          }
        })
      }

      function getLaneX(lane: number): number {
        return lane * laneWidth + laneWidth / 2
      }

      function spawnLog(scene: Phaser.Scene) {
        const lane = Phaser.Math.Between(0, laneCount - 1)
        const x = getLaneX(lane)
        const log = scene.physics.add.sprite(x, -50, 'log')
        log.setScale(0.12)
        log.setImmovable(true)

        if (log.body instanceof Phaser.Physics.Arcade.Body) {
          log.body.setSize(log.width * 0.6, log.height * 0.3)
          log.body.setOffset(log.width * 0.2, log.height * 0.4)
        }

        logs.add(log)
      }

      async function saveHighscore(studentId: number, newScore: number, highscoreAtStart: number) {
        if (newScore <= highscoreAtStart) return

        try {
          const res = await fetch('http://localhost:3001/student/highscore/reptiles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId, highscore: newScore }),
          })

          const text = await res.text()
          if (!res.ok) {
            console.error('Highscore save error:', text || res.statusText)
            return
          }
          const data = text ? JSON.parse(text) : {}
          console.log('Highscore updated:', data)
          setHighscore(data.highscore ?? newScore)
        } catch (err) {
          console.error('API error saving highscore:', err)
        }

        console.log('Score this game:', newScore, '| Stored highscore at start:', highscoreAtStart)
      }
    }

    initGame(highscoreAtStart)

    return () => {
      if (game) {
        game.destroy(true)
        game = null
        window.reptileGameInstance = null
      }

      const container = document.getElementById('game-container')
      if (container) container.innerHTML = ''
    }
  }, [studentId, highscore, gameKey])

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-green-100 overflow-y-auto py-8">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">Reptile & Amphibian Adventure</h1>

      <div className="flex flex-col items-center mb-4">
        <p className="text-xl text-red-600">Score: {score}</p>
        <p className="text-xl text-blue-600">High Score: {highscore ?? 0}</p>
      </div>

      <div
        id="game-container"
        className="w-[450px] h-[600px] relative overflow-hidden bg-black mb-4"
      />

      <button
        onClick={() => {
          setScore(0)
          setIsGameOver(false)
          setGameKey((prev) => prev + 1)
        }}
        disabled={!isGameOver}
        className={`px-6 py-2 rounded transition font-semibold ${
          isGameOver
            ? 'bg-green-700 text-white hover:bg-green-800 cursor-pointer'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
      >
        Play Again
      </button>

      {/* Learn more button */}
      <button
        onClick={() => router.push('/reptilefacts')}
        className="mt-4 px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Learn about Reptiles?
      </button>
    </div>
  )
}
