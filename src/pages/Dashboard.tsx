import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar, FileText, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import HealthcareMap from '@/components/Map/HealthcareMap'; // Import the HealthcareMap component

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  link: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useAuth();
  const [userName, setUserName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [healthReports, setHealthReports] = useState([]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' }
  ];

  const greetings = {
    en: ['Good morning', 'Good afternoon', 'Good evening'],
    hi: ['शुभ प्रभात', 'शुभ दोपहर', 'शुभ संध्या'],
    te: ['శుభోదయం', 'శుభ మధ్యాహ్నం', 'శుభ సాయంత్రం']
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    const index = hour < 12 ? 0 : hour < 17 ? 1 : 2;
    return greetings[selectedLanguage as keyof typeof greetings][index];
  };

  const randomGreeting = getTimeBasedGreeting();

  useEffect(() => {
    if (user) {
      setUserName(user.displayName || 'User');
    }
  }, [user]);

  const recentActivities = [
    {
      text: 'Blood test report uploaded',
      time: '2 hours ago'
    },
    {
      text: 'Appointment scheduled with Dr. Smith',
      time: '1 day ago'
    }
  ];

  const upcomingAppointments = [
    {
      doctor: 'Dr. John Smith',
      specialty: 'Cardiologist',
      date: 'Tomorrow at 10:00 AM'
    },
    {
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Dermatologist',
      date: 'Next Week'
    }
  ];

  const quickActions = [
    {
      title: "Book Appointment",
      description: "Schedule a consultation with a doctor",
      icon: Calendar,
      link: "/appointments"
    },
    {
      title: "View Prescriptions",
      description: "Access your prescriptions",
      icon: FileText,
      link: "/prescriptions"
    },
    {
      title: "Health Resources",
      description: "Access health articles and tips",
      icon: FileText,
      link: "/resources"
    },
    {
      title: "Community",
      description: "Connect with healthcare community",
      icon: FileText,
      link: "/resources#community"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md shadow-lg sticky top-0 z-10 border-b border-violet-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Welcome Message */}
            <div className="flex items-center gap-6">
              <div className="bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-400 p-1 rounded-2xl rotate-3 hover:rotate-6 transition-all duration-300">
                <div className="bg-white p-1 rounded-xl">
                  <img 
                    src={user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop"} 
                    className="h-12 w-12 rounded-lg object-cover" 
                    alt="User" 
                  />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  Welcome, {userName}
                </h2>
                <p className="text-sm text-gray-600">{randomGreeting}</p>
              </div>
            </div>

            {/* Right: Language Selector */}
            <div className="flex items-center gap-4">
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-[120px] px-3 py-2 border border-violet-100 rounded-lg bg-white/70 backdrop-blur-sm text-sm focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="col-span-full lg:col-span-1">
            <div className="bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border border-violet-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  Quick Actions
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 rounded-full"></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="group relative h-28 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-xl hover:from-violet-500 hover:via-fuchsia-500 hover:to-cyan-500 transition-all duration-300"
                    onClick={() => navigate(action.link)}
                  >
                    <action.icon className="h-6 w-6 text-violet-600 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-white transition-colors">
                      {action.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Health Metrics */}
          <div className="col-span-full lg:col-span-2">
            <div className="bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border border-violet-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  Health Metrics
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 p-5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="text-white/90 mb-3">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-white">72 BPM</div>
                  <div className="text-sm font-medium text-white/90">Heart Rate</div>
                </div>
                <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 p-5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="text-white/90 mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-white">120/80</div>
                  <div className="text-sm font-medium text-white/90">Blood Pressure</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 p-5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="text-white/90 mb-3">
                    <ExternalLink className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-white">98.6°F</div>
                  <div className="text-sm font-medium text-white/90">Temperature</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="text-white/90 mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm font-medium text-white/90">Blood Oxygen</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="col-span-full lg:col-span-1">
            <div className="bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border border-violet-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  Recent Activities
                </h2>
                <button className="text-sm bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent hover:from-violet-700 hover:via-fuchsia-700 hover:to-cyan-700 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-xl hover:from-violet-500/30 hover:via-fuchsia-500/30 hover:to-cyan-500/30 transition-all duration-300"
                  >
                    <div className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                      <Calendar className="h-5 w-5 text-violet-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="col-span-full lg:col-span-2">
            <div className="bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border border-violet-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  Upcoming Appointments
                </h2>
                <button className="text-sm bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent hover:from-violet-700 hover:via-fuchsia-700 hover:to-cyan-700 transition-colors">
                  View All
                </button>
              </div>
              <div className="grid gap-4">
                {upcomingAppointments.map((appointment, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 rounded-xl hover:from-violet-500/30 hover:via-fuchsia-500/30 hover:to-cyan-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm">
                        <Calendar className="h-5 w-5 text-violet-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{appointment.doctor}</p>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-800">{appointment.date}</p>
                      <button className="text-xs bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent hover:from-violet-700 hover:via-fuchsia-700 hover:to-cyan-700 transition-colors">
                        Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="col-span-full">
            <div className="bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 border border-violet-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                  Nearby Healthcare Facilities
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 rounded-full"></div>
              </div>
              <div className="h-[400px] rounded-xl overflow-hidden">
                <HealthcareMap height="400px" showSearch showFilters />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
