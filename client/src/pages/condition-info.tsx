import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  Heart, 
  Shield, 
  Clock, 
  AlertTriangle, 
  Stethoscope,
  Calendar
} from 'lucide-react';
import { conditions } from '@/data/conditions';

export default function ConditionInfo() {
  const { id } = useParams<{ id: string }>();
  
  // Find condition by ID
  const condition = conditions.find(c => c.id === id);

  if (!condition) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <AlertTriangle className="h-16 w-16 text-red-300 mx-auto mb-4" />
            <CardTitle className="text-xl text-slate-600 mb-2">
              Condition Not Found
            </CardTitle>
            <CardDescription className="mb-6">
              The condition you're looking for doesn't exist or may have been removed.
            </CardDescription>
            <Button asChild>
              <Link to="/checker">Back to Symptom Checker</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const severityColors = {
    mild: "bg-green-100 text-green-800 border-green-200",
    moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    severe: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="text-slate-600 hover:text-slate-800">
          <Link to="/checker">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Symptom Checker
          </Link>
        </Button>
      </div>

      {/* Condition Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">{condition.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                {condition.name}
              </h1>
              <Badge 
                variant="outline"
                className={`${severityColors[condition.severity]} font-medium`}
              >
                {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)} Condition
              </Badge>
            </div>
          </div>
        </div>
        
        <p className="text-lg text-slate-600 leading-relaxed">
          {condition.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="mr-2 h-5 w-5 text-blue-600" />
                Common Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {condition.symptoms.map((symptomId, index) => {
                  // Get symptom name from symptoms data
                  const symptomName = symptomId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
                  return (
                    <div 
                      key={index}
                      className="flex items-center p-3 bg-slate-50 rounded-lg border"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-slate-700">{symptomName}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Treatment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5 text-green-600" />
                Recommended Treatment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">
                {condition.treatment}
              </p>
            </CardContent>
          </Card>

          {/* Prevention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-purple-600" />
                Prevention Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                  <p className="text-slate-700">Maintain good hygiene practices including regular handwashing</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                  <p className="text-slate-700">Get adequate rest and maintain a healthy sleep schedule</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                  <p className="text-slate-700">Stay hydrated and maintain a balanced diet</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2"></div>
                  <p className="text-slate-700">Avoid close contact with sick individuals when possible</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* When to See a Doctor */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Clock className="mr-2 h-5 w-5" />
                When to See a Doctor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-1.5"></div>
                  <p className="text-orange-800">Symptoms persist for more than a week</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-1.5"></div>
                  <p className="text-orange-800">High fever (over 101°F/38.3°C)</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-1.5"></div>
                  <p className="text-orange-800">Difficulty breathing or chest pain</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-1.5"></div>
                  <p className="text-orange-800">Symptoms worsen or new symptoms appear</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/book">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/checker">
                  <Stethoscope className="mr-2 h-4 w-4" />
                  New Symptom Check
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/history">
                  <Clock className="mr-2 h-4 w-4" />
                  View History
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Severity Info */}
          <Card>
            <CardHeader>
              <CardTitle>Severity Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg border ${severityColors[condition.severity]}`}>
                <div className="font-semibold mb-2">
                  {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)}
                </div>
                <p className="text-sm">
                  {condition.severity === 'mild' && 'Usually resolves with home care and rest'}
                  {condition.severity === 'moderate' && 'May require medical attention if symptoms persist'}
                  {condition.severity === 'severe' && 'Requires immediate medical attention'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <Alert className="mt-8 bg-amber-50 border-amber-200">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not 
          replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.
        </AlertDescription>
      </Alert>
    </div>
  );
}