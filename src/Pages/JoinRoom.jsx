import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./join.css";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.trim() !== "") {
      navigate(`/editor/${roomId}`);
    }
  };

  return (
    <div className="join-container">
      <div className="join-box">
        <h2>Enter Room Code</h2>

        <input
          type="text"
          placeholder="Enter code (e.g. 66)"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button onClick={handleJoin}>
          🚀 Join Room
        </button>
      </div>
    </div>
  );
}

export default JoinRoom;