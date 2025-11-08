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
      <main className="flex-1 flex items-center justify-center p-12">
        <div className="max-w-4xl w-full space-y-6">
          <h1 className="text-3xl font-serif font-bold text-foreground tracking-tight leading-tight">
            You're in demand. New invitations are waiting.
          </h1>

          {/* Invitation List */}
          <div className="space-y-4">
            {/* Invitation Item */}
            <Card className="w-full rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-6">
                  {/* Left: Company & Role */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm mb-2">Neural Dynamics Inc.</h3>
                    <h2 className="text-lg font-serif font-bold text-foreground mb-2">
                      AI Research
                    </h2>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Helsinki / Remote</span>
                      <span>June - Aug 2026</span>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex gap-4 items-center flex-shrink-0">
                    <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Reject
                    </button>
                    <Button 
                      className="text-black hover:opacity-90 text-sm h-9 px-4"
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
