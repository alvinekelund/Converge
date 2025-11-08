import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Play } from "lucide-react";
import { Link } from "react-router-dom";

interface MatchResult {
  posting_file: string;
  mutual_matches: string[];
  verdict: string;
}

const Admin = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const { toast } = useToast();

  const removeExtension = (filename: string) => {
    return filename.replace(/\.txt$/, '').replace(/_\d+$/, '');
  };

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
      
      // Store match results
      if (Array.isArray(result)) {
        setMatchResults(result);
      }
      
      const totalMatches = result.reduce((sum: number, item: MatchResult) => 
        sum + (item.mutual_matches?.length || 0), 0
      );
      
      toast({
        title: "Success!",
        description: `Matchmaking completed! Found ${totalMatches} mutual matches across ${result.length} postings.`,
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

        {matchResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Mutual Matches</CardTitle>
              <CardDescription>
                Results from {matchResults.length} posting{matchResults.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Posting</TableHead>
                    <TableHead>Mutual Matches</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matchResults.map((result, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {removeExtension(result.posting_file)}
                      </TableCell>
                      <TableCell>
                        {result.mutual_matches && result.mutual_matches.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {result.mutual_matches.map((match, matchIndex) => (
                              <span 
                                key={matchIndex}
                                className="bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                              >
                                {removeExtension(match)}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">No matches</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Admin;
