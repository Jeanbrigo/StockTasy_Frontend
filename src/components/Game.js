import { Link } from "react-router-dom";
import React from "react";

const Game = (props) => {

  const game = props.game;

  return (
    <div class="game">
      <Link to={`/game/${game.id}`}>
        <h1>Game ID: {game.id}</h1>
      </Link>

    </div>
  );
};

export default Game;