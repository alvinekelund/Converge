import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Message {
  role: "agent" | "user";
  content: string;
}

type Category = "Experience" | "Education" | "Projects" | "Extracurriculars" | "Preferences" | "Skills";

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Ready to say goodbye to CVs and Cover Letters for good? Just drop your CV, portfolio, LinkedIn, or GitHub, and I'll start building your profile.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categoryProgress, setCategoryProgress] = useState<Record<Category, number>>({
    Experience: 0,
    Education: 0,
    Projects: 0,
    Extracurriculars: 0,
    Preferences: 0,
    Skills: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: Category[] = ["Experience", "Education", "Projects", "Extracurriculars", "Preferences", "Skills"];

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { role: "user", content: inputValue }]);
      setInputValue("");
      // TODO: Send to AI and get response
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const agentMessages = messages.filter(m => m.role === "agent");

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Upper Section - Categories */}
      <div className="h-[55%] border-b border-border p-6 overflow-hidden">
        <div className="h-full flex flex-col gap-3">
          {/* Selected Category Expanded View */}
          {selectedCategory && (
            <Card className="flex-1 p-6 overflow-auto relative">
              <div className="absolute inset-0 bg-primary/5" style={{ width: `${categoryProgress[selectedCategory]}%` }} />
              <div className="relative">
                <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
                <p className="text-muted-foreground">
                  {categoryProgress[selectedCategory]}% complete
                </p>
                {/* TODO: Add category-specific content here */}
              </div>
            </Card>
          )}
          
          {/* Category Boxes */}
          <div className={`grid grid-cols-6 gap-3 ${selectedCategory ? 'h-[10%]' : 'h-full'}`}>
            {categories.map((category) => (
              <Card
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`relative overflow-hidden cursor-pointer transition-all hover:border-primary/50 ${
                  selectedCategory === category ? 'opacity-50' : ''
                }`}
              >
                <div 
                  className="absolute inset-0 bg-primary/10 transition-all"
                  style={{ height: `${categoryProgress[category]}%`, bottom: 0, top: 'auto' }}
                />
                <div className="relative h-full flex items-center justify-center p-4">
                  <p className="text-sm font-medium text-center">{category}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Section - AI Chat Only */}
      <div className="h-[45%] flex flex-col">
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {agentMessages.map((message, index) => (
              <div key={index} className="flex justify-start">
                <div className="rounded-2xl px-6 py-4 max-w-[80%] bg-card border border-border">
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Bar */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type, paste a link, or just tell me..."
                  className="pr-24 py-6 text-base bg-background border-border rounded-2xl"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      // TODO: Implement voice input
                    }}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    // TODO: Handle file upload
                    console.log("File selected:", e.target.files?.[0]);
                  }}
                />
              </div>
              <Button
                size="icon"
                onClick={handleSend}
                className="h-12 w-12 rounded-full"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
