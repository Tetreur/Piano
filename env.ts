import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
	runtimeEnv: process.env,
	/*
	 * ServerSide Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		SITE_URL: z.string().url(),
		THEO_USER_NAME: z.string().min(1),
		THEO_USER_PASSWORD: z.string().min(1),
	},
})
