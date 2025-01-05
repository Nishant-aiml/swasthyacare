'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import LocationMap from "@/components/Maps/LocationMap";
import { Button } from "@/components/ui/Button";
import { Phone, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* Emergency Alert */}
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">Emergency Numbers</span>
          </div>
          <div className="mt-2 space-y-2">
            <Button 
              variant="destructive" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2"
              onClick={() => window.location.href = 'tel:102'}
            >
              <Phone className="h-4 w-4" />
              <span>Call Ambulance (102)</span>
            </Button>
            <Button 
              variant="destructive" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2"
              onClick={() => window.location.href = 'tel:112'}
            >
              <Phone className="h-4 w-4" />
              <span>Police Emergency (112)</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Location Map */}
      <div className="w-full">
        <LocationMap />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Find Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Search Doctors</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Book Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Schedule Now</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Medical Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">View Records</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Health Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Learn More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
