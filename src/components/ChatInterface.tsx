import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  role: "agent" | "user";
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Ready to say goodbye to CVs and Cover Letters for good? Just drop your CV, portfolio, LinkedIn, or GitHub, and I'll start building your profile.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: inputValue }]);
    setInputValue("");
    
    // TODO: Process user input with AI
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-12 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {message.role === "agent" && (
                <Avatar className="h-12 w-12 shrink-0 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-semibold">
                    AI
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                  message.role === "agent"
                    ? "bg-muted/50 text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-base leading-relaxed">{message.content}</p>
              </div>
              
              {message.role === "user" && (
                <Avatar className="h-12 w-12 shrink-0 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">
                    You
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input bar */}
      <div className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto w-full px-6 py-6">
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => {
                // TODO: Handle file upload
                console.log("File selected:", e.target.files?.[0]);
              }}
            />
            
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 h-11 w-11 rounded-full hover:bg-muted"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type, paste a link, or just tell me..."
                className="pr-12 h-12 rounded-full border-2 focus-visible:ring-0 focus-visible:border-primary transition-colors"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full hover:bg-muted"
                onClick={() => {
                  // TODO: Handle voice input
                  console.log("Voice input clicked");
                }}
              >
                <Mic className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>

            <Button
              size="icon"
              className="shrink-0 h-11 w-11 rounded-full"
              onClick={handleSend}
              disabled={!inputValue.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
