'use client';

import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const openChatWithMessage = (message) => {
    setInitialMessage(message);
    setIsOpen(true);
  };

  return (
    <ChatContext.Provider value={{ isOpen, setIsOpen, initialMessage, setInitialMessage, openChatWithMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
};