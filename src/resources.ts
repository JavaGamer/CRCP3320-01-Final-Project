import { DefaultLoader, ImageSource } from "excalibur";

// It is convenient to put your resources in one place
export const Resources = {
  Ball: new ImageSource("./images/sword.png") // Vite public/ directory serves the root images
} as const; // the 'as const' is a neat typescript trick to get strong typing on your resources. 

export const Configs = {
} as const;

// We build a loader and add all of our resources to the boot loader
// You can build your own loader by extending DefaultLoader
export const loader = new DefaultLoader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
