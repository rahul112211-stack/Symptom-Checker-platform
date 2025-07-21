import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, Lock, Database, Users, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: `This symptom checker is designed with privacy in mind. We collect minimal information necessary to provide our service:
      
      • Symptom selections you make during health checks
      • Basic usage analytics to improve our service
      • Optional account information if you choose to create an account
      • Browser information for technical functionality
      
      We do not collect personally identifiable health information without your explicit consent.`
    },
    {
      icon: Database,
      title: 'How We Store Your Data',
      content: `Your privacy is our priority. Here's how we handle your data:
      
      • Symptom check history is stored locally in your browser by default
      • No health data is transmitted to our servers without your permission
      • If you create an account, data is encrypted and stored securely
      • We use industry-standard security measures to protect any stored information
      
      You maintain full control over your health data at all times.`
    },
    {
      icon: Users,
      title: 'Data Sharing Policy',
      content: `We believe your health information belongs to you:
      
      • We never sell your personal health information to third parties
      • Anonymous, aggregated data may be used for research purposes
      • We may share data only when required by law or with your explicit consent
      • Healthcare providers you choose to share with may receive your information
      
      Your trust is essential to our mission of improving healthcare accessibility.`
    },
    {
      icon: Lock,
      title: 'Security Measures',
      content: `We implement comprehensive security measures:
      
      • End-to-end encryption for all data transmissions
      • Regular security audits and updates
      • Access controls and authentication systems
      • Secure data storage with backup and recovery procedures
      
      While no system is 100% secure, we continuously work to protect your information.`
    },
    {
      icon: FileText,
      title: 'Your Rights and Choices',
      content: `You have complete control over your information:
      
      • Access: View all data we have about you
      • Correction: Update or correct any inaccurate information
      • Deletion: Request complete removal of your data
      • Portability: Export your data in a standard format
      • Opt-out: Choose not to participate in data collection
      
      Contact us at privacy@healthcheck.com to exercise these rights.`
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Privacy Policy
        </h1>
        <p className="text-slate-600">
          How we protect and handle your health information
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Last updated: January 21, 2025
        </p>
      </div>

      {/* Introduction */}
      <Alert className="mb-8 bg-blue-50 border-blue-200">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Important Notice:</strong> This is a demonstration symptom checker platform. 
          In a real-world implementation, this privacy policy would be legally binding and regularly reviewed by legal experts.
        </AlertDescription>
      </Alert>

      {/* Privacy Commitment */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Shield className="mr-2 h-5 w-5" />
            Our Privacy Commitment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 leading-relaxed">
            Your health information is deeply personal and deserves the highest level of protection. 
            We are committed to transparency about our data practices and giving you complete control 
            over your health information. This policy explains how we collect, use, and protect your data 
            while providing you with valuable health insights.
          </p>
        </CardContent>
      </Card>

      {/* Policy Sections */}
      <div className="space-y-6">
        {sections.map((section, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <section.icon className="mr-2 h-5 w-5 text-blue-600" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                {section.content.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-slate-700 leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technical Implementation */}
      <Card className="mt-8 bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-800">
            <Database className="mr-2 h-5 w-5 text-slate-600" />
            Technical Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-slate-700">
            <div>
              <h4 className="font-semibold mb-2">Local Storage:</h4>
              <p>Your symptom check history is stored in your browser's local storage by default. This means:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Data never leaves your device unless you explicitly share it</li>
                <li>You can clear this data anytime through your browser settings</li>
                <li>Data is automatically removed when you clear your browser data</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Optional Account Features:</h4>
              <p>If you choose to create an account for syncing across devices:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Data is encrypted before transmission</li>
                <li>Stored on secure, HIPAA-compliant servers</li>
                <li>Accessible only with your authentication credentials</li>
                <li>Can be permanently deleted upon request</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mt-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">
            Questions About Privacy?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 mb-4">
            We're committed to transparency. If you have questions about this privacy policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-blue-700">
            <p><strong>Email:</strong> privacy@healthcheck.com</p>
            <p><strong>Data Protection Officer:</strong> dpo@healthcheck.com</p>
            <p><strong>Mailing Address:</strong> 123 Health Tech Ave, Privacy City, PC 12345</p>
          </div>
        </CardContent>
      </Card>

      {/* Legal Notice */}
      <Alert className="mt-8 bg-amber-50 border-amber-200">
        <FileText className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Legal Notice:</strong> This privacy policy is for demonstration purposes. 
          A real health platform would require compliance with healthcare regulations like HIPAA (US), 
          GDPR (EU), and other applicable privacy laws in your jurisdiction.
        </AlertDescription>
      </Alert>
    </div>
  );
}