import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('proppulse_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signup = async (userData: any): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('proppulse_users') || '[]');
      const userExists = existingUsers.find((u: any) => u.email === userData.email);
      
      if (userExists) {
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        company: userData.company
      };

      // Save to users list
      existingUsers.push(newUser);
      localStorage.setItem('proppulse_users', JSON.stringify(existingUsers));

      // Set current user
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('proppulse_user', JSON.stringify(newUser));

      return true;
    } catch (error) {
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('proppulse_users') || '[]');
      const user = existingUsers.find((u: any) => u.email === email);
      
      if (!user) {
        return false;
      }

      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('proppulse_user', JSON.stringify(user));

      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('proppulse_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};