import React from 'react';
import AppointmentPage from "@/components/Appointments/AppointmentPage";
import { Doctor } from '@/types/doctor';
import { toast } from 'sonner';

export default function Appointments() {
  const handleBookAppointment = (doctor: Doctor) => {
    toast.success(`Appointment booked with ${doctor.name}`);
  };

  return <AppointmentPage onBookAppointment={handleBookAppointment} />;
}
