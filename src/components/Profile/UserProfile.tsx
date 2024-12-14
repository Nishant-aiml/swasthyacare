import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

interface Insurance {
  provider: string;
  policyNumber: string;
}

interface UserData {
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string;
  medications: string;
  conditions: string;
  emergencyContact: EmergencyContact;
  insurance: Insurance;
}

const initialUserData: UserData = {
  name: '',
  age: 0,
  gender: '',
  bloodType: '',
  allergies: '',
  medications: '',
  conditions: '',
  emergencyContact: {
    name: '',
    relationship: '',
    phone: ''
  },
  insurance: {
    provider: '',
    policyNumber: ''
  }
};

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (field: keyof UserData, value: string | number) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
    setSaved(false);
  };

  const handleEmergencyContactChange = (field: keyof EmergencyContact, value: string) => {
    setUserData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
    setSaved(false);
  };

  const handleInsuranceChange = (field: keyof Insurance, value: string) => {
    setUserData(prev => ({
      ...prev,
      insurance: {
        ...prev.insurance,
        [field]: value
      }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setSaved(true);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Medical Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={userData.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('age', parseInt(e.target.value))}
                placeholder="25"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={userData.gender} onValueChange={(value: string) => handleChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={userData.bloodType} onValueChange={(value: string) => handleChange('bloodType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Medical Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                value={userData.allergies}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('allergies', e.target.value)}
                placeholder="List any allergies..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={userData.medications}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('medications', e.target.value)}
                placeholder="List current medications..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conditions">Medical Conditions</Label>
              <Textarea
                id="conditions"
                value={userData.conditions}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('conditions', e.target.value)}
                placeholder="List any medical conditions..."
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyName">Contact Name</Label>
              <Input
                id="emergencyName"
                value={userData.emergencyContact.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmergencyContactChange('name', e.target.value)}
                placeholder="Emergency contact name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyRelationship">Relationship</Label>
              <Input
                id="emergencyRelationship"
                value={userData.emergencyContact.relationship}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmergencyContactChange('relationship', e.target.value)}
                placeholder="Relationship to contact"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Phone Number</Label>
              <Input
                id="emergencyPhone"
                value={userData.emergencyContact.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmergencyContactChange('phone', e.target.value)}
                placeholder="Emergency contact phone"
              />
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Insurance Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insuranceProvider">Insurance Provider</Label>
              <Input
                id="insuranceProvider"
                value={userData.insurance.provider}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInsuranceChange('provider', e.target.value)}
                placeholder="Insurance provider name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input
                id="policyNumber"
                value={userData.insurance.policyNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInsuranceChange('policyNumber', e.target.value)}
                placeholder="Insurance policy number"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={handleSave} className="w-32">
            Save Profile
          </Button>
        </div>

        {saved && (
          <div className="text-green-600 text-center">
            Profile saved successfully!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
