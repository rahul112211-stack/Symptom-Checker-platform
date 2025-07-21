export interface Symptom {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'head' | 'chest' | 'abdomen' | 'limbs' | 'general';
}

export const symptoms: Symptom[] = [
  // Head symptoms
  {
    id: 'headache',
    name: 'Headache',
    description: 'Pain or discomfort in the head or neck area',
    emoji: '🤕',
    category: 'head'
  },
  {
    id: 'severe-headache',
    name: 'Severe Headache',
    description: 'Intense, debilitating head pain',
    emoji: '😵',
    category: 'head'
  },
  {
    id: 'mild-headache',
    name: 'Mild Headache',
    description: 'Light head discomfort or tension',
    emoji: '😔',
    category: 'head'
  },
  {
    id: 'sore-throat',
    name: 'Sore Throat',
    description: 'Pain or scratchiness in the throat',
    emoji: '😷',
    category: 'head'
  },
  {
    id: 'runny-nose',
    name: 'Runny Nose',
    description: 'Excessive nasal discharge',
    emoji: '🤧',
    category: 'head'
  },
  {
    id: 'nasal-congestion',
    name: 'Nasal Congestion',
    description: 'Blocked or stuffy nose',
    emoji: '😤',
    category: 'head'
  },
  {
    id: 'sneezing',
    name: 'Sneezing',
    description: 'Frequent involuntary expulsion of air from nose',
    emoji: '🤧',
    category: 'head'
  },
  {
    id: 'itchy-eyes',
    name: 'Itchy Eyes',
    description: 'Irritation and urge to rub eyes',
    emoji: '👁️',
    category: 'head'
  },
  {
    id: 'light-sensitivity',
    name: 'Light Sensitivity',
    description: 'Discomfort or pain when exposed to light',
    emoji: '🕶️',
    category: 'head'
  },
  {
    id: 'facial-pain',
    name: 'Facial Pain',
    description: 'Pain in the face, jaw, or sinus areas',
    emoji: '😣',
    category: 'head'
  },
  {
    id: 'thick-nasal-discharge',
    name: 'Thick Nasal Discharge',
    description: 'Viscous mucus from nose',
    emoji: '🟫',
    category: 'head'
  },
  {
    id: 'neck-pain',
    name: 'Neck Pain',
    description: 'Stiffness or pain in neck area',
    emoji: '😬',
    category: 'head'
  },

  // Chest symptoms
  {
    id: 'cough',
    name: 'Cough',
    description: 'Repeated forceful expulsion of air from lungs',
    emoji: '😷',
    category: 'chest'
  },
  {
    id: 'persistent-cough',
    name: 'Persistent Cough',
    description: 'Ongoing cough lasting several days',
    emoji: '🫁',
    category: 'chest'
  },
  {
    id: 'chest-discomfort',
    name: 'Chest Discomfort',
    description: 'Pain or pressure in chest area',
    emoji: '💔',
    category: 'chest'
  },
  {
    id: 'mucus-production',
    name: 'Mucus Production',
    description: 'Coughing up phlegm or mucus',
    emoji: '🟢',
    category: 'chest'
  },
  {
    id: 'shortness-breath',
    name: 'Shortness of Breath',
    description: 'Difficulty breathing or feeling winded',
    emoji: '😮‍💨',
    category: 'chest'
  },

  // Abdomen symptoms
  {
    id: 'nausea',
    name: 'Nausea',
    description: 'Feeling of sickness or urge to vomit',
    emoji: '🤢',
    category: 'abdomen'
  },
  {
    id: 'vomiting',
    name: 'Vomiting',
    description: 'Forceful expulsion of stomach contents',
    emoji: '🤮',
    category: 'abdomen'
  },
  {
    id: 'stomach-pain',
    name: 'Stomach Pain',
    description: 'Pain or cramping in abdominal area',
    emoji: '🤱',
    category: 'abdomen'
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    description: 'Loose or watery bowel movements',
    emoji: '💩',
    category: 'abdomen'
  },
  {
    id: 'abdominal-cramps',
    name: 'Abdominal Cramps',
    description: 'Sharp or dull pain in stomach area',
    emoji: '😖',
    category: 'abdomen'
  },

  // Limbs symptoms
  {
    id: 'body-aches',
    name: 'Body Aches',
    description: 'General muscle or joint pain throughout body',
    emoji: '🦴',
    category: 'limbs'
  },
  {
    id: 'joint-pain',
    name: 'Joint Pain',
    description: 'Pain in joints like knees, elbows, wrists',
    emoji: '🦴',
    category: 'limbs'
  },
  {
    id: 'muscle-weakness',
    name: 'Muscle Weakness',
    description: 'Reduced strength in muscles',
    emoji: '💪',
    category: 'limbs'
  },
  {
    id: 'swelling',
    name: 'Swelling',
    description: 'Enlarged or puffy areas of body',
    emoji: '🫧',
    category: 'limbs'
  },

  // General symptoms
  {
    id: 'fever',
    name: 'Fever',
    description: 'Elevated body temperature above normal',
    emoji: '🌡️',
    category: 'general'
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    description: 'Extreme tiredness or lack of energy',
    emoji: '😴',
    category: 'general'
  },
  {
    id: 'chills',
    name: 'Chills',
    description: 'Feeling cold and shivery',
    emoji: '🥶',
    category: 'general'
  },
  {
    id: 'dizziness',
    name: 'Dizziness',
    description: 'Feeling lightheaded or unsteady',
    emoji: '😵‍💫',
    category: 'general'
  },
  {
    id: 'loss-appetite',
    name: 'Loss of Appetite',
    description: 'Reduced desire to eat',
    emoji: '🍽️',
    category: 'general'
  },
  {
    id: 'weight-loss',
    name: 'Unexplained Weight Loss',
    description: 'Losing weight without trying',
    emoji: '⚖️',
    category: 'general'
  },
  {
    id: 'night-sweats',
    name: 'Night Sweats',
    description: 'Excessive sweating during sleep',
    emoji: '💦',
    category: 'general'
  }
];

export const getSymptomsByCategory = () => {
  const categories = {
    head: symptoms.filter(s => s.category === 'head'),
    chest: symptoms.filter(s => s.category === 'chest'),
    abdomen: symptoms.filter(s => s.category === 'abdomen'),
    limbs: symptoms.filter(s => s.category === 'limbs'),
    general: symptoms.filter(s => s.category === 'general')
  };
  
  return categories;
};