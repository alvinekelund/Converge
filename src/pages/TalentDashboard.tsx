import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TalentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Link to="/candidate">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Talent Dashboard</h1>
          <p className="text-muted-foreground">Your recruiting dashboard</p>
        </div>

        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground text-lg">Coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default TalentDashboard;
