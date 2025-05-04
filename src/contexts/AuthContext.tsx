
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Mock authentication functions
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (email === "user@example.com" && password === "password") {
      const user = {
        id: '1',
        email: 'user@example.com',
        name: 'Test User',
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast({
        title: "Logged in successfully!",
        description: `Welcome back, ${user.name}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Incorrect email or password",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const user = {
      id: '1',
      email,
      name,
    };
    
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    
    toast({
      title: "Account created",
      description: "Your account has been created successfully!",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    });
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
