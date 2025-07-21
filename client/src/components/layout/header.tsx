import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Menu, X, Stethoscope, Globe, UserCog } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { useDoctorMode } from '@/contexts/doctor-mode-context';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { isDoctorMode, toggleDoctorMode } = useDoctorMode();

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.checker'), href: '/checker' },
    { name: t('navigation.history'), href: '/history' },
    { name: t('navigation.faq'), href: '/faq' },
    { name: t('navigation.privacy'), href: '/privacy' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-slate-800">HealthCheck</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-slate-500" />
              <Select value={language} onValueChange={(value: 'en' | 'es') => setLanguage(value)}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="es">ES</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Doctor Mode Toggle */}
            <div className="flex items-center space-x-2">
              <UserCog className="h-4 w-4 text-slate-500" />
              <Switch
                checked={isDoctorMode}
                onCheckedChange={toggleDoctorMode}
                className="data-[state=checked]:bg-green-600"
              />
              <span className="text-xs text-slate-600">
                {isDoctorMode ? t('common.doctorMode') : t('common.patientMode')}
              </span>
            </div>

            {/* Book Appointment Button */}
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/book">{t('navigation.book')}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-200">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Controls */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm text-slate-600">Language</span>
                  <Select value={language} onValueChange={(value: 'en' | 'es') => setLanguage(value)}>
                    <SelectTrigger className="w-16 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">EN</SelectItem>
                      <SelectItem value="es">ES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between px-3">
                  <span className="text-sm text-slate-600">
                    {isDoctorMode ? t('common.doctorMode') : t('common.patientMode')}
                  </span>
                  <Switch
                    checked={isDoctorMode}
                    onCheckedChange={toggleDoctorMode}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
                
                <div className="px-3">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link to="/book" onClick={() => setIsMenuOpen(false)}>
                      {t('navigation.book')}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}