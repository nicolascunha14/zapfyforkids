import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import AskQuestionModal from "@/components/AskQuestionModal";

export function ChatbotFab() {
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  const handleChatbotClick = () => {
    setIsQuestionModalOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleChatbotClick}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Abrir chatbot"
        >
          <Bot className="h-8 w-8 text-white group-hover:animate-bounce" />
        </Button>
      </div>
      
      <AskQuestionModal 
        isOpen={isQuestionModalOpen} 
        onClose={() => setIsQuestionModalOpen(false)} 
      />
    </>
  );
}