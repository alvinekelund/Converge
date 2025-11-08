import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [mutualMatches, setMutualMatches] = useState<any[]>([]);
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
      
      // Store mutual matches
      if (result.mutual_matches) {
        setMutualMatches(result.mutual_matches);
      }
      
      toast({
        title: "Success!",
        description: `Matchmaking completed! Found ${result.mutual_matches?.length || 0} mutual matches.`,
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Manage matchmaking and system operations</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Matchmaking Engine</CardTitle>
            <CardDescription>
              Run the matchmaking process to analyze all profiles and job postings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                This will fetch all candidate profiles and job postings from the database,
                then send them to the matchmaking API for analysis.
              </p>
            </div>

            <Button 
              onClick={handleStartProcess}
              disabled={isProcessing}
              size="lg"
              className="w-full"
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start Matchmaking Process
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {mutualMatches.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Mutual Matches</CardTitle>
              <CardDescription>
                {mutualMatches.length} mutual match{mutualMatches.length !== 1 ? 'es' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mutualMatches.map((match, index) => (
                  <div 
                    key={index}
                    className="bg-muted/50 rounded-lg p-4 space-y-2 hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {match.candidate_name || match.profile_name || `Candidate ${match.profile_id || index + 1}`}
                          </span>
                          <span className="text-muted-foreground">×</span>
                          <span className="font-semibold text-foreground">
                            {match.job_title || match.posting_title || `Job ${match.posting_id || index + 1}`}
                          </span>
                        </div>
                        {match.company && (
                          <p className="text-sm text-muted-foreground">
                            {match.company}
                          </p>
                        )}
                        {match.match_score && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 bg-background rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${Math.min(match.match_score, 100)}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground min-w-[3rem] text-right">
                              {typeof match.match_score === 'number' ? match.match_score.toFixed(0) : match.match_score}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    {match.reason && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {match.reason}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
