import { Color, DisplayMode, Engine, FadeInOut, SolverStrategy } from "excalibur";
import { loader } from "./resources";
import { GameDefault } from "./game_default";
import { MainMenu } from "./main_menu_level";

export enum GameStates {
  MainMenu,
  DefaultGame,
}



// Goal is to keep main.ts small and just enough to configure the engine

const game = new Engine({
  width: 1300, // Logical width and height in game pixels
  height: 1000,
  displayMode: DisplayMode.FitScreenAndFill, // Display mode tells excalibur how to fill the window
  pixelArt: true, // pixelArt will turn on the correct settings to render pixel art without jaggies or shimmering artifacts
  scenes: {
    main_menu: MainMenu,
    test_game: GameDefault,
  },
  physics: {
    solver: SolverStrategy.Arcade,
    substep: 5 // Sub step the physics simulation for more robust simulations
  },
  fixedUpdateTimestep: 16 // Turn on fixed update timestep when consistent physic simulation is important
});

game.start('test_game', { // name of the start scene 'start'
  loader, // Optional loader (but needed for loading images/sounds)
  inTransition: new FadeInOut({ // Optional in transition
    duration: 1000,
    direction: 'in',
    color: Color.ExcaliburBlue
  })
}).then(() => {
  // Do something after the game starts
  console.log("Game Ended... This should not happen ideally...");
});