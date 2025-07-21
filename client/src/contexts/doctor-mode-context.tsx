import { createContext, useContext, useState, ReactNode } from 'react';

interface DoctorModeContextType {
  isDoctorMode: boolean;
  toggleDoctorMode: () => void;
}

const DoctorModeContext = createContext<DoctorModeContextType | undefined>(undefined);

export function DoctorModeProvider({ children }: { children: ReactNode }) {
  const [isDoctorMode, setIsDoctorMode] = useState(false);

  const toggleDoctorMode = () => {
    setIsDoctorMode(prev => !prev);
  };

  return (
    <DoctorModeContext.Provider value={{ isDoctorMode, toggleDoctorMode }}>
      {children}
    </DoctorModeContext.Provider>
  );
}

export function useDoctorMode() {
  const context = useContext(DoctorModeContext);
  if (context === undefined) {
    throw new Error('useDoctorMode must be used within a DoctorModeProvider');
  }
  return context;
}