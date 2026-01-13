'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Settings, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from './chatContext';

export default function ChatComponent({ initialMessage }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m the PWC Davao AI Assistant. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Customizable settings
  const [botName, setBotName] = useState('PWC Davao AI Assistant');
  const [botSubtitle, setBotSubtitle] = useState('Always here to help');
  const [userName, setUserName] = useState('You');
  const [botIcon, setBotIcon] = useState('🤖');
  const [userIcon, setUserIcon] = useState('👤');
  
  // Temporary settings for editing
  const [tempBotName, setTempBotName] = useState(botName);
  const [tempBotSubtitle, setTempBotSubtitle] = useState(botSubtitle);
  const [tempUserName, setTempUserName] = useState(userName);
  const [tempBotIcon, setTempBotIcon] = useState(botIcon);
  const [tempUserIcon, setTempUserIcon] = useState(userIcon);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { setInitialMessage } = useChatContext();
  const hasProcessedInitialMessage = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialMessage && !hasProcessedInitialMessage.current) {
      hasProcessedInitialMessage.current = true;
      handleSendMessage(initialMessage);
      setInitialMessage('');
    }
  }, [initialMessage]);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = messageText.trim();
    
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Sorry, I could not process that.' },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      handleSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSaveSettings = () => {
    setBotName(tempBotName);
    setBotSubtitle(tempBotSubtitle);
    setUserName(tempUserName);
    setBotIcon(tempBotIcon);
    setUserIcon(tempUserIcon);
    setShowSettings(false);
  };

  const handleCancelSettings = () => {
    setTempBotName(botName);
    setTempBotSubtitle(botSubtitle);
    setTempUserName(userName);
    setTempBotIcon(botIcon);
    setTempUserIcon(userIcon);
    setShowSettings(false);
  };

  return (
    <div className="flex flex-col h-[550px] w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      
      {/* Header - PWC Red Theme */}
      <div className="px-4 py-3 bg-[#C8102E] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{botName}</h3>
              <p className="text-xs text-white/80">{botSubtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="p-1.5 rounded hover:bg-white/20 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-6 h-6 rounded flex items-center justify-center text-xs ${message.role === 'user' ? 'bg-gray-700' : 'bg-[#C8102E]'} text-white`}>
                {message.role === 'user' ? userIcon : botIcon}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] px-3 py-2 rounded-lg ${message.role === 'user' ? 'bg-[#C8102E] text-white' : 'bg-white border border-gray-200 text-gray-800'}`}>
                <p className="text-xs leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded bg-[#C8102E] flex items-center justify-center text-xs text-white">
              {botIcon}
            </div>
            <div className="bg-white border border-gray-200 px-3 py-2 rounded-lg">
              <div className="flex items-center gap-1.5">
                <div className="flex space-x-0.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-gray-500">Typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about PWC Davao..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E] disabled:bg-gray-100"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="px-3 py-2 rounded bg-[#C8102E] text-white hover:bg-[#A80D26] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <div className="mt-1 text-[10px] text-gray-400 text-center">
          Press Enter to send
        </div>
      </div>

      {/* Settings Modal - Flat Design */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelSettings}
              className="fixed inset-0 bg-black/30 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg z-50 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-4 py-3 bg-[#C8102E] text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm">Customize Chat</h3>
                  <button
                    onClick={handleCancelSettings}
                    className="p-1 rounded hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Settings Content */}
              <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {/* Bot Settings */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                    <div className="w-6 h-6 rounded bg-[#C8102E] flex items-center justify-center text-white">
                      {tempBotIcon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">Bot Settings</h4>
                      <p className="text-xs text-gray-500">AI Assistant</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Bot Name
                    </label>
                    <input
                      type="text"
                      value={tempBotName}
                      onChange={(e) => setTempBotName(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Bot Subtitle
                    </label>
                    <input
                      type="text"
                      value={tempBotSubtitle}
                      onChange={(e) => setTempBotSubtitle(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Bot Emoji
                    </label>
                    <input
                      type="text"
                      value={tempBotIcon}
                      onChange={(e) => setTempBotIcon(e.target.value)}
                      maxLength={2}
                      className="w-full px-3 py-1.5 text-xl text-center rounded border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>
                </div>

                {/* User Settings */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 pb-2">
                    <div className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-white">
                      {tempUserIcon}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-900">Your Settings</h4>
                      <p className="text-xs text-gray-500">User Profile</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={tempUserName}
                      onChange={(e) => setTempUserName(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Your Emoji
                    </label>
                    <input
                      type="text"
                      value={tempUserIcon}
                      onChange={(e) => setTempUserIcon(e.target.value)}
                      maxLength={2}
                      className="w-full px-3 py-1.5 text-xl text-center rounded border border-gray-300 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex gap-2">
                <button
                  onClick={handleCancelSettings}
                  className="flex-1 px-3 py-2 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 px-3 py-2 text-sm rounded bg-[#C8102E] text-white hover:bg-[#A80D26] transition-colors flex items-center justify-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Save
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}