import { createClient } from "@supabase/supabase-js";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export interface AuthData {
  onLogin: (event: any, email: string, password: string) => any;
  onLogout: () => void;
  onSignUp: (event: any, email: string, password: string) => any;
  getUser: () => void;
  loggedIn: boolean;
}

export const AuthContext = createContext<AuthData>({
  onLogin: () => {},
  onLogout: () => {},
  onSignUp: () => {},
  getUser: () => {},
  loggedIn: false,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    getUser();
  }, []);

  const navigate = useNavigate();

  const onLogin = async (event: any, email: string, password: string) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.log(error);
      } else {
        setLoggedIn(true);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log(error);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigate("/login", { replace: true });
    }
  };

  const onSignUp = async (
    event: SubmitEvent,
    email: string,
    password: string,
  ) => {
    event.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "https://example.com/welcome",
      },
    });
    if (error) {
      console.log(error.message);
    } else {
      navigate("/dashboard", { replace: true });
    }

    setLoading(false);
  };

  async function getUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.log(error);
        setLoggedIn(false);
        navigate("/", { replace: true });
      } else {
        setLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <>
        <div className="w-[100%] h-[400px] mt-20 flex flex-col justify-center items-center">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ onLogin, onLogout, onSignUp, getUser, loggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}
