export interface Condition {
  id: string;
  name: string;
  icon: string;
  description: string;
  symptoms: string[];
  severity: 'mild' | 'moderate' | 'severe';
  treatment: string;
  match?: number;
}

export const conditions: Condition[] = [
  {
    id: 'common-cold',
    name: 'Common Cold',
    icon: '🤧',
    description: 'A viral infection of the upper respiratory tract that affects the nose and throat. Usually mild and resolves on its own within 7-10 days.',
    symptoms: ['runny-nose', 'sneezing', 'sore-throat', 'cough', 'fatigue'],
    severity: 'mild',
    treatment: 'Rest, hydration, over-the-counter pain relievers, throat lozenges, and warm salt water gargles can help relieve symptoms. Most colds resolve without treatment.'
  },
  {
    id: 'flu',
    name: 'Influenza (Flu)',
    icon: '🤒',
    description: 'A viral infection that affects the respiratory system. More severe than a common cold and can lead to serious complications if untreated.',
    symptoms: ['fever', 'cough', 'fatigue', 'body-aches', 'headache', 'chills'],
    severity: 'moderate',
    treatment: 'Rest, fluids, antiviral medications (if started early), fever reducers, and supportive care. Severe cases may require hospitalization.'
  },
  {
    id: 'migraine',
    name: 'Migraine Headache',
    icon: '🧠',
    description: 'A neurological condition characterized by intense, throbbing headaches often accompanied by nausea, vomiting, and sensitivity to light and sound.',
    symptoms: ['severe-headache', 'nausea', 'light-sensitivity', 'vomiting'],
    severity: 'moderate',
    treatment: 'Pain medications, triptans, anti-nausea drugs, rest in a dark quiet room, and identifying/avoiding triggers. Preventive medications may be prescribed for frequent migraines.'
  },
  {
    id: 'tension-headache',
    name: 'Tension Headache',
    icon: '😣',
    description: 'The most common type of headache, often described as a tight band around the head. Usually caused by stress, muscle tension, or poor posture.',
    symptoms: ['mild-headache', 'neck-pain', 'fatigue'],
    severity: 'mild',
    treatment: 'Over-the-counter pain relievers, stress management, regular sleep, proper posture, and relaxation techniques like massage or warm compresses.'
  },
  {
    id: 'gastroenteritis',
    name: 'Gastroenteritis (Stomach Flu)',
    icon: '🤢',
    description: 'Inflammation of the stomach and intestines, usually caused by viral or bacterial infection. Leads to gastrointestinal symptoms.',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach-pain', 'fever'],
    severity: 'moderate',
    treatment: 'Rest, clear fluids, electrolyte replacement, bland diet (BRAT), and avoiding dairy. Severe dehydration may require medical attention.'
  },
  {
    id: 'allergic-rhinitis',
    name: 'Allergic Rhinitis (Hay Fever)',
    icon: '🌸',
    description: 'An allergic reaction to airborne substances like pollen, dust mites, or pet dander. Causes inflammation of the nasal passages.',
    symptoms: ['runny-nose', 'sneezing', 'itchy-eyes', 'nasal-congestion'],
    severity: 'mild',
    treatment: 'Antihistamines, nasal corticosteroids, decongestants, avoiding allergens, and allergy shots for severe cases.'
  },
  {
    id: 'bronchitis',
    name: 'Acute Bronchitis',
    icon: '🫁',
    description: 'Inflammation of the bronchial tubes that carry air to the lungs. Usually caused by viral infections and results in persistent cough.',
    symptoms: ['persistent-cough', 'mucus-production', 'fatigue', 'chest-discomfort'],
    severity: 'moderate',
    treatment: 'Rest, fluids, cough suppressants, expectorants, and sometimes bronchodilators. Antibiotics are not usually helpful for viral bronchitis.'
  },
  {
    id: 'sinusitis',
    name: 'Sinusitis',
    icon: '😤',
    description: 'Inflammation of the sinuses, often following a cold or due to allergies. Can be acute or chronic.',
    symptoms: ['facial-pain', 'nasal-congestion', 'thick-nasal-discharge', 'headache'],
    severity: 'moderate',
    treatment: 'Nasal decongestants, saline irrigation, pain relievers, warm compresses, and antibiotics if bacterial infection is suspected.'
  }
];

export const getConditionMatches = (selectedSymptoms: string[]): Condition[] => {
  if (selectedSymptoms.length === 0) return [];

  const matches = conditions.map(condition => {
    const matchingSymptoms = condition.symptoms.filter(symptom => 
      selectedSymptoms.includes(symptom)
    );
    const matchPercentage = Math.round((matchingSymptoms.length / condition.symptoms.length) * 100);
    
    return {
      ...condition,
      match: matchPercentage
    };
  }).filter(condition => condition.match! > 0);

  return matches.sort((a, b) => b.match! - a.match!);
};