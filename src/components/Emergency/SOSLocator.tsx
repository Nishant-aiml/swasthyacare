import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Hospital, Phone, AlertTriangle, Navigation } from 'lucide-react';
import EmergencyServicesMap from '../Maps/EmergencyServicesMap';

const SOSLocator: React.FC = () => {
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);

  const emergencyContacts = [
    { name: 'Ambulance', number: '108', icon: Hospital },
    { name: 'Police', number: '100', icon: AlertTriangle },
    { name: 'Fire', number: '101', icon: AlertTriangle },
    { name: 'Emergency Helpline', number: '112', icon: Phone },
  ];

  return (
    <div className="space-y-4">
      {/* Emergency Contacts Section */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <button
          onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
          className="w-full flex items-center justify-between text-red-700 font-semibold"
        >
          <span className="flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Emergency Contacts
          </span>
          <span>{showEmergencyContacts ? '▼' : '▶'}</span>
        </button>
        
        {showEmergencyContacts && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="flex items-center p-3 bg-white rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
              >
                <contact.icon className="h-6 w-6 text-red-600 mr-3" />
                <div>
                  <div className="font-semibold text-red-700">{contact.name}</div>
                  <div className="text-red-600">{contact.number}</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-blue-800 flex items-center">
            <Navigation className="h-5 w-5 mr-2" />
            Nearby Emergency Services
          </h2>
          <p className="text-sm text-blue-600 mt-1">
            Find hospitals, clinics, and pharmacies near your location
          </p>
        </div>
        
        <div className="h-[600px]">
          <EmergencyServicesMap />
        </div>
      </div>

      {/* Emergency Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-yellow-800 font-semibold flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Emergency Instructions
        </h3>
        <ul className="mt-2 space-y-2 text-yellow-700 text-sm">
          <li>• Stay calm and assess the situation</li>
          <li>• If life-threatening, call 108 for immediate medical assistance</li>
          <li>• Share your exact location with emergency services</li>
          <li>• If possible, have someone accompany you</li>
          <li>• Keep your emergency contacts informed</li>
        </ul>
      </div>
    </div>
  );
};

export default SOSLocator;