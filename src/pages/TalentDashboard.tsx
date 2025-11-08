import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Check, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TalentDashboard = () => {
  const navigate = useNavigate();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [invitations, setInvitations] = useState([
    { id: 1, company: "ClosedAI", role: "AI Research", location: "Helsinki / Remote", dates: "June - Aug 2026" },
    { id: 2, company: "Goldman Stanley", role: "Equity Research", location: "London", dates: "June - Aug 2026" },
    { id: 3, company: "Mega", role: "Product Management", location: "San Francisco", dates: "July - Sep 2026" }
  ]);

  const handleAccept = (id: number) => {
    setInvitations(invitations.filter(inv => inv.id !== id));
  };

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

          {/* Live Processes Button */}
          <Button
            className="w-full text-black hover:opacity-90 rounded-lg py-6 font-bold"
            style={{ backgroundColor: '#D4FF5E' }}
          >
            Live processes (1)
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
          <div className="space-y-5">
            {invitations.map((invitation) => (
              <Card key={invitation.id} className="w-full rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-6">
                    {/* Left: Company & Role */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm mb-2">{invitation.company}</h3>
                      <h2 className="text-lg font-serif font-bold text-foreground mb-2">
                        {invitation.role}
                      </h2>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{invitation.location}</span>
                        <span>{invitation.dates}</span>
                      </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <div className="flex gap-4 items-center">
                        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          Reject
                        </button>
                        <Button 
                          className="text-black hover:opacity-90 text-sm h-9 px-4 font-bold"
                          style={{ backgroundColor: '#D4FF5E' }}
                          onClick={() => handleAccept(invitation.id)}
                        >
                          Accept
                        </Button>
                      </div>
                      {invitation.id === 1 ? (
                        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              className="text-black text-sm h-9 w-full hover:opacity-80"
                              style={{ backgroundColor: '#E8E8E8' }}
                            >
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent 
                            className="max-w-none w-[70%] h-[70vh] p-0 border-0 overflow-hidden [&>button]:text-foreground"
                            style={{ backgroundColor: '#edebe5' }}
                          >
                            <div className="relative h-full overflow-hidden">
                              <div className="h-full overflow-y-auto px-8 py-6 scrollbar-hide">
                                <div className="space-y-6 pb-20">
                                  <div>
                                    <h3 className="font-semibold font-serif text-lg mb-2 text-foreground">Invitation Type</h3>
                                    <p className="text-foreground/80">Mathematical Assessment</p>
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-semibold font-serif text-lg mb-2 text-foreground">About the Team</h3>
                                    <p className="text-foreground/80">Our research division is a world-class group of engineers and scientists dedicated to solving the most complex challenges in artificial intelligence.</p>
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-semibold font-serif text-lg mb-2 text-foreground">About the Role</h3>
                                    <p className="text-foreground/80">This position is at the core of our R&D efforts. You will be exploring novel techniques and contributing to foundational models that power our next generation of products.</p>
                                  </div>
                                  
                                  <div>
                                    <h3 className="font-semibold font-serif text-lg mb-2 text-foreground">In This Role, You Will:</h3>
                                    <p className="text-foreground/80">Implement and test new algorithms, collaborate with senior researchers on paper submissions, analyze large-scale datasets, and push the boundaries of what's possible...</p>
                                  </div>
                                </div>
                              </div>
                              {/* Fade overlay at bottom */}
                              <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" 
                                   style={{ background: 'linear-gradient(to bottom, transparent, #edebe5)' }} />
                            </div>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Button 
                          className="text-black text-sm h-9 w-full"
                          style={{ backgroundColor: '#E8E8E8' }}
                        >
                          Details
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TalentDashboard;
