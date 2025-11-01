'use server';

/**
 * @fileOverview Implements the video verification flow with a phrase.
 *
 * - videoVerificationWithPhrase - A function that initiates the video verification process.
 * - VideoVerificationWithPhraseInput - The input type for the videoVerificationWithPhrase function.
 * - VideoVerificationWithPhraseOutput - The return type for the videoVerificationWithPhrase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VideoVerificationWithPhraseInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      'A video recording of the user speaking the given phrase, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' /* The video of the user speaking the phrase. */
    ),
  phrase: z.string().describe('The phrase the user is supposed to speak.'),
});
export type VideoVerificationWithPhraseInput = z.infer<
  typeof VideoVerificationWithPhraseInputSchema
>;

const VideoVerificationWithPhraseOutputSchema = z.object({
  isVerified: z
    .boolean()
    .describe('Whether the user is verified based on the video and phrase.'),
  reason: z.string().optional().describe('The reason for verification failure, if any.'),
});
export type VideoVerificationWithPhraseOutput = z.infer<
  typeof VideoVerificationWithPhraseOutputSchema
>;

export async function videoVerificationWithPhrase(
  input: VideoVerificationWithPhraseInput
): Promise<VideoVerificationWithPhraseOutput> {
  return videoVerificationWithPhraseFlow(input);
}

const videoVerificationPrompt = ai.definePrompt({
  name: 'videoVerificationPrompt',
  input: {schema: VideoVerificationWithPhraseInputSchema},
  output: {schema: VideoVerificationWithPhraseOutputSchema},
  prompt: `You are an identity verification expert.  A user has recorded a video while speaking a phrase.  Determine if the user is likely to be who they claim to be.

  Here is the phrase the user was supposed to speak: {{{phrase}}}

  Here is the video of the user: {{media url=videoDataUri}}

  Return whether the user is verified or not. If not verified, explain why in the reason field.
  `,
});

const videoVerificationWithPhraseFlow = ai.defineFlow(
  {
    name: 'videoVerificationWithPhraseFlow',
    inputSchema: VideoVerificationWithPhraseInputSchema,
    outputSchema: VideoVerificationWithPhraseOutputSchema,
  },
  async input => {
    const {output} = await videoVerificationPrompt(input);
    return output!;
  }
);
