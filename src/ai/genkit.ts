import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import { config } from 'dotenv';

config();

export const ai = genkit({
  plugins: [googleAI({apiKey:"AIzaSyC1rbIXbLVTFGQR--aIKpdbRhYyKDs0DFA" })],
  model: 'googleai/gemini-2.5-flash',
});
