import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from 'sonner';
import { CalendarCheck, Clock, User, Phone, Stethoscope, Calendar as CalendarIcon } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  date: Date;
  time: string;
  doctorType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const doctorTypes = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Neurologist',
] as const;

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
  '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
] as const;

type DoctorType = typeof doctorTypes[number];
type TimeSlot = typeof timeSlots[number];

interface FormData {
  patientName: string;
  phone: string;
  time: TimeSlot | '';
  doctorType: DoctorType | '';
}

export default function AppointmentPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'John Doe',
      phone: '1234567890',
      date: new Date(),
      time: '10:00 AM',
      doctorType: 'General Physician',
      status: 'upcoming',
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      phone: '9876543210',
      date: new Date(Date.now() - 86400000),
      time: '02:30 PM',
      doctorType: 'Cardiologist',
      status: 'completed',
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    phone: '',
    time: '',
    doctorType: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    if (!formData.time) {
      toast.error('Please select a time slot');
      return;
    }
    if (!formData.doctorType) {
      toast.error('Please select a doctor type');
      return;
    }

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      patientName: formData.patientName,
      phone: formData.phone,
      date: date,
      time: formData.time,
      doctorType: formData.doctorType,
      status: 'upcoming',
    };

    setAppointments([newAppointment, ...appointments]);
    toast.success('Appointment booked successfully!', {
      description: `Your appointment is scheduled for ${date.toLocaleDateString()} at ${formData.time}`,
    });

    // Reset form
    setFormData({
      patientName: '',
      phone: '',
      time: '',
      doctorType: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Your Appointment</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <Card className="p-6 bg-white shadow-lg rounded-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="patientName"
                    placeholder="Enter your name"
                    className="pl-10"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Select Date</Label>
                <div className="border rounded-lg p-3">
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(day: Date) => day < new Date()}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Select Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Select onValueChange={(value: TimeSlot) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Select time slot" />
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

              <div className="space-y-2">
                <Label htmlFor="doctorType">Doctor Specialization</Label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Select onValueChange={(value: DoctorType) => setFormData({ ...formData, doctorType: value })}>
                    <SelectTrigger className="w-full pl-10">
                      <SelectValue placeholder="Select doctor type" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctorTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Book Appointment
              </Button>
            </form>
          </Card>

          {/* Appointments List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Your Appointments</h2>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">Upcoming</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Cancelled</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className={`p-4 border-l-4 ${
                    appointment.status === 'upcoming'
                      ? 'border-l-blue-500'
                      : appointment.status === 'completed'
                      ? 'border-l-green-500'
                      : 'border-l-red-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">{appointment.doctorType}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-gray-600">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm">
                          {appointment.date.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{appointment.time}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
