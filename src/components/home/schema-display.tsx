"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SchemaDisplayProps = {
  jsonSchema: string;
  openApiSpec: string;
  onApprove: () => void;
  onReset: () => void;
};

export function SchemaDisplay({ jsonSchema, openApiSpec, onApprove, onReset }: SchemaDisplayProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Approve Inferred Schema</h2>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Our agent has generated a schema based on your request. Please review and approve it to finalize your API.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="openapi" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="openapi">OpenAPI Spec</TabsTrigger>
              <TabsTrigger value="json-schema">JSON Schema</TabsTrigger>
            </TabsList>
            <TabsContent value="openapi" className="mt-4">
              <pre className="p-4 rounded-md bg-card-foreground/5 overflow-x-auto">
                <code className="font-code text-sm text-foreground/80">{openApiSpec}</code>
              </pre>
            </TabsContent>
            <TabsContent value="json-schema" className="mt-4">
              <pre className="p-4 rounded-md bg-card-foreground/5 overflow-x-auto">
                <code className="font-code text-sm text-foreground/80">{jsonSchema}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onReset}>Start Over</Button>
        <Button onClick={onApprove} className="bg-primary hover:bg-primary/90">
          Approve and Build API
        </Button>
      </div>
    </div>
  );
}
