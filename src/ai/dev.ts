import { config } from 'dotenv';
config();

import '@/ai/flows/generate-api-schema-from-description.ts';
import '@/ai/flows/approve-inferred-schema.ts';