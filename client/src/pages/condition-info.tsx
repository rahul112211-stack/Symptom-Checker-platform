import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { conditions } from '@/data/conditions';
import { 
  ArrowLeft, 
  Calendar, 
  AlertTriangle, 
  BookOpen, 
  Heart, 
  Clock,
  Shield,
  CheckCircle,
  Info
} from 'lucide-react';

export default function ConditionInfo() {
  const { id } = useParams<{ id: string }>();
  const condition = conditions.find(c => c.id === id);

  if (!condition) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <AlertTriangle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <CardTitle className="text-slate-600 mb-2">
              Condition Not Found
            </CardTitle>
            <CardDescription className="mb-6">
              The condition you're looking for doesn't exist or has been removed.
            </CardDescription>
            <Button asChild>
              <Link to="/checker">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Symptom Checker
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'mild': return <CheckCircle className="h-4 w-4" />;
      case 'moderate': return <Clock className="h-4 w-4" />;
      case 'severe': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="outline">
          <Link to="/checker">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Symptom Checker
          </Link>
        </Button>
      </div>

      {/* Condition Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-6xl">{condition.icon}</span>
              <div>
                <CardTitle className="text-3xl text-slate-800">
                  {condition.name}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getSeverityColor(condition.severity)}>
                    {getSeverityIcon(condition.severity)}
                    <span className="ml-1 capitalize">{condition.severity}</span>
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/book">
                  <Calendar className="mr-2 h-4 w-4" />
                  Consult Doctor
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-lg text-slate-700 leading-relaxed">
            {condition.description}
          </p>
        </CardContent>
      </Card>

      {/* Associated Symptoms */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-800">
            <Heart className="mr-2 h-5 w-5 text-red-500" />
            Associated Symptoms
          </CardTitle>
          <CardDescription>
            Common symptoms that may indicate this condition
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {condition.symptoms.map((symptom, index) => (
              <div 
                key={index}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <span className="text-sm font-medium text-slate-700 capitalize">
                  {symptom.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Treatment Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-800">
            <Shield className="mr-2 h-5 w-5 text-green-500" />
            Treatment & Management
          </CardTitle>
          <CardDescription>
            General treatment approaches and management strategies
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed">
              {condition.treatment}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* When to Seek Help */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-800">
            <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
            When to Seek Medical Help
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Seek Immediate Care If:</h4>
              <ul className="list-disc list-inside text-red-700 space-y-1">
                <li>Symptoms worsen rapidly or become severe</li>
                <li>You experience difficulty breathing or chest pain</li>
                <li>You have signs of serious complications</li>
                <li>Your condition doesn't improve with initial treatment</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2">Schedule an Appointment If:</h4>
              <ul className="list-disc list-inside text-amber-700 space-y-1">
                <li>Symptoms persist for more than a few days</li>
                <li>You need professional diagnosis and treatment</li>
                <li>You want to discuss prevention strategies</li>
                <li>Your symptoms interfere with daily activities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Disclaimer */}
      <Alert className="mb-8 bg-blue-50 border-blue-200">
        <BookOpen className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Medical Disclaimer:</strong> This information is for educational purposes only and should not replace professional medical advice. Always consult with qualified healthcare providers for proper diagnosis, treatment, and medical decisions.
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/book">
            <Calendar className="mr-2 h-4 w-4" />
            Book Consultation
          </Link>
        </Button>
        
        <Button asChild variant="outline">
          <Link to="/checker">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Check Other Symptoms
          </Link>
        </Button>
        
        <Button asChild variant="outline">
          <Link to="/faq">
            <BookOpen className="mr-2 h-4 w-4" />
            Learn More About Health
          </Link>
        </Button>
      </div>
    </div>
  );
}