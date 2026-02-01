'use server';

import { generateApiSchemaFromDescription, GenerateApiSchemaFromDescriptionInput } from '@/ai/flows/generate-api-schema-from-description';
import { approveInferredSchema, ApproveInferredSchemaInput } from '@/ai/flows/approve-inferred-schema';

export async function generateSchemaAction(input: GenerateApiSchemaFromDescriptionInput) {
    try {
        // For demonstration, we'll return a mock schema after a delay.
        // In a real app, you would call:
        // const result = await generateApiSchemaFromDescription(input);
        
        await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate network and processing delay

        const mockJsonSchema = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Job Listing",
  "description": "Schema for a job listing from ${input.url}",
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Unique identifier for the job." },
    "title": { "type": "string", "description": "The title of the job." },
    "company": { "type": "string", "description": "The name of the company." },
    "location": { "type": "string", "description": "The location of the job." },
    "posted_date": { "type": "string", "format": "date", "description": "The date the job was posted." }
  },
  "required": ["id", "title", "company", "location"]
}`;

        const mockOpenApiSpec = `openapi: 3.0.0
info:
  title: Website API for ${input.url}
  version: 1.0.0
paths:
  /jobs:
    get:
      summary: Get Job Listings
      parameters:
        - name: location
          in: query
          schema:
            type: string
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: A list of jobs
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/JobListing'
components:
  schemas:
    JobListing:
      type: object
      properties:
        id: { type: 'string' }
        title: { type: 'string' }
        company: { type: 'string' }
        location: { type: 'string' }
        posted_date: { type: 'string', format: 'date' }
`;

        return { success: true, data: { jsonSchema: mockJsonSchema, openApiSpec: mockOpenApiSpec } };
    } catch (e: any) {
        return { success: false, error: e.message || "An unknown error occurred." };
    }
}


export async function approveSchemaAction(input: ApproveInferredSchemaInput) {
    try {
        const result = await approveInferredSchema(input);
        return { success: true, data: result };
    } catch (e: any) {
        return { success: false, error: e.message || "An unknown error occurred." };
    }
}
