import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Postings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    about: "",
    description: "",
    responsibilities: "",
    qualifications: "",
    preferred: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("postings").insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Job posting created successfully.",
      });

      // Reset form
      setFormData({
        title: "",
        company: "",
        location: "",
        about: "",
        description: "",
        responsibilities: "",
        qualifications: "",
        preferred: "",
      });
    } catch (error) {
      console.error("Error creating posting:", error);
      toast({
        title: "Error",
        description: "Failed to create job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Create Job Posting</h1>
          <p className="text-muted-foreground">Submit your job opportunity details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Basic Information</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Job Title *</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior Software Engineer"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Company *</label>
              <Input
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. Remote, New York, NY"
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Company Details</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">About Company</label>
              <Textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Tell us about your company"
                rows={4}
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Job Details</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Job Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the role and what the candidate will be doing"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Responsibilities</label>
              <Textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleInputChange}
                placeholder="Key responsibilities and duties"
                rows={4}
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Requirements</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Required Qualifications</label>
              <Textarea
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
                placeholder="Must-have qualifications and requirements"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Preferred Qualifications</label>
              <Textarea
                name="preferred"
                value={formData.preferred}
                onChange={handleInputChange}
                placeholder="Nice-to-have skills and qualifications"
                rows={4}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? "Submitting..." : "Create Job Posting"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Postings;
