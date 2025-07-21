import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import { 
  ArrowRight, 
  Stethoscope, 
  Shield, 
  Zap, 
  Users, 
  CheckCircle, 
  Star,
  Clock,
  Heart,
  Brain,
  Search,
  Calendar,
  FileText
} from 'lucide-react';

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze your symptoms for accurate health insights'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and stored securely with HIPAA-compliant standards'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get immediate health assessments and condition matches in under 30 seconds'
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect directly with qualified healthcare professionals for consultations'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Health Assessments', icon: Search },
    { number: '95%', label: 'Accuracy Rate', icon: CheckCircle },
    { number: '24/7', label: 'Available', icon: Clock },
    { number: '1000+', label: 'Healthcare Partners', icon: Heart }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Primary Care Physician',
      content: 'This platform has revolutionized how I connect with patients for preliminary assessments.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Patient',
      content: 'Quick, accurate, and helped me understand my symptoms before visiting the doctor.',
      rating: 5
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Emergency Medicine',
      content: 'The symptom checker provides valuable insights that help prioritize patient care.',
      rating: 5
    }
  ];

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-500/20 text-blue-100 border-blue-400/30">
              Trusted by Healthcare Professionals
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('landing.title')}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('landing.subtitle')}
            </p>
            <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto">
              {t('landing.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4">
                <Link to="/checker">
                  <Stethoscope className="mr-2 h-5 w-5" />
                  {t('common.getStarted')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-300 text-blue-100 hover:bg-blue-700/50 text-lg px-8 py-4">
                <Link to="/faq">
                  {t('common.learnMore')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="bg-white/10 rounded-full p-4">
            <Heart className="h-8 w-8 text-blue-200" />
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-pulse">
          <div className="bg-white/10 rounded-full p-4">
            <Brain className="h-8 w-8 text-blue-200" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced technology meets healthcare expertise to provide you with the most reliable health assessment experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-slate-200">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-slate-800">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Get professional health insights in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Select Symptoms</h3>
              <p className="text-slate-600">
                Choose from our comprehensive list of symptoms organized by body system and severity.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">AI Analysis</h3>
              <p className="text-slate-600">
                Our advanced algorithms analyze your symptoms against medical databases for accurate matching.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Get Results</h3>
              <p className="text-slate-600">
                Receive detailed condition matches, treatment recommendations, and next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-slate-600">
              See what medical professionals and patients say about our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-slate-200">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-slate-700 text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust our platform for reliable health assessments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4">
              <Link to="/checker">
                <Search className="mr-2 h-5 w-5" />
                {t('common.startAnalysis')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-blue-300 text-blue-100 hover:bg-blue-700/50 text-lg px-8 py-4">
              <Link to="/book">
                <Calendar className="mr-2 h-5 w-5" />
                {t('common.bookAppointment')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}