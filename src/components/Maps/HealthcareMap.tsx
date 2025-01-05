import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { MapPin, Truck, Building2 } from 'lucide-react';

interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'ambulance';
  address: string;
  distance: string;
  phone: string;
}

const facilities: HealthcareFacility[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'hospital',
    address: '123 Medical Street, City',
    distance: '2.5 km',
    phone: '102'
  },
  {
    id: '2',
    name: 'Community Health Clinic',
    type: 'clinic',
    address: '456 Health Avenue, City',
    distance: '1.2 km',
    phone: '103'
  },
  {
    id: '3',
    name: 'Red Cross Ambulance',
    type: 'ambulance',
    address: '789 Emergency Road, City',
    distance: '3.0 km',
    phone: '1099'
  }
];

export default function HealthcareMap() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type: HealthcareFacility['type']) => {
    switch (type) {
      case 'hospital':
        return <Building2 className="h-6 w-6" />;
      case 'ambulance':
        return <Truck className="h-6 w-6" />;
      default:
        return <MapPin className="h-6 w-6" />;
    }
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Healthcare Facilities Near You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search by name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid gap-4">
              {filteredFacilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {getIcon(facility.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{facility.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {facility.address} ({facility.distance})
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => handleCall(facility.phone)}
                    className="flex items-center"
                  >
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
