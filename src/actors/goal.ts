import { Actor, Collider, CollisionContact, CollisionType, Color, Engine, Side, vec, Vector } from "excalibur";
import { RandomManager } from "../util";
import { Ball } from "./ball";
import { GameDefault } from "../game_default";

const SPAWN_PADDING = 50;

export class Goal extends Actor {
    scene: GameDefault;
    constructor(scene: GameDefault) {
        super({
            name: 'Goal',
            pos: vec(150, 150),
            width: 40,
            height: 40,
            collisionType: CollisionType.Passive,
            color: Color.Violet,
        });

        this.scene = scene;
    }

    get_random_position(engine: Engine): Vector {
        const screen_bound = engine.screen.getWorldBounds();
        return vec(RandomManager.integer(this.width + SPAWN_PADDING, screen_bound.right - this.width - SPAWN_PADDING), RandomManager.integer(this.height + SPAWN_PADDING, screen_bound.bottom - this.height - SPAWN_PADDING));
    }

    override onInitialize(engine: Engine) {
        this.pos = this.get_random_position(engine);

        this.on("collisionend", ev => {
            if (ev.other.owner instanceof Ball) {
                this.scene.increase_score();
                this.reset(engine);
            }
        });
    }

    reset(engine: Engine): void {
        this.pos = this.get_random_position(engine);
    }

    override onPreUpdate(engine: Engine, elapsedMs: number): void {
        // Put any update logic here runs every frame before Actor builtins
    }

    override onPostUpdate(engine: Engine, elapsedMs: number): void {

    }

    override onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Called before a collision is resolved, if you want to opt out of this specific collision call contact.cancel()
    }

    override onPostCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Called every time a collision is resolved and overlap is solved

    }

    override onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    }

    override onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
        // Called when a pair of objects separates
    }
}
