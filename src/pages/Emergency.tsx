import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import SOSLocator from '../components/Emergency/SOSLocator';
import EmergencyChatbot from '../components/Emergency/EmergencyChatbot';
import InsuranceAssistance from '../components/Emergency/InsuranceAssistance';
import BloodBankFinder from '../components/Emergency/BloodBankFinder';
import EmergencyKitStore from '../components/Emergency/EmergencyKitStore';
import { AlertTriangle, Phone, MapPin, MessageSquare, Shield, Droplet, Package, LucideIcon } from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { PhoneCall, Navigation } from "lucide-react";

const EMERGENCY_CONTACTS = [
  {
    name: 'Police',
    number: '100',
    description: 'For law enforcement emergencies',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    name: 'Ambulance',
    number: '108',
    description: 'For medical emergencies',
    color: 'bg-red-100 text-red-700'
  },
  {
    name: 'Fire',
    number: '101',
    description: 'For fire emergencies',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    name: 'Women Helpline',
    number: '1091',
    description: 'For women safety emergencies',
    color: 'bg-pink-100 text-pink-700'
  },
  {
    name: 'Child Helpline',
    number: '1098',
    description: 'For child safety emergencies',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    name: 'Disaster Management',
    number: '1070',
    description: 'For natural disaster emergencies',
    color: 'bg-teal-100 text-teal-700'
  }
];

export default function Emergency() {
  const [activeTab, setActiveTab] = React.useState('sos');

  const emergencyNumbers = [
    { number: '112', label: 'Emergency Services' },
    { number: '102', label: 'Ambulance' },
    { number: '101', label: 'Fire' },
    { number: '1075', label: 'COVID-19 Helpline' },
    { number: '1098', label: 'Child Helpline' },
    { number: '181', label: 'Women Helpline' },
  ];

  const tabIcons: Record<string, LucideIcon> = {
    sos: MapPin,
    chat: MessageSquare,
    insurance: Shield,
    blood: Droplet,
    store: Package,
  };

  const emergencyContacts = [
    {
      name: "Emergency Ambulance",
      number: "102",
      description: "24/7 Emergency Medical Services"
    },
    {
      name: "Police",
      number: "100",
      description: "Emergency Police Services"
    },
    {
      name: "Fire Brigade",
      number: "101",
      description: "Fire Emergency Services"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      <div className="container mx-auto py-2 sm:py-8 px-2 sm:px-4">
        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-lg sm:rounded-2xl shadow-xl p-3 sm:p-6 mb-4 sm:mb-8 text-white">
          <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="bg-white/20 p-2 sm:p-3 rounded-lg self-center sm:self-start">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="w-full">
              <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-center sm:text-left">Emergency Contact Numbers</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
                {emergencyNumbers.map((contact) => (
                  <a
                    key={contact.number}
                    href={`tel:${contact.number}`}
                    className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-sm p-2 sm:p-4 rounded-lg sm:rounded-xl hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="bg-white/20 p-1.5 sm:p-2 rounded-lg group-hover:bg-white/30 transition-all">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm sm:text-lg">{contact.number}</div>
                      <div className="text-[10px] sm:text-sm opacity-90">{contact.label}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="sos" className="space-y-3 sm:space-y-4" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 gap-2 sm:gap-4 bg-transparent h-auto p-0">
            {Object.entries(tabIcons).map(([value, Icon]) => (
              <TabsTrigger
                key={value}
                value={value}
                className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg border shadow-sm ${
                  activeTab === value
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-gray-200 bg-white hover:bg-red-50'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-[10px] sm:text-xs capitalize">{value}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="sos" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {emergencyContacts.map((contact) => (
                <Card key={contact.name} className="border-none shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                      <PhoneCall className="h-4 w-4 text-red-500" />
                      {contact.name}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">{contact.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
                      onClick={() => window.location.href = `tel:${contact.number}`}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call {contact.number}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Services</h1>
              <p className="text-gray-600">Quick access to emergency services and helpline numbers</p>
            </div>
            <div className="space-y-8">
              {/* SOS Section */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    SOS Emergency Contacts
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {EMERGENCY_CONTACTS.map((contact) => (
                      <div
                        key={contact.number}
                        className="relative group rounded-lg border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all"
                      >
                        <div className={`w-10 h-10 rounded-full ${contact.color} flex items-center justify-center mb-3`}>
                          <Phone className="w-5 h-5" />
                        </div>
                        <h3 className="font-medium text-gray-900">{contact.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{contact.description}</p>
                        <a
                          href={`tel:${contact.number}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          <Phone className="w-4 h-4" />
                          {contact.number}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Emergency Guidelines */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Emergency Guidelines
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Stay Calm</h3>
                          <p className="mt-1 text-sm text-red-700">
                            Take deep breaths and try to remain calm. This will help you think clearly.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 rounded-lg border border-gray-100">
                        <h3 className="font-medium text-gray-900 mb-2">Medical Emergency</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Call 108 for immediate medical assistance</li>
                          <li>• Check for breathing and pulse</li>
                          <li>• Apply first aid if trained</li>
                          <li>• Keep the person comfortable until help arrives</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg border border-gray-100">
                        <h3 className="font-medium text-gray-900 mb-2">Fire Emergency</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Call 101 immediately</li>
                          <li>• Evacuate the building</li>
                          <li>• Do not use elevators</li>
                          <li>• Stay low to avoid smoke inhalation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <SOSLocator />
          </TabsContent>

          <TabsContent value="chat">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <EmergencyChatbot />
            </div>
          </TabsContent>

          <TabsContent value="insurance">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <InsuranceAssistance />
            </div>
          </TabsContent>

          <TabsContent value="blood">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <BloodBankFinder />
            </div>
          </TabsContent>

          <TabsContent value="store">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <EmergencyKitStore />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
