import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TalentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Agent Sidebar */}
      <aside className="w-80 border-r border-border p-8 space-y-8" style={{ backgroundColor: '#E8E8E8' }}>
        <h2 className="text-3xl font-serif font-bold text-foreground">
          Your Agent is Ready
        </h2>

        <div className="space-y-4">
          {/* Module 1: Core Skills */}
          <button
            onClick={() => navigate("/profiles")}
            className="w-full text-left"
          >
            <Card className="p-4 border border-border rounded-lg bg-white hover:shadow-sm transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-2">Core Skills</h3>
              <p className="text-sm text-muted-foreground">Configured</p>
            </Card>
          </button>

          {/* Module 2: Career Aspirations */}
          <button
            onClick={() => navigate("/profiles")}
            className="w-full text-left"
          >
            <Card className="p-4 border border-border rounded-lg bg-white hover:shadow-sm transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-2">Career Aspirations</h3>
              <p className="text-sm text-muted-foreground">
                Your agent needs to know your dream job to find it. Let's talk.
              </p>
            </Card>
          </button>

          {/* Module 3: Project Highlights - ACTIVE */}
          <button
            onClick={() => navigate("/profiles")}
            className="w-full text-left"
          >
            <Card className="p-4 border border-border rounded-lg bg-white hover:shadow-sm transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-2">Project Highlights</h3>
              <p className="text-sm text-foreground flex items-center gap-1.5">
                <Check className="w-4 h-4" style={{ color: '#D4FF5E' }} />
                Active
              </p>
            </Card>
          </button>

          {/* Upgrade Button */}
          <Button
            onClick={() => navigate("/candidate")}
            className="w-full bg-black text-white hover:bg-black/90 rounded-lg py-6"
          >
            Upgrade your agent
          </Button>
        </div>
      </aside>

      {/* Right Column - Invitations */}
      <main className="flex-1 p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight leading-tight">
            You're in demand. New invitations are waiting.
          </h1>

          {/* Invitation List */}
          <div className="space-y-4">
            {/* Invitation Item */}
            <Card className="w-full rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  {/* Left: Logo & Company */}
                  <div className="flex items-center gap-4 min-w-[240px]">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">Neural Dynamics Inc.</h3>
                    </div>
                  </div>

                  {/* Middle: Role & Details */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                      AI Research Intern
                    </h2>
                    <div className="flex gap-4 text-muted-foreground">
                      <span>📍 Helsinki / Remote</span>
                      <span>📅 June - Aug 2026</span>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex gap-3 flex-shrink-0">
                    <Button 
                      variant="outline" 
                      className="border-border hover:bg-muted"
                    >
                      Reject
                    </Button>
                    <Button 
                      className="text-black hover:opacity-90"
                      style={{ backgroundColor: '#D4FF5E' }}
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional invitation items can be added here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TalentDashboard;
