import { createStorage } from 'unstorage';
import fsLiteDriver from 'unstorage/drivers/fs-lite';

type User = {
  id: number;
  username: string;
  password?: string;
  email?: string;
  provider?: string;
};

const storage = createStorage({
  driver: fsLiteDriver({
    base: './.data',
  }),
});
storage.setItem('users:data', [
  { id: 0, username: 'kody', password: 'twixrox' },
]);
storage.setItem('users:counter', 1);

export const db = {
  user: {
    async create({ data }: { data: { username: string; password?: string; email?: string; provider?: string } }) {
      const [{ value: users }, { value: index }] = await storage.getItems([
        'users:data',
        'users:counter',
      ]);
      const user = { ...data, id: index as number };
      await Promise.all([
        storage.setItem('users:data', [...(users as User[]), user]),
        storage.setItem('users:counter', (index as number) + 1),
      ]);
      return user;
    },
    async findUnique({
      where: { username, id, email },
    }: {
      where: { username?: string; id?: number; email?: string };
    }) {
      const users = (await storage.getItem('users:data')) as User[];
      if (id !== undefined) {
        return users.find((user) => user.id === id);
      } else if (email !== undefined) {
        return users.find((user) => user.email === email);
      } else {
        return users.find((user) => user.username === username);
      }
    },
    async update({ where, data }: { where: { id: number }; data: Partial<User> }) {
      const users = (await storage.getItem('users:data')) as User[];
      const userIndex = users.findIndex((user) => user.id === where.id);

      if (userIndex === -1) {
        throw new Error(`User with ID ${where.id} not found`);
      }

      // Update the user's data
      users[userIndex] = { ...users[userIndex], ...data };

      // Save the updated users array back to storage
      await storage.setItem('users:data', users);

      return users[userIndex]; // Return the updated user
    },
  },
};
