import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Heart, Brain, Users } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
}

interface DashboardProps {
  moodHistory: MoodEntry[];
  streak: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ moodHistory, streak }) => {
  const averageMood = moodHistory.length > 0 
    ? moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length
    : 0;

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😢', '😔', '😐', '🙂', '😊'];
    return emojis[mood - 1] || '😐';
  };

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return 'No trend yet';
    const recent = moodHistory.slice(-3);
    const avg = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length;
    
    if (avg >= 4) return 'Doing great! 🌟';
    if (avg >= 3) return 'Stable mood 📈';
    return 'Needs support 💙';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-peaceful shadow-soft">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">{streak} days</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-calm shadow-soft">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-primary-foreground" />
            <div>
              <p className="text-sm text-primary-foreground/80">Average Mood</p>
              <p className="text-2xl font-bold text-primary-foreground">
                {getMoodEmoji(Math.round(averageMood))} {averageMood.toFixed(1)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-success" />
            <div>
              <p className="text-sm text-muted-foreground">Trend</p>
              <p className="text-lg font-semibold">{getMoodTrend()}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-gentle">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Recent Mood History
        </h3>
        
        {moodHistory.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Start tracking your mood to see insights here
          </p>
        ) : (
          <div className="space-y-3">
            {moodHistory.slice(-7).reverse().map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                  <div>
                    <p className="font-medium">{new Date(entry.date).toLocaleDateString()}</p>
                    {entry.note && (
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {entry.note}
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant="outline">
                  {entry.mood}/5
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6 shadow-gentle bg-gradient-peaceful">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Community Support
        </h3>
        <p className="text-muted-foreground mb-4">
          Connect with others on similar journeys for mutual support and encouragement.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-card rounded-lg border">
            <p className="font-medium">Anonymous Support Groups</p>
            <p className="text-sm text-muted-foreground">12 active groups</p>
          </div>
          <div className="p-3 bg-card rounded-lg border">
            <p className="font-medium">Peer Mentorship</p>
            <p className="text-sm text-muted-foreground">24 mentors available</p>
          </div>
        </div>
      </Card>
    </div>
  );
};