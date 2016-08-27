var Game = (function () {
    function Game() {
        this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game-container', { preload: this.preload, create: this.create, update: this.update, render: this.render });
    }
    Game.prototype.preload = function () {
    };
    Game.prototype.create = function () {
        this.circle = new Phaser.Circle(this.game.world.centerX, 100, 64);
    };
    Game.prototype.update = function () {
    };
    Game.prototype.render = function () {
        this.game.debug.text(this.game.time.fps + '' || '--', 2, 14, "#000000");
        this.game.debug.geom(this.circle, '#cfffff');
        this.game.debug.text('Diameter : ' + this.circle.diameter, 50, 200);
        this.game.debug.text('Circumference : ' + this.circle.circumference(), 50, 230);
    };
    return Game;
}());
window.onload = function () {
    var game = new Game();
};
