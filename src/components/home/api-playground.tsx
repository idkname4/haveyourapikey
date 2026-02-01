"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clipboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ApiPlaygroundProps = {
  openApiSpec: string;
  onReset: () => void;
};

const exampleResponse = `{
  "data": [
    {
      "id": "job_123",
      "title": "Senior Frontend Engineer",
      "company": "TechCorp",
      "location": "Remote",
      "posted_date": "2026-01-31"
    },
    {
      "id": "job_456",
      "title": "Backend Developer",
      "company": "DataMinds",
      "location": "New York, NY",
      "posted_date": "2026-01-30"
    }
  ],
  "page": 1,
  "totalPages": 5
}`;

export function ApiPlayground({ openApiSpec, onReset }: ApiPlaygroundProps) {
    const { toast } = useToast();

    const handleCopySpec = () => {
        navigator.clipboard.writeText(openApiSpec);
        toast({
            title: `OpenAPI Spec copied!`,
            description: `The OpenAPI specification has been copied to your clipboard.`,
        });
    };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
            <CheckCircle className="h-4 w-4" />
            <span>API Generated Successfully</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight">Your API is Ready!</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          You can now use your generated API. Here's a playground to test it out.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Playground</CardTitle>
          <CardDescription>
            Here's an example endpoint. In a real application, this would be a live and interactive.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="font-semibold mb-2">Endpoint</h3>
                <div className="flex items-center gap-4 rounded-md border p-4">
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">GET</Badge>
                    <code className="font-code text-sm flex-1">/api/jobs?location=remote&page=1</code>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-2">Example Response</h3>
                <div className="relative">
                    <pre className="p-4 rounded-md bg-card-foreground/5 overflow-x-auto">
                        <code className="font-code text-sm text-foreground/80">{exampleResponse}</code>
                    </pre>
                </div>
            </div>
            
            <div>
                 <h3 className="font-semibold mb-2">OpenAPI Specification</h3>
                 <div className="relative">
                    <pre className="p-4 rounded-md bg-card-foreground/5 overflow-x-auto max-h-60">
                        <code className="font-code text-sm text-foreground/80">{openApiSpec}</code>
                    </pre>
                    <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={handleCopySpec}>
                        <Clipboard className="h-4 w-4" />
                    </Button>
                 </div>
            </div>

        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Button onClick={onReset}>Create Another API</Button>
      </div>
    </div>
  );
}
