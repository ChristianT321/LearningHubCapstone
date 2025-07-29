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

      game = new Phaser.Game(config);

      function preload(this: Phaser.Scene) {
        this.load.image('frog', '/frog.png');
        this.load.image('log', '/log.png');
        this.load.image('bg', '/background.png');
      }

      function create(this: Phaser.Scene) {
        this.add.image(400, 300, 'bg');
        frog = this.physics.add.sprite(400, 500, 'frog');
        frog.setCollideWorldBounds(true);
        if (this.input && this.input.keyboard) {
          cursors = this.input.keyboard.createCursorKeys();
        }
      }

      function update(this: Phaser.Scene) {
        frog.setVelocity(0);
        if (cursors.left?.isDown) frog.setVelocityX(-200);
        else if (cursors.right?.isDown) frog.setVelocityX(200);
        if (cursors.up?.isDown) frog.setVelocityY(-200);
        else if (cursors.down?.isDown) frog.setVelocityY(200);
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
