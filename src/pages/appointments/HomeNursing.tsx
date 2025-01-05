import * as React from "react"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { HomeNursingForm } from '@/components/Appointments/HomeNursingForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { toast } from "sonner";

const formSchema = z.object({
  patientName: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.string().min(1, 'Please enter age'),
  address: z.string().min(1, 'Please enter address'),
  emergencyContact: z.string().min(10, 'Phone number must be at least 10 digits'),
  problemDescription: z.string().optional(),
  preferredTime: z.string().min(1, 'Please select a time'),
  tnaiNumber: z.string().optional(),
  reason: z.string().optional(),
  preferredNurse: z.string().optional(),
  medicalHistory: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const availableTimes = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export default function HomeNursing() {
  const handleSubmit = async (formData: {
    patientName: string;
    age: string;
    address: string;
    emergencyContact: string;
    problemDescription: string;
    preferredTime: string;
    tnaiNumber?: string;
    reason?: string;
    preferredNurse?: string;
    medicalHistory?: string;
  }) => {
    try {
      // Handle form submission
      console.log("Form submitted:", formData);
      toast.success("Home nursing service booked successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Home Nursing</h1>
          <p className="text-muted-foreground">
            Book a qualified nurse for home care services
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Book Home Nursing Service</CardTitle>
            <CardDescription>
              Fill in the details below to request a home nursing service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HomeNursingForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Service Information</CardTitle>
            <CardDescription>
              Learn more about our home nursing services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Available Services</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Post-operative care</li>
                <li>Elderly care</li>
                <li>Wound dressing</li>
                <li>Medication management</li>
                <li>Physiotherapy assistance</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Why Choose Us</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Qualified and experienced nurses</li>
                <li>24/7 availability</li>
                <li>Personalized care plans</li>
                <li>Regular monitoring and reporting</li>
                <li>Emergency response support</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
