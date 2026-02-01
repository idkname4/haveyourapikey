// src/ai/flows/approve-inferred-schema.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for approving an inferred schema.
 *
 * It takes a schema as input and returns the same schema as output after the user has approved it.
 *
 * @interface ApproveInferredSchemaInput The input schema to be approved.
 * @interface ApproveInferredSchemaOutput The approved schema.
 * @function approveInferredSchema A function that handles the schema approval process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ApproveInferredSchemaInputSchema = z.object({
  schema: z.string().describe('The inferred schema to be approved.'),
});

export type ApproveInferredSchemaInput = z.infer<typeof ApproveInferredSchemaInputSchema>;

const ApproveInferredSchemaOutputSchema = z.object({
  schema: z.string().describe('The approved schema.'),
});

export type ApproveInferredSchemaOutput = z.infer<typeof ApproveInferredSchemaOutputSchema>;

/**
 * Approves the inferred schema.
 * @param input The input containing the schema to be approved.
 * @returns The output containing the approved schema.
 */
export async function approveInferredSchema(input: ApproveInferredSchemaInput): Promise<ApproveInferredSchemaOutput> {
  return approveInferredSchemaFlow(input);
}

const approveInferredSchemaFlow = ai.defineFlow(
  {
    name: 'approveInferredSchemaFlow',
    inputSchema: ApproveInferredSchemaInputSchema,
    outputSchema: ApproveInferredSchemaOutputSchema,
  },
  async input => {
    // In a real application, this is where you would present the schema to the user
    // and get their approval.  Since this is an AI agent, we are simply returning the same
    // schema back.
    return {
      schema: input.schema,
    };
  }
);
