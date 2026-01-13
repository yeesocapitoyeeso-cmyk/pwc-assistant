import Image from "next/image";
import HeroSection from "@/components/hero";
import { div } from "framer-motion/client";
import FloatingChatBubble from "@/components/floatingChatBubble";
export default function Home() {
  return (
    <div >
      <HeroSection />
      <FloatingChatBubble />
    </div>
  );
}
