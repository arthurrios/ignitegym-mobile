import { z } from 'zod'

const envSchema = z.object({
  EXPO_PUBLIC_ONE_SIGNAL_APP_ID_IOS: z.string(),
  EXPO_PUBLIC_ONE_SIGNAL_APP_ID_ANDROID: z.string(),
})

export const env = envSchema.parse(process.env)
