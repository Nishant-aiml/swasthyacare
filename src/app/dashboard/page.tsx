'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui';
import { Calendar, FileText, ExternalLink } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

const LocationMap = dynamic(
  () => import('../../../components/Maps/LocationMap').then((mod) => mod.LocationMap),
  { ssr: false }
);

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  link: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();
  const [userName, setUserName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

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

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
    if (user) {
      setUserName(user.displayName || 'User');
    }
  }, [user, isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{getTimeBasedGreeting()}, {userName}</h1>
          <p className="text-muted-foreground">Welcome to your healthcare dashboard</p>
        </div>
        <div className="mt-4 md:mt-0">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="p-2 border rounded-md"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Find Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <Link 
              href="/doctors"
              className="text-primary hover:underline flex items-center"
            >
              Search Doctors <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Book Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Link 
              href="/appointments"
              className="text-primary hover:underline flex items-center"
            >
              Schedule Now <Calendar className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Link 
              href="/records"
              className="text-primary hover:underline flex items-center"
            >
              View Records <FileText className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <Link 
              href="/tips"
              className="text-primary hover:underline flex items-center"
            >
              Learn More <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Nearby Healthcare Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <LocationMap />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
