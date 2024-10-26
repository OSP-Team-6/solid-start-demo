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

  let user;

  if (username && password) {
    user = await db.user.create({ data: { username, password } });
  } else if (email && provider) {
    const derivedUsername = email.split('@')[0]; 
    user = await db.user.create({ data: { email, provider, username: derivedUsername } });
  } else {
    throw new Error("Either username/password or email/provider must be provided");
  }
  
  // Set the user ID in the session directly after creation
  const session = await authCallbacks.getSession();
  await session.update((data) => {
    data.userId = user.id.toString();
  });

  return {
    id: user.id,
    username: user.username || 'defaultUsername',
    password: '',  // No password in OAuth case, return an empty string
    email: user.email,
    provider: user.provider || undefined,
  };
};

export const getUser = cache(async () => {
  'use server';
  try {
    const session = await authCallbacks.getSession();
    const userId = session.data.userId; // Keep as a string
  
    if (!userId) throw new Error('User ID not found in session');
  
    const user = await db.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new Error('User not found');
    
    return { id: user.id, username: user.username || 'Unknown User' }; 
  } catch (error) {
    console.error(error); // Log the error for debugging
    await authCallbacks.logout();
    return redirect('/login');
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
    let user: User;
    if (loginType !== 'login') {
      user = await callbacks.register(
        username,
        password,
        userLookupFunction,
        userCreateFunction
      );
      // Log in the user right after registration
      await callbacks.login(username, password, userLookupFunction);
    } else {
      user = await callbacks.login(username, password, userLookupFunction);
    }
    
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

export const updateUser = action(async (formData: FormData) => {
  'use server';
  const username = String(formData.get('username'));

  const session = await authCallbacks.getSession();
  console.log('Session', session);
  console.log('Session Data:', session.data);
  const userId = session.data.userId;
  
  if (!userId) {
    console.error('Session Data if no user ID:', session.data);
    throw new Error("User ID not found in session");
  };

  // Update user's username in the database
  await (db.user as any).update({ // Using 'any' as a type assertion
    where: { id: userId },
    data: { username },
  });

  return redirect('/');
});
