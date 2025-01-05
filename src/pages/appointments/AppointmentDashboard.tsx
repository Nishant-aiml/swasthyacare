import React from 'react';
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Card, CardContent } from "@/components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { format } from 'date-fns';
import { FeedbackSystem } from '@/components/Appointments/FeedbackSystem';
import { ReminderSystem } from '@/components/Appointments/ReminderSystem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

interface Appointment {
  id: string;
  doctorName: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  type: string;
}

export default function AppointmentDashboard() {
  const [appointments] = React.useState<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Johnson',
      date: new Date(),
      time: '10:00 AM',
      status: 'confirmed',
      type: 'General Checkup',
    },
    // Add more appointments as needed
  ]);

  const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null);
  const [showCancelDialog, setShowCancelDialog] = React.useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = React.useState(false);
  const [cancelReason, setCancelReason] = React.useState('');
  const [newDate, setNewDate] = React.useState('');
  const [newTime, setNewTime] = React.useState('');

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancel = () => {
    if (selectedAppointment && cancelReason) {
      // Handle appointment cancellation
      setShowCancelDialog(false);
      setCancelReason('');
    }
  };

  const handleReschedule = () => {
    if (selectedAppointment && newDate && newTime) {
      // Handle appointment rescheduling
      setShowRescheduleDialog(false);
      setNewDate('');
      setNewTime('');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.doctorName}</TableCell>
                      <TableCell>{format(appointment.date, 'PP')}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(appointment.status)}
                        >
                          {appointment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Appointment Details</DialogTitle>
                                <DialogDescription>
                                  <div className="space-y-4">
                                    <p>Doctor: {appointment.doctorName}</p>
                                    <p>Date: {format(appointment.date, 'PP')}</p>
                                    <p>Time: {appointment.time}</p>
                                    <p>Type: {appointment.type}</p>
                                    <p>Status: {appointment.status}</p>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setSelectedAppointment(null)}
                                >
                                  Close
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                Cancel
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Cancel Appointment</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to cancel this appointment? Please provide a reason.
                                </DialogDescription>
                              </DialogHeader>
                              <Textarea
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                placeholder="Reason for cancellation"
                              />
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setShowCancelDialog(false);
                                    setCancelReason('');
                                  }}
                                >
                                  Back
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={handleCancel}
                                  disabled={!cancelReason}
                                >
                                  Confirm Cancel
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog open={showRescheduleDialog} onOpenChange={setShowRescheduleDialog}>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedAppointment(appointment)}
                              >
                                Reschedule
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Reschedule Appointment</DialogTitle>
                                <DialogDescription>
                                  Please select a new date and time for your appointment.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Input
                                    type="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <Input
                                    type="time"
                                    value={newTime}
                                    onChange={(e) => setNewTime(e.target.value)}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setShowRescheduleDialog(false);
                                    setNewDate('');
                                    setNewTime('');
                                  }}
                                >
                                  Back
                                </Button>
                                <Button
                                  onClick={handleReschedule}
                                  disabled={!newDate || !newTime}
                                >
                                  Confirm Reschedule
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past">
          <Card>
            <CardContent>
              <FeedbackSystem />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardContent>
              <ReminderSystem />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

