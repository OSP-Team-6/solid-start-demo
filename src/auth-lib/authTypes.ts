export interface AuthCallbacks {
    getSession: () => Promise<Session>;
    login: (username: string, password: string) => Promise<User>;
    register: (username: string, password: string) => Promise<User>;
    logout: () => Promise<void>;
    validateUsername: (username: string) => string | null;
    validatePassword: (password: string) => string | null;
  }