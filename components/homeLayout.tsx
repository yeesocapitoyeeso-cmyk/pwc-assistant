import { ChatProvider } from './chatContext';
import FloatingChatBubble from './floatingChatBubble';

export default function HomeLayout({ children }) {
  return (
    <ChatProvider>
      {children}
      <FloatingChatBubble />
    </ChatProvider>
  );
}