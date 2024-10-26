import { action, cache, redirect } from '@solidjs/router';
import { db } from './db';
import { AuthCallbacks, User } from '@solid-auth/solidstart-auth-backend';
import { authCallbacks } from './server';

// This file runs on the server. These are basically auth server functions. Could be called authServer.ts.
const userLookupFunction: (username: string) => Promise<User | undefined> = async (username) => {
  'use server'
  const user = await db.user.findUnique({ where: { username } });
  return user ? {
    id: user.id,
    username: user.username || '', // Ensure username is always a string
    password: user.password || '', // Ensure password is always a string
    email: user.email || undefined,
    provider: user.provider || undefined,
  } : undefined;
};

const userCreateFunction = async (
  username: string, 
  password?: string, 
  email?: string, 
  provider?: string
): Promise<User> => {
  'use server';

  if (username && password) {
    const user = await db.user.create({ data: { username, password } });
    return {
      id: user.id,
      username: user.username || 'defaultUsername',
      password: user.password || '',  // Ensure password is always a string
      email: user.email,
      provider: user.provider || undefined,
    };
  }

  if (email && provider) {
    const derivedUsername = email.split('@')[0]; 
    const user = await db.user.create({ data: { email, provider, username: derivedUsername } });
    return {
      id: user.id,
      username: user.username || 'defaultUsername',
      password: '',  // No password in OAuth case, return an empty string
      email: user.email,
      provider: user.provider || undefined,
    };
  }

  throw new Error("Either username/password or email/provider must be provided");
};

export const getUser = cache(async () => {
  'use server';
  try {
    const session = await authCallbacks.getSession();
    //might need to have userID be string
    const userId = Number(session.data.userId);

    if (userId === undefined) throw new Error('User not found');
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
return { id: user.id, username: user.username || 'Unknown User' }; // Provide a fallback
  } catch {
    await authCallbacks.logout();
    redirect('/login');
  }
}, 'user');

export const loginOrRegister = action(async (formData: FormData) => {
  'use server';
  return performLoginOrRegister(formData, authCallbacks);
});

async function performLoginOrRegister(
  formData: FormData,
  callbacks: AuthCallbacks
) {
  'use server';
  const username = String(formData.get('username'));
  const password = String(formData.get('password'));
  const loginType = String(formData.get('loginType'));

  let error =
    callbacks.validateUsername(username) ||
    callbacks.validatePassword(password);
  if (error) return new Error(error);

  try {
    const user = await (loginType !== 'login'
      ? callbacks.register(
          username,
          password,
          userLookupFunction,
          userCreateFunction
        )
      : callbacks.login(username, password, userLookupFunction));
    const session = await callbacks.getSession();
    await session.update((d) => {
      d.userId = user.id.toString();
    });
  } catch (err) {
    return err as Error;
  }

  return redirect('/');
}

export const logout = action(async () => {
  'use server';
  await authCallbacks.logout();
  return redirect('/login');
});
