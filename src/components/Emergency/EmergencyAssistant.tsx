import React from 'react';
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Truck, Phone, MapPin } from 'lucide-react';

interface EmergencyService {
  id: string;
  name: string;
  phone: string;
  address: string;
}

const emergencyServices: EmergencyService[] = [
  {
    id: '1',
    name: 'City General Hospital',
    phone: '102',
    address: '123 Medical Street, City'
  },
  {
    id: '2',
    name: 'Red Cross Ambulance',
    phone: '1099',
    address: '456 Emergency Road, City'
  }
];

export function EmergencyAssistant() {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Emergency Assistance</CardTitle>
          <CardDescription>
            Quick access to emergency medical services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {emergencyServices.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Truck className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {service.address}
                    </div>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => handleCall(service.phone)}
                  className="flex items-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call {service.phone}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
