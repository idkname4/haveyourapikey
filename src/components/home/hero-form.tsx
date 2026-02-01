"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateSchemaAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from 'lucide-react';
import type { GenerateApiSchemaFromDescriptionOutput } from '@/ai/flows/generate-api-schema-from-description';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
});

type HeroFormProps = {
  onGenerationStart: () => void;
  onGenerationSuccess: (schema: GenerateApiSchemaFromDescriptionOutput) => void;
  onGenerationError: (error: string) => void;
  error: string | null;
};

export function HeroForm({ onGenerationStart, onGenerationSuccess, onGenerationError, error }: HeroFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: 'https://news.ycombinator.com',
      description: 'A list of top stories with title, url, score, and author.',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    onGenerationStart();
    const result = await generateSchemaAction(values);
    if (result.success && result.data) {
      onGenerationSuccess(result.data);
    } else {
      onGenerationError(result.error || 'Failed to generate API.');
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Turn Any Website into an API</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Just provide a URL and describe the data you need. Our agent will handle the rest.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New API</CardTitle>
          <CardDescription>Start by telling us which website to use and what data to look for.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
             <Alert variant="destructive" className="mb-4">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
             </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/products" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'A list of products with name, price, and image URL'"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Generating...' : 'Generate API'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
