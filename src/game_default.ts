import { DefaultLoader, Engine, ExcaliburGraphicsContext, Scene, SceneActivationContext, Keys, Vector, Label, Font, FontUnit, vec } from "excalibur";
import { Ball } from "./actors/ball";
import { Wall } from "./actors/wall";
import { keyToPhysicalLocation } from "./util";
import { Goal } from "./actors/goal";
import { Resources } from "./resources";

const BestScoreKey = "bestScore";

export class GameDefault extends Scene {
    active_walls: Map<Keys, Wall> = new Map();
    score: number = 0;
    best_score: number = 0;
    scoreLabel: Label;
    bestScoreLabel: Label;

    constructor(){
        super();
        this.scoreLabel = new Label({
            text: 'Score: 0',
            pos: vec(100, 100),
            font: new Font({
                family: 'Robto',
                size: 24,
                unit: FontUnit.Px
            })
        });

        this.bestScoreLabel = new Label({
            text: 'Highscore: 0',
            pos: vec(300, 400),
            font: new Font({
                family: 'Robto',
                size: 24,
                unit: FontUnit.Px
            })
        });
    }

    override onInitialize(engine: Engine): void {
        // Scene.onInitialize is where we recommend you perform the composition for your game
        let bestScore = localStorage.getItem(BestScoreKey);
        if (bestScore){
            this.best_score = parseInt(bestScore);
            this.bestScoreLabel.text = `Highscore: ${this.best_score}`;
        }

        this.add(this.scoreLabel);
        this.add(this.bestScoreLabel);
        this.reset(engine);
    }

    override onPreLoad(loader: DefaultLoader): void {
        // Add any scene specific resources to load
    }

    override onActivate(context: SceneActivationContext<unknown>): void {
        Resources.BackgroundMusic.play()
        // Called when Excalibur transitions to this scene
        // Only 1 scene is active at a time
    }

    override onDeactivate(context: SceneActivationContext): void {
        // Called when Excalibur transitions away from this scene
        // Only 1 scene is active at a time
    }

    increase_score(){
        this.scoreLabel.text = `Score: ${++this.score}`;
        
        if (this.score > this.best_score){
            this.best_score = this.score;
            localStorage.setItem(BestScoreKey, String(this.best_score));
            this.bestScoreLabel.text = `Highscore: ${this.best_score}`;
        }
    }

    reset_score(){
        this.score = 0;
        this.scoreLabel.text = `Score: ${this.score}`;
    }

    reset(engine: Engine){
        const player = new Ball(this);
        const goal = new Goal(this);

        this.add(player); // Actors need to be added to a scene to be drawn
        this.add(goal);
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
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
            if (keyToPhysicalLocation(active_key) != Vector.One.negate()){
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