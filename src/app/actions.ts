'use server';

import { generateApiSchemaFromDescription, GenerateApiSchemaFromDescriptionInput } from '@/ai/flows/generate-api-schema-from-description';
import { approveInferredSchema, ApproveInferredSchemaInput } from '@/ai/flows/approve-inferred-schema';

export async function generateSchemaAction(input: GenerateApiSchemaFromDescriptionInput) {
    try {
        const result = await generateApiSchemaFromDescription(input);
        return { success: true, data: result };
    } catch (e: any) {
        console.error(e);
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
