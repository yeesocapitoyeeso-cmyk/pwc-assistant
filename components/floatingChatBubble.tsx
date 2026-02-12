'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatComponent from './chatComponent';
import { useChatContext } from './chatContext';

export default function FloatingChatBubble() {
  const { isOpen, setIsOpen, initialMessage } = useChatContext();
  const [showMessage, setShowMessage] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const floatingMessages = [
    "Hi! Need help with enrollment?",
    "Want to know about our programs?",
    "Have questions? Chat with me!",
    "Looking for campus info?",
    "Need assistance? I'm here!",
  ];

  useEffect(() => { 
    if (!isOpen) {
      // Show message every 10 seconds
      const messageInterval = setInterval(() => {
        setShowMessage(true);
        setMessageIndex((prev) => (prev + 1) % floatingMessages.length);
        
        // Hide message after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      }, 10000);

      // Show first message after 3 seconds
      const initialTimeout = setTimeout(() => {
        setShowMessage(true);
      }, 3000);

      return () => {
        clearInterval(messageInterval);
        clearTimeout(initialTimeout);
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {/* Floating Message Above Bubble */}
          {showMessage && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute bottom-20 right-0 mb-2 max-w-xs"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-4 py-3 relative">
                <p className="text-sm text-gray-700 font-medium">
                  {floatingMessages[messageIndex]}
                </p>
                {/* Arrow pointer */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Bubble Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-red-700 text-white shadow-2xl hover:bg-red-800 transition-colors flex items-center justify-center relative"
          animate={{
            boxShadow: isOpen
              ? '0 10px 40px rgba(185, 28, 28, 0.3)'
              : '0 10px 40px rgba(185, 28, 28, 0.5)',
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification Dot */}
          {!isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            />
          )}
        </motion.button>
      </div>

      {/* Chat Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Chat Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-2xl"
            >
              <ChatComponent initialMessage={initialMessage} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}