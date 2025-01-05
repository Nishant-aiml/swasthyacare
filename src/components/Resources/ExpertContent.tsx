import React from 'react';
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Book, Video, Headphones } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  title: string;
  image: string;
  content: {
    type: 'article' | 'video' | 'podcast';
    title: string;
    description: string;
  }[];
}

const experts: Expert[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Cardiologist',
    image: '/experts/sarah.jpg',
    content: [
      {
        type: 'article',
        title: 'Understanding Heart Health',
        description: 'A comprehensive guide to maintaining a healthy heart.'
      },
      {
        type: 'video',
        title: 'Heart Disease Prevention',
        description: 'Learn about the latest preventive measures.'
      }
    ]
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Neurologist',
    image: '/experts/michael.jpg',
    content: [
      {
        type: 'podcast',
        title: 'Brain Health Basics',
        description: 'Essential tips for maintaining brain health.'
      }
    ]
  }
];

export function ExpertContent() {
  const getIcon = (type: Expert['content'][0]['type']) => {
    switch (type) {
      case 'article':
        return <Book className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'podcast':
        return <Headphones className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {experts.map((expert) => (
        <Card key={expert.id}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage src={expert.image} alt={expert.name} />
                <AvatarFallback>{expert.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{expert.name}</h3>
                <p className="text-sm text-gray-500">{expert.title}</p>
              </div>
            </div>
            <div className="space-y-3">
              {expert.content.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="mt-1">{getIcon(item.type)}</div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
