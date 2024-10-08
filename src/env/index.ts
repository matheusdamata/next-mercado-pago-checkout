import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  MP_ACCESS_TOKEN: z.string(),
  MP_WEBHOOK_URL: z.string(),
  MP_SUCCESS_PAGE: z.string(),
  MP_FAILURE_PAGE: z.string(),
  MP_PENDING_PAGE: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
