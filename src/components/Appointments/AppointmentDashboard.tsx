import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Calendar } from '@/components/ui/Calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { toast } from 'sonner';
import { 
  CalendarCheck, 
  Clock, 
  User, 
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

interface Appointment {
  id: string;
  type: 'doctor' | 'nursing';
  patientName: string;
  doctorName?: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'canceled' | 'completed';
  cancellationReason?: string;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    type: 'doctor',
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Johnson',
    date: new Date(),
    time: '10:00 AM',
    status: 'confirmed'
  },
  {
    id: '2',
    type: 'nursing',
    patientName: 'Jane Smith',
    date: new Date(Date.now() + 86400000),
    time: '2:30 PM',
    status: 'pending'
  }
];

export function AppointmentDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [newDate, setNewDate] = useState<Date | undefined>(new Date());
  const [newTime, setNewTime] = useState('');

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    rescheduled: 'bg-blue-100 text-blue-700',
    canceled: 'bg-red-100 text-red-700',
    completed: 'bg-gray-100 text-gray-700'
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    confirmed: <CheckCircle className="w-4 h-4" />,
    rescheduled: <RefreshCw className="w-4 h-4" />,
    canceled: <XCircle className="w-4 h-4" />,
    completed: <CheckCircle className="w-4 h-4" />
  };

  const handleCancel = () => {
    if (!selectedAppointment || !cancellationReason) return;

    setAppointments(prev =>
      prev.map(app =>
        app.id === selectedAppointment.id
          ? { ...app, status: 'canceled', cancellationReason }
          : app
      )
    );

    toast.success('Appointment cancelled successfully');
    setShowCancelDialog(false);
    setCancellationReason('');
    setSelectedAppointment(null);
  };

  const handleReschedule = () => {
    if (!selectedAppointment || !newDate || !newTime) return;

    setAppointments(prev =>
      prev.map(app =>
        app.id === selectedAppointment.id
          ? { ...app, status: 'rescheduled', date: newDate, time: newTime }
          : app
      )
    );

    toast.success('Appointment rescheduled successfully');
    setShowRescheduleDialog(false);
    setNewDate(new Date());
    setNewTime('');
    setSelectedAppointment(null);
  };

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-blue-200 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{appointment.patientName}</span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[appointment.status]
                  }`}
                >
                  {statusIcons[appointment.status]}
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>
              
              <div className="text-sm text-gray-500 space-y-1">
                {appointment.doctorName && (
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {appointment.doctorName}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4" />
                  {appointment.date.toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {appointment.time}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowRescheduleDialog(true);
                  }}
                  className="text-blue-600"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reschedule
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setShowCancelDialog(true);
                  }}
                  className="text-red-600"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}

      {/* Cancel Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Please provide a reason for cancelling this appointment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Cancellation</Label>
              <Textarea
                id="reason"
                placeholder="Enter cancellation reason"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Appointment
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={!cancellationReason}
            >
              Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Please select a new date and time for your appointment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select New Date</Label>
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={setNewDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
            </div>

            <div className="space-y-2">
              <Label>Select New Time</Label>
              <Select value={newTime} onValueChange={setNewTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRescheduleDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReschedule}
              disabled={!newDate || !newTime}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Confirm Reschedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
