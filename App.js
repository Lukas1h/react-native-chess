import React, { useState, useEffect } from 'react';
import { View, Text, Touchable, StyleSheet } from 'react-native-kindle';
import { Game, moves } from 'js-chess-engine';

const App = ({isSinglePlayer = false}) => {
  const [game, setGame] = useState(new Game());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [isAITurn, setIsAITurn] = useState(false);
  const gameData = game.exportJson();
  const possibleMoves = moves(gameData);

  useEffect(() => {
    if (isAITurn) {
      makeAIMove();
    }
  }, [isAITurn]);

  const handleSquarePress = (square) => {
    const { from } = selectedSquare || {};

    if (from && possibleMoves[from]?.includes(square)) {
      game.move(from, square);
      setSelectedSquare(null);
      setGame(game);
      setIsAITurn(true);

    } else {
      setSelectedSquare({ from: square });
    }
  };

const makeAIMove = () => {
  if (isSinglePlayer) {
    const { bestMove } = game.aiMove();
    if (bestMove) {
      game.move(bestMove.from, bestMove.to);
      setGame(game);
    }
    setIsAITurn(false);
  }
};


  const renderSquare = (square) => {
    const piece = gameData.pieces[square];
    const isSelected = selectedSquare?.from === square;
    const squareMoves = possibleMoves[square];


    return (
      <Touchable
        key={square}
        style={[
          styles.square,
          {
            backgroundColor: isSelected ? 'grey' : 'white',
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
        onPress={() => handleSquarePress(square)}
      >
        <Text
          style={[
            styles.piece,
            {
              backgroundColor: isSelected ? 'grey' : 'white',
              fontSize: 40,
              fontWeight: 'bold',
              fontFamily: 'Bookerly Display',
            },
          ]}
        >
          {getPieceUnicode(piece)}
        </Text>
      </Touchable>
    );
  };

  const getPieceUnicode = (pieceD) => {

    let piece = {
      type: (pieceD ?? 'u').toLowerCase(),
      isWhite:( pieceD ?? '!') === (pieceD ?? '!').toUpperCase(),
    };

    switch (piece.type) {
      case 'k':
        return piece.isWhite ? '♔' : '♚';
      case 'q':
        return piece.isWhite ? '♕' : '♛';
      case 'r':
        return piece.isWhite ? '♖' : '♜';
      case 'b':
        return piece.isWhite ? '♗' : '♝';
      case 'n':
        return piece.isWhite ? '♘' : '♞';
      case 'p':
        return piece.isWhite ? '♙' : '♟';
      default:
        return '';
    }
  };

  const boardSquares = [];
  for (let row = 8; row >= 1; row--) {
    for (let col = 1; col <= 8; col++) {
      const square = String.fromCharCode(col + 64) + row;
      boardSquares.push(renderSquare(square));
    }
  }

  return (
    <View style={styles.container}>
      {isSinglePlayer  &&
      <Text
        style={{
          margin: 10,
          textAlign: 'center',
          fontSize: 30,
          fontWeight: 'bold',
        }}
      >
        {(isAITurn ? 'Thinking...' : 'Your Turn')}
      </Text>
      }
      <View style={styles.board}>{boardSquares}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60 * 11,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 60 * 8,
    height: 60 * 8,
  },
  square: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  piece: {
    fontSize: 24,
  },
});

export default App;
