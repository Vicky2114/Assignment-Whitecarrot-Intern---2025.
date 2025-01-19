import "./App.css";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

function App() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [persistedSession, setPersistedSession] = useState(null);

  useEffect(() => {
    const storedSession = JSON.parse(localStorage.getItem("session"));
    if (storedSession) {
      setPersistedSession(storedSession);
    }
  }, []);

  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    }
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("session");
    setPersistedSession(null);
  };

  return (
    <div className="App">
      {session || persistedSession ? (
        <Dashboard
          session={session || persistedSession}
          onSignOut={handleSignOut}
        />
      ) : (
        <Login supabase={supabase} />
      )}
    </div>
  );
}

export default App;
