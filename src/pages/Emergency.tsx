import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import SOSLocator from '../components/Emergency/SOSLocator';
import EmergencyChatbot from '../components/Emergency/EmergencyChatbot';
import InsuranceAssistance from '../components/Emergency/InsuranceAssistance';
import BloodBankFinder from '../components/Emergency/BloodBankFinder';
import EmergencyKitStore from '../components/Emergency/EmergencyKitStore';
import { AlertTriangle, Phone } from 'lucide-react';

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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Emergency Contact Numbers</h3>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {emergencyNumbers.map((contact) => (
                <a
                  key={contact.number}
                  href={`tel:${contact.number}`}
                  className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Phone className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-semibold text-gray-900">{contact.number}</div>
                    <div className="text-sm text-gray-600">{contact.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex justify-center gap-8 border-b-2 border-gray-300 pb-2">
          <TabsTrigger value="sos">SOS Locator </TabsTrigger>
          <TabsTrigger value="chat">Emergency Chat </TabsTrigger>
          <TabsTrigger value="insurance">Insurance Help </TabsTrigger>
          <TabsTrigger value="blood">Blood Bank </TabsTrigger>
          <TabsTrigger value="store">Emergency Kit </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="sos">
            <SOSLocator />
          </TabsContent>
          <TabsContent value="chat">
            <EmergencyChatbot />
          </TabsContent>
          <TabsContent value="insurance">
            <InsuranceAssistance />
          </TabsContent>
          <TabsContent value="blood">
            <BloodBankFinder />
          </TabsContent>
          <TabsContent value="store">
            <EmergencyKitStore />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
