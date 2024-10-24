import { createAuthCallbacks } from '@solid-auth/server';
import { useSession } from 'vinxi/http';
import bcrypt from 'bcrypt';

// Example: With no hashing functions declared
// export const authCallbacks = createAuthCallbacks(useSession);

// Example: With hashing functions declared
// Using bcrypt
const hashingFunctions = {
  hash: async (password: string) => {
    return bcrypt.hash(password, 12);
  },
  compare: async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
  },
};

export const authCallbacks = createAuthCallbacks(useSession, hashingFunctions);
