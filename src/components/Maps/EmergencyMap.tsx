import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface EmergencyService {
  id: string;
  name: string;
  type: string;
  location: [number, number];
  phone: string;
}

interface Props {
  location?: Location | null;
  height?: string;
}

// MapController component to handle map updates
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

export default function EmergencyMap({ location, height = '100%' }: Props) {
  const [services, setServices] = useState<EmergencyService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  
  const defaultCenter: [number, number] = useMemo(() => [17.385044, 78.486671], []); // Default to Hyderabad
  const userLocation = useMemo(() => 
    location ? [location.latitude, location.longitude] as [number, number] : defaultCenter,
    [location, defaultCenter]
  );

  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  // Memoized map options for better performance
  const mapOptions = useMemo(() => ({
    preferCanvas: true,
    renderer: L.canvas(),
    maxZoom: 18,
    minZoom: 5,
    zoomControl: false,
    attributionControl: false
  }), []);

  // Optimized fetch services function with proper error handling
  const fetchEmergencyServices = useCallback(async (lat: number, lng: number) => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    
    setIsLoading(true);
    try {
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:5000,${lat},${lng});
          node["amenity"="clinic"](around:5000,${lat},${lng});
          node["emergency"="ambulance_station"](around:5000,${lat},${lng});
        );
        out body 25;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query
      });

      if (!response.ok) throw new Error('Failed to fetch emergency services');

      const data = await response.json();
      const fetchedServices: EmergencyService[] = data.elements
        .slice(0, 25)
        .map((element: any) => ({
          id: element.id.toString(),
          name: element.tags.name || 'Emergency Service',
          type: element.tags.amenity || element.tags.emergency,
          location: [element.lat, element.lon] as [number, number],
          phone: element.tags.phone || 'Phone not available'
        }));

      setServices(fetchedServices);
    } catch (error) {
      toast.error('Failed to fetch emergency services');
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); // Only depend on isLoading

  // Optimized route calculation
  const calculateRoute = useCallback((service: EmergencyService) => {
    if (!mapInstance) return;

    if (routingControlRef.current) {
      routingControlRef.current.remove();
    }

    const waypoints = [
      L.latLng(userLocation[0], userLocation[1]),
      L.latLng(service.location[0], service.location[1])
    ];

    routingControlRef.current = L.Routing.control({
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
    }).addTo(mapInstance);
  }, [mapInstance, userLocation]);

  // Fetch services only when location changes
  useEffect(() => {
    if (userLocation) {
      fetchEmergencyServices(userLocation[0], userLocation[1]);
    }
  }, [userLocation, fetchEmergencyServices]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (routingControlRef.current && mapInstance) {
        routingControlRef.current.remove();
      }
      Object.values(markersRef.current).forEach(marker => {
        marker.remove();
      });
      markersRef.current = {};
    };
  }, [mapInstance]);

  // Memoized marker icon creation
  const getMarkerIcon = useCallback((type: string) => {
    const markerColor = type === 'ambulance_station' ? '#ef4444' : '#3b82f6';
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
          ${type === 'ambulance_station' ? 'A' : 'H'}
        </div>
      `,
      iconSize: [24, 24] as L.PointTuple,
      iconAnchor: [12, 12] as L.PointTuple
    });
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Emergency Services Near You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 z-[1000] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            )}
            
            <MapContainer
              center={userLocation}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              ref={(map) => { if (map) setMapInstance(map); }}
              {...mapOptions}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={18}
                minZoom={5}
              />

              <Marker
                position={userLocation}
                icon={L.divIcon({
                  className: 'custom-marker',
                  html: `
                    <div style="
                      background-color: #22c55e;
                      width: 24px;
                      height: 24px;
                      border-radius: 50%;
                      border: 2px solid white;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                      animation: pulse 2s infinite;
                    ">
                    </div>
                    <style>
                      @keyframes pulse {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.2); opacity: 0.8; }
                        100% { transform: scale(1); opacity: 1; }
                      }
                    </style>
                  `,
                  iconSize: [24, 24] as L.PointTuple,
                  iconAnchor: [12, 12] as L.PointTuple
                })}
              >
                <Popup>
                  <div className="font-semibold">Your Location</div>
                </Popup>
              </Marker>

              {services.map(service => (
                <Marker
                  key={service.id}
                  position={service.location}
                  icon={getMarkerIcon(service.type)}
                  eventHandlers={{
                    click: () => calculateRoute(service)
                  }}
                >
                  <Popup>
                    <div className="space-y-2">
                      <h3 className="font-semibold">{service.name}</h3>
                      {service.phone && (
                        <a
                          href={`tel:${service.phone}`}
                          className="text-blue-600 hover:text-blue-800 text-sm block"
                        >
                          {service.phone}
                        </a>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => calculateRoute(service)}
                      >
                        Get Directions
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}

              <MapController center={userLocation} />
            </MapContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
