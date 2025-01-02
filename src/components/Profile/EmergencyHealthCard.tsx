import React, { useEffect, useState } from 'react';
import { AlertCircle, Download, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

interface EmergencyInfo {
  name: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
  medications: string[];
}

export default function EmergencyHealthCard() {
  const [emergencyInfo, setEmergencyInfo] = useState<EmergencyInfo>({
    name: 'John Doe',
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Asthma'],
    emergencyContacts: [
      {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+1234567890',
      },
    ],
    medications: ['Albuterol Inhaler'],
  });

  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    // In production, this would be a secure URL to the user's emergency info
    const emergencyUrl = `https://swasthya.care/emergency/${btoa(JSON.stringify(emergencyInfo))}`;
    setQrValue(emergencyUrl);
  }, [emergencyInfo]);

  const handleDownload = () => {
    const canvas = document.getElementById('emergency-qr') as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'emergency-health-card.png';
      link.href = url;
      link.click();
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Emergency Health Card',
        text: 'My Emergency Health Information',
        url: qrValue,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Emergency Health Card</h3>
            <p className="mt-1 text-sm text-gray-500">
              Scan this QR code to access critical health information in emergencies
            </p>
          </div>
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <QRCodeSVG
              id="emergency-qr"
              value={qrValue}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h4 className="font-medium text-gray-900">Critical Information</h4>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="font-medium">{emergencyInfo.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Allergies</p>
                  <p className="font-medium">{emergencyInfo.allergies.join(', ')}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900">Emergency Contact</h4>
              {emergencyInfo.emergencyContacts.map((contact, index) => (
                <div key={index} className="mt-2">
                  <p className="text-sm">
                    {contact.name} ({contact.relationship})
                  </p>
                  <p className="text-sm font-medium">{contact.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download Card
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </Card>
    </div>
  );
}
