import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TalentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Agent Sidebar */}
      <aside className="w-80 border-r border-border p-8 space-y-8">
        <h2 className="text-3xl font-serif font-bold text-foreground">
          Your Agent is Ready
        </h2>

        <div className="space-y-6">
          {/* Module 1: Core Skills */}
          <button
            onClick={() => navigate("/profiles")}
            className="w-full text-left"
          >
            <Card className="p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-2">Core Skills</h3>
              <p className="text-sm text-muted-foreground">Configured</p>
            </Card>
          </button>

          {/* Module 2: Career Aspirations - PULSING */}
          <button
            onClick={() => navigate("/profiles")}
            className="w-full text-left"
          >
            <Card className="p-4 border-2 border-orange-500 animate-pulse hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-2">Career Aspirations</h3>
              <p className="text-sm text-orange-600 font-medium">
                Your agent needs to know your dream job to find it. Let's talk.
              </p>
            </Card>
          </button>

          {/* Module 3: Project Highlights - ACTIVE */}
          <button
            onClick={() => navigate("/profiles")}
            className="w-full text-left"
          >
            <Card className="p-4 border-2 border-green-500 shadow-green-500/20 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-2">Project Highlights</h3>
              <p className="text-sm text-green-600 font-medium">✓ Active</p>
            </Card>
          </button>
        </div>
      </aside>

      {/* Right Column - Invitations */}
      <main className="flex-1 p-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight leading-tight">
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
        </div>
      </main>
    </div>
  );
};

export default TalentDashboard;
