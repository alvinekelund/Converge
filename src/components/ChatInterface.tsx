import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "agent" | "user";
  content: string;
}

type Category = string;

const ChatInterface = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content: "Ready to say goodbye to CVs and Cover Letters for good? Just drop anything relevant about you, and I'll start building your profile.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([
    "Experience",
    "Education", 
    "Projects",
    "Extracurriculars",
    "Preferences",
    "Skills"
  ]);
  const [categoryProgress, setCategoryProgress] = useState<Record<Category, number>>({
    Experience: 0,
    Education: 0,
    Projects: 0,
    Extracurriculars: 0,
    Preferences: 0,
    Skills: 0,
  });
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (inputValue.trim() || attachedFile) {
      const content = attachedFile 
        ? `${inputValue.trim() ? inputValue + ' ' : ''}📄 ${attachedFile.name}`
        : inputValue;
      setMessages([...messages, { role: "user", content }]);
      setInputValue("");
      setAttachedFile(null);
      setIsThinking(true);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type === "application/pdf") {
      setAttachedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
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

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      const newCategory = newCategoryName.trim();
      setCategories([...categories, newCategory]);
      setCategoryProgress({ ...categoryProgress, [newCategory]: 0 });
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  const handleAddCategoryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddCategory();
    } else if (e.key === "Escape") {
      setIsAddingCategory(false);
      setNewCategoryName("");
    }
  };

  const agentMessages = messages.filter(m => m.role === "agent");
  const gridCols = Math.min(categories.length + 1, 7);

  const ThinkingDots = () => (
    <span className="inline-flex gap-0.5">
      <span className="animate-[pulse_1s_ease-in-out_0s_infinite] opacity-40">.</span>
      <span className="animate-[pulse_1s_ease-in-out_0.2s_infinite] opacity-40">.</span>
      <span className="animate-[pulse_1s_ease-in-out_0.4s_infinite] opacity-40">.</span>
    </span>
  );

  return (
    <div 
      className="flex flex-col h-screen bg-background relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-primary/10 border-4 border-dashed border-primary flex items-center justify-center">
          <p className="text-2xl font-medium text-primary">Drop PDF here</p>
        </div>
      )}
      {/* Upper Section - Categories */}
      <div className={`border-b border-border p-6 overflow-hidden transition-all duration-300 ${selectedCategory ? 'h-[55%]' : 'h-[15%]'}`}>
        <div className="h-full flex flex-col gap-3">
          {/* Selected Category Expanded View */}
          {selectedCategory && (
            <Card className="flex-1 p-6 overflow-auto relative animate-fade-in">
              <div className="absolute inset-0 bg-primary/5 transition-all duration-500" style={{ width: `${categoryProgress[selectedCategory]}%` }} />
              <div className="relative">
                <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
                {categoryProgress[selectedCategory] === 0 ? (
                  <p className="text-muted-foreground flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                    {isThinking ? (
                      "Briefing your agent..."
                    ) : (
                      <>
                        {selectedCategory === "Experience" && "Work, tasks, responsibilities, leadership..."}
                        {selectedCategory === "Education" && "Degrees, grades, coursework, research..."}
                        {selectedCategory === "Projects" && "Passion projects, school projects, hackathons..."}
                        {selectedCategory === "Extracurriculars" && "Volunteering, activities, societies, initiatives..."}
                        {selectedCategory === "Preferences" && "Location, timing, industry, function..."}
                        {selectedCategory === "Skills" && "Languages, technical..."}
                        {!["Experience", "Education", "Projects", "Extracurriculars", "Preferences", "Skills"].includes(selectedCategory) && "Ready when you are"}
                      </>
                    )}
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    {categoryProgress[selectedCategory]}% complete
                  </p>
                )}
                {/* TODO: Add category-specific content here */}
              </div>
            </Card>
          )}
          
          {/* Category Boxes */}
          <div 
            className={`${selectedCategory ? 'grid gap-3 h-[26%]' : 'flex gap-4 overflow-x-auto pb-2 h-full'}`}
            style={selectedCategory ? { gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` } : {}}
          >
            {categories.map((category) => (
              <Card
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`relative overflow-hidden cursor-pointer transition-all hover:border-primary/50 hover-scale ${
                  selectedCategory === category ? 'opacity-50' : ''
                } ${selectedCategory ? '' : 'min-w-[180px] h-full flex-shrink-0'}`}
              >
                <div 
                  className="absolute inset-0 bg-primary/10 transition-all duration-500"
                  style={{ height: `${categoryProgress[category]}%`, bottom: 0, top: 'auto' }}
                />
                <div className={`relative h-full flex flex-col items-center justify-center ${selectedCategory ? 'p-4' : 'p-4'}`}>
                  <p className={`font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full ${selectedCategory ? 'text-xs' : 'text-sm'}`}>
                    {category}{isThinking && <ThinkingDots />}
                  </p>
                </div>
              </Card>
            ))}
            
            {/* Add Category Button */}
            {isAddingCategory ? (
              <Card className={`relative overflow-hidden transition-all animate-scale-in ${selectedCategory ? '' : 'min-w-[180px] h-full flex-shrink-0'}`}>
                <div className={`h-full flex items-center justify-center ${selectedCategory ? 'p-4' : 'p-4'}`}>
                  <Input
                    autoFocus
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={handleAddCategoryKeyPress}
                    onBlur={handleAddCategory}
                    placeholder="Category name"
                    className="h-8 text-sm text-center border-none focus-visible:ring-1"
                  />
                </div>
              </Card>
            ) : (
              <Card
                onClick={() => setIsAddingCategory(true)}
                className={`relative overflow-hidden cursor-pointer transition-all hover:border-primary/50 hover-scale bg-muted/20 ${selectedCategory ? '' : 'min-w-[180px] h-full flex-shrink-0'}`}
              >
                <div className={`h-full flex items-center justify-center ${selectedCategory ? 'p-4' : 'p-4'}`}>
                  <span className="text-3xl font-light text-muted-foreground">+</span>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Lower Section - AI Chat Only */}
      <div className={`flex flex-col transition-all duration-300 ${selectedCategory ? 'h-[45%]' : 'h-[85%]'}`}>
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mt-12 max-w-[70%]">
              <h1 className="text-5xl font-serif leading-tight mb-6">
                Ready to say goodbye to CVs and Cover Letters for good?
              </h1>
              <p className="text-xl text-muted-foreground font-sans leading-relaxed">
                Just drop anything relevant about you, and I'll start building your profile.
              </p>
            </div>
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
                {attachedFile && (
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-muted px-2 py-1 rounded-md">
                    <Paperclip className="h-3 w-3" />
                    <span className="text-xs max-w-[150px] truncate">{attachedFile.name}</span>
                    <button 
                      onClick={() => setAttachedFile(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </div>
                )}
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
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileSelect(file);
                    }
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
              <Button
                onClick={() => navigate("/talent-dashboard")}
                className="h-12 px-6 rounded-full text-black font-medium hover:opacity-90"
                style={{ backgroundColor: "#cde75e" }}
              >
                Start recruiting
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
