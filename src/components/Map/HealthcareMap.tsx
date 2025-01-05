import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Building2, Truck, Stethoscope, Phone } from 'lucide-react';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface HealthcareMapProps {
  height?: string;
  showSearch?: boolean;
  showFilters?: boolean;
}

interface EmergencyService {
  id: number;
  name: string;
  type: 'hospital' | 'ambulance' | 'clinic';
  position: [number, number];
  address: string;
  phone: string;
  distance?: number;
  services: string[];
  isOpen: boolean;
}

// Emergency services data for major cities in India
const EMERGENCY_SERVICES: EmergencyService[] = [
  // Hyderabad
  {
    id: 1,
    name: 'Apollo Hospitals',
    type: 'hospital',
    position: [17.4226, 78.4503],
    address: 'Film Nagar, Jubilee Hills, Hyderabad',
    phone: '+91 40 2355 3333',
    distance: 0,
    services: ['Emergency', 'ICU', 'Trauma Center', '24/7 Service'],
    isOpen: true
  },
  {
    id: 2,
    name: 'KIMS Hospital',
    type: 'hospital',
    position: [17.4069, 78.4501],
    address: 'Minister Road, Secunderabad',
    phone: '+91 40 4488 5000',
    distance: 0,
    services: ['Emergency', 'Critical Care', 'Ambulance'],
    isOpen: true
  },
  {
    id: 3,
    name: 'Care Hospitals',
    type: 'hospital',
    position: [17.4132, 78.4456],
    address: 'Banjara Hills Road No. 1',
    phone: '+91 40 3041 8888',
    distance: 0,
    services: ['Emergency', 'Multi-Specialty', '24/7 Care'],
    isOpen: true
  },
  {
    id: 4,
    name: 'GVK EMRI Ambulance Service',
    type: 'ambulance',
    position: [17.4132, 78.4356],
    address: 'Banjara Hills',
    phone: '108',
    distance: 0,
    services: ['Emergency Transport', '24/7 Service', 'Life Support'],
    isOpen: true
  },
  {
    id: 5,
    name: 'StanPlus Red Ambulances',
    type: 'ambulance',
    position: [17.4359, 78.4148],
    address: 'Jubilee Hills',
    phone: '+91 40 4141 4141',
    distance: 0,
    services: ['Emergency Transport', 'Critical Care Transport'],
    isOpen: true
  },
  {
    id: 6,
    name: 'Medicover Hospitals',
    type: 'hospital',
    position: [17.4484, 78.3908],
    address: 'Hi-tech City, Madhapur',
    phone: '+91 40 6833 3333',
    distance: 0,
    services: ['Emergency', 'ICU', '24/7 Care', 'Multi-Specialty'],
    isOpen: true
  },
  {
    id: 7,
    name: 'Yashoda Hospitals',
    type: 'hospital',
    position: [17.4037, 78.4799],
    address: 'Somajiguda',
    phone: '+91 40 4567 4567',
    distance: 0,
    services: ['Emergency', 'Trauma Care', 'Critical Care'],
    isOpen: true
  },
  {
    id: 8,
    name: 'Continental Hospitals',
    type: 'hospital',
    position: [17.4160, 78.4359],
    address: 'Gachibowli',
    phone: '+91 40 6729 6729',
    distance: 0,
    services: ['Emergency', 'Multi-Specialty', 'ICU'],
    isOpen: true
  },
  {
    id: 9,
    name: 'Citizens Hospital',
    type: 'hospital',
    position: [17.4150, 78.4350],
    address: 'Nallagandla',
    phone: '+91 40 6748 6748',
    distance: 0,
    services: ['Emergency', '24/7 Care', 'ICU'],
    isOpen: true
  },
  {
    id: 10,
    name: 'Life Aid Ambulance Services',
    type: 'ambulance',
    position: [17.4250, 78.4450],
    address: 'Ameerpet',
    phone: '+91 98480 48480',
    distance: 0,
    services: ['Emergency Transport', 'Basic Life Support', 'Advanced Life Support'],
    isOpen: true
  }
];

// Function to calculate distance between two points
const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
  const [lat1, lon1] = point1;
  const [lat2, lon2] = point2;
  
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
           Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Number((R * c).toFixed(1));
};

// Custom icons for different types of services
const createCustomIcon = (type: 'hospital' | 'ambulance' | 'clinic') => {
  const colors = {
    hospital: '#ef4444',
    ambulance: '#3b82f6',
    clinic: '#10b981',
  };

  let iconSvg = '';
  switch (type) {
    case 'hospital':
      iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>';
      break;
    case 'ambulance':
      iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M2 9h3v8h13v-6h3L17 5H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2Zm12-1h3l-2.5-4h-3"/><path d="M9 17h8"/><path d="M12 8v5"/><path d="M9.5 11h5"/></svg>';
      break;
    case 'clinic':
      iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>';
      break;
  }

  return L.divIcon({
    html: `
      <div class="relative p-2 bg-white rounded-full shadow-lg" style="border: 2px solid ${colors[type]}">
        <div style="color: ${colors[type]}">${iconSvg}</div>
      </div>
    `,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

// Component to handle routing
const RoutingMachine = ({ userLocation, destination }: { 
  userLocation: [number, number],
  destination: [number, number]
}) => {
  const map = useMap();
  const routingControlRef = useRef<any>(null);

  useEffect(() => {
    if (!map || !userLocation || !destination) return;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    const waypoints = [
      L.latLng(userLocation[0], userLocation[1]),
      L.latLng(destination[0], destination[1])
    ];

    const routingControl = L.Routing.control({
      waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'car'
      }),
      lineOptions: {
        styles: [{ color: '#6366f1', weight: 4, opacity: 0.7 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },
      showAlternatives: false,
      fitSelectedRoutes: true,
      addWaypoints: false,
      routeWhileDragging: false
    }).addTo(map);

    routingControlRef.current = routingControl;

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map, userLocation, destination]);

  return null;
};

// Component to handle map location updates
const MapController = ({ userLocation }: { userLocation: [number, number] | null }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 13);
    }
  }, [userLocation, map]);

  return null;
};

export default function HealthcareMap({
  height = '400px',
  showSearch = false,
  showFilters = false,
}: HealthcareMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedService, setSelectedService] = useState<EmergencyService | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [services, setServices] = useState(EMERGENCY_SERVICES);
  const [loading, setLoading] = useState(true);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  // Get user's location and update distances
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        // Update distances for all services
        const servicesWithDistances = EMERGENCY_SERVICES.map(service => ({
          ...service,
          distance: calculateDistance([latitude, longitude], service.position)
        }));

        // Sort by distance
        servicesWithDistances.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        setServices(servicesWithDistances);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        setUserLocation([17.3850, 78.4867]); // Default to Hyderabad
        setServices(EMERGENCY_SERVICES);
        setLoading(false);
      }
    );
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    const filtered = EMERGENCY_SERVICES.filter(service =>
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.address.toLowerCase().includes(query.toLowerCase()) ||
      service.services.some(s => s.toLowerCase().includes(query.toLowerCase()))
    );
    setServices(filtered);
  };

  const handleFilter = (type: string) => {
    setActiveFilter(type);
    const filtered = type === 'all'
      ? EMERGENCY_SERVICES
      : EMERGENCY_SERVICES.filter(service => service.type === type);
    setServices(filtered);
  };

  return (
    <div className="relative" style={{ height }}>
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-600">Finding nearby emergency services...</p>
          </div>
        </div>
      )}

      <MapContainer
        center={userLocation || [17.3850, 78.4867]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        ref={(map) => { if (map) setMapInstance(map); }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <>
            <Marker 
              position={userLocation}
              icon={L.divIcon({
                html: `
                  <div class="relative">
                    <div class="absolute -top-1 -left-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                    <div class="relative w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                  </div>
                `,
                className: '',
                iconSize: [12, 12],
                iconAnchor: [6, 6],
              })}
            >
              <Popup>Your Location</Popup>
            </Marker>
            <MapController userLocation={userLocation} />
          </>
        )}

        {services.map((service) => (
          <Marker
            key={service.id}
            position={service.position}
            icon={createCustomIcon(service.type)}
            eventHandlers={{
              click: () => setSelectedService(service)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-2">{service.address}</p>
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${service.phone}`} className="hover:underline">
                    {service.phone}
                  </a>
                </div>
                {service.distance !== undefined && (
                  <p className="text-sm text-gray-500 mb-2">
                    Distance: {service.distance} km
                  </p>
                )}
                <div className="space-y-1">
                  {service.services.map((s, i) => (
                    <div key={i} className="text-sm text-gray-600 flex items-center gap-1">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                      {s}
                    </div>
                  ))}
                </div>
                {userLocation && (
                  <button
                    onClick={() => setSelectedService(service)}
                    className="mt-3 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Directions
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {userLocation && selectedService && (
          <RoutingMachine
            userLocation={userLocation}
            destination={selectedService.position}
          />
        )}
      </MapContainer>

      {showSearch && (
        <div className="absolute top-4 left-4 right-4 z-20 sm:left-4 sm:right-auto sm:w-72">
          <input
            type="text"
            placeholder="Search hospitals, services..."
            className="w-full px-4 py-2 bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      )}

      {showFilters && (
        <div className="absolute bottom-4 left-4 z-20 flex gap-2">
          <button
            onClick={() => handleFilter('all')}
            className={`px-4 py-2 rounded-lg shadow-lg ${
              activeFilter === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilter('hospital')}
            className={`px-4 py-2 rounded-lg shadow-lg ${
              activeFilter === 'hospital'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            Hospitals
          </button>
          <button
            onClick={() => handleFilter('ambulance')}
            className={`px-4 py-2 rounded-lg shadow-lg ${
              activeFilter === 'ambulance'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            Ambulances
          </button>
        </div>
      )}
    </div>
  );
}
