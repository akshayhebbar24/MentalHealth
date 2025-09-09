import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface AIChatProps {
  onNewMessage?: (message: Message) => void;
}

const supportiveResponses = [
  "I hear you, and your feelings are completely valid. It's okay to feel this way.",
  "Thank you for sharing with me. What you're experiencing sounds difficult.",
  "I'm here to listen and support you. Would you like to talk about what's been on your mind?",
  "It takes courage to reach out. I'm proud of you for taking this step.",
  "Your mental health matters. Let's work through this together, one step at a time.",
  "Remember, it's okay to not be okay sometimes. Healing isn't linear.",
];

export const AIChat: React.FC<AIChatProps> = ({ onNewMessage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm your AI companion. I'm here to listen and support you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    // Simple keyword-based responses for demo
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('sad') || lowercaseMessage.includes('depressed')) {
      return "I understand you're feeling sad. These feelings are temporary, even though they feel overwhelming right now. Would you like to try a breathing exercise together?";
    }
    if (lowercaseMessage.includes('anxious') || lowercaseMessage.includes('worry')) {
      return "Anxiety can be really challenging. Let's focus on the present moment. Can you name 3 things you can see around you right now?";
    }
    if (lowercaseMessage.includes('stress')) {
      return "Stress affects us all. Remember, you've overcome challenges before and you can do it again. What's one small thing you could do today to take care of yourself?";
    }
    if (lowercaseMessage.includes('help')) {
      return "I'm glad you're reaching out for help - that shows real strength. I'm here to support you, and if you need professional help, I can provide some resources too.";
    }
    
    // Return a random supportive response
    return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    onNewMessage?.(userMessage);
    
    const messageText = inputText;
    setInputText('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(messageText),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      onNewMessage?.(aiResponse);
    }, 1000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Note: Voice recognition would be implemented here
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-96 shadow-gentle">
      <div className="p-4 border-b border-border bg-gradient-peaceful rounded-t-lg">
        <h3 className="font-semibold text-lg">AI Companion</h3>
        <p className="text-sm text-muted-foreground">I'm here to listen and support you</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-accent-foreground'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1"
          />
          <Button
            onClick={toggleListening}
            variant={isListening ? "destructive" : "outline"}
            size="icon"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button onClick={sendMessage} variant="default" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};