import React from 'react';
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Play } from 'lucide-react';

export interface VirtualTour {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

interface VirtualToursProps {
  tours: VirtualTour[];
  onTourSelect: (tour: VirtualTour) => void;
}

const tours: VirtualTour[] = [
  {
    id: '1',
    title: 'Emergency Department Tour',
    description: 'Take a virtual tour of our state-of-the-art emergency department',
    thumbnail: '/tours/emergency.jpg',
    videoUrl: 'https://example.com/emergency-tour'
  },
  {
    id: '2',
    title: 'Maternity Ward Tour',
    description: 'Explore our comfortable and modern maternity facilities',
    thumbnail: '/tours/maternity.jpg',
    videoUrl: 'https://example.com/maternity-tour'
  }
];

export function VirtualTours({ tours, onTourSelect }: VirtualToursProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {tours.map((tour) => (
        <Card key={tour.id}>
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <div className="relative w-32 h-24 overflow-hidden rounded-lg">
                <img
                  src={tour.thumbnail}
                  alt={tour.title}
                  className="object-cover w-full h-full"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white/80 hover:bg-white"
                  onClick={() => onTourSelect(tour)}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{tour.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
