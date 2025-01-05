import React from 'react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { Mic, MicOff } from 'lucide-react';

interface VoiceCommandsProps {
  onCommand: (command: string) => void;
}

export function VoiceCommands({ onCommand }: VoiceCommandsProps) {
  const [isListening, setIsListening] = React.useState(false);
  const [recognition, setRecognition] = React.useState<any>(null);

  React.useEffect(() => {
    if (window.SpeechRecognition || (window as any).webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleCommand(command);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Voice recognition error. Please try again.');
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      toast.error('Voice recognition is not supported in your browser.');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const handleCommand = (command: string) => {
    // Example commands
    if (command.includes('book appointment')) {
      onCommand('book');
    } else if (command.includes('show doctors')) {
      onCommand('doctors');
    } else if (command.includes('home nursing')) {
      onCommand('nursing');
    } else if (command.includes('my appointments')) {
      onCommand('dashboard');
    }
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      toast.info('Voice commands stopped');
    } else {
      recognition.start();
      toast.success('Listening for voice commands...');
    }
    setIsListening(!isListening);
  };

  return (
    <Button
      variant={isListening ? 'destructive' : 'default'}
      size="icon"
      className="fixed bottom-4 left-4 rounded-full h-12 w-12"
      onClick={toggleListening}
    >
      {isListening ? (
        <MicOff className="h-6 w-6" />
      ) : (
        <Mic className="h-6 w-6" />
      )}
    </Button>
  );
}

