import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoodTracker } from '@/components/MoodTracker';
import { AIChat } from '@/components/AIChat';
import { Dashboard } from '@/components/Dashboard';
import { Resources } from '@/components/Resources';
import { Brain, Heart, MessageCircle, BookOpen, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-mental-health.jpg';

interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
}

const Index = () => {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [streak, setStreak] = useState(1);

  const handleMoodSelect = (mood: number, note?: string) => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString(),
      mood,
      note
    };
    setMoodHistory(prev => [...prev, newEntry]);
    setStreak(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50 text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/70 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <Brain className="h-8 w-8 text-primary drop-shadow-md" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent">
                MindBridge
              </h1>
              <Badge variant="outline" className="ml-2 animate-pulse">AI-Powered</Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <Badge variant="outline" className="flex items-center gap-1 border-success text-success bg-success/10">
                <Sparkles className="h-3 w-3 animate-pulse" />
                {streak} day streak
              </Badge>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroImage}
            alt="Peaceful mental health imagery"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/50 via-white/70 to-emerald-200/50"></div>
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Your AI Mental Health
              <span className="bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent block">
                Companion
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track your mood, chat with our AI companion, and access personalized mental health resources.
              Your journey to wellness starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="mood" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto h-14 rounded-2xl bg-white/70 backdrop-blur-md shadow-md">
            <TabsTrigger value="mood" className="flex items-center gap-2 transition hover:text-primary">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Mood</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2 transition hover:text-primary">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2 transition hover:text-primary">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2 transition hover:text-primary">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto">
              <MoodTracker onMoodSelect={handleMoodSelect} />
            </motion.div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
              <AIChat />
            </motion.div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto">
              <Dashboard moodHistory={moodHistory} streak={streak} />
            </motion.div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
              <Resources />
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-white/70 backdrop-blur-md mt-20 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-semibold">MindBridge</span>
              <Badge variant="outline">Beta</Badge>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Remember: This is a supportive tool, not a replacement for professional help.
              <br />
              If you're in crisis, please contact emergency services or a crisis hotline.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;