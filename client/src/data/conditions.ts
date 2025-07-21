export interface Symptom {
  id: string;
  name: string;
  description: string;
  emoji: string;
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
    description: 'Head pain or pressure',
    emoji: '🤕'
  },
  {
    id: 'fever',
    name: 'Fever',
    description: 'Elevated body temperature',
    emoji: '🤒'
  },
  {
    id: 'sore-throat',
    name: 'Sore Throat',
    description: 'Throat pain or irritation',
    emoji: '😷'
  },
  {
    id: 'cough',
    name: 'Cough',
    description: 'Dry or productive cough',
    emoji: '🤧'
  },
  {
    id: 'runny-nose',
    name: 'Runny Nose',
    description: 'Nasal discharge',
    emoji: '👃'
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    description: 'Extreme tiredness',
    emoji: '😴'
  },
  {
    id: 'body-aches',
    name: 'Body Aches',
    description: 'Muscle or joint pain',
    emoji: '🦴'
  },
  {
    id: 'nausea',
    name: 'Nausea',
    description: 'Feeling of sickness',
    emoji: '🤢'
  },
  {
    id: 'dizziness',
    name: 'Dizziness',
    description: 'Lightheadedness',
    emoji: '😵‍💫'
  }
];

export const conditions: Condition[] = [
  {
    id: 'common-cold',
    name: 'Common Cold',
    symptoms: ['runny-nose', 'sore-throat', 'cough', 'headache'],
    description: 'A viral infection affecting the nose and throat. Usually mild and resolves on its own.',
    severity: 'mild',
    icon: '🤧',
    treatment: 'Rest, fluids, over-the-counter medications for symptom relief'
  },
  {
    id: 'flu',
    name: 'Influenza (Flu)',
    symptoms: ['fever', 'body-aches', 'fatigue', 'headache', 'cough'],
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
    symptoms: ['nausea', 'fatigue', 'headache'],
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
  }
];
