# Tenzies

A fun React-based dice game built with Vite where the goal is to roll until all 10 dice show the same value.

## Overview

Tenzies is a simple but engaging game inspired by the classic dice puzzle. Players roll the dice, hold any die they want to keep, and continue rolling until every die matches. The app tracks the number of rolls and elapsed time, and it celebrates a win with confetti.

## Features

- Randomized dice generation for each new game
- Hold/unhold individual dice between rolls
- Roll counter and timer
- Win state with confetti animation
- Accessible UI with screen-reader announcements and keyboard-friendly buttons

## Tech Stack

- React
- Vite
- nanoid
- react-confetti

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the local Vite URL shown in the terminal.

## Gameplay

1. Click the Roll button to roll all unheld dice.
2. Click any die to freeze it at its current value.
3. Keep rolling until all dice show the same number.
4. When you win, a new game can be started with the button that appears.

## Project Structure

- `App.jsx`: Main game logic, state management, timer, roll counter, and win condition
- `Die.jsx`: Individual die component
- `index.css`: Styling for the app
- `package.json`: Project dependencies and scripts

## Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — preview the production build locally
