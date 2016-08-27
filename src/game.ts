/// <reference path="../node_modules/phaser/typescript/phaser.d.ts" />

class Game {
    game: Phaser.Game;
    circle: Phaser.Circle;

    constructor() {
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game-container', { preload: this.preload, create: this.create, update: this.update, render: this.render});
    }

    preload() {

        
    }

    create() {
       this.circle = new Phaser.Circle(this.game.world.centerX, 100,64);
    } 
    
    update() {

    }
    
    render() {
        this.game.debug.text(this.game.time.fps+'' || '--', 2, 14, "#000000");
        this.game.debug.geom(this.circle,'#cfffff');
        this.game.debug.text('Diameter : '+this.circle.diameter,50,200);
        this.game.debug.text('Circumference : '+this.circle.circumference(),50,230);
    }

}

// when the page has finished loading, create our game
window.onload = () => {
    var game = new Game();
}