// client/src/pages/home/index.js

import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

const Home = ({userName, setUserName, room, setRoom, socket}) => {

    const navigate = useNavigate();


const joinRoom = () => {
  if (room !== "" && userName !== "") {
    socket.emit("join_room", { userName, room });
  }

  navigate("/chat", { replace: true });
};


  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>Darshan's Chat Room</>`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) => setUserName(e.target.value)}
        />

        <select
          className={styles.input}
          nChange={(e) => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

       <button
          className='btn btn-secondary'
          style={{ width: '100%' }}
          onClick={joinRoom} // Add this
        >
          Join Room
        </button>

      </div>
    </div>
  );
  
};

export default Home;
