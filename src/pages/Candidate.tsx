import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Candidate = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Candidate Profile</h1>
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
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} />
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
              <Input id="jobTitle" placeholder="Software Engineer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Tech Corp" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your role and achievements..." rows={4} />
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
              <Input id="degree" placeholder="Bachelor of Science" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input id="institution" placeholder="University Name" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gradYear">Graduation Year</Label>
                <Input id="gradYear" type="number" placeholder="2024" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA</Label>
                <Input id="gpa" placeholder="3.8" />
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
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Your job preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobType">Preferred Job Type</Label>
              <Input id="jobType" placeholder="Full-time, Remote, Contract..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Preferred Location</Label>
              <Input id="location" placeholder="San Francisco, CA or Remote" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Expected Salary Range</Label>
              <Input id="salary" placeholder="$80,000 - $120,000" />
            </div>
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
              <Input id="linkedin" type="url" placeholder="https://linkedin.com/in/yourprofile" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input id="github" type="url" placeholder="https://github.com/yourusername" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio Website</Label>
              <Input id="portfolio" type="url" placeholder="https://yourportfolio.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otherLinks">Other Links</Label>
              <Textarea id="otherLinks" placeholder="Add any other relevant links..." rows={3} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 pb-8">
          <Button variant="outline">Save Draft</Button>
          <Button>Submit Profile</Button>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
