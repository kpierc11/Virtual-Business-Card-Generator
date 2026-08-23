import { createContext } from "react";

interface AuthContext {
  onLogin: () => void;
}

const AuthContext = createContext<AuthContext>({
  onLogin: () => {},
});

export default function AuthProvider({ children }: any) {
  return <AuthContext value={{ onLogin:()=>{} }}>{children}</AuthContext>;
}
