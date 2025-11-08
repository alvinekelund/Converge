import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Candidate = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    degree: "",
    institution: "",
    gradYear: "",
    gpa: "",
    skills: "",
    extracurricular: "",
    linkedin: "",
    github: "",
    portfolio: "",
    otherLinks: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Combine related fields into TEXT columns
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      const profile = `Email: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.bio}`;
      const experience = `${formData.jobTitle} at ${formData.company}\n${formData.startDate} - ${formData.endDate}\n\n${formData.description}`;
      const education = `${formData.degree} from ${formData.institution}\nGraduation Year: ${formData.gradYear}\nGPA: ${formData.gpa}`;
      const skills = formData.skills;
      const extracurriculars = formData.extracurricular;
      const preferences = `LinkedIn: ${formData.linkedin}\nGitHub: ${formData.github}\nPortfolio: ${formData.portfolio}\n\nOther Links:\n${formData.otherLinks}`;

      const { error } = await supabase
        .from("profiles")
        .insert({
          name,
          profile,
          experience,
          education,
          skills,
          extracurriculars,
          preferences,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your profile has been submitted successfully.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        bio: "",
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        degree: "",
        institution: "",
        gradYear: "",
        gpa: "",
        skills: "",
        extracurricular: "",
        linkedin: "",
        github: "",
        portfolio: "",
        otherLinks: "",
      });
    } catch (error) {
      console.error("Error submitting profile:", error);
      toast({
        title: "Error",
        description: "Failed to submit profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
        <DialogContent className="max-w-full w-screen h-screen border-0 p-0 bg-black/95 flex items-center justify-center [&>button]:hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50 animate-pulse-glow" />
          
          <div className="relative z-10 text-center space-y-8 px-8 max-w-4xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
              This is the last application you'll ever fill out.
            </h1>
            
            <p className="text-2xl md:text-3xl text-muted-foreground/80 font-light">
              Your new agent will find you opportunities. We seek while you sleep.
            </p>
            
            <div className="pt-8">
              <Button
                onClick={() => setShowWelcome(false)}
                size="lg"
                className="px-12 py-6 text-lg font-medium bg-primary text-primary-foreground shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.7)] transition-all duration-300 animate-pulse-glow"
              >
                Build My Agent
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
        <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Talent Portal</h1>
          <p className="text-muted-foreground">Complete your professional profile</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>CV Upload</CardTitle>
            <CardDescription>Upload your resume or CV</CardDescription>
          </CardHeader>
          <CardContent>
            <Input type="file" accept=".pdf,.doc,.docx" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Basic information about you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} value={formData.bio} onChange={handleInputChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Your work history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" placeholder="Software Engineer" value={formData.jobTitle} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Tech Corp" value={formData.company} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" value={formData.startDate} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your role and achievements..." rows={4} value={formData.description} onChange={handleInputChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
            <CardDescription>Your educational background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" placeholder="Bachelor of Science" value={formData.degree} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input id="institution" placeholder="University Name" value={formData.institution} onChange={handleInputChange} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gradYear">Graduation Year</Label>
                <Input id="gradYear" type="number" placeholder="2024" value={formData.gradYear} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA</Label>
                <Input id="gpa" placeholder="3.8" value={formData.gpa} onChange={handleInputChange} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Your technical and soft skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Textarea 
              id="skills" 
              placeholder="React, TypeScript, Node.js, Leadership, Communication..." 
              rows={3}
              value={formData.skills}
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extracurricular</CardTitle>
            <CardDescription>Activities outside of work and education</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="extracurricular">Activities & Achievements</Label>
            <Textarea 
              id="extracurricular" 
              placeholder="Volunteer work, clubs, awards, hobbies..." 
              rows={4}
              value={formData.extracurricular}
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
            <CardDescription>Your online presence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/yourprofile" value={formData.linkedin} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" type="url" placeholder="https://github.com/yourusername" value={formData.github} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio Website</Label>
              <Input id="portfolio" type="url" placeholder="https://yourportfolio.com" value={formData.portfolio} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otherLinks">Other Links</Label>
              <Textarea id="otherLinks" placeholder="Add any other relevant links..." rows={3} value={formData.otherLinks} onChange={handleInputChange} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 pb-8">
          <Button variant="outline" disabled={isSubmitting}>Save Draft</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Profile"}
          </Button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Candidate;
