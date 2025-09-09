import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const moods = [
  { emoji: '😢', label: 'Very Sad', value: 1, color: 'bg-red-100 hover:bg-red-200' },
  { emoji: '😔', label: 'Sad', value: 2, color: 'bg-orange-100 hover:bg-orange-200' },
  { emoji: '😐', label: 'Neutral', value: 3, color: 'bg-yellow-100 hover:bg-yellow-200' },
  { emoji: '🙂', label: 'Happy', value: 4, color: 'bg-green-100 hover:bg-green-200' },
  { emoji: '😊', label: 'Very Happy', value: 5, color: 'bg-emerald-100 hover:bg-emerald-200' },
];

interface MoodTrackerProps {
  onMoodSelect: (mood: number, note?: string) => void;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSelect(selectedMood, note);
      setSelectedMood(null);
      setNote('');
    }
  };

  return (
    <Card className="p-6 shadow-gentle">
      <h3 className="text-xl font-semibold mb-4 text-center">How are you feeling today?</h3>
      
      <div className="grid grid-cols-5 gap-3 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={cn(
              'flex flex-col items-center p-4 rounded-lg transition-calm border-2',
              selectedMood === mood.value 
                ? 'border-primary bg-primary-light scale-105' 
                : 'border-transparent hover:border-primary/30',
              mood.color
            )}
          >
            <span className="text-3xl mb-2">{mood.emoji}</span>
            <span className="text-xs font-medium text-center">{mood.label}</span>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="space-y-4">
          <textarea
            placeholder="What's on your mind? (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 border border-input rounded-lg resize-none h-20 focus:ring-2 focus:ring-ring focus:border-transparent transition-calm"
          />
          <Button 
            onClick={handleSubmit} 
            variant="success" 
            className="w-full"
          >
            Save Mood
          </Button>
        </div>
      )}
    </Card>
  );
};