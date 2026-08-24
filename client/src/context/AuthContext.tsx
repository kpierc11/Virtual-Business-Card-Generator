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
  loggedIn: boolean;
}

export const AuthContext = createContext<AuthData>({
  onLogin: () => {},
  onLogout: () => {},
  onSignUp: () => {},
  loggedIn: false,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === "INITIAL_SESSION") {
        // handle initial session
      } else if (event === "SIGNED_IN") {
        // handle sign in event
      } else if (event === "SIGNED_OUT") {
        setLoggedIn(false);
        navigate("/", { replace: true });
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
      } else if (event === "USER_UPDATED") {
        // handle user updated event
      }
    });
    // call unsubscribe to remove the callback
    data.subscription.unsubscribe();
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
    <AuthContext.Provider value={{ onLogin, onLogout, onSignUp, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
