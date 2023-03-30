import { config } from 'dotenv'
import { cleanEnv, str, email, json, num } from 'envalid'

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` })

export const CREDENTIALS = process.env.CREDENTIALS === 'true'

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: num({ default: 3000 }),
  SECRET_KEY: str(),
  JwT_ACCESS_TOKEN_KEY: str({ default: 'secret' }),
  JwT_ACCESS_TOKEN_EXPIRES_IN: str({ default: '1d' }),
  JwT_REFRESH_TOKEN_KEY: str({ default: 'secret' }),
  JwT_REFRESH_TOKEN_EXPIRES_IN: str({ default: '30d' })
})

export default env
