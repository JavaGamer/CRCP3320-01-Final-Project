import { Actor, CollisionType, Color, Engine, ImageWrapping, Sprite, TiledSprite, Vector } from "excalibur";
import { Resources } from "../resources";
import { randomColor, RandomManager } from "../util";
import { Easing, Tween } from "@tweenjs/tween.js";

export class GameBackgroundImage extends Actor {
  tween: Tween;
  sprite: Sprite;
  next_color: Color;

  constructor(engine: Engine) {
    super({
      name: 'Background',
      pos: Vector.Zero,
      collisionType: CollisionType.PreventCollision,
      anchor: Vector.Zero,
      z: -1,
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

    this.next_color = randomColor();
    this.sprite.tint = randomColor();

    this.tween = new Tween(this.sprite.tint);
  }

  override onInitialize(engine: Engine) {
    this.graphics.add(this.sprite);
    this.tween.dynamic(true).to(this.next_color, RandomManager.integer(5400, 9520)).repeat(Infinity).easing(Easing.Cubic.InOut).onRepeat(() => {
      this.next_color = randomColor();
    }).delay(543).startFromCurrentValues();

    this.on("postupdate", () => { 
      if (!this.tween.update()){
        // this.tween.startFromCurrentValues()
        // console.log(this.cur_color, this.next_color)
      
      }       
    }
    );
  }
}
