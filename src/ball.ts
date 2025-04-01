import { Actor, Collider, CollisionContact, CollisionType, Engine, Side, vec, Vector } from "excalibur";
import { Resources } from "./resources";


export class Ball extends Actor {
  velocity: Vector;

  constructor() {
    super({
      name: 'Ball',
      pos: vec(150, 150),
      radius: 50,
      anchor: vec(0, 0), // Actors default center colliders and graphics with anchor (0.5, 0.5)
      collisionType: CollisionType.Passive,
      });

      this.velocity = vec(50, 40);
    
  }

  override onInitialize() {
    this.graphics.add(Resources.Sword.toSprite());

    setTimeout(() => {
      // Set the velocity in pixels per second
      this.vel = this.velocity;
    }, 1000);

    // Sometimes you want to click on an actor!
    this.on('pointerdown', evt => {
      console.log('You clicked the actor @', evt.worldPos.toString());
    });
  }

  override onPreUpdate(engine: Engine, elapsedMs: number): void {
    // Put any update logic here runs every frame before Actor builtins
  }

  override onPostUpdate(engine: Engine, elapsedMs: number): void {
    // Put any update logic here runs every frame after Actor builtins
  }

  override onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    // Called before a collision is resolved, if you want to opt out of this specific collision call contact.cancel()
  }

  override onPostCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    // Called every time a collision is resolved and overlap is solved
  }

  override onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    // Called when a pair of objects are in contact
  }

  override onCollisionEnd(self: Collider, other: Collider, side: Side, lastContact: CollisionContact): void {
    // Called when a pair of objects separates
  }
}
