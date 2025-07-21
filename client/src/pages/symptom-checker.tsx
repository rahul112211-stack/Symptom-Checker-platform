import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { symptoms, getSymptomsByCategory } from "@/data/symptoms";
import { conditions, getConditionMatches, Condition } from "@/data/conditions";
import { useLanguage } from "@/contexts/language-context";
import { useDoctorMode } from "@/contexts/doctor-mode-context";
import { 
  AlertTriangle, 
  Search, 
  RotateCcw, 
  ChevronDown, 
  ChevronRight, 
  Download,
  Calendar,
  Loader2,
  Info,
  FileText
} from "lucide-react";

export default function SymptomChecker() {
  const { t } = useLanguage();
  const { isDoctorMode } = useDoctorMode();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchingConditions, setMatchingConditions] = useState<Condition[]>([]);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set(['head', 'general']));

  const symptomCategories = getSymptomsByCategory();

  useEffect(() => {
    // Check for pre-selected symptoms from history
    const preSelected = localStorage.getItem('pre-selected-symptoms');
    if (preSelected) {
      setSelectedSymptoms(JSON.parse(preSelected));
      localStorage.removeItem('pre-selected-symptoms');
    }
  }, []);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const checkSymptoms = async () => {
    if (selectedSymptoms.length === 0) return;

    setIsAnalyzing(true);
    
    // Simulate analysis time
    await new Promise(resolve => setTimeout(resolve, 2000));

    const matches = getConditionMatches(selectedSymptoms);
    setMatchingConditions(matches);
    setShowResults(true);
    setIsAnalyzing(false);

    // Save to history
    const historyItem = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      symptoms: getSelectedSymptomNames(),
      conditions: matches.slice(0, 3).map(c => c.name),
      topCondition: matches[0]?.name
    };

    const existingHistory = JSON.parse(localStorage.getItem('symptom-check-history') || '[]');
    const updatedHistory = [historyItem, ...existingHistory].slice(0, 5);
    localStorage.setItem('symptom-check-history', JSON.stringify(updatedHistory));

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setShowResults(false);
    setMatchingConditions([]);
    setIsAnalyzing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSelectedSymptomNames = () => {
    return selectedSymptoms.map(id => {
      const symptom = symptoms.find(s => s.id === id);
      return symptom?.name || id;
    });
  };

  const downloadResults = () => {
    const data = {
      timestamp: new Date().toISOString(),
      symptoms: getSelectedSymptomNames(),
      conditions: matchingConditions.slice(0, 3).map(c => ({
        name: c.name,
        match: c.match,
        severity: c.severity
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `symptom-check-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      head: '🧠',
      chest: '🫁',
      abdomen: '🤱',
      limbs: '🦴',
      general: '🌡️'
    };
    return icons[category as keyof typeof icons] || '❓';
  };

  const getCategoryTitle = (category: string) => {
    const titles = {
      head: 'Head & Neck',
      chest: 'Chest & Breathing',
      abdomen: 'Abdomen & Digestion',
      limbs: 'Arms & Legs',
      general: 'General Symptoms'
    };
    return titles[category as keyof typeof titles] || category;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          🩺 Symptom Checker
        </h1>
        <p className="text-slate-600 text-lg">
          Select your symptoms to find possible conditions
        </p>
        <Alert className="mt-4 bg-blue-50 border-blue-200">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <span className="font-semibold">⚠️ Medical Disclaimer:</span> 
            This tool is for informational purposes only and should not replace professional medical advice.
          </AlertDescription>
        </Alert>

        {/* Progress indicator */}
        {selectedSymptoms.length > 0 && (
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>{selectedSymptoms.length} symptoms selected</span>
              <span>{selectedSymptoms.length >= 3 ? 'Ready to analyze' : 'Select more symptoms'}</span>
            </div>
            <Progress 
              value={Math.min((selectedSymptoms.length / 3) * 100, 100)} 
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Selected symptoms summary */}
      {selectedSymptoms.length > 0 && (
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Info className="mr-2 h-5 w-5" />
              Selected Symptoms ({selectedSymptoms.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {getSelectedSymptomNames().map((symptomName, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {symptomName}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={checkSymptoms}
                disabled={selectedSymptoms.length === 0 || isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('common.loading')}
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    {t('common.checkSymptoms')}
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={resetChecker}
                disabled={isAnalyzing}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Symptom Categories */}
      <div className="space-y-6 mb-8">
        {Object.entries(symptomCategories).map(([category, categorySymptoms]) => (
          <Collapsible 
            key={category}
            open={openCategories.has(category)}
            onOpenChange={() => toggleCategory(category)}
          >
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-slate-800">
                      <span className="text-2xl mr-3">{getCategoryIcon(category)}</span>
                      {getCategoryTitle(category)}
                      <span className="ml-2 text-sm font-normal text-slate-500">
                        ({categorySymptoms.length} symptoms)
                      </span>
                    </CardTitle>
                    {openCategories.has(category) ? (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categorySymptoms.map((symptom) => (
                      <Tooltip key={symptom.id}>
                        <TooltipTrigger asChild>
                          <div 
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                              selectedSymptoms.includes(symptom.id)
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
                            }`}
                            onClick={() => handleSymptomToggle(symptom.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                checked={selectedSymptoms.includes(symptom.id)}
                                onChange={() => handleSymptomToggle(symptom.id)}
                              />
                              <span className="text-2xl">{symptom.emoji}</span>
                              <div className="flex-1">
                                <div className="font-medium text-slate-800">
                                  {symptom.name}
                                </div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {symptom.description.substring(0, 40)}...
                                </div>
                              </div>
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{symptom.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      {/* Analysis Loading */}
      {isAnalyzing && (
        <Card className="mb-8">
          <CardContent className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              {t('common.loading')}
            </h3>
            <p className="text-slate-600">
              Processing your symptoms and analyzing potential conditions...
            </p>
            <Progress value={66} className="w-64 mx-auto mt-4" />
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {showResults && !isAnalyzing && (
        <div id="results-section" className="space-y-6">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <FileText className="mr-2 h-5 w-5" />
                Analysis Results
              </CardTitle>
              <CardDescription className="text-green-700">
                Based on your selected symptoms, here are the most likely conditions:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 mb-4">
                <Button onClick={downloadResults} variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  {t('common.downloadPDF')}
                </Button>
                
                <Button asChild variant="outline" size="sm">
                  <Link to="/book">
                    <Calendar className="mr-2 h-4 w-4" />
                    {t('common.bookAppointment')}
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="sm">
                  <Link to="/history">
                    <FileText className="mr-2 h-4 w-4" />
                    View History
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Condition Results */}
          <div className="space-y-4">
            {matchingConditions.slice(0, 5).map((condition, index) => (
              <Card key={condition.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{condition.icon}</span>
                      <div>
                        <CardTitle className="text-slate-800">
                          {condition.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant={condition.severity === 'severe' ? 'destructive' : 'secondary'}
                            className={
                              condition.severity === 'mild' ? 'bg-green-100 text-green-800' :
                              condition.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {condition.severity}
                          </Badge>
                          <span className="text-sm text-slate-500">
                            {condition.match}% match
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-slate-700 mb-4">
                    {condition.description}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/condition/${condition.id}`}>
                        View Details
                      </Link>
                    </Button>
                    
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/book">
                        Consult Doctor
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Medical Disclaimer */}
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Important:</strong> This analysis is for informational purposes only. 
              Always consult with healthcare professionals for proper medical diagnosis and treatment.
              If you're experiencing severe symptoms, seek immediate medical attention.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Call to Action for empty state */}
      {selectedSymptoms.length === 0 && !showResults && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">🩺</div>
            <CardTitle className="text-2xl text-slate-800 mb-2">
              Start Your Health Assessment
            </CardTitle>
            <CardDescription className="text-lg mb-6">
              Select your symptoms from the categories above to get personalized health insights
            </CardDescription>
            <div className="flex justify-center gap-4">
              <Button onClick={() => toggleCategory('head')} variant="outline">
                Start with Head Symptoms
              </Button>
              <Button onClick={() => toggleCategory('general')} variant="outline">
                Check General Symptoms
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
