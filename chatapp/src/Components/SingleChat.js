import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import "./styles.css"
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from '../animations/typing.json'

// const ENDPOINT = "http://localhost:5000"; 
const ENDPOINT = "https://connexa.onrender.com";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState()
  const [socketConnected, setSocketConnected] = useState(false)
  const [istyping, setIsTyping] = useState(false)
  const [typing, setTyping] = useState(false)

  const defaultOptions =  {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }

  }
  
  const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

  const toast = useToast();

  // console.log('selectedchat: ', selectedChat._id);

  const fetchMessages = async () => {
    if(!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      setLoading(true)

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`, config
      );

      
      setMessages(data);
      setLoading(false)
      // console.log("api/message/: ", selectedChat._id);
      
      socket.emit("join chat", selectedChat._id)

    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to Load the Message",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat])

  console.log('notifications:', notification);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
        //give notification
        if(!notification.includes(newMessageReceived)){
          setNotification([newMessageReceived, ...notification])
        }

      }else {
        setMessages([...messages, newMessageReceived]);
        setFetchAgain(!fetchAgain)
      }
    })
  })

  const sendMessage = async (event) => {
    
    if(event.key === 'Enter' && newMessage){
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.data.token}`
          },
        };

        console.log('content', newMessage);
        console.log(`chatId: ${selectedChat._id} and chatName: `);
        setNewMessage("");
        const {data} = await axios.post('/api/message', {
          content: newMessage,
          chatId: selectedChat._id,
        }, config);

        console.log('data: ', data);

        socket.emit('new message', data)
        setMessages([...messages, data])
      } catch (error) {
          toast({
            title: "Error Occured",
            description: "Failed to Send the Message",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
      
    }
  }
}



  
  const typingHandler = (e) => {
    setNewMessage(e.target.value)

    if(!socketConnected) return;

    if(!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }

    let lastTypingTime = new Date().getTime(); 
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (typing && timeDiff >=  timerLength) {
        socket.emit('stop typing', selectedChat._id)
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "24px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            <div className="messages">
              <ScrollableChat messages={messages} />
            </div>
            {loading ? (
              <Spinner
                size="lg"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <>{/* Messages */}</>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {istyping ? <div>
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{marginBottom: 15, marginLeft: 0}}
                />
              </div> : <></>}
              <Input
                variant="filled"
                bg="#e0e0e0"
                placeholder="Enter a Message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
