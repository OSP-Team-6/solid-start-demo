import { createAuthCallbacks } from '@solid-auth/server';
import { useSession } from 'vinxi/http';

export const authCallbacks = createAuthCallbacks(useSession);

//this had the server fucntions(login,logout etc)
