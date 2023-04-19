import React from "react";
import { GlobalCtx } from "../App";

const Dashboard = (props) => {
  const { gState, setGState } = React.useContext(GlobalCtx);
  const { url, token } = gState;
  const [notes, setNotes] = React.useState(null);

  const getNotes = async () => {
    const response = await fetch(url + "/note/", {
      method: "get",
      headers: {
        Authorization: "bearer " + token,
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  React.useEffect(() => {
    getNotes();
  }, []);

  const input = React.useRef(null);

  const handleClick = (event) => {
    const note = input.current.value;
    fetch(url + "/note/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ note }),
    })
      .then((response) => response.json())
      .then((data) => {
        input.current.value = "";
        getNotes();
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>New Note</h2>
      <input type="text" name="note" ref={input} />
      <button onClick={handleClick}>Create Note</button>
      <h2>Notes</h2>
      <ul>
        {notes ? notes.map((note) => (
          <li key={notes._id}><h3>{note.note}</h3></li>
        )) : null}
      </ul>
    </div>
  );
};

export default Dashboard;
