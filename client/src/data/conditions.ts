export interface Symptom {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'head' | 'chest' | 'stomach' | 'body' | 'general';
}

export interface Condition {
  id: string;
  name: string;
  symptoms: string[];
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
  icon: string;
  treatment: string;
}

export const symptoms: Symptom[] = [
  {
    id: 'headache',
    name: 'Headache',
    description: 'Head pain or pressure that may range from mild to severe',
    emoji: '🤕',
    category: 'head'
  },
  {
    id: 'dizziness',
    name: 'Dizziness',
    description: 'Lightheadedness or feeling unsteady on your feet',
    emoji: '😵‍💫',
    category: 'head'
  },
  {
    id: 'sore-throat',
    name: 'Sore Throat',
    description: 'Throat pain, scratchiness, or irritation that worsens when swallowing',
    emoji: '😷',
    category: 'head'
  },
  {
    id: 'runny-nose',
    name: 'Runny Nose',
    description: 'Nasal discharge or congestion that may be clear or colored',
    emoji: '👃',
    category: 'head'
  },
  {
    id: 'cough',
    name: 'Cough',
    description: 'Dry or productive cough that may be persistent',
    emoji: '🤧',
    category: 'chest'
  },
  {
    id: 'chest-pain',
    name: 'Chest Pain',
    description: 'Discomfort or pain in the chest area',
    emoji: '💓',
    category: 'chest'
  },
  {
    id: 'shortness-breath',
    name: 'Shortness of Breath',
    description: 'Difficulty breathing or feeling like you can\'t get enough air',
    emoji: '😮‍💨',
    category: 'chest'
  },
  {
    id: 'nausea',
    name: 'Nausea',
    description: 'Feeling of sickness with an urge to vomit',
    emoji: '🤢',
    category: 'stomach'
  },
  {
    id: 'stomach-pain',
    name: 'Stomach Pain',
    description: 'Abdominal pain or cramping in the stomach area',
    emoji: '🤮',
    category: 'stomach'
  },
  {
    id: 'vomiting',
    name: 'Vomiting',
    description: 'Forceful emptying of stomach contents through the mouth',
    emoji: '🤮',
    category: 'stomach'
  },
  {
    id: 'body-aches',
    name: 'Body Aches',
    description: 'Muscle or joint pain throughout the body',
    emoji: '🦴',
    category: 'body'
  },
  {
    id: 'back-pain',
    name: 'Back Pain',
    description: 'Pain or stiffness in the back muscles or spine',
    emoji: '🫸',
    category: 'body'
  },
  {
    id: 'fever',
    name: 'Fever',
    description: 'Elevated body temperature above 100.4°F (38°C)',
    emoji: '🤒',
    category: 'general'
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    description: 'Extreme tiredness or lack of energy that doesn\'t improve with rest',
    emoji: '😴',
    category: 'general'
  },
  {
    id: 'chills',
    name: 'Chills',
    description: 'Feeling cold and shivering, often with fever',
    emoji: '🥶',
    category: 'general'
  }
];

export const conditions: Condition[] = [
  {
    id: 'common-cold',
    name: 'Common Cold',
    symptoms: ['runny-nose', 'sore-throat', 'cough', 'headache', 'fatigue'],
    description: 'A viral infection affecting the nose and throat. Usually mild and resolves on its own.',
    severity: 'mild',
    icon: '🤧',
    treatment: 'Rest, fluids, over-the-counter medications for symptom relief'
  },
  {
    id: 'flu',
    name: 'Influenza (Flu)',
    symptoms: ['fever', 'body-aches', 'fatigue', 'headache', 'cough', 'chills'],
    description: 'A viral infection that attacks the respiratory system. More severe than a common cold.',
    severity: 'moderate',
    icon: '🤒',
    treatment: 'Rest, fluids, antiviral medications if caught early'
  },
  {
    id: 'sinusitis',
    name: 'Sinusitis',
    symptoms: ['headache', 'runny-nose', 'sore-throat'],
    description: 'Inflammation of the sinuses, often following a cold or allergic reaction.',
    severity: 'mild',
    icon: '👃',
    treatment: 'Nasal decongestants, warm compresses, possibly antibiotics'
  },
  {
    id: 'migraine',
    name: 'Migraine',
    symptoms: ['headache', 'nausea', 'dizziness'],
    description: 'A type of headache characterized by intense pain, often on one side of the head.',
    severity: 'moderate',
    icon: '🤕',
    treatment: 'Pain relievers, rest in dark quiet room, prescription medications'
  },
  {
    id: 'gastroenteritis',
    name: 'Gastroenteritis',
    symptoms: ['nausea', 'fatigue', 'stomach-pain', 'vomiting'],
    description: 'Inflammation of the stomach and intestines, often called stomach flu.',
    severity: 'mild',
    icon: '🤢',
    treatment: 'Rest, fluids, bland diet, gradual return to normal foods'
  },
  {
    id: 'strep-throat',
    name: 'Strep Throat',
    symptoms: ['sore-throat', 'fever', 'headache'],
    description: 'A bacterial infection of the throat and tonsils.',
    severity: 'moderate',
    icon: '😷',
    treatment: 'Antibiotics prescribed by doctor, pain relievers, rest'
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    symptoms: ['cough', 'fever', 'chest-pain', 'shortness-breath', 'fatigue'],
    description: 'An infection that inflames air sacs in one or both lungs.',
    severity: 'severe',
    icon: '🫁',
    treatment: 'Antibiotics, rest, oxygen therapy if severe'
  },
  {
    id: 'back-strain',
    name: 'Back Strain',
    symptoms: ['back-pain', 'body-aches'],
    description: 'Muscle strain or sprain in the back muscles or ligaments.',
    severity: 'mild',
    icon: '🫸',
    treatment: 'Rest, ice/heat therapy, pain relievers, gentle stretching'
  }
];

export const symptomCategories = {
  head: { name: 'Head & Neck', icon: '🧠', color: 'bg-blue-50 border-blue-200' },
  chest: { name: 'Chest & Breathing', icon: '🫁', color: 'bg-green-50 border-green-200' },
  stomach: { name: 'Stomach & Digestion', icon: '🫃', color: 'bg-orange-50 border-orange-200' },
  body: { name: 'Body & Muscles', icon: '💪', color: 'bg-purple-50 border-purple-200' },
  general: { name: 'General Symptoms', icon: '🌡️', color: 'bg-gray-50 border-gray-200' }
};
