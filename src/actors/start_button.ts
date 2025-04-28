import { Actor, CollisionType, Engine, RotationType, Vector } from "excalibur";
import { Resources } from "../resources";

export class StartButton extends Actor {
  constructor() {
    super({
      name: 'Start Button',
      pos: Vector.Zero,
      collisionType: CollisionType.PreventCollision,
    });
  }

  override onInitialize(engine: Engine) {
    let sprite = Resources.StartButton.toSprite();
    this.pos = engine.screen.center;
    this.pos.y += 255;

    this.graphics.add(sprite);    

    this.actions.repeatForever(ctx => {
      this.actions.delay(2723);
      ctx.rotateTo({
        duration: 1000,
        angle: 0.249066,
        rotationType: RotationType.Clockwise,
      });
      this.actions.delay(1323);
      ctx.rotateTo({
        duration: 1200,
        angle: 0.1,
        rotationType: RotationType.Clockwise,
      });
      this.actions.delay(2723);
    });
  }

  override onPostUpdate(engine: Engine, elapsed: number): void {
    let keys = engine.input.keyboard.getKeys();
    if (keys.length > 0){
      engine.goToScene("main_game");
    }
  }
}
