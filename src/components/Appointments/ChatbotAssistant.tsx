import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import axios from 'axios';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const GOOGLE_API_KEY = 'AIzaSyAw6O6Bw1srs-O3nWy9TWgqatXIJ8ZwaQs';

const symptomsToDoctorType: Record<string, string[]> = {
  'chest pain': ['Cardiologist', 'Emergency Medicine'],
  'heart': ['Cardiologist'],
  'skin': ['Dermatologist'],
  'rash': ['Dermatologist', 'Allergist'],
  'child': ['Pediatrician'],
  'children': ['Pediatrician'],
  'baby': ['Pediatrician'],
  'bone': ['Orthopedist'],
  'joint': ['Orthopedist', 'Rheumatologist'],
  'muscle': ['Orthopedist', 'Physiotherapist'],
  'brain': ['Neurologist'],
  'headache': ['Neurologist', 'General Physician'],
  'mental': ['Psychiatrist'],
  'anxiety': ['Psychiatrist', 'Psychologist'],
  'depression': ['Psychiatrist', 'Psychologist'],
  'teeth': ['Dentist'],
  'tooth': ['Dentist'],
  'dental': ['Dentist'],
  'eye': ['Ophthalmologist'],
  'vision': ['Ophthalmologist'],
  'ear': ['ENT Specialist'],
  'nose': ['ENT Specialist'],
  'throat': ['ENT Specialist'],
  'breathing': ['Pulmonologist', 'General Physician'],
  'lung': ['Pulmonologist'],
  'stomach': ['Gastroenterologist'],
  'digestive': ['Gastroenterologist'],
  'diabetes': ['Endocrinologist'],
  'thyroid': ['Endocrinologist'],
  'hormone': ['Endocrinologist'],
  'kidney': ['Nephrologist'],
  'urine': ['Nephrologist', 'Urologist'],
  'skin allergy': ['Allergist', 'Dermatologist'],
  'food allergy': ['Allergist', 'Gastroenterologist'],
  'cancer': ['Oncologist'],
  'tumor': ['Oncologist'],
  'pregnancy': ['Gynecologist'],
  'womens health': ['Gynecologist'],
  'fever': ['General Physician'],
  'cold': ['General Physician'],
  'cough': ['General Physician', 'Pulmonologist']
};

export function ChatbotAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I can help you find the right doctor based on your symptoms. What symptoms are you experiencing?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeSymptoms = async (symptoms: string) => {
    try {
      const response = await axios.post(
        `https://language.googleapis.com/v1/documents:analyzeEntities?key=${GOOGLE_API_KEY}`,
        {
          document: {
            type: 'PLAIN_TEXT',
            content: symptoms,
          },
          encodingType: 'UTF8',
        }
      );

      const entities = response.data.entities || [];
      return entities
        .filter((entity: any) => 
          entity.type === 'OTHER' || 
          entity.type === 'EVENT' || 
          entity.salience > 0.3
        )
        .map((entity: any) => entity.name.toLowerCase());
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      return null;
    }
  };

  const findDoctorType = async (symptoms: string): Promise<string[]> => {
    const analyzedSymptoms = await analyzeSymptoms(symptoms);
    const recommendedDoctors = new Set<string>();
    
    // First try API analyzed symptoms
    if (analyzedSymptoms && analyzedSymptoms.length > 0) {
      analyzedSymptoms.forEach((symptom: string) => {
        Object.entries(symptomsToDoctorType).forEach(([key, doctors]) => {
          if (symptom.includes(key) || key.includes(symptom)) {
            doctors.forEach(doctor => recommendedDoctors.add(doctor));
          }
        });
      });
    }
    
    // Also try direct keyword matching as backup
    const lowercaseSymptoms = symptoms.toLowerCase();
    Object.entries(symptomsToDoctorType).forEach(([symptom, doctors]) => {
      if (lowercaseSymptoms.includes(symptom)) {
        doctors.forEach(doctor => recommendedDoctors.add(doctor));
      }
    });

    return recommendedDoctors.size > 0
      ? Array.from(recommendedDoctors)
      : ['General Physician'];
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    const doctorTypes = await findDoctorType(userMessage);
    
    if (doctorTypes.length === 1) {
      return `Based on your symptoms, I recommend consulting a ${doctorTypes[0]}. Would you like me to help you book an appointment?`;
    } else {
      const doctorList = doctorTypes.map(type => `• ${type}`).join('\n');
      return `Based on your symptoms, I recommend consulting one of the following specialists:\n${doctorList}\n\nWould you like me to help you book an appointment with any of these specialists?`;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateResponse(userMessage.content);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I apologize, but I encountered an error. Please try again or describe your symptoms differently.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-[400px] bg-white shadow-lg rounded-lg border">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'bot' && (
                    <MessageSquare className="w-4 h-4 mt-1" />
                  )}
                  <div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            placeholder="Type your symptoms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-white"
          />
          <Button onClick={handleSend} disabled={isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
