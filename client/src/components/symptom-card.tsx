import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Symptom } from "@/data/conditions";

interface SymptomCardProps {
  symptom: Symptom;
  isSelected: boolean;
  onToggle: (symptomId: string) => void;
}

export function SymptomCard({ symptom, isSelected, onToggle }: SymptomCardProps) {
  return (
    <label 
      className={cn(
        "flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 group",
        "hover:border-blue-600 hover:bg-blue-50",
        isSelected 
          ? "border-blue-600 bg-blue-50" 
          : "border-slate-200"
      )}
    >
      <div className="flex items-center justify-center w-6 h-6 mr-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onToggle(symptom.id)}
          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        />
      </div>
      <div className="flex items-center">
        <span className="text-2xl mr-3">{symptom.emoji}</span>
        <div>
          <div className="font-medium text-slate-800">{symptom.name}</div>
          <div className="text-sm text-slate-500">{symptom.description}</div>
        </div>
      </div>
    </label>
  );
}
