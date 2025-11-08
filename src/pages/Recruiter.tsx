import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Recruiter = () => {
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Job Posting</h1>
          <p className="text-muted-foreground">Create a new job opportunity</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Title</CardTitle>
            <CardDescription>The position you're hiring for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Senior Software Engineer" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company</CardTitle>
            <CardDescription>Company information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Tech Innovations Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyWebsite">Company Website</Label>
              <Input id="companyWebsite" type="url" placeholder="https://company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Input id="companySize" placeholder="50-200 employees" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <CardDescription>Where is this position based?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="San Francisco, CA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workType">Work Type</Label>
              <Input id="workType" placeholder="Remote, Hybrid, or On-site" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Us</CardTitle>
            <CardDescription>Tell candidates about your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="aboutUs">Company Description</Label>
            <Textarea 
              id="aboutUs" 
              placeholder="Describe your company culture, mission, and values..." 
              rows={5}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>Overview of the role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea 
                id="jobDescription" 
                placeholder="Provide a detailed description of the role..." 
                rows={6}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Input id="employmentType" placeholder="Full-time, Part-time, Contract" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryRange">Salary Range</Label>
                <Input id="salaryRange" placeholder="$100,000 - $150,000" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Responsibilities</CardTitle>
            <CardDescription>Key duties and tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities</Label>
            <Textarea 
              id="responsibilities" 
              placeholder="• Lead development of new features&#10;• Mentor junior developers&#10;• Collaborate with cross-functional teams..." 
              rows={8}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Qualifications</CardTitle>
            <CardDescription>Required qualifications and experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="qualifications">Required Qualifications</Label>
            <Textarea 
              id="qualifications" 
              placeholder="• Bachelor's degree in Computer Science or related field&#10;• 5+ years of software development experience&#10;• Proficiency in React and TypeScript..." 
              rows={8}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferred</CardTitle>
            <CardDescription>Nice-to-have qualifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="preferred">Preferred Qualifications</Label>
            <Textarea 
              id="preferred" 
              placeholder="• Experience with cloud platforms (AWS, Azure, GCP)&#10;• Previous startup experience&#10;• Open source contributions..." 
              rows={6}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 pb-8">
          <Button variant="outline">Save Draft</Button>
          <Button>Post Job</Button>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
