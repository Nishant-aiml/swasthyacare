'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Maximize2, Minimize2, Crosshair } from 'lucide-react';
import { toast } from 'sonner';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  latitude: number;
  longitude: number;
}

interface Service {
  id: string;
  name: string;
  type: string;
  location: [number, number];
  distance?: number;
}

interface Props {
  location?: Location;
}

const serviceTypes = [
  { value: 'all', label: 'All Services' },
  { value: 'hospital', label: 'Hospitals' },
  { value: 'clinic', label: 'Clinics' },
  { value: 'pharmacy', label: 'Pharmacies' }
];

const defaultCenter: [number, number] = [17.385044, 78.486671]; // Default to Hyderabad

// Custom hook for handling routing
function useMapRouting(map: L.Map | null, userLocation: [number, number] | null) {
  const [routingControl, setRoutingControl] = useState<L.Routing.Control | null>(null);

  const removeRoute = useCallback(() => {
    if (routingControl) {
      routingControl.remove();
      setRoutingControl(null);
    }
  }, [routingControl]);

  const showRoute = useCallback((destination: [number, number]) => {
    if (!map || !userLocation) return;

    removeRoute();

    const waypoints = [
      L.latLng(userLocation[0], userLocation[1]),
      L.latLng(destination[0], destination[1])
    ];

    const routingControlRef = L.Routing.control({
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
    });

    routingControlRef.addTo(map);
    setRoutingControl(routingControlRef);
  }, [map, userLocation, removeRoute]);

  useEffect(() => {
    return () => {
      if (routingControl) {
        routingControl.remove();
      }
    };
  }, [routingControl]);

  return showRoute;
}

// Custom hook to update map view when location changes
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

const LocationMap: React.FC<Props> = ({ location }) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [serviceType, setServiceType] = useState<string>("all");
  const [searchRadius, setSearchRadius] = useState(5000); // 5km default
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);

  const userIcon = L.divIcon({
    className: 'custom-marker user-location',
    html: `
      <div style="
        background-color: #3b82f6;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      "></div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  // Initialize location on component mount
  useEffect(() => {
    const getCurrentLocation = () => {
      if (location) {
        const newLocation: [number, number] = [location.latitude, location.longitude];
        setUserLocation(newLocation);
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
            console.log('Got user location:', newLocation);
            setUserLocation(newLocation);
          },
          (error) => {
            console.error('Error getting location:', error);
            toast.error('Could not get your location. Using default location.');
            setUserLocation(defaultCenter);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      }
    };

    getCurrentLocation();
  }, [location]);

  // Update map view when location changes
  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView(userLocation, 13);
    }
  }, [userLocation]);

  const handleLocationUpdate = useCallback(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
          if (mapRef.current) {
            mapRef.current.setView(newLocation, 13);
          }
          setIsLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Could not get your location');
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  }, []);

  const debouncedFetchServices = useCallback((lat: number, lng: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const query = `
        [out:json][timeout:25];
        (
          node["amenity"="hospital"](around:${searchRadius},${lat},${lng});
          node["amenity"="clinic"](around:${searchRadius},${lat},${lng});
          node["amenity"="pharmacy"](around:${searchRadius},${lat},${lng});
        );
        out body 50;
      `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: query
        });

        if (!response.ok) throw new Error('Failed to fetch services');

        const data = await response.json();
        const fetchedServices = data.elements
          .filter((element: any) => element.tags && element.tags.name)
          .map((element: any) => ({
            id: element.id.toString(),
            name: element.tags.name || 'Unnamed Service',
            type: element.tags.amenity,
            location: [element.lat, element.lon] as [number, number],
            distance: null
          }));

        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
        toast.error('Failed to fetch nearby services');
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, [searchRadius]);

  const showRoute = useMapRouting(mapRef.current, userLocation);

  const getMarkerIcon = useCallback((type: string) => {
    const markerColor = {
      hospital: '#ef4444',
      clinic: '#22c55e',
      pharmacy: '#a855f7'
    }[type] || '#6b7280';

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
          ${type === 'hospital' ? 'H' : type === 'clinic' ? 'C' : 'P'}
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (mapContainerRef.current) {
      if (!isFullscreen) {
        if (mapContainerRef.current.requestFullscreen) {
          mapContainerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  }, [isFullscreen]);

  const debounceTimerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (mapInitialized && userLocation) {
      debouncedFetchServices(userLocation[0], userLocation[1]);
    }
  }, [mapInitialized, userLocation, debouncedFetchServices]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Nearby Healthcare Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mobile-optimized controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Input
                  type="number"
                  min="1"
                  max="50"
                  value={searchRadius / 1000}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 1 && value <= 50) {
                      setSearchRadius(value * 1000);
                      if (userLocation) {
                        debouncedFetchServices(userLocation[0], userLocation[1]);
                      }
                    }
                  }}
                  className="w-20"
                />
                <span>km</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button
                variant="outline"
                size="icon"
                onClick={handleLocationUpdate}
                title="Get current location"
                className="w-10 h-10 sm:w-8 sm:h-8"
              >
                <Crosshair className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className="w-10 h-10 sm:w-8 sm:h-8"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div 
            ref={mapContainerRef}
            className={`relative ${
              isFullscreen 
                ? 'fixed inset-0 z-50' 
                : 'h-[300px] sm:h-[500px]'
            } w-full rounded-lg overflow-hidden`}
          >
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 z-[1000] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
              </div>
            )}
            
            <MapContainer
              center={userLocation || defaultCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              whenCreated={(map) => {
                mapRef.current = map;
                setMapInitialized(true);
                // Add touch zoom and drag for mobile
                map.touchZoom.enable();
                map.dragging.enable();
                map.tap.enable();
                // Disable bounce scroll on mobile
                map.scrollWheelZoom.disable();
                // Enable zoom control
                L.control.zoom({
                  position: 'bottomright'
                }).addTo(map);
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {userLocation && (
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>
                    <div className="font-semibold">Your Location</div>
                  </Popup>
                </Marker>
              )}

              {services
                .filter(service => serviceType === 'all' || service.type === serviceType)
                .map(service => (
                  <Marker
                    key={service.id}
                    position={service.location}
                    icon={getMarkerIcon(service.type)}
                    eventHandlers={{
                      click: () => {
                        setSelectedService(service);
                        if (userLocation) {
                          showRoute(service.location);
                        }
                      }
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <div className="font-semibold">{service.name}</div>
                        <div className="text-sm text-gray-600 capitalize">{service.type}</div>
                        {userLocation && (
                          <Button 
                            className="w-full mt-2 text-sm"
                            size="sm"
                            onClick={() => {
                              if (userLocation) {
                                showRoute(service.location);
                              }
                            }}
                          >
                            Show Route
                          </Button>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}

              {userLocation && <MapController center={userLocation} />}
            </MapContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap;