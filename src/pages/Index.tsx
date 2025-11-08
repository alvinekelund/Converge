import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleStartProcess = async () => {
    setIsProcessing(true);
    try {
      // Fetch all postings
      const { data: postings, error: postingsError } = await supabase
        .from("postings")
        .select("*");

      if (postingsError) throw postingsError;

      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      // Transform data to match API format
      const transformedPostings = postings?.map((p, index) => ({
        ID: index + 1,
        title: p.title || "",
        company: p.company || "",
        location: p.location || "",
        about: p.about || "",
        job_description: p.description || "",
        responsibilities: p.responsibilities || "",
        qualifications: p.qualifications || "",
      })) || [];

      const transformedProfiles = profiles?.map((p, index) => ({
        ID: index + 1,
        Name: p.name || "",
        Profile: p.profile || "",
        experience: p.experience || "",
        education: p.education || "",
        skills: p.skills || "",
        extracurricular: p.extracurriculars || "",
        preferences: p.preferences || "",
      })) || [];

      // Call the matchmaking API
      const response = await fetch("http://127.0.0.1:8000/run-live-matchmaking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postings: transformedPostings,
          profiles: transformedProfiles,
        }),
      });

      if (!response.ok) throw new Error("API call failed");

      const result = await response.json();
      
      toast({
        title: "Success!",
        description: "Matchmaking process completed successfully.",
      });

      console.log("Matchmaking results:", result);
    } catch (error) {
      console.error("Error running matchmaking:", error);
      toast({
        title: "Error",
        description: "Failed to run matchmaking process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-drift" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary/25 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/3 right-2/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold tracking-tight text-foreground animate-float">
            Agentic Hack 2025
          </h1>
          <p className="text-lg text-muted-foreground">Ready to build</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <a href="/candidate" className="inline-block">
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
              Candidate Profile
            </button>
          </a>
          <a href="/recruiter" className="inline-block">
            <button className="px-8 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium">
              Recruiter Portal
            </button>
          </a>
        </div>

        <div className="mt-8">
          <Button 
            onClick={handleStartProcess}
            disabled={isProcessing}
            size="lg"
            className="px-8 py-3"
          >
            {isProcessing ? "Processing..." : "Start Process"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
