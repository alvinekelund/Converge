import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Recruiter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job description",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from("postings")
        .insert({
          title: "New Position",
          company: "Company Name",
          location: "Location TBD",
          about: "",
          description: jobDescription,
          responsibilities: "",
          qualifications: "",
          preferred: "",
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your job posting has been submitted successfully.",
      });

      setJobDescription("");
    } catch (error) {
      console.error("Error submitting job posting:", error);
      toast({
        title: "Error",
        description: "Failed to submit job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl w-full space-y-8">
            <div className="max-w-[75%]">
              <h1 className="text-5xl font-serif leading-tight mb-4">
                Ready to say goodbye to screening and pipeline management?
              </h1>
              <h2 className="text-3xl font-serif leading-tight mb-6 text-foreground/90">
                10x qualified applicants with 10x speed
              </h2>
              <p className="text-xl text-muted-foreground font-sans leading-relaxed">
                Just drop your job description, and I'll start building your agent workforce.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Bar - Fixed at bottom */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste your job description here..."
                className="min-h-[60px] max-h-[200px] py-4 px-4 text-base bg-background border-border rounded-2xl resize-none"
                rows={2}
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-12 px-6 rounded-full text-black font-medium hover:opacity-90"
              style={{ backgroundColor: "#cde75e" }}
            >
              {isSubmitting ? "Processing..." : "Start Building"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
