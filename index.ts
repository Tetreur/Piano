import { z } from 'zod'

console.log("Hello via Bun!")
z.string().parse("Hello via Zod!")