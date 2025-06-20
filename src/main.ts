import { Color, DisplayMode, Engine, FadeInOut, SolverStrategy, vec } from "excalibur";
import { loader } from "./resources";
import { GameDefault } from "./game_default";
import { MainMenu } from "./main_menu_level";
import { ClockManager, waitForFontLoad } from "./util";

export enum GameStates {
  MainMenu,
  DefaultGame,
}

const game = new Engine({
  width: 1300, // Logical width and height in game pixels
  height: 1000,
  displayMode: DisplayMode.FitScreen, // Display mode tells excalibur how to fill the window
  pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
  scenes: {
    main_menu: MainMenu,
    main_game: GameDefault,
  },
  physics: {
    solver: SolverStrategy.Realistic,
    // set global acceleration simulating gravity pointing down
    gravity: vec(0, 700),
    substep: 5 // Sub step the physics simulation for more robust simulations
  },
  fixedUpdateTimestep: 16 // Turn on fixed update timestep when consistent physic simulation is important
});

(async () => {
  await waitForFontLoad('24px Robto');
  await waitForFontLoad('normal 400 50px "Rock 3D"');
  await waitForFontLoad('normal 400 50px "Rubik Iso"');
})();

(async () => await game.start('main_menu', { // name of the start scene 'start'
  loader, // Optional loader (but needed for loading images/sounds)
  inTransition: new FadeInOut({ // Optional in transition
    duration: 1000,
    direction: 'in',
    color: Color.ExcaliburBlue
  })
}).then(() => {
  // Do something after the game starts
  ClockManager.start();
}))();
