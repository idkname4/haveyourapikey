"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader, FileCode, Search, Bot } from 'lucide-react';

const activities = [
  { text: 'Initializing agent...', icon: Bot },
  { text: 'Crawling website...', icon: Search },
  { text: 'Identifying data structures...', icon: FileCode },
  { text: 'Inferring schema with LLM...', icon: Bot },
  { text: 'Generating API specification...', icon: FileCode },
];

export function AgentActivity() {
  const [currentActivity, setCurrentActivity] = useState(0);

  useEffect(() => {
    if (currentActivity < activities.length) {
      const interval = setInterval(() => {
        setCurrentActivity(prev => (prev < activities.length ? prev + 1 : prev));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold tracking-tight">Agent at Work</h2>
      <p className="mt-2 text-muted-foreground">Please wait while our AI agent processes your request.</p>

      <Card className="mt-8 w-full max-w-md">
        <CardHeader>
          <CardTitle>Live Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <li key={index} className="flex items-center gap-4 transition-colors duration-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    {currentActivity > index ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : currentActivity === index ? (
                      <Loader className="h-5 w-5 animate-spin text-accent" />
                    ) : (
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <span className={`flex-1 text-left ${currentActivity < index ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {activity.text}
                  </span>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
