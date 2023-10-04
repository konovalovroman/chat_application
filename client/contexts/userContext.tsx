import { createContext, useState, useMemo, useContext, useEffect } from "react";
import api from "../api/api";

interface User {
    id: string
    username: string;
    hashtag: string;
}

interface UserContextValue {
    user: User | null;
    setUser: (user: User) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function useUser(): UserContextValue {
    const userContextValue = useContext(UserContext);
  
    if (userContextValue === null) {
      throw new Error("useUser must be used within a UserProvider");
    }
  
    return userContextValue;
  }

  

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
  
    const userContextValue: UserContextValue = useMemo(() => {
            return { user: user, setUser };
    }, [user, setUser]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const result = await api.get('/users/me');
            setUser(result.data.result);
        };
        fetchCurrentUser();
      }, []);
  
    return (
      <UserContext.Provider value={userContextValue}>
        {children}
      </UserContext.Provider>
    );
}