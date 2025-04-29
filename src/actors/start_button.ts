import { Actor, CollisionType, Engine, Keys, RotationType, Vector } from "excalibur";
import { Resources } from "../resources";
import { BestScoreKey } from "../util";

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
      ctx.delay(2723);
      ctx.rotateTo({
        duration: 1000,
        angle: 0.249066,
        rotationType: RotationType.Clockwise,
      });
      ctx.delay(1323);
      ctx.rotateTo({
        duration: 1200,
        angle: 0.1,
        rotationType: RotationType.Clockwise,
      });
      ctx.delay(2723);
    });
  }

  override onPostUpdate(engine: Engine, elapsed: number): void {
    
    let keys = engine.input.keyboard.getKeys();
    if (keys.includes(Keys.Delete)) {
      localStorage.setItem(BestScoreKey, String(0));
    }
    else if (keys.length > 0 && !keys.includes(Keys.Escape)){
      engine.goToScene("main_game");
    }
  }
}
