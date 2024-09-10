import { createContext, useContext, createSignal } from "solid-js";
//import { AuthCallbacks } from "./authTypes";
import { authCallbacks } from "./authCallbacks";

interface AuthContextType {
  user: () => User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: () => string | null;
}

const AuthContext = createContext<AuthContextType>();

export const AuthProvider = (props) => {
  const [user, setUser] = createSignal<User | null>(null);
  const [error, setError] = createSignal<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const user = await authCallbacks.login(username, password);
      setUser(user);
      setError(null);
      // Navigate to dashboard or desired route
    } catch (err) {
      setError(err.message);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const user = await authCallbacks.register(username, password);
      setUser(user);
      setError(null);
      // Navigate to dashboard or desired route
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = async () => {
    await authCallbacks.logout();
    setUser(null);
    setError(null);
    // Navigate to login page
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);