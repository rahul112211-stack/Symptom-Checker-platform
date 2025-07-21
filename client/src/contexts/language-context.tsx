import { createContext, useContext, useState, ReactNode } from 'react';

export interface Translation {
  [key: string]: string | Translation;
}

interface LanguageContextType {
  language: 'en' | 'es';
  setLanguage: (lang: 'en' | 'es') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    common: {
      loading: 'Loading...',
      checkSymptoms: 'Check Symptoms',
      downloadPDF: 'Download PDF',
      bookAppointment: 'Book Appointment',
      backToHome: 'Back to Home',
      selectSymptoms: 'Select Symptoms',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      startAnalysis: 'Start Analysis',
      viewHistory: 'View History',
      contactSupport: 'Contact Support'
    },
    nav: {
      home: 'Home',
      checker: 'Symptom Checker',
      history: 'History',
      booking: 'Book Appointment',
      faq: 'FAQ',
      privacy: 'Privacy Policy'
    },
    landing: {
      title: 'Professional Health Assessment Platform',
      subtitle: 'Get personalized health insights with our AI-powered symptom checker',
      description: 'Our advanced symptom analysis helps you understand potential health conditions and connects you with healthcare professionals.',
      features: {
        accurate: 'Accurate Analysis',
        fast: 'Fast Results',
        secure: 'Secure & Private'
      }
    }
  },
  es: {
    common: {
      loading: 'Cargando...',
      checkSymptoms: 'Verificar Síntomas',
      downloadPDF: 'Descargar PDF',
      bookAppointment: 'Reservar Cita',
      backToHome: 'Volver al Inicio',
      selectSymptoms: 'Seleccionar Síntomas',
      getStarted: 'Comenzar',
      learnMore: 'Saber Más',
      startAnalysis: 'Iniciar Análisis',
      viewHistory: 'Ver Historial',
      contactSupport: 'Contactar Soporte'
    },
    nav: {
      home: 'Inicio',
      checker: 'Verificador de Síntomas',
      history: 'Historial',
      booking: 'Reservar Cita',
      faq: 'Preguntas Frecuentes',
      privacy: 'Política de Privacidad'
    },
    landing: {
      title: 'Plataforma Profesional de Evaluación de Salud',
      subtitle: 'Obtenga información personalizada de salud con nuestro verificador de síntomas con IA',
      description: 'Nuestro análisis avanzado de síntomas le ayuda a entender posibles condiciones de salud y le conecta con profesionales médicos.',
      features: {
        accurate: 'Análisis Preciso',
        fast: 'Resultados Rápidos',
        secure: 'Seguro y Privado'
      }
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}