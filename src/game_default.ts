import { DefaultLoader, Engine, ExcaliburGraphicsContext, Scene, SceneActivationContext, Keys, Vector, Label, Font, FontUnit, vec, Color, EmitterType, ParticleEmitter, FontStyle, Timer } from "excalibur";
import { Ball } from "./actors/ball";
import { Wall } from "./actors/wall";
import { BestScoreKey, keyToPhysicalLocation, RandomManager } from "./util";
import { Goal } from "./actors/goal";
import { Resources } from "./resources";
import { GameBackgroundImage } from "./actors/background_actor";

export class GameDefault extends Scene {
    active_walls: Map<Keys, Wall> = new Map();
    score: number = 0;
    best_score: number = 0;
    scoreLabel: Label;
    bestScoreLabel: Label;

    constructor() {
        super();
        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: vec(110, 100),
            font: new Font({
                family: '"Rock 3D"',
                size: 110,
                style: FontStyle.Normal,
                unit: FontUnit.Px,
                shadow: {
                    blur: 3,
                    offset: vec(2, 2),
                    color: Color.White,
                },
            })

        });

        this.bestScoreLabel = new Label({
            text: 'Highscore: 0',
            pos: vec(320, 400),
            font: new Font({
                family: '"Rubik Iso"',
                size: 70,
                unit: FontUnit.Px,
                shadow: {
                    blur: 3,
                    offset: vec(2, 2),
                    color: Color.White,
                },
            })
        });
    }

    override onInitialize(engine: Engine): void {
        // Scene.onInitialize is where we recommend you perform the composition for your game

        this.add(new GameBackgroundImage(engine))
        this.add(this.scoreLabel);
        this.add(this.bestScoreLabel);
        this.reset(engine);

        const timer = new Timer({
            fcn: () => {
                Resources.MetalPipe.play()
            },
            interval: RandomManager.integer(1000, 8507),
            randomRange: [1000, 9125], repeats: true
        });

        this.addTimer(timer)
        timer.start();
    }

    override onPreLoad(loader: DefaultLoader): void {
        // Add any scene specific resources to load
    }

    override onActivate(context: SceneActivationContext<unknown>): void {
        // Called when Excalibur transitions to this scene
        // Only 1 scene is active at a time
        this.reset_score()
        let bestScore = localStorage.getItem(BestScoreKey);
        if (bestScore) {
            this.best_score = parseInt(bestScore);
            this.bestScoreLabel.text = `Highscore: ${this.best_score}`;
        }
    }

    override onDeactivate(context: SceneActivationContext): void {
        // Called when Excalibur transitions away from this scene
        // Only 1 scene is active at a time
    }

    increase_score() {
        this.scoreLabel.text = `Score: ${++this.score}`;

        if (this.score > this.best_score) {
            this.best_score = this.score;
            localStorage.setItem(BestScoreKey, String(this.best_score));
            this.bestScoreLabel.text = `Highscore: ${this.best_score}`;
            Resources.HighScoreSound.play();
        }
    }

    reset_score() {
        this.score = 0;
        this.scoreLabel.text = `Score: ${this.score}`;
    }

    reset(engine: Engine) {
        const player = new Ball(this);
        const goal = new Goal(this);
        const emitter = new ParticleEmitter({
            particle: {
                startSize: 35,
                endSize: 5,
                fade: true,
                beginColor: Color.Black,
                // graphic: Resources.Ball.toSprite(),
            },
            pos: Vector.Zero,
            radius: 10,
            emitterType: EmitterType.Circle,
            isEmitting: true,
            emitRate: 12,

        });

        this.add(player); // Actors need to be added to a scene to be drawn
        player.addChild(emitter);
        this.add(goal);
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        if (engine.input.keyboard.wasPressed(Keys.Esc)) {
            engine.goToScene("main_menu");
        }

        // Called before anything updates in the scene
        let keys = new Set(engine.input.keyboard.getKeys());

        let active_wall_set = new Set(this.active_walls.keys());

        active_wall_set.difference(keys).forEach(deactivated_key => {
            let deleted_wall = this.active_walls.get(deactivated_key);
            if (deleted_wall) {
                deleted_wall.kill()
                this.active_walls.delete(deactivated_key)
            }

        })

        keys.difference(active_wall_set).forEach(active_key => {
            if (!keyToPhysicalLocation(active_key).equals(Vector.One.negate())) {
                let newWall = new Wall(active_key);

                this.add(newWall)
                this.active_walls.set(active_key, newWall)
            }

        })
    }

    override onPostUpdate(engine: Engine, elapsedMs: number): void {
        // Called after everything updates in the scene
    }

    override onPreDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called before Excalibur draws to the screen
    }

    override onPostDraw(ctx: ExcaliburGraphicsContext, elapsedMs: number): void {
        // Called after Excalibur draws to the screen
    }
}