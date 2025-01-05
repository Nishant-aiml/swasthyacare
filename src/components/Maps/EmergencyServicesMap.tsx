import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Stethoscope, ShieldAlert, Truck } from 'lucide-react';

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface EmergencyService {
  id: string;
  name: string;
  type: 'hospital' | 'police' | 'ambulance';
  location: [number, number];
  distance?: number;
  eta?: string;
}

interface Props {
  location?: Location | null;
  height?: string;
}

// Custom hook to update map view when location changes
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

// Mock emergency services data (replace with real API data)
const mockServices: EmergencyService[] = [
  {
    id: '1',
    name: 'City General Hospital',
    type: 'hospital',
    location: [17.385044, 78.486671],
    distance: 0.5,
    eta: '5 mins'
  },
  {
    id: '2',
    name: 'Central Police Station',
    type: 'police',
    location: [17.388044, 78.486671],
    distance: 1.2,
    eta: '8 mins'
  },
  {
    id: '3',
    name: 'Emergency Ambulance Service',
    type: 'ambulance',
    location: [17.385044, 78.489671],
    distance: 0.8,
    eta: '6 mins'
  }
];

const getMarkerIcon = (type: string) => {
  const size: L.PointTuple = [24, 24];
  const anchor: L.PointTuple = [12, 12];
  
  const markerColor = type === 'ambulance' ? '#ef4444' : 
                     type === 'hospital' ? '#3b82f6' : 
                     '#10b981';
                     
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${markerColor};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        font-weight: bold;
      ">
        ${type === 'ambulance' ? 'A' : type === 'hospital' ? 'H' : 'P'}
      </div>
    `,
    iconSize: size,
    iconAnchor: anchor
  });
};

export default function EmergencyServicesMap({ location, height = '100%' }: Props) {
  const [services, setServices] = useState<EmergencyService[]>(mockServices);
  const defaultCenter: [number, number] = [17.385044, 78.486671]; // Default to Hyderabad

  const currentLocation = location ? [location.latitude, location.longitude] as [number, number] : defaultCenter;

  useEffect(() => {
    // Here you would typically fetch nearby emergency services based on location
    // For now, we're using mock data
    if (location) {
      // Update distances and ETAs based on current location
      const updatedServices = services.map(service => ({
        ...service,
        distance: calculateDistance(currentLocation, service.location),
        eta: calculateETA(currentLocation, service.location)
      }));
      setServices(updatedServices);
    }
  }, [location]);

  // Calculate mock distance (replace with actual distance calculation)
  const calculateDistance = (from: [number, number], to: [number, number]) => {
    // Simple mock calculation - replace with actual distance calculation
    const dx = from[0] - to[0];
    const dy = from[1] - to[1];
    return Math.sqrt(dx * dx + dy * dy) * 100;
  };

  // Calculate mock ETA (replace with actual ETA calculation)
  const calculateETA = (from: [number, number], to: [number, number]) => {
    const distance = calculateDistance(from, to);
    const avgSpeed = 30; // km/h
    const minutes = Math.round((distance / avgSpeed) * 60);
    return `${minutes} mins`;
  };

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={currentLocation}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User's location */}
        {location && (
          <Marker
            position={currentLocation}
            icon={L.divIcon({
              className: 'custom-icon',
              html: '<div style="background-color: #3b82f6; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>',
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })}
          >
            <Popup>You are here</Popup>
          </Marker>
        )}

        {/* Emergency services */}
        {services.map((service) => (
          <Marker
            key={service.id}
            position={service.location}
            icon={getMarkerIcon(service.type)}
          >
            <Popup>
              <div className="font-semibold">{service.name}</div>
              {service.distance && <div>Distance: {service.distance.toFixed(1)} km</div>}
              {service.eta && <div>ETA: {service.eta}</div>}
            </Popup>
          </Marker>
        ))}

        <ChangeView center={currentLocation} />
      </MapContainer>
    </div>
  );
}
