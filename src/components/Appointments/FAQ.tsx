import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const faqs = [
  {
    question: 'How do I book a doctor appointment?',
    answer: 'Select the doctor type, choose your preferred doctor, select a convenient time slot, and fill in your details. You\'ll receive a confirmation email once the appointment is booked.',
  },
  {
    question: 'Can I reschedule or cancel my appointment?',
    answer: 'Yes, you can reschedule or cancel your appointment through the My Appointments dashboard. For cancellations, please provide a reason and give at least 24 hours notice.',
  },
  {
    question: 'What documents do I need for home nursing service?',
    answer: 'You\'ll need to upload relevant medical reports, prescriptions, and any specific care instructions. Our AI system will verify these documents for completeness.',
  },
  {
    question: 'How does the chatbot assistant work?',
    answer: 'Our AI chatbot helps you find the right doctor based on your symptoms. Simply describe your symptoms, and it will recommend the most appropriate specialist.',
  },
  {
    question: 'What is a TNAI number?',
    answer: 'TNAI (Trained Nurses Association of India) number is a unique identifier for registered nurses. It helps verify the nurse\'s credentials and eligibility.',
  },
  {
    question: 'How do voice commands work?',
    answer: 'Click the microphone icon and speak commands like "book appointment" or "show doctors". The system will navigate and perform actions based on your voice input.',
  },
  {
    question: 'How will I receive appointment reminders?',
    answer: 'You\'ll receive reminders via email and in-app notifications. You can customize reminder settings in your profile.',
  },
  {
    question: 'What if I need emergency care?',
    answer: 'For emergencies, please call our 24/7 emergency hotline or visit the nearest emergency room. This booking system is for non-emergency appointments only.',
  },
];

export function FAQ() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

