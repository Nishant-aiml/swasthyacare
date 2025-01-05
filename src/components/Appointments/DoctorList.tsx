import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Calendar } from '@/components/ui/Calendar';
import { Doctor } from '@/types/doctor';
import { Star, Clock, MapPin, Phone, Mail, Calendar as CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { toast } from 'sonner';

const doctorTypes = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedist',
  'Neurologist',
  'Psychiatrist',
  'Dentist'
];

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: 15,
    rating: 4.8,
    reviews: 128,
    languages: ['English', 'Hindi'],
    availability: 'Mon-Fri, 9 AM - 5 PM',
    consultationFee: 1500,
    image: '/doctors/sarah.jpg',
    qualifications: ['MBBS', 'MD', 'DM Cardiology'],
    location: 'Apollo Hospital, Bangalore'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    experience: 12,
    rating: 4.9,
    reviews: 96,
    languages: ['English', 'Mandarin'],
    availability: 'Mon-Sat, 10 AM - 6 PM',
    consultationFee: 2000,
    image: '/doctors/michael.jpg',
    qualifications: ['MBBS', 'MD', 'DM Neurology'],
    location: 'Manipal Hospital, Bangalore'
  }
];

interface DoctorListProps {
  onBookAppointment: (doctor: Doctor) => void;
}

export function DoctorList({ onBookAppointment }: DoctorListProps) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: ''
  });

  const filteredDoctors = selectedType
    ? mockDoctors.filter(d => d.specialization === selectedType)
    : mockDoctors;

  const handleSubmit = () => {
    if (!selectedDoctor || !date || !formData.patientName || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    onBookAppointment(selectedDoctor);
    setShowBookingDialog(false);
    setFormData({ patientName: '', phone: '', email: '' });
    toast.success(`Appointment booked with ${selectedDoctor.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Doctor Type Selection */}
      <div className="flex items-center gap-4">
        <Label htmlFor="doctorType">Select Specialization:</Label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Specializations" />
          </SelectTrigger>
          <SelectContent>
            {doctorTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map(doctor => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-gray-500">({doctor.reviews} reviews)</span>
                  </div>

                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {doctor.availability}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {doctor.location}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-primary font-semibold">₹{doctor.consultationFee}</span>
                    <Button onClick={() => {
                      setSelectedDoctor(doctor);
                      setShowBookingDialog(true);
                    }}>
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Fill in your details to book an appointment with {selectedDoctor?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={formData.patientName}
                onChange={e => setFormData({ ...formData, patientName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
