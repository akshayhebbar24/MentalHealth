import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Headphones, Video, Phone, ExternalLink } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'audio' | 'video' | 'crisis';
  category: string;
  duration?: string;
  link: string;
  emergency?: boolean;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Crisis Hotline',
    description: 'Immediate support for mental health emergencies',
    type: 'crisis',
    category: 'Emergency',
    link: 'tel:988',
    emergency: true
  },
  {
    id: '2',
    title: '5-Minute Breathing Exercise',
    description: 'Quick guided meditation to reduce anxiety and stress',
    type: 'audio',
    category: 'Mindfulness',
    duration: '5 min',
    link: '#'
  },
  {
    id: '3',
    title: 'Understanding Depression',
    description: 'Comprehensive guide to recognizing and managing depression',
    type: 'article',
    category: 'Education',
    duration: '10 min read',
    link: '#'
  },
  {
    id: '4',
    title: 'Progressive Muscle Relaxation',
    description: 'Video guide for releasing physical tension and stress',
    type: 'video',
    category: 'Relaxation',
    duration: '15 min',
    link: '#'
  },
  {
    id: '5',
    title: 'Cognitive Behavioral Techniques',
    description: 'Practical CBT strategies for managing negative thoughts',
    type: 'article',
    category: 'Therapy',
    duration: '12 min read',
    link: '#'
  },
  {
    id: '6',
    title: 'Sleep Hygiene Guide',
    description: 'Evidence-based tips for better sleep and mental health',
    type: 'article',
    category: 'Wellness',
    duration: '8 min read',
    link: '#'
  }
];

export const Resources: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <BookOpen className="h-5 w-5" />;
      case 'audio':
        return <Headphones className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'crisis':
        return <Phone className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string, emergency?: boolean) => {
    if (emergency) return 'bg-destructive text-destructive-foreground';
    switch (type) {
      case 'article':
        return 'bg-primary/10 text-primary';
      case 'audio':
        return 'bg-success/10 text-success';
      case 'video':
        return 'bg-warning/10 text-warning';
      case 'crisis':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const emergencyResources = resources.filter(r => r.emergency);
  const regularResources = resources.filter(r => !r.emergency);

  return (
    <div className="space-y-6">
      {/* Emergency Resources */}
      <Card className="p-6 bg-destructive/5 border-destructive/20 shadow-gentle">
        <h2 className="text-xl font-semibold mb-4 text-destructive flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Crisis Support - Available 24/7
        </h2>
        <div className="grid gap-4">
          {emergencyResources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-destructive/20">
              <div className="flex items-center gap-3">
                {getIcon(resource.type)}
                <div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              </div>
              <Button variant="destructive" size="sm" asChild>
                <a href={resource.link}>
                  Call Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Regular Resources */}
      <Card className="p-6 shadow-gentle">
        <h2 className="text-xl font-semibold mb-6">Mental Health Resources</h2>
        
        <div className="grid gap-4">
          {regularResources.map((resource) => (
            <div key={resource.id} className="p-4 border border-border rounded-lg hover:shadow-soft transition-calm">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-accent rounded-lg">
                    {getIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <Badge className={getTypeColor(resource.type)}>
                        {resource.category}
                      </Badge>
                      {resource.duration && (
                        <Badge variant="outline" className="text-xs">
                          {resource.duration}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {resource.description}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href={resource.link}>
                    Access
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Self-Care Tips */}
      <Card className="p-6 bg-gradient-peaceful shadow-gentle">
        <h3 className="text-xl font-semibold mb-4">Quick Self-Care Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-card rounded-lg">
            <h4 className="font-medium mb-2">🧘‍♀️ Mindful Breathing</h4>
            <p className="text-sm text-muted-foreground">
              Take 5 deep breaths: in for 4, hold for 4, out for 6
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <h4 className="font-medium mb-2">🚶‍♂️ Movement</h4>
            <p className="text-sm text-muted-foreground">
              Even a 5-minute walk can boost your mood and energy
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <h4 className="font-medium mb-2">💧 Hydrate</h4>
            <p className="text-sm text-muted-foreground">
              Drink a glass of water - dehydration affects mood
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg">
            <h4 className="font-medium mb-2">🌱 Gratitude</h4>
            <p className="text-sm text-muted-foreground">
              Name 3 things you're grateful for today
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};