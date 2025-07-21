import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, History, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Card className="max-w-md mx-auto text-center">
        <CardContent className="pt-8">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-slate-200 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
              Page Not Found
            </h2>
            <p className="text-slate-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/checker">
                  <Search className="mr-1 h-3 w-3" />
                  Symptom Checker
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="sm">
                <Link to="/history">
                  <History className="mr-1 h-3 w-3" />
                  History
                </Link>
              </Button>
            </div>
            
            <Button asChild variant="ghost" size="sm" className="w-full">
              <Link to="/faq">
                <HelpCircle className="mr-2 h-4 w-4" />
                Need Help?
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
