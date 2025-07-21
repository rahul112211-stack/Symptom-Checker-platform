import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Trash2, RotateCcw, FileText, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface SymptomCheck {
  id: string;
  timestamp: string;
  symptoms: string[];
  conditions: string[];
  topCondition?: string;
}

export default function History() {
  const { t } = useLanguage();
  const [history, setHistory] = useState<SymptomCheck[]>([]);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('symptom-check-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('symptom-check-history');
  };

  const removeCheck = (id: string) => {
    const updatedHistory = history.filter(check => check.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('symptom-check-history', JSON.stringify(updatedHistory));
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (condition: string) => {
    const severityMap: Record<string, string> = {
      'common-cold': 'bg-green-100 text-green-800',
      'flu': 'bg-yellow-100 text-yellow-800',
      'migraine': 'bg-orange-100 text-orange-800',
      'pneumonia': 'bg-red-100 text-red-800'
    };
    return severityMap[condition] || 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {t('navigation.history')}
        </h1>
        <p className="text-slate-600">
          Review your previous symptom checks and health assessments
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link to="/checker">
            <RotateCcw className="mr-2 h-4 w-4" />
            New Symptom Check
          </Link>
        </Button>
        
        {history.length > 0 && (
          <Button 
            variant="outline" 
            onClick={clearHistory}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All History
          </Button>
        )}
      </div>

      {/* History Content */}
      {history.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <CardTitle className="text-xl text-slate-600 mb-2">
              No History Available
            </CardTitle>
            <CardDescription className="mb-6">
              You haven't completed any symptom checks yet. Start your first health assessment to see your history here.
            </CardDescription>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/checker">Start First Check</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800">
                <FileText className="mr-2 h-5 w-5" />
                Health History Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{history.length}</div>
                  <div className="text-sm text-slate-600">Total Checks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {history.filter(h => h.topCondition?.includes('mild')).length}
                  </div>
                  <div className="text-sm text-slate-600">Mild Conditions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {history.filter(h => h.topCondition?.includes('moderate')).length}
                  </div>
                  <div className="text-sm text-slate-600">Moderate Conditions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* History Items */}
          {history.map((check) => (
            <Card key={check.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-500">
                    {formatDate(check.timestamp)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCheck(check.id)}
                  className="text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Symptoms */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Selected Symptoms:</h4>
                  <div className="flex flex-wrap gap-2">
                    {check.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Possible Conditions:</h4>
                  <div className="space-y-2">
                    {check.conditions.slice(0, 3).map((condition, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-slate-700">{condition}</span>
                        <Badge className={getSeverityColor(condition.toLowerCase().replace(' ', '-'))}>
                          {index === 0 ? 'Top Match' : `#${index + 1}`}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-200">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Navigate to checker with pre-selected symptoms
                      localStorage.setItem('pre-selected-symptoms', JSON.stringify(check.symptoms));
                      window.location.href = '/checker';
                    }}
                  >
                    <RotateCcw className="mr-1 h-3 w-3" />
                    Re-check
                  </Button>
                  
                  {check.topCondition && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/condition/${check.topCondition.toLowerCase().replace(' ', '-')}`}>
                        View Details
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Medical Disclaimer */}
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Medical Disclaimer:</strong> This history is for informational purposes only. 
              Always consult with healthcare professionals for proper medical advice and diagnosis.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}