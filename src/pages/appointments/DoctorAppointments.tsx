import React from 'react';
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Doctor } from '@/types/doctor';
import { toast } from 'sonner';

const formSchema = z.object({
  doctor: z.string().min(1, "Please select a doctor"),
  appointmentTime: z.string().min(1, "Please select a time"),
});

type FormValues = z.infer<typeof formSchema>;

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: 15,
    languages: ['English', 'Hindi'],
    availability: 'Mon-Fri, 9 AM - 5 PM',
    consultationFee: 1500,
    image: '/doctors/sarah.jpg'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Pediatrician',
    experience: 10,
    languages: ['English', 'Mandarin'],
    availability: 'Mon-Sat, 10 AM - 6 PM',
    consultationFee: 1200,
    image: '/doctors/michael.jpg'
  }
];

export default function DoctorAppointments() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doctor: "",
      appointmentTime: "",
    },
  });

  const [selectedDoctor, setSelectedDoctor] = React.useState<Doctor | null>(null);

  const handleDoctorChange = (doctorId: string) => {
    const doctor = mockDoctors.find((d) => d.id === doctorId);
    setSelectedDoctor(doctor || null);
  };

  const onSubmit = (data: FormValues) => {
    if (selectedDoctor) {
      toast.success(`Appointment booked with ${selectedDoctor.name} at ${data.appointmentTime}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="doctor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Doctor</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleDoctorChange(value);
                  }}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDoctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedDoctor && (
          <FormField
            control={form.control}
            name="appointmentTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Time</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedDoctor.availability.split(',').map((time) => (
                        <SelectItem key={time} value={time.trim()}>
                          {time.trim()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full">
          Book Appointment
        </Button>
      </form>
    </Form>
  );
}
