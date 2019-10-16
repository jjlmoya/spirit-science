import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";

import {buildLevel, level1, level2} from "/src/levels";
import PauseScreen from "./screens/pause";
import MenuScreen from "./screens/menu";
import GameOverScreen from "./screens/gameOver";

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEWLEVEL: 4
};

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.gameObjects = [];
        this.bricks = [];
        this.lives = 1;

        this.levels = [level1, level2];
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);
    }

    start() {
        if (
            this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.NEWLEVEL
        )
            return;

        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        this.gameObjects = [this.ball, this.paddle];

        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        if (!this.lives) this.gamestate = GAMESTATE.GAMEOVER;

        if (
            this.gamestate === GAMESTATE.PAUSED ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER
        )
            return;

        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }

        [...this.gameObjects, ...this.bricks].forEach(object =>
            object.update(deltaTime)
        );

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));

        if (this.gamestate === GAMESTATE.PAUSED) {
            new PauseScreen(ctx, this.gameWidth, this.gameHeight);
        }

        if (this.gamestate === GAMESTATE.MENU) {
            new MenuScreen(ctx, this.gameWidth, this.gameHeight)
        }
        if (this.gamestate === GAMESTATE.GAMEOVER) {
            new GameOverScreen(ctx, this.gameWidth, this.gameHeight);
        }
    }

    togglePause() {
        this.gamestate = this.gamestate === GAMESTATE.PAUSED
            ? GAMESTATE.RUNNING
            : GAMESTATE.PAUSED
    }
}
