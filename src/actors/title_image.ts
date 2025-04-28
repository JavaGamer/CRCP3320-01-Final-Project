import { Actor, CollisionType, Engine, RotationType, Vector } from "excalibur";
import { Resources } from "../resources";

export class TitleImage extends Actor {
  constructor() {
    super({
      name: 'Title',
      pos: Vector.Zero,
      collisionType: CollisionType.PreventCollision,
    });
  }

  override onInitialize(engine: Engine) {
    let sprite = Resources.Title.toSprite();
    this.pos = engine.screen.center;
    this.pos.y = 300;

    this.graphics.add(sprite);    

    this.actions.delay(500);
    this.actions.repeatForever(ctx => {
      ctx.rotateTo({
        duration: 600,
        angle: 0.349066,
        rotationType: RotationType.Clockwise,
      });
      ctx.rotateTo({
        duration: 700,
        angle: 0,
      });
      ctx.rotateTo({
        duration: 800,
        angle: -0.349066,
        rotationType: RotationType.CounterClockwise
      });
      ctx.delay(200);
    });
  }
}
