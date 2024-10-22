import { createAuthCallbacks } from '@solid-auth/solidstart-auth-backend';
import { useSession } from 'vinxi/http';
import bcrypt from 'bcrypt';

// Example: Without hashing library
// export const authCallbacks = createAuthCallbacks(useSession);

// Example: With hashing library
export const authCallbacks = createAuthCallbacks(useSession, bcrypt);
