const { z } = require('zod');

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

module.exports = { userSchema };
