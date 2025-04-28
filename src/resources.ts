import { DefaultLoader, ImageSource, ImageWrapping, Sound } from "excalibur";

// It is convenient to put your resources in one place
export const Resources = {
  // Vite public/ directory serves the root images
  Ball: new ImageSource("./images/sword.png"), 
  BackgroundCat: new ImageSource("./images/BackgroundCat.jpg"),
  Title: new ImageSource("./images/TitleScreen.png"),
  StartButton: new ImageSource("./images/Start.png"),

  Goal: new ImageSource("./images/Goal.png"),
  Wall: new ImageSource("./images/Wall.png"),
  // Music
  BackgroundMusic: new Sound('./sounds/BackgroundMusic.ogg'),
  // Sound
  LoseSound: new Sound('./sounds/Deltarune-Explosion.mp3'),
  HighScoreSound: new Sound('./sounds/FnafKidCheer.mp3'),
  WinSound: new Sound('./sounds/bup.mp3'),

} as const; // the 'as const' is a neat typescript trick to get strong typing on your resources. 

Resources.BackgroundMusic.loop = true;
Resources.BackgroundCat.wrapping = {x: ImageWrapping.Repeat, y: ImageWrapping.Repeat};

export const Configs = {
} as const;

// We build a loader and add all of our resources to the boot loader
// You can build your own loader by extending DefaultLoader
export const loader = new DefaultLoader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
