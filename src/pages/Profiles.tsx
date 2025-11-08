import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Profiles = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    preferences: "",
    experience: "",
    education: "",
    skills: "",
    extracurriculars: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("profiles").insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Profile created successfully.",
      });

      // Reset form
      setFormData({
        name: "",
        profile: "",
        preferences: "",
        experience: "",
        education: "",
        skills: "",
        extracurriculars: "",
      });
    } catch (error) {
      console.error("Error creating profile:", error);
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Create Profile</h1>
          <p className="text-muted-foreground">Submit your candidate information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Profile</label>
              <Textarea
                name="profile"
                value={formData.profile}
                onChange={handleInputChange}
                placeholder="Brief profile summary"
                rows={4}
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Professional Details</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Experience</label>
              <Textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Work experience details"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Education</label>
              <Textarea
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="Educational background"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Skills</label>
              <Textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Technical and soft skills"
                rows={3}
              />
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Additional Information</h2>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Preferences</label>
              <Textarea
                name="preferences"
                value={formData.preferences}
                onChange={handleInputChange}
                placeholder="Job preferences and expectations"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Extracurriculars</label>
              <Textarea
                name="extracurriculars"
                value={formData.extracurriculars}
                onChange={handleInputChange}
                placeholder="Activities, hobbies, and achievements"
                rows={3}
              />
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="submit" disabled={isSubmitting} size="lg">
              {isSubmitting ? "Submitting..." : "Create Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profiles;
