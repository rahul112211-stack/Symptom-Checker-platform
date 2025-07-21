import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  User, 
  Globe, 
  FileText, 
  ArrowRight, 
  Heart, 
  Shield, 
  Clock 
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Search,
      title: t('landing.features.symptomChecker.title'),
      description: t('landing.features.symptomChecker.description'),
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: User,
      title: t('landing.features.bodyMap.title'),
      description: t('landing.features.bodyMap.description'),
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Globe,
      title: t('landing.features.multilingual.title'),
      description: t('landing.features.multilingual.description'),
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: FileText,
      title: t('landing.features.pdfReports.title'),
      description: t('landing.features.pdfReports.description'),
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Health Checks Completed' },
    { number: '15+', label: 'Symptom Categories' },
    { number: '2', label: 'Languages Supported' },
    { number: '24/7', label: 'Platform Availability' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
              {t('landing.hero.title')}
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              {t('landing.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              >
                <Link to="/checker" className="flex items-center">
                  {t('landing.hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
              >
                <Link to="/history">View History</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image/Illustration Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Select Symptoms</h3>
                  <p className="text-slate-600 text-sm">Choose from comprehensive symptom list</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Get Analysis</h3>
                  <p className="text-slate-600 text-sm">Receive intelligent condition matching</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800">Stay Informed</h3>
                  <p className="text-slate-600 text-sm">Make informed health decisions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive tools designed to help you better understand your health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get personalized health insights in minutes with our professional symptom checker
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 text-lg"
            >
              <Link to="/checker">Start Health Check</Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
            >
              <Link to="/book">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}