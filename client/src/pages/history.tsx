import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  History as HistoryIcon, 
  Calendar, 
  Clock, 
  FileText, 
  Trash2, 
  Search,
  Download,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

interface HistoryItem {
  id: string;
  timestamp: string;
  symptoms: string[];
  conditions: string[];
  topCondition: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem('symptom-check-history');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('symptom-check-history');
    setHistory([]);
  };

  const deleteItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('symptom-check-history', JSON.stringify(updated));
  };

  const retrySymptoms = (symptoms: string[]) => {
    localStorage.setItem('pre-selected-symptoms', JSON.stringify(symptoms.map(name => {
      // Convert symptom names back to IDs (simplified mapping)
      return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
    })));
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

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `symptom-check-history-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading your health history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center">
          <HistoryIcon className="mr-3 h-8 w-8 text-blue-600" />
          Symptom Check History
        </h1>
        <p className="text-slate-600 text-lg">
          Review your previous health assessments and track patterns over time
        </p>
      </div>

      {/* Controls */}
      {history.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Button onClick={exportHistory} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export History
          </Button>
          <Button onClick={clearHistory} variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All History
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/checker">
              <Search className="mr-2 h-4 w-4" />
              New Symptom Check
            </Link>
          </Button>
        </div>
      )}

      {/* History Items */}
      {history.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <CardTitle className="text-slate-600 mb-2">
              No History Found
            </CardTitle>
            <CardDescription className="mb-6">
              You haven't performed any symptom checks yet. Start your first health assessment to see your history here.
            </CardDescription>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/checker">
                <Search className="mr-2 h-4 w-4" />
                Start Symptom Check
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center text-slate-800">
                      <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                      Health Assessment
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Clock className="mr-1 h-4 w-4" />
                      {formatDate(item.timestamp)}
                    </CardDescription>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => retrySymptoms(item.symptoms)}
                      asChild
                    >
                      <Link to="/checker">
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Retry
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Top Condition */}
                  {item.topCondition && (
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Primary Match:</h4>
                      <Badge className="bg-green-100 text-green-800 text-sm">
                        {item.topCondition}
                      </Badge>
                    </div>
                  )}
                  
                  {/* Symptoms */}
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      Symptoms Checked ({item.symptoms.length}):
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.symptoms.map((symptom, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Conditions */}
                  {item.conditions.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">
                        Potential Conditions ({item.conditions.length}):
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.conditions.map((condition, index) => (
                          <Badge key={index} variant="outline" className="text-slate-600">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Information Alert */}
      <Alert className="mt-8 bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Privacy Note:</strong> Your symptom check history is stored locally on your device. 
          It will be cleared if you clear your browser data or use a different device.
        </AlertDescription>
      </Alert>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button asChild variant="outline" className="h-auto p-4">
          <Link to="/checker" className="flex flex-col items-center">
            <Search className="h-6 w-6 mb-2 text-blue-600" />
            <span className="font-medium">New Check</span>
            <span className="text-xs text-slate-500">Start fresh assessment</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-auto p-4">
          <Link to="/book" className="flex flex-col items-center">
            <Calendar className="h-6 w-6 mb-2 text-green-600" />
            <span className="font-medium">Book Appointment</span>
            <span className="text-xs text-slate-500">Consult with doctor</span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" className="h-auto p-4">
          <Link to="/faq" className="flex flex-col items-center">
            <FileText className="h-6 w-6 mb-2 text-purple-600" />
            <span className="font-medium">Learn More</span>
            <span className="text-xs text-slate-500">FAQ and guides</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}