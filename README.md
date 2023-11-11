# expo-2d-game-engine

React Native 2D game engine built on expo-gl and expo-2d-context

![expo-2d-game-engine demo on phone](docs/demo.gif)

## How to use

Clone this repository:

    git clone https://github.com/tomsoderlund/expo-2d-game-engine.git [MY_APP]
    
    cd [MY_APP]

Remove the `.git` folder since you want to create a new repository

    rm -rf .git

Install dependencies:

    bun install

Start Expo for native apps:

    bun run dev

## Create builds for TestFlight and App Store

(Replace `ios` with `android` for Google Play)

    bun build:ios  # create a build with EAS
    bun submit:ios  # send the build to Apple/Google
