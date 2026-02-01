'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating an API schema from a website URL and a natural language description of the desired data.
 *
 * - generateApiSchemaFromDescription - A function that takes a URL and a description and returns an API schema.
 * - GenerateApiSchemaFromDescriptionInput - The input type for the generateApiSchemaFromDescription function.
 * - GenerateApiSchemaFromDescriptionOutput - The return type for the generateApiSchemaFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateApiSchemaFromDescriptionInputSchema = z.object({
  url: z.string().describe('The URL of the website to extract data from.'),
  description: z.string().describe('A natural language description of the data to extract from the website.'),
});
export type GenerateApiSchemaFromDescriptionInput = z.infer<typeof GenerateApiSchemaFromDescriptionInputSchema>;

const GenerateApiSchemaFromDescriptionOutputSchema = z.object({
  jsonSchema: z.string().describe('The generated JSON schema for the API.'),
  openApiSpec: z.string().describe('The generated OpenAPI specification for the API.'),
});
export type GenerateApiSchemaFromDescriptionOutput = z.infer<typeof GenerateApiSchemaFromDescriptionOutputSchema>;

export async function generateApiSchemaFromDescription(
  input: GenerateApiSchemaFromDescriptionInput
): Promise<GenerateApiSchemaFromDescriptionOutput> {
  return generateApiSchemaFromDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateApiSchemaFromDescriptionPrompt',
  input: {schema: GenerateApiSchemaFromDescriptionInputSchema},
  output: {schema: GenerateApiSchemaFromDescriptionOutputSchema},
  prompt: `You are an expert API designer. Given a website URL and a description of the data to extract, generate a JSON schema and an OpenAPI specification for an API that provides access to that data.

Website URL: {{{url}}}
Description: {{{description}}}

JSON Schema:
{{jsonSchema}}

OpenAPI Specification:
{{openApiSpec}}`,
});

const generateApiSchemaFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateApiSchemaFromDescriptionFlow',
    inputSchema: GenerateApiSchemaFromDescriptionInputSchema,
    outputSchema: GenerateApiSchemaFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
