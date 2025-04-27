import { Actor, clamp, Collider, CollisionContact, CollisionType, Color, Engine, Scene, Side, Sprite, vec, Vector } from "excalibur";
import { Resources } from "../resources";
import { ClockManager, isEntityOnScreen, randomColor, RandomManager } from "../util";
import { Wall } from "./wall";
import { GameDefault } from "../game_default";


export class Ball extends Actor {
  velocity: Vector;
  scene: GameDefault;
  ballSprite: Sprite;
  constructor(scene: GameDefault) {
    super({
      name: 'Ball',
      pos: Vector.Zero,
      radius: 50,
      anchor: vec(0.5, 0.5),
      collisionType: CollisionType.Active,
      z: 1,
      color: Color.Magenta,
    });

    this.velocity = vec(0, 0);
    this.scene = scene;
    this.ballSprite = Resources.Ball.toSprite();

  }

  override onInitialize(engine: Engine) {
    this.graphics.add(this.ballSprite);

    this.pos = engine.screen.center;

    // this.velocity = vec(RandomManager.integer(-100, 100) * 10, RandomManager.integer(-100, 100) * 10);
    this.body.applyLinearImpulse(vec(RandomManager.integer(-100, 100) * 10, RandomManager.integer(-100, 100) * 10));

    // Sometimes you want to click on an actor!
    this.on('pointerdown', evt => {
      console.log('You clicked the actor @', evt.worldPos.toString());
    });

    this.on('exitviewport', () => {
      ClockManager.schedule(_ => {
        if (!isEntityOnScreen(this, engine)) { 
          this.reset(engine); 
          this.scene.reset_score();
        }

      }, 400)
    });
  }

  reset(engine: Engine): void {
    this.vel = Vector.Zero;
    this.pos = engine.screen.center;
    this.color = randomColor();
    this.ballSprite.tint = this.color;
  }

  override onPreUpdate(engine: Engine, elapsedMs: number): void {
    // Put any update logic here runs every frame before Actor builtins
  }

  override onPostUpdate(engine: Engine, elapsedMs: number): void {
    if (engine.currentScene instanceof GameDefault) {
      let walls = engine.currentScene.active_walls;
      // Put any update logic here runs every frame after Actor builtins
      walls.forEach(wall => {
        let direction_vec = wall.pos.sub(this.pos).normalize();
        let magnitude = clamp(98569 / (this.pos.distance(wall.pos) / 2), 1, 500);

        this.body.applyLinearImpulse(direction_vec.scale(magnitude));
      });
    }

    this.vel = this.vel.clampMagnitude(1000);
  }

  override onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    // if (other.owner instanceof Wall){
    //   this.vel.scaleEqual(0.999);
    // }
    // Called before a collision is resolved, if you want to opt out of this specific collision call contact.cancel()
  }

  override onPostCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    // Called every time a collision is resolved and overlap is solved

  }

  override onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    // Called when a pair of objects are in contact
    if (other.owner instanceof Wall) {
      this.vel.scaleEqual(0.7);
    }
  }

  override onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
    // Called when a pair of objects separates
  }
}
