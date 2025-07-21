import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';
import { useLanguage } from '@/contexts/language-context';
import { useDoctorMode } from '@/contexts/doctor-mode-context';
import { 
  Menu, 
  Stethoscope, 
  Globe, 
  UserCheck, 
  Home, 
  Search, 
  History, 
  Calendar,
  HelpCircle,
  Shield
} from 'lucide-react';

export default function Header() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { isDoctorMode, toggleDoctorMode } = useDoctorMode();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/checker', label: t('nav.checker'), icon: Search },
    { path: '/history', label: t('nav.history'), icon: History },
    { path: '/book', label: t('nav.booking'), icon: Calendar },
    { path: '/faq', label: t('nav.faq'), icon: HelpCircle },
    { path: '/privacy', label: t('nav.privacy'), icon: Shield }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-800">HealthCheck</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Doctor Mode Toggle */}
            <Button
              variant={isDoctorMode ? 'default' : 'outline'}
              size="sm"
              onClick={toggleDoctorMode}
              className={isDoctorMode ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              <UserCheck className="mr-2 h-4 w-4" />
              {isDoctorMode ? 'Doctor Mode' : 'Patient Mode'}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            >
              <Globe className="mr-2 h-4 w-4" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>

            {/* Doctor Mode Badge */}
            {isDoctorMode && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Professional Mode
              </Badge>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-2 gap-2">
            {navItems.slice(0, 4).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}