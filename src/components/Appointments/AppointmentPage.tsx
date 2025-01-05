import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from 'sonner';
import { 
  CalendarCheck, 
  Clock, 
  User, 
  Phone, 
  Stethoscope, 
  Calendar as CalendarIcon, 
  MoreVertical,
  Mail,
  FileText,
  MessageSquare,
  Bell,
  Mic,
  Star,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock4
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { DoctorList } from './DoctorList';
import { HomeNursingForm } from './HomeNursingForm';
import { AppointmentDashboard } from './AppointmentDashboard';
import { FAQ } from './FAQ';
import { ChatbotAssistant } from './ChatbotAssistant';
import { DocumentScanner } from './DocumentScanner';
import { FeedbackSystem } from './FeedbackSystem';
import { ReminderSystem } from './ReminderSystem';
import { VoiceCommands } from './VoiceCommands';
import { Doctor } from '@/types/doctor';
import { cn } from '@/lib/utils';

interface AppointmentPageProps {
  onBookAppointment: (doctor: Doctor) => void;
}

export default function AppointmentPage({ onBookAppointment }: AppointmentPageProps) {
  const [selectedTab, setSelectedTab] = useState('doctors');
  const [showChatbot, setShowChatbot] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updates = [
        'Dr. Sarah Johnson is now available for appointments',
        'New time slots added for Dr. Michael Chen',
        'Reminder: Your appointment is in 2 hours'
      ];
      setNotifications(prev => [...prev, updates[Math.floor(Math.random() * updates.length)]]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto py-6 space-y-8 px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Appointments
              </h1>
              <p className="text-gray-600 mt-1">
                Book and manage your healthcare appointments
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="bg-blue-50 hover:bg-blue-100 text-blue-600"
                onClick={() => setShowChatbot(!showChatbot)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <VoiceCommands onCommand={(command) => {
                switch (command) {
                  case 'book':
                    setSelectedTab('doctors');
                    break;
                  case 'doctors':
                    setSelectedTab('doctors');
                    break;
                  default:
                    break;
                }
              }} />
              <ReminderSystem />
            </div>
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-blue-700">Recent Updates</h3>
            </div>
            <div className="space-y-2">
              {notifications.slice(-3).map((notification, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-blue-600 bg-white p-2 rounded"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  {notification}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Appointments Dashboard */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <Card className="border-t-4 border-t-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <CalendarCheck className="w-5 h-5 mr-2 text-blue-500" />
                  My Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AppointmentDashboard />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-teal-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-teal-700">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="font-semibold text-teal-700">12 Appointments</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock4 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Upcoming</p>
                    <p className="font-semibold text-blue-700">3 Appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                  <TabsList className="inline-flex p-1 bg-blue-50 rounded-lg">
                    <TabsTrigger
                      value="doctors"
                      className={cn(
                        "inline-flex items-center px-6 py-2.5 rounded-md transition-all",
                        selectedTab === "doctors"
                          ? "bg-white shadow text-blue-700"
                          : "text-gray-600 hover:text-blue-700"
                      )}
                    >
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Doctor Appointments
                    </TabsTrigger>
                    <TabsTrigger
                      value="nursing"
                      className={cn(
                        "inline-flex items-center px-6 py-2.5 rounded-md transition-all",
                        selectedTab === "nursing"
                          ? "bg-white shadow text-blue-700"
                          : "text-gray-600 hover:text-blue-700"
                      )}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Home Nursing
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="doctors" className="mt-6">
                    <div className="space-y-6">
                      <DoctorList onBookAppointment={onBookAppointment} />
                    </div>
                  </TabsContent>

                  <TabsContent value="nursing" className="mt-6">
                    <HomeNursingForm onSubmit={async (formData) => {
                      try {
                        // Handle form submission
                        console.log("Form submitted:", formData);
                        toast.success("Home nursing service booked successfully!");
                      } catch (error) {
                        console.error("Error submitting form:", error);
                        toast.error("Failed to submit the form. Please try again.");
                      }
                    }} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chatbot Assistant */}
        {showChatbot && (
          <div className="fixed bottom-4 right-4 w-96 z-50">
            <Card className="border-t-4 border-t-blue-500 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-teal-50">
                <CardTitle className="text-blue-700">AI Assistant</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChatbot(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </CardHeader>
              <CardContent>
                <ChatbotAssistant />
              </CardContent>
            </Card>
          </div>
        )}

        {/* FAQ Section */}
        <Card className="border-none shadow-lg bg-gradient-to-r from-blue-50 to-teal-50">
          <CardHeader>
            <CardTitle className="text-blue-700">Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find quick answers to common questions about appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FAQ />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
