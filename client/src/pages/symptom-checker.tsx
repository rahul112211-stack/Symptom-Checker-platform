import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SymptomCard } from "@/components/symptom-card";
import { ConditionResult } from "@/components/condition-result";
import { symptoms, conditions, Condition } from "@/data/conditions";
import { AlertTriangle, Search, RotateCcw } from "lucide-react";

interface ConditionMatch extends Condition {
  matchCount: number;
  matchPercentage: number;
}

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [matchingConditions, setMatchingConditions] = useState<ConditionMatch[]>([]);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const checkSymptoms = () => {
    if (selectedSymptoms.length === 0) return;

    const matches: ConditionMatch[] = [];

    conditions.forEach(condition => {
      const matchCount = condition.symptoms.filter(symptom => 
        selectedSymptoms.includes(symptom)
      ).length;

      if (matchCount > 0) {
        matches.push({
          ...condition,
          matchCount,
          matchPercentage: (matchCount / condition.symptoms.length) * 100
        });
      }
    });

    // Sort by match percentage
    matches.sort((a, b) => b.matchPercentage - a.matchPercentage);

    setMatchingConditions(matches);
    setShowResults(true);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSelectedSymptomNames = () => {
    return selectedSymptoms.map(id => {
      const symptom = symptoms.find(s => s.id === id);
      return symptom?.name || id;
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">🩺 Symptom Checker</h1>
            <p className="text-slate-600 text-lg">Select your symptoms to find possible conditions</p>
            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <span className="font-semibold">⚠️ Medical Disclaimer:</span> 
                This tool is for informational purposes only and should not replace professional medical advice.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Symptom Selection Section */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
            <span className="mr-2">📋</span>
            Select Your Symptoms
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {symptoms.map(symptom => (
              <SymptomCard
                key={symptom.id}
                symptom={symptom}
                isSelected={selectedSymptoms.includes(symptom.id)}
                onToggle={handleSymptomToggle}
              />
            ))}
          </div>

          {/* Selected Symptoms Display */}
          {selectedSymptoms.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Selected Symptoms:</h3>
              <div className="flex flex-wrap gap-2">
                {getSelectedSymptomNames().map(name => (
                  <Badge key={name} className="bg-blue-100 text-blue-800">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Check Symptoms Button */}
          <div className="text-center">
            <Button 
              onClick={checkSymptoms}
              disabled={selectedSymptoms.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              <Search className="mr-2 h-4 w-4" />
              Check Symptoms
            </Button>
            <p className="text-sm text-slate-500 mt-2">
              {selectedSymptoms.length > 0 
                ? `Ready to check ${selectedSymptoms.length} symptom${selectedSymptoms.length > 1 ? 's' : ''}`
                : 'Please select at least one symptom to continue'
              }
            </p>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <>
            {matchingConditions.length > 0 ? (
              <div id="results-section" className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
                  <span className="mr-2">🔬</span>
                  Possible Conditions
                </h2>
                
                <div className="space-y-4 mb-6">
                  {matchingConditions.map(condition => (
                    <ConditionResult
                      key={condition.id}
                      condition={condition}
                      matchPercentage={condition.matchPercentage}
                      selectedSymptoms={selectedSymptoms}
                    />
                  ))}
                </div>

                <Alert className="bg-amber-50 border-amber-200 mb-6">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <span className="font-semibold">Important:</span> 
                    These results are for informational purposes only. Please consult with a healthcare professional for proper diagnosis and treatment.
                  </AlertDescription>
                </Alert>

                <div className="text-center">
                  <Button 
                    onClick={resetChecker}
                    variant="outline"
                    className="bg-slate-500 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Check Different Symptoms
                  </Button>
                </div>
              </div>
            ) : (
              <div id="no-results-section" className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
                <div className="text-6xl mb-4">🤔</div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">No Matching Conditions Found</h2>
                <p className="text-slate-600 mb-6">
                  We couldn't find any matching conditions for your selected symptoms. 
                  This doesn't mean nothing is wrong - please consult with a healthcare professional.
                </p>
                <Button 
                  onClick={resetChecker}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Different Symptoms
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
