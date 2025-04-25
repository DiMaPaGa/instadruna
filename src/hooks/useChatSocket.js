import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useChatSocket = (userId, otherUserId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io('http://192.168.1.168:3000', {
      auth: { userId, otherUserId },
    });

    socket.on('connect', () => {
      console.log('Conectado al chat');
    });

    socket.on('chat message', (msg, serverOffset, username) => {
      setMessages((prevMessages) => [...prevMessages, { msg, user: username }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, otherUserId]);

  const sendMessage = (message) => {
    const socket = io('http://192.168.1.168:3000');
    socket.emit('chat message', message);
  };

  return { messages, sendMessage };
};

export default useChatSocket;