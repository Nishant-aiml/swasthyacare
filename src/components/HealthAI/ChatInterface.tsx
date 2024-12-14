import React, { useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ScrollArea } from '../ui/ScrollArea';
import { Send, Loader2 } from 'lucide-react';

export interface Message {
  type: 'bot' | 'user';
  content: string;
  options?: string[];
}

interface ChatInterfaceProps {
  messages: Message[];
  userInput: string;
  loading: boolean;
  onUserInput: (input: string) => void;
  onSendMessage: () => void;
  onOptionClick?: (option: string) => void;
  placeholder?: string;
}

export default function ChatInterface({
  messages,
  userInput,
  loading,
  onUserInput,
  onSendMessage,
  onOptionClick,
  placeholder = "Type your message..."
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-hidden bg-white rounded-lg shadow">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.options && onOptionClick && (
                    <div className="mt-2 space-x-2">
                      {message.options.map((option) => (
                        <Button
                          key={option}
                          variant="secondary"
                          size="sm"
                          onClick={() => onOptionClick(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <div className="mt-4">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={userInput}
            onChange={(e) => onUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={onSendMessage}
            disabled={loading || !userInput.trim()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
