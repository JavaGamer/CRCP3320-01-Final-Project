import { Actor, CollisionType, Color, Engine, ImageWrapping, TiledSprite, vec, Vector } from "excalibur";
import { Resources } from "../resources";
import { randomColor } from "../util";

export class GameBackgroundImage extends Actor {
  constructor() {
    super({
      name: 'Background',
      pos: Vector.Zero,
      collisionType: CollisionType.PreventCollision,
      anchor: Vector.Zero,
      z: -1,
      color: Color.Magenta,
    });
  }

  override onInitialize(engine: Engine) {
    let sprite = new TiledSprite({
      image: Resources.BackgroundCat,
      width: engine.screen.resolution.width,
      height: engine.screen.resolution.height,
      wrapping: {
          x: ImageWrapping.Repeat, 
          y: ImageWrapping.Repeat,
      },
    });

    sprite.tint = randomColor();
    this.graphics.add(sprite);
    

  }
}
