import axios from 'axios';

interface Place {
  place_id: string;
  display_name: string;
  type: string;
  lat: string;
  lon: string;
  distance?: number;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const earthRadius = 6371; // in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const type = searchParams.get('type');

  if (!lat || !lng) {
    return new Response(JSON.stringify({ error: 'Latitude and longitude are required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const response = await axios.get<Place[]>(
      `https://nominatim.openstreetmap.org/search?format=json&q=${type === 'all' ? 'hospital|clinic|emergency' : type}&lat=${lat}&lon=${lng}&addressdetails=1&limit=10&radius=5000`
    );

    const places = response.data
      .filter(place => place.lat && place.lon)
      .map((place) => ({
        id: place.place_id,
        name: place.display_name,
        type: place.type,
        position: [parseFloat(place.lat), parseFloat(place.lon)] as [number, number],
        distance: calculateDistance(
          parseFloat(lat),
          parseFloat(lng),
          parseFloat(place.lat),
          parseFloat(place.lon)
        )
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));

    return new Response(JSON.stringify(places), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch nearby places' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
