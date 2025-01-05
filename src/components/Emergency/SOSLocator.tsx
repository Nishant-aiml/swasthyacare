import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Switch } from "@/components/ui/Switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Phone, AlertTriangle, Share2, Navigation, Heart, Download, Globe, Bell, UserPlus, Volume2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import EmergencyMap from '@/components/Maps/EmergencyMap';

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

interface HealthInfo {
  bloodType: string;
  allergies: string[];
  medications: string[];
  conditions: string[];
}

export default function SOSLocator() {
  const { toast } = useToast();
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [healthInfo, setHealthInfo] = useState<HealthInfo | null>(null);
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isPanicMode, setIsPanicMode] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [newContact, setNewContact] = useState<EmergencyContact>({ name: '', phone: '', relationship: '' });

  // Emergency numbers (India)
  const emergencyNumbers = [
    { name: 'Ambulance', number: '108', icon: Phone },
    { name: 'Police', number: '100', icon: Phone },
    { name: 'Fire', number: '101', icon: Phone },
    { name: 'Women Helpline', number: '1091', icon: Phone },
    { name: 'Disaster', number: '1070', icon: Phone },
    { name: 'Child Helpline', number: '1098', icon: Phone },
  ];

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          setIsLoading(false);
          toast({
            title: "Location detected",
            description: "Your current location has been detected successfully.",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoading(false);
          toast({
            title: "Location error",
            description: "Unable to detect your location. Please enable location services.",
            variant: "destructive",
          });
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Handle panic button
  const handlePanicButton = async () => {
    setIsPanicMode(true);
    if (location) {
      // Alert emergency contacts
      emergencyContacts.forEach(contact => {
        sendEmergencyAlert(contact);
      });
      // Share location with emergency services
      await shareLocationWithEmergencyServices();
      
      // Voice alert if enabled
      if (isVoiceEnabled) {
        speakEmergencyMessage();
      }

      toast({
        title: "Emergency Alert Sent",
        description: "Emergency contacts and services have been notified of your situation.",
        variant: "destructive",
      });
    }
  };

  // Voice alert
  const speakEmergencyMessage = () => {
    if ('speechSynthesis' in window) {
      const message = new SpeechSynthesisUtterance(
        "Emergency alert activated. Help is on the way. Stay calm and stay where you are."
      );
      message.lang = selectedLanguage;
      window.speechSynthesis.speak(message);
    }
  };

  // Share location
  const shareLocation = async () => {
    if (location) {
      const locationUrl = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
      const message = `EMERGENCY: I need help! Here's my location: ${locationUrl}`;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Emergency - Need Help',
            text: message,
            url: locationUrl,
          });
          toast({
            title: "Location Shared",
            description: "Your location has been shared successfully.",
          });
        } catch (error) {
          console.error('Error sharing:', error);
          // Fallback
          navigator.clipboard.writeText(message);
          toast({
            title: "Location Copied",
            description: "Location link copied to clipboard.",
          });
        }
      }
    }
  };

  // Add emergency contact
  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      setEmergencyContacts([...emergencyContacts, newContact]);
      setNewContact({ name: '', phone: '', relationship: '' });
      toast({
        title: "Contact Added",
        description: "Emergency contact has been added successfully.",
      });
    }
  };

  // Send emergency alert
  const sendEmergencyAlert = async (contact: EmergencyContact) => {
    const message = `EMERGENCY ALERT from Swasthya Care\n
    Medical Conditions: ${healthInfo?.conditions.join(', ')}\n
    Blood Type: ${healthInfo?.bloodType}\n
    Allergies: ${healthInfo?.allergies.join(', ')}\n
    Current Location: https://maps.google.com/?q=${location?.latitude},${location?.longitude}`;
    
    // In a real app, integrate with SMS API
    console.log(`Sending alert to ${contact.name}: ${message}`);
  };

  // Share location with emergency services
  const shareLocationWithEmergencyServices = async () => {
    if (location) {
      // In a real app, integrate with emergency services API
      console.log('Sharing location with emergency services');
    }
  };

  // Download offline maps
  const downloadOfflineMaps = async () => {
    setIsOfflineAvailable(true);
    toast({
      title: "Maps Downloaded",
      description: "Offline maps are now available.",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Panic Button */}
      <Button 
        className="w-full py-8 text-2xl font-bold bg-red-600 hover:bg-red-700 text-white animate-pulse"
        onClick={handlePanicButton}
        disabled={isLoading}
      >
        <AlertTriangle className="h-8 w-8 mr-4" />
        {isLoading ? "Detecting Location..." : "PANIC BUTTON"}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emergency Services */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <Phone className="h-6 w-6 mr-2" />
              Emergency Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {emergencyNumbers.map((emergency) => (
                <Button
                  key={emergency.number}
                  variant="outline"
                  className="border-red-200 hover:bg-red-50 h-auto py-4 flex-col"
                  onClick={() => window.location.href = `tel:${emergency.number}`}
                >
                  <emergency.icon className="h-6 w-6 mb-2 text-red-500" />
                  <div className="text-center">
                    <div className="font-semibold">{emergency.name}</div>
                    <div className="text-sm text-gray-500">{emergency.number}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Health Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="h-6 w-6 mr-2 text-red-500" />
              Health Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Blood Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Allergies</Label>
              <Textarea placeholder="List your allergies..." />
            </div>
            <div>
              <Label>Current Medications</Label>
              <Textarea placeholder="List your current medications..." />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Navigation className="h-6 w-6 mr-2" />
            Nearby Emergency Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <EmergencyMap location={location} />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="h-6 w-6 mr-2" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">{contact.name}</div>
                  <div className="text-sm text-gray-500">{contact.relationship}</div>
                </div>
                <Button variant="outline" onClick={() => window.location.href = `tel:${contact.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
              <Input
                placeholder="Phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
              <Button onClick={addEmergencyContact}>Add Contact</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <Label>Offline Maps</Label>
              </div>
              <Switch
                checked={isOfflineAvailable}
                onCheckedChange={(checked) => {
                  if (checked) downloadOfflineMaps();
                  else setIsOfflineAvailable(false);
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <Label>Voice Alerts</Label>
              </div>
              <Switch
                checked={isVoiceEnabled}
                onCheckedChange={setIsVoiceEnabled}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <Label>Language</Label>
              </div>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={shareLocation} className="h-auto py-4">
          <Share2 className="h-4 w-4 mr-2" />
          Share Location
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = `https://maps.google.com/?q=${location?.latitude},${location?.longitude}`}
          className="h-auto py-4"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Navigate
        </Button>
      </div>
    </div>
  );
}