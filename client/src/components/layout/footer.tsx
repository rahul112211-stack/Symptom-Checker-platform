import { Link } from 'react-router-dom';
import { Stethoscope, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">HealthCheck</span>
            </div>
            <p className="text-slate-300 text-sm">
              Professional symptom checker platform for better health insights and medical awareness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/checker" className="text-slate-300 hover:text-white transition-colors">
                  {t('navigation.checker')}
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-slate-300 hover:text-white transition-colors">
                  {t('navigation.history')}
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-slate-300 hover:text-white transition-colors">
                  {t('navigation.book')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">
                  {t('navigation.faq')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-white transition-colors">
                  {t('navigation.privacy')}
                </Link>
              </li>
              <li>
                <a href="mailto:support@healthcheck.com" className="text-slate-300 hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors">
                  Medical Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 HealthCheck. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-slate-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>for better health</span>
          </div>
        </div>
      </div>
    </footer>
  );
}