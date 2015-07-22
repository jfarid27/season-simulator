# season-simulator

## Introduction

This is a small library that by default computes probabilities
given a sports season comprised of a table of team results and
remaining games. By default it, uses equiprobability assumptions
for game outcomes of wins losses and ties.

Basic usage can be found in defaultRun.js. One simply needs to 
supply an observable, a season object, a starting observation counts,
and the simulation function found in *src/transition.js* to the
defaultSimulation method in *src/seasons.js*  Note the use of 
observation counts and the observable function. It can be used 
to compute multiple observables. Make sure it returns observation
counts, as updating observations needs to be associative to
properly compute.


## Installation

```bash
npm install
```

## Testing

```bash
npm test
```

## Basic Type Manifest

```haskell
data Game = {
    home :: String,
    away :: String,
    outcome :: "W" | "L" | "T"
}

data TeamResult = {
    name :: String,
    wins :: Number,
    losses :: Number,
    draws :: Number,
    points :: Number | undefined
}

data Season = {
    table :: [TeamResult]
    games :: [Game]
}

observable :: Season, ObservationCounts, Params 
    -> ObservationCounts 

```
