'use server';

/**
 * @fileOverview A voice-assisted input AI agent.
 *
 * - voiceAssistedInput - A function that handles converting voice input to structured data.
 * - VoiceAssistedInputInput - The input type for the voiceAssistedInput function.
 * - VoiceAssistedInputOutput - The return type for the voiceAssistedInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoiceAssistedInputInputSchema = z.object({
  voiceDataUri: z
    .string()
    .describe(
      "The voice input, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  fieldTypes: z.array(z.string()).describe('The types of the fields to be extracted from the voice data.'),
});
export type VoiceAssistedInputInput = z.infer<typeof VoiceAssistedInputInputSchema>;

const VoiceAssistedInputOutputSchema = z.object({
  extractedData: z.record(z.string(), z.string()).describe('The extracted data from the voice input.'),
});
export type VoiceAssistedInputOutput = z.infer<typeof VoiceAssistedInputOutputSchema>;

export async function voiceAssistedInput(input: VoiceAssistedInputInput): Promise<VoiceAssistedInputOutput> {
  return voiceAssistedInputFlow(input);
}

const prompt = ai.definePrompt({
  name: 'voiceAssistedInputPrompt',
  input: {schema: VoiceAssistedInputInputSchema},
  output: {schema: VoiceAssistedInputOutputSchema},
  prompt: `You are an AI assistant that extracts information from voice recordings.

You will receive a voice recording and a list of field types to extract from the recording.

You must extract the information from the recording and return it in a JSON format where the keys are the field types and the values are the extracted information.

Voice Recording: {{media url=voiceDataUri}}
Field Types: {{fieldTypes}}

Ensure that the extracted data is accurate and complete.

Return a JSON object with the extracted data:
{
  [fieldType]: [extractedInformation]
}
`,
});

const voiceAssistedInputFlow = ai.defineFlow(
  {
    name: 'voiceAssistedInputFlow',
    inputSchema: VoiceAssistedInputInputSchema,
    outputSchema: VoiceAssistedInputOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
