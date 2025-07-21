import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Clock, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

interface AppointmentForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  date: string;
  time: string;
  notes: string;
}

export default function BookAppointment() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<AppointmentForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    date: '',
    time: '',
    notes: ''
  });

  const departments = [
    { value: 'general', label: 'General Medicine' },
    { value: 'internal', label: 'Internal Medicine' },
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'psychiatry', label: 'Psychiatry' },
    { value: 'emergency', label: 'Emergency Care' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  const handleInputChange = (field: keyof AppointmentForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="text-center py-12 bg-green-50 border-green-200">
          <CardContent>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-800 mb-4">
              Appointment Booked Successfully!
            </CardTitle>
            <CardDescription className="text-green-700 mb-6">
              Your appointment has been scheduled for {new Date(formData.date).toLocaleDateString()} at {formData.time}.
              You will receive a confirmation email shortly at {formData.email}.
            </CardDescription>
            
            <div className="bg-white rounded-lg p-6 text-left max-w-md mx-auto border border-green-200">
              <h3 className="font-semibold text-slate-800 mb-3">Appointment Details:</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Patient:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Department:</strong> {departments.find(d => d.value === formData.department)?.label}</div>
                <div><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</div>
                <div><strong>Time:</strong> {formData.time}</div>
                <div><strong>Contact:</strong> {formData.email}</div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mr-4"
              >
                Book Another Appointment
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {t('navigation.book')}
        </h1>
        <p className="text-slate-600">
          Schedule a consultation with our healthcare professionals
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-blue-600" />
            Appointment Information
          </CardTitle>
          <CardDescription>
            Please fill out all required fields to schedule your appointment
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <User className="mr-2 h-4 w-4" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Appointment Details
              </h3>

              <div>
                <Label htmlFor="department">Department *</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => handleInputChange('department', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Preferred Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    min={getMinDate()}
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="time">Preferred Time *</Label>
                  <Select 
                    value={formData.time} 
                    onValueChange={(value) => handleInputChange('time', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Please describe your symptoms or reason for visit..."
                  rows={4}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.department || !formData.date || !formData.time}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Information Alert */}
      <Alert className="mt-6 bg-blue-50 border-blue-200">
        <Mail className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Please note:</strong> This is a demonstration booking system. 
          You will receive a confirmation email within 24 hours if this were a real appointment system.
        </AlertDescription>
      </Alert>
    </div>
  );
}