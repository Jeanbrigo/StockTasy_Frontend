import React from "react";
import PlayerNumberInput from "../components/PlayerNumberSelector";
import BudgetInput from "../components/Budget";
import PointsInterval from "../components/PointsInterval";
import GameDuration from "../components/GameDurationDropdown";
import Game from "../components/Game";
import { GlobalCtx } from "../App";

const Dashboard = (props) => {
  const { gState, setGState } = React.useContext(GlobalCtx);
  const { url, token } = gState;
  const [games, setGames] = React.useState(null);
  const [updateID, setUpdateID] = React.useState(null);

  const getGames = async () => {
    const response = await fetch(url + "/game/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const json = await response.json();
    setGames(json);
  };

  React.useEffect(() => {
    getGames();
  }, []);

  const input = React.useRef(null);
  const update = React.useRef(null);

  const handleClick = (event) => {
    const game = input.current.value;
    fetch(url + "/game/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ game }),
    })
      .then((response) => response.json())
      .then((data) => {
        input.current.value = "";
        getGames();
      });
  };

  const handleUpdate = () => {
    const game = update.current.value;
    fetch(url + "/game/" + updateID, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ game }),
    })
      .then((response) => response.json())
      .then((data) => {
        update.current.value = "";
        setUpdateID(null);
        getGames();
      });
  };

  const handleDelete = (id) => {
    fetch(url + "/game/" + id, {
      method: "delete",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getGames();
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Start New Game</h2>
      <PlayerNumberInput/>
      <BudgetInput/>
      <PointsInterval/>
      <GameDuration/>
      <button onClick={handleClick}>Create Game</button>
      {/* <h2>Update Game</h2>
      <input type="text" name="note" ref={update} />
      <button onClick={handleUpdate}>Update</button> */}
      <h2>Games You Are Currently In:</h2>
      <ul>
        {games
          ? games.map((game) => (
              <Game key={game._id}
                // <h3>Game ID: {game._id}</h3>
                // <button onClick={() => handleDelete(note._id)}>Delete</button> */}
                // {/* <button
                //   onClick={() => {
                //     setUpdateID(note._id);
                //     update.current.value = note.note;
                //   }}
                // >
                //   Edit
                // </button>
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default Dashboard;
