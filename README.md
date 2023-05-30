# React Native Minesweeper

The Minesweeper game implemented using React Native.

## Description

Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field (source: [Wikipedia](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>)).

## Screenshots

The game comes in three modes:

- Beginner (9 rows, 9 columns, 10 bombs)
- Intermediate (16 rows, 16 columns, 40 bombs)
- Expert (30 rows, 16 columns, 99 bombs)

<img src="https://user-images.githubusercontent.com/15303963/86185335-7f6be300-bb0c-11ea-9e4a-fcecd10b05bd.png" width="250">

<img src="https://user-images.githubusercontent.com/15303963/86185347-8692f100-bb0c-11ea-913e-61a9ed548a8a.png" width="250">

<img src="https://user-images.githubusercontent.com/15303963/86185344-8561c400-bb0c-11ea-8f24-5365c8d6e8d6.png" width="250">

## Starting the app

First you have to install the dependencies

```
yarn install
```

Then run:

```
yarn ios
```

Or, if you prefer android:

```
yarn android
```

## Rules of the game

The first click will never be a mine. It will clear the map and place numbers on the grid. The numbers reflect the number of mines touching a square (source: [Wikipedia](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>)).

## Technical Details

The app structure was generated using the React Native CLI

### Main Characteristics

The main dependencies used on this project are just React, React Native and Redux. Redux is not actually necessary for the state management considering it's a straightforward app, but it was chosen to use it to better separate concerns accross the components, and to minimize the re-renders caused by prop drilling (even what could be unnecessary React.memo dependency comparisons).

## Known Limitations

The app performs well on regular boards as the configured ones, but when the amount of cells increase (e.g. 100 rows x 100 columns), some delays can be seen in the UI. This has been mitigated by avoiding every component re-render that isn't strictly necessary, but when a big amout of cells are revealed (e.g. game has ended) re-renders can't be avoided. The main limitations here are the way how React works and the resources that mobile devices have.

One way to drastically improve performance on these cases is to use virtualization like the one `FlatList` and `VirtualizedList` offer, so only the necessary components are rendered. Unfortunately, neither of those components provided by React Native support scrolling in both axis, as it's needed for the proposed UI, so having a 100 rows x 100 columns board will always have to render the massive amount of 10,000 Views, and that's where React Native struggles.

There are implementations for this use case in React, but none of them support React Native, so one way to fix this problem would be to implement some kind of virtualized grid that support what's needed.
