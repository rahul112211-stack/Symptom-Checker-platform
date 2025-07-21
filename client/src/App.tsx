import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/language-context";
import { DoctorModeProvider } from "@/contexts/doctor-mode-context";

// Pages
import LandingPage from "./pages/landing";
import SymptomChecker from "./pages/symptom-checker";
import History from "./pages/history";
import ConditionInfo from "./pages/condition-info";
import BookAppointment from "./pages/book-appointment";
import FAQ from "./pages/faq";
import PrivacyPolicy from "./pages/privacy-policy";
import NotFound from "./pages/not-found";

// Layout
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <DoctorModeProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-slate-50">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/checker" element={<SymptomChecker />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/condition/:id" element={<ConditionInfo />} />
                    <Route path="/book" element={<BookAppointment />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
              <Toaster />
            </Router>
          </DoctorModeProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
