import { Actor, CollisionType, Color, Engine, ImageWrapping, Sprite, TiledSprite, Vector } from "excalibur";
import { Resources } from "../resources";
import { randomColor, RandomManager } from "../util";
import { Easing, Tween } from "@tweenjs/tween.js";

export class GameBackgroundImage extends Actor {
  tween: Tween;
  sprite: Sprite;
  cur_color: Color;
  next_color: Color;

  constructor(engine: Engine) {
    super({
      name: 'Background',
      pos: Vector.Zero,
      collisionType: CollisionType.PreventCollision,
      anchor: Vector.Zero,
      z: -1,
      color: Color.Magenta,
    });

    this.sprite = new TiledSprite({
      image: Resources.BackgroundCat,
      width: engine.screen.resolution.width,
      height: engine.screen.resolution.height,
      wrapping: {
        x: ImageWrapping.Repeat,
        y: ImageWrapping.Repeat,
      },
    });

    this.cur_color = randomColor();
    this.next_color = randomColor();
    this.tween = new Tween(this.color);

  }

  override onInitialize(engine: Engine) {
    this.sprite.tint = this.cur_color;
    this.graphics.add(this.sprite);
    this.tween.to(this.next_color, RandomManager.integer(5000, 15000)).easing(Easing.Cubic.InOut).repeat(Infinity).onUpdate((new_color, _) => { this.sprite.tint = new_color; console.log("this.sprite.tint") }).start();

    this.on("postupdate", (handler) => { this.tween.update(handler.elapsed); console.log(this.tween)})
  }

  override onAdd(engine: Engine): void {
    this.sprite.tint = this.cur_color;
  }
}
