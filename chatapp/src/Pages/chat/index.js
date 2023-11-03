import styles from "./styles.module.css";
import Messages from "./messages";

const Chat = ({ socket }) => {
  return (
    <div className={styles.chatContainer}>
      <div>
      <Messages socket = {socket} />
        {/* <Messages socket={socket} /> */}
      </div>
    </div>
  );
};

export default Chat;