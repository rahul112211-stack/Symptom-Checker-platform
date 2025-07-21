import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, ChevronDown, ChevronRight, HelpCircle, Shield, Clock, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'medical' | 'technical' | 'privacy';
  tags: string[];
}

export default function FAQ() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Is this a real medical diagnosis?',
      answer: 'No, this is not a real medical diagnosis. Our symptom checker is an educational tool designed to provide general health information and help you understand potential conditions related to your symptoms. It should never replace professional medical advice, diagnosis, or treatment from qualified healthcare providers.',
      category: 'medical',
      tags: ['diagnosis', 'medical', 'disclaimer']
    },
    {
      id: '2',
      question: 'How accurate is the symptom checker?',
      answer: 'Our symptom checker uses established medical knowledge and algorithms to suggest possible conditions based on symptoms. However, accuracy can vary and many factors influence health conditions that our tool cannot assess. Always consult with healthcare professionals for accurate diagnosis and treatment.',
      category: 'medical',
      tags: ['accuracy', 'reliability', 'medical']
    },
    {
      id: '3',
      question: 'Is my health information kept private?',
      answer: 'Yes, we take your privacy seriously. All symptom checks are stored locally in your browser and are not transmitted to external servers unless you explicitly choose to save them to your account. We do not share personal health information with third parties.',
      category: 'privacy',
      tags: ['privacy', 'data', 'security']
    },
    {
      id: '4',
      question: 'Can I use this tool for emergency situations?',
      answer: 'No, this tool is not intended for emergency situations. If you are experiencing a medical emergency, call emergency services immediately (911 in the US, 999 in the UK, or your local emergency number). Seek immediate medical attention for severe symptoms.',
      category: 'medical',
      tags: ['emergency', 'urgent', 'medical']
    },
    {
      id: '5',
      question: 'How do I interpret the results?',
      answer: 'Results show possible conditions ranked by how well they match your selected symptoms. Higher percentages indicate better matches. Remember that many conditions share similar symptoms, and proper diagnosis requires professional medical evaluation.',
      category: 'general',
      tags: ['results', 'interpretation', 'understanding']
    },
    {
      id: '6',
      question: 'Can I save my symptom check history?',
      answer: 'Yes, your recent symptom checks are automatically saved in your browser\'s local storage. You can view your history in the History section. This data remains on your device and is not shared externally.',
      category: 'technical',
      tags: ['history', 'saving', 'storage']
    },
    {
      id: '7',
      question: 'What should I do if my symptoms are not listed?',
      answer: 'If your specific symptoms are not available in our list, try selecting the closest related symptoms or broader symptom categories. For unique or complex symptoms, it\'s best to consult directly with a healthcare provider.',
      category: 'general',
      tags: ['symptoms', 'missing', 'selection']
    },
    {
      id: '8',
      question: 'How often is the medical information updated?',
      answer: 'Our medical information is based on current medical knowledge and best practices. However, medical science evolves continuously. Always verify information with current medical resources and healthcare professionals.',
      category: 'medical',
      tags: ['updates', 'medical', 'information']
    },
    {
      id: '9',
      question: 'Can children use this symptom checker?',
      answer: 'This tool is designed for adult use. Pediatric symptoms and conditions often differ significantly from adult presentations. For children\'s health concerns, always consult with pediatricians or qualified healthcare providers.',
      category: 'medical',
      tags: ['children', 'pediatric', 'age']
    },
    {
      id: '10',
      question: 'Why do I need to book an appointment?',
      answer: 'The appointment booking feature is a demonstration of how symptom checkers can integrate with healthcare systems. In a real implementation, this would connect you with healthcare providers for proper medical consultation.',
      category: 'general',
      tags: ['appointment', 'booking', 'consultation']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: HelpCircle },
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'medical', name: 'Medical', icon: Shield },
    { id: 'technical', name: 'Technical', icon: FileText },
    { id: 'privacy', name: 'Privacy', icon: Clock }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      medical: 'bg-red-100 text-red-800',
      technical: 'bg-green-100 text-green-800',
      privacy: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600">
          Find answers to common questions about our symptom checker and health platform
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Results */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <HelpCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <CardTitle className="text-slate-600 mb-2">
                No FAQs Found
              </CardTitle>
              <CardDescription>
                Try adjusting your search terms or category filters to find relevant questions.
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredFAQs.map((faq) => (
              <Collapsible
                key={faq.id}
                open={openItems.has(faq.id)}
                onOpenChange={() => toggleItem(faq.id)}
              >
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-left text-lg text-slate-800 mb-2">
                            {faq.question}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="secondary" 
                              className={getCategoryColor(faq.category)}
                            >
                              {faq.category}
                            </Badge>
                            <div className="flex flex-wrap gap-1">
                              {faq.tags.slice(0, 2).map((tag, index) => (
                                <span 
                                  key={index}
                                  className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {openItems.has(faq.id) ? (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="bg-slate-50 rounded-lg p-4 border-t border-slate-200">
                        <p className="text-slate-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        )}
      </div>

      {/* Contact Support */}
      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <HelpCircle className="mr-2 h-5 w-5" />
            Still Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700 mb-4">
            If you couldn't find the answer to your question, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href="mailto:support@healthcheck.com"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Email Support
            </a>
            <a 
              href="/book"
              className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}