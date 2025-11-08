import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TalentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 py-8">
        {/* Invitations Section */}
        <section className="space-y-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-center text-foreground tracking-tight leading-tight">
            You're in demand. New invitations are waiting.
          </h1>

          {/* Invitation Card Stack */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Ghosted cards behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Card className="absolute w-[380px] h-[420px] rotate-[-3deg] translate-y-4 opacity-30 blur-sm bg-card/50" />
              <Card className="absolute w-[380px] h-[420px] rotate-[2deg] translate-y-2 opacity-50 blur-[2px] bg-card/70" />
            </div>

            {/* Main invitation card */}
            <Card className="relative w-[400px] h-[440px] shadow-2xl bg-card border-2 z-10">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                {/* Company Logo & Name */}
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-lg">
                    <Briefcase className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Neural Dynamics Inc.</h2>
                </div>

                {/* Role Name */}
                <div className="text-center">
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-6">
                    AI Research Intern
                  </h3>
                  
                  {/* Key Details */}
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-lg">📍 Helsinki / Remote</p>
                    <p className="text-lg">📅 June - Aug 2026</p>
                  </div>
                </div>

                {/* See More Button */}
                <Button variant="outline" className="w-full">
                  See More Details
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-8">
            <Button 
              size="lg"
              variant="destructive"
              className="w-32 h-32 rounded-full text-2xl shadow-2xl hover:scale-110 transition-transform"
            >
              <X className="w-12 h-12" />
            </Button>
            <Button 
              size="lg"
              className="w-32 h-32 rounded-full text-2xl shadow-2xl hover:scale-110 transition-transform bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-12 h-12" />
            </Button>
          </div>
        </section>

        {/* Agent Section */}
        <section className="space-y-12 pb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-center text-foreground tracking-tight leading-tight">
            Your Agent is Ready
          </h1>

          {/* Neural Network Visualization */}
          <div className="relative h-[400px] flex items-center justify-center">
            {/* Central Core - Clickable */}
            <button
              onClick={() => navigate("/profiles")}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-2xl flex items-center justify-center z-20 hover:scale-110 transition-all duration-300 border-4 border-primary/30"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-foreground/20 to-transparent animate-pulse" />
            </button>

            {/* Module 1: Core Skills - Top Left */}
            <div className="absolute top-8 left-[10%] animate-fade-in">
              <Card className="w-56 p-4 shadow-lg border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-2">Core Skills</h3>
                <p className="text-sm text-muted-foreground">Configured</p>
              </Card>
              <svg className="absolute top-1/2 left-full w-32 h-1 -translate-y-1/2" style={{ zIndex: -1 }}>
                <line x1="0" y1="0" x2="128" y2="0" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>

            {/* Module 2: Career Aspirations - Top Right - PULSING */}
            <div className="absolute top-8 right-[10%] animate-fade-in">
              <Card className="w-56 p-4 shadow-lg border-2 border-orange-500 animate-pulse">
                <h3 className="text-lg font-semibold text-foreground mb-2">Career Aspirations</h3>
                <p className="text-sm text-orange-600 font-medium">Your agent needs to know your dream job to find it. Let's talk.</p>
              </Card>
              <svg className="absolute top-1/2 right-full w-32 h-1 -translate-y-1/2" style={{ zIndex: -1 }}>
                <line x1="0" y1="0" x2="128" y2="0" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>

            {/* Module 3: Project Highlights - Bottom - ACTIVE */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-fade-in">
              <Card className="w-56 p-4 shadow-lg border-2 border-green-500 shadow-green-500/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">Project Highlights</h3>
                <p className="text-sm text-green-600 font-medium">✓ Active</p>
              </Card>
              <svg className="absolute bottom-full left-1/2 w-1 h-24 -translate-x-1/2" style={{ zIndex: -1 }}>
                <line x1="0" y1="0" x2="0" y2="96" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TalentDashboard;
