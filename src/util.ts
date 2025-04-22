import { CoordPlane, Keys, Random, StandardClock, Vector } from "excalibur";

export var RandomManager = new Random();
export var ClockManager = new StandardClock({tick: ts => {}});

// Taken straight from the Excalibur.js Docs
export async function waitForFontLoad(font: string, timeout = 2000, interval = 100) {
    return new Promise((resolve, reject) => {
      // repeatedly poll check
      const poller = setInterval(async () => {
        try {
          await document.fonts.load(font);
        } catch (err) {
          reject(err);
        }
        if (document.fonts.check(font)) {
          clearInterval(poller);
          resolve(true);
        }
      }, interval);
      setTimeout(() => clearInterval(poller), timeout);
    });
}

// This is really a hodgepodge mess taken from ExcaliburJS OffscreenSystem modified for my own needs.
export function isEntityOnScreen(entity: ex.Actor, game: ex.Engine): boolean {
    if (entity.graphics.forceOnScreen) {
        return true;
    }
   
    const transform = entity.transform;
    if (transform.coordPlane === CoordPlane.World) {
        return game.screen.getWorldBounds().overlaps(entity.graphics.bounds);
      } else {
        const screen_bound = game.screen.getScreenBounds();
        let entity_world_bounds = entity.graphics.bounds;
        const coord_difference = game.worldToScreenCoordinates(entity_world_bounds.topLeft).sub(entity_world_bounds.topLeft); 
        entity_world_bounds = entity_world_bounds.translate(coord_difference);
        
        return screen_bound.overlaps(entity_world_bounds);
      }
}
  

export function keyToPhysicalLocation(key_code: Keys) {
    // I am sorry for this mess but I cannot think of a clean way to do this...
    if (key_code != Keys.Unidentified) {
        switch (key_code) {
            case Keys.Comma:
                return new Vector(7, 3);
                break;
            case Keys.Key0:
                return new Vector(9, 0);
                break;
            case Keys.Key1:
                return new Vector(0, 0);
                break;
            case Keys.Key2:
                return new Vector(1, 0);
                break;
            case Keys.Key3:
                return new Vector(2, 0);
                break;
            case Keys.Key4:
                return new Vector(3, 0);
                break;
            case Keys.Key5:
                return new Vector(4, 0);
                break;
            case Keys.Key6:
                return new Vector(5, 0);
                break;
            case Keys.Key7:
                return new Vector(6, 0);
                break;
            case Keys.Key8:
                return new Vector(7, 0);
                break;
            case Keys.Key9:
                return new Vector(8, 0);
                break;
            case Keys.A:
                return new Vector(0, 2);
                break;
            case Keys.B:
                return new Vector(4, 3);
                break;
            case Keys.C:
                return new Vector(2, 3);
                break;
            case Keys.D:
                return new Vector(2, 2);
                break;
            case Keys.E:
                return new Vector(2, 1);
                break;
            case Keys.F:
                return new Vector(3, 2);
                break;
            case Keys.G:
                return new Vector(4, 2);
                break;
            case Keys.H:
                return new Vector(5, 2);
                break;
            case Keys.I:
                return new Vector(7, 1);
                break;
            case Keys.J:
                return new Vector(6, 2);
                break;
            case Keys.K:
                return new Vector(7, 2);
                break;
            case Keys.L:
                return new Vector(8, 2);
                break;
            case Keys.M:
                return new Vector(6, 3);
                break;
            case Keys.N:
                return new Vector(5, 3);
                break;
            case Keys.O:
                return new Vector(8, 1);
                break;
            case Keys.P:
                return new Vector(9, 1);
                break;
            case Keys.Q:
                return new Vector(0, 1);
                break;
            case Keys.R:
                return new Vector(3, 1);
                break;
            case Keys.S:
                return new Vector(1, 2);
                break;
            case Keys.T:
                return new Vector(4, 1);
                break;
            case Keys.U:
                return new Vector(6, 1);
                break;
            case Keys.V:
                return new Vector(3, 3);
                break;
            case Keys.W:
                return new Vector(1, 1);
                break;
            case Keys.X:
                return new Vector(1, 3);
                break;
            case Keys.Y:
                return new Vector(5, 1);
                break;
            case Keys.Z:
                return new Vector(0, 3);
                break;
            case Keys.Period:
                return new Vector(8, 3);
                break;
            case Keys.Semicolon:
                return new Vector(9, 2);
                break;
        }
    }

    return Vector.One.negate();
}

