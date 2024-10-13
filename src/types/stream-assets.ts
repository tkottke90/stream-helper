import { z } from 'zod';

export const StreamAssetQuerySchema = z.object({
  type: z.enum(['any', 'html', 'css', 'js']).default('any')
});

export type StreamAssetQueryDTO = z.infer<typeof StreamAssetQuerySchema>;
