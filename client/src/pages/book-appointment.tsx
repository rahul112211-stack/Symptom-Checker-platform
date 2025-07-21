import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  Star,
  Shield,
  Video,
  MessageSquare,
  Stethoscope,
  ArrowLeft
} from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: string;
  education: string;
  languages: string[];
  availability: string[];
  consultationFee: number;
  avatar: string;
}

export default function BookAppointment() {
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [consultationType, setConsultationType] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Family Medicine',
      rating: 4.9,
      reviews: 245,
      experience: '12 years',
      education: 'Harvard Medical School',
      languages: ['English', 'Spanish'],
      availability: ['2025-01-22', '2025-01-23', '2025-01-24'],
      consultationFee: 150,
      avatar: '👩‍⚕️'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Internal Medicine',
      rating: 4.8,
      reviews: 189,
      experience: '15 years',
      education: 'Johns Hopkins University',
      languages: ['English', 'Mandarin'],
      availability: ['2025-01-22', '2025-01-23', '2025-01-25'],
      consultationFee: 175,
      avatar: '👨‍⚕️'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Emergency Medicine',
      rating: 4.9,
      reviews: 312,
      experience: '10 years',
      education: 'Stanford Medical School',
      languages: ['English', 'Spanish', 'Portuguese'],
      availability: ['2025-01-23', '2025-01-24', '2025-01-25'],
      consultationFee: 200,
      avatar: '👩‍⚕️'
    }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const consultationTypes = [
    { id: 'video', name: 'Video Consultation', icon: Video, description: 'Virtual appointment via video call' },
    { id: 'phone', name: 'Phone Consultation', icon: Phone, description: 'Audio-only consultation' },
    { id: 'in-person', name: 'In-Person Visit', icon: MapPin, description: 'Visit the clinic in person' },
    { id: 'chat', name: 'Text Consultation', icon: MessageSquare, description: 'Written consultation via secure messaging' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <CardContent>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl text-slate-800 mb-2">
              Appointment Booked Successfully!
            </CardTitle>
            <CardDescription className="text-lg mb-6">
              Your appointment has been confirmed. You'll receive a confirmation email shortly.
            </CardDescription>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Appointment Details:</h3>
              <div className="text-green-700 space-y-1">
                <p><strong>Doctor:</strong> {doctors.find(d => d.id === selectedDoctor)?.name}</p>
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Type:</strong> {consultationTypes.find(t => t.id === consultationType)?.name}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/history">
                  View My Appointments
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/checker">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Health Check
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center">
          <Calendar className="mr-3 h-8 w-8 text-blue-600" />
          Book Medical Appointment
        </h1>
        <p className="text-slate-600 text-lg">
          Connect with qualified healthcare professionals for personalized consultation
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Doctor Selection */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <Stethoscope className="mr-2 h-5 w-5 text-blue-600" />
                Choose Your Doctor
              </CardTitle>
              <CardDescription>
                Select from our network of qualified healthcare professionals
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {doctors.map((doctor) => (
                  <div 
                    key={doctor.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedDoctor === doctor.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                    onClick={() => setSelectedDoctor(doctor.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{doctor.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-800">{doctor.name}</h3>
                            <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                            <p className="text-sm text-slate-500">{doctor.education}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1 mb-1">
                              <Star className="h-4 w-4 fill-current text-yellow-400" />
                              <span className="font-medium">{doctor.rating}</span>
                              <span className="text-sm text-slate-500">({doctor.reviews})</span>
                            </div>
                            <p className="text-lg font-semibold text-slate-800">${doctor.consultationFee}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge variant="secondary">{doctor.experience} experience</Badge>
                          {doctor.languages.map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Consultation Type */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <Video className="mr-2 h-5 w-5 text-blue-600" />
                Consultation Type
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {consultationTypes.map((type) => (
                  <div 
                    key={type.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      consultationType === type.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                    onClick={() => setConsultationType(type.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <type.icon className="h-6 w-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-slate-800">{type.name}</h4>
                        <p className="text-sm text-slate-500">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-slate-800">
                <Clock className="mr-2 h-5 w-5 text-blue-600" />
                Schedule Appointment
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date Selection */}
                <div>
                  <Label htmlFor="date">Select Date</Label>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose date" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedDoctor && doctors.find(d => d.id === selectedDoctor)?.availability.map((date) => (
                        <SelectItem key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Selection */}
                <div>
                  <Label htmlFor="time">Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time" />
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

                {/* Patient Information */}
                <div className="space-y-3">
                  <Label>Patient Information</Label>
                  
                  <div>
                    <Input 
                      placeholder="Full Name" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Textarea 
                      placeholder="Describe your symptoms or reason for consultation (optional)"
                      rows={3}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!selectedDoctor || !selectedDate || !selectedTime || !consultationType || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Booking Appointment...
                    </>
                  ) : (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Alert className="mt-4 bg-green-50 border-green-200">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Secure & Private:</strong> All appointment information is encrypted and HIPAA-compliant.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}