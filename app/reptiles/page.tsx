'use client';

import { useEffect } from 'react';

export default function ReptileGamePage() {
  useEffect(() => {
    let game: Phaser.Game | null = null;

    async function initGame() {
      const Phaser = await import('phaser');

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
        scene: {
          preload,
          create,
          update,
        },
      };

      let frog: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
      let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
      let background: Phaser.GameObjects.TileSprite;
      let logs: Phaser.Physics.Arcade.Group;

      game = new Phaser.Game(config);

      function preload(this: Phaser.Scene) {
        this.load.image('frog', '/pacific tree frog.png');
        this.load.image('log', '/log.png');
        this.load.image('bg', '/waterbackground.png');
      }

      function create(this: Phaser.Scene) {
        // Scrolling background
        background = this.add.tileSprite(400, 300, 800, 600, 'bg');

        // Create frog
        frog = this.physics.add.sprite(400, 500, 'frog');
        frog.setScale(0.1);
        frog.setCollideWorldBounds(true);

        // Create logs group
        logs = this.physics.add.group();

        for (let i = 0; i < 3; i++) {
          const log = logs.create(200 + i * 250, 200 + i * 100, 'log') as Phaser.Physics.Arcade.Image;
          log.setScale(0.2);
          log.setImmovable(true);
          // No need to set allowGravity; Arcade physics bodies for images have gravity disabled by default.
          log.setVelocityX(i % 2 === 0 ? 100 : -100); // Alternate direction
        }

        // Collider detection for riding logs
        this.physics.add.overlap(frog, logs, (frogObj, logObj) => {
          const log = logObj as Phaser.Physics.Arcade.Image;
          if (log.body) {
            frog.x += log.body.velocity.x * this.game.loop.delta / 1000;
          }
        });

        // Keyboard controls
        if (this.input.keyboard) {
          cursors = this.input.keyboard.createCursorKeys();
        }
      }

      function update(this: Phaser.Scene) {
        // Scroll the background
        background.tilePositionY -= 0.5;

        // Frog movement
        frog.setVelocity(0);
        if (cursors.left?.isDown) frog.setVelocityX(-200);
        else if (cursors.right?.isDown) frog.setVelocityX(200);
        if (cursors.up?.isDown) frog.setVelocityY(-200);
        else if (cursors.down?.isDown) frog.setVelocityY(200);

        // Wrap logs around screen
        logs.getChildren().forEach((log) => {
          const logImage = log as Phaser.Physics.Arcade.Image;
          if (logImage.x < -100) logImage.x = 900;
          else if (logImage.x > 900) logImage.x = -100;
        });
      }
    }

    initGame();

    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-4xl font-bold mb-4">Reptile & Amphibian Adventure</h1>
      <div id="game-container" />
    </div>
  );
}
