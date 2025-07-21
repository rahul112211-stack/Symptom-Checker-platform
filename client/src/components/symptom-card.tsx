import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Symptom } from "@/data/conditions";

interface SymptomCardProps {
  symptom: Symptom;
  isSelected: boolean;
  onToggle: (symptomId: string) => void;
}

export function SymptomCard({ symptom, isSelected, onToggle }: SymptomCardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <label 
          className={cn(
            "flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 group",
            "hover:border-blue-500 hover:bg-blue-50 hover:shadow-md hover:scale-[1.02]",
            isSelected 
              ? "border-blue-500 bg-blue-50 shadow-md ring-2 ring-blue-200" 
              : "border-slate-200 hover:border-blue-300"
          )}
        >
          <div className="flex items-center justify-center w-6 h-6 mr-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggle(symptom.id)}
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 transition-colors duration-200"
            />
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-200">{symptom.emoji}</span>
            <div>
              <div className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors duration-200">{symptom.name}</div>
            </div>
          </div>
        </label>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="text-sm">{symptom.description}</p>
      </TooltipContent>
    </Tooltip>
  );
}
