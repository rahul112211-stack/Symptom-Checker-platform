import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Stethoscope } from "lucide-react";
import { Condition } from "@/data/conditions";

interface SummaryCardProps {
  selectedSymptomsCount: number;
  matchingConditions: Condition[];
}

export function SummaryCard({ selectedSymptomsCount, matchingConditions }: SummaryCardProps) {
  const handleBookAppointment = () => {
    // Dummy link - would normally navigate to booking system
    alert("This would redirect to your telehealth appointment booking system!");
  };

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center text-2xl font-bold text-blue-800">
          <Stethoscope className="mr-2 h-6 w-6" />
          Health Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Symptoms Summary */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{selectedSymptomsCount}</div>
          <p className="text-slate-600">
            Symptom{selectedSymptomsCount !== 1 ? 's' : ''} Selected
          </p>
        </div>

        {/* Conditions Summary */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-800 text-center">Possible Conditions:</h4>
          <div className="space-y-2">
            {matchingConditions.slice(0, 3).map((condition, index) => (
              <div key={condition.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{condition.icon}</span>
                  <span className="font-medium text-slate-800">{condition.name}</span>
                </div>
                <Badge 
                  variant="outline"
                  className={index === 0 ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-600"}
                >
                  {index === 0 ? "Top Match" : `#${index + 1}`}
                </Badge>
              </div>
            ))}
            {matchingConditions.length > 3 && (
              <p className="text-center text-sm text-slate-500">
                +{matchingConditions.length - 3} more condition{matchingConditions.length - 3 !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="text-center pt-4 border-t border-blue-200">
          <Button 
            onClick={handleBookAppointment}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Telehealth Appointment
          </Button>
          <p className="text-xs text-slate-500 mt-2">
            Connect with a healthcare professional
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center space-x-4 pt-4 border-t border-blue-200">
          <div className="flex items-center text-sm text-slate-600">
            <Users className="h-4 w-4 mr-1" />
            <span>500k+ consultations</span>
          </div>
          <div className="text-sm text-slate-600">•</div>
          <div className="text-sm text-slate-600">Licensed doctors</div>
        </div>
      </CardContent>
    </Card>
  );
}