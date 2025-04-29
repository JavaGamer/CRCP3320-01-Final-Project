import { Actor, Collider, CollisionContact, CollisionType, Color, Engine, Keys, Side, vec, Vector } from "excalibur";
import { keyToPhysicalLocation } from "../util";
import { Resources } from "../resources";


export class Wall extends Actor {
    /// Location as grid index
    location: Vector;

    // TODO: Refactor into normal and player walls
    // Physical Keycode the wall represents
    key_code: Keys;
  constructor(key: Keys) {
    super({
      name: 'Wall',
      pos: Vector.Zero,
      width: 50,
      height: 50,
      collisionType: CollisionType.Passive,
      color: Color.Red,
      });

      this.location = Vector.Zero;
      this.key_code = key;
  }

  override onInitialize() {
    this.graphics.add(Resources.Wall.toSprite())
    this.location = keyToPhysicalLocation(this.key_code);
    this.pos = vec(this.location.x * 150, this.location.y * 280).add(vec(this.width + 5, this.height + 30));
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
