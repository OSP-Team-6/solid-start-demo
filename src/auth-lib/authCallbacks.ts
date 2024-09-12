import { db } from '../lib/db';
import { Session, User, AuthCallbacks } from './authTypes'; // Define these types accordingly

export const authCallbacks: AuthCallbacks = {
  //   getSession: async () => {
  //     // Your existing getSession logic
  //   },
  login: async (username: string, password: string) => {
    const user = await db.user.findUnique({ where: { username } });
    if (!user || password !== user.password) throw new Error('Invalid login');
    return { ...user, id: user.id.toString() };
  },
  register: async (username: string, password: string) => {
    console.log('hit correct register function');
    const existingUser = await db.user.findUnique({ where: { username } });
    if (existingUser) throw new Error('User already exists');
    return db.user.create({
      data: { username: username, password },
    });
  },
  //   logout: async () => {
  //     // Your existing logout logic
  //   },
  //   validateUsername: (username) => {
  //     // Your existing validateUsername logic
  //   },
  //   validatePassword: (password) => {
  //     // Your existing validatePassword logic
  //   },
};
