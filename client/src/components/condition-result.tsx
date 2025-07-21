import { Badge } from "@/components/ui/badge";
import { Condition } from "@/data/conditions";
import { symptoms } from "@/data/conditions";

interface ConditionResultProps {
  condition: Condition;
  matchPercentage: number;
  selectedSymptoms: string[];
}

export function ConditionResult({ condition, matchPercentage, selectedSymptoms }: ConditionResultProps) {
  const severityColors = {
    mild: "bg-green-50 border-green-200 text-green-800",
    moderate: "bg-yellow-50 border-yellow-200 text-yellow-800",
    severe: "bg-red-50 border-red-200 text-red-800"
  };

  const getSymptomName = (symptomId: string) => {
    const symptom = symptoms.find(s => s.id === symptomId);
    return symptom?.name || symptomId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{condition.icon}</span>
          <div>
            <h3 className="text-xl font-semibold text-slate-800">{condition.name}</h3>
            <Badge 
              variant="outline"
              className={`mt-1 ${severityColors[condition.severity]}`}
            >
              {condition.severity.charAt(0).toUpperCase() + condition.severity.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{Math.round(matchPercentage)}%</div>
          <div className="text-sm text-slate-500">Match</div>
        </div>
      </div>
      
      <p className="text-slate-600 mb-4">{condition.description}</p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-slate-800 mb-2">Recommended Treatment:</h4>
        <p className="text-slate-600">{condition.treatment}</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {condition.symptoms.map(symptomId => {
          const isSelected = selectedSymptoms.includes(symptomId);
          return (
            <Badge
              key={symptomId}
              variant={isSelected ? "default" : "secondary"}
              className={isSelected ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-600"}
            >
              {isSelected ? '✓ ' : ''}{getSymptomName(symptomId)}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
