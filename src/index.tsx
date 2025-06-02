// App.tsx
import { useAuth } from "./hooks/useAuth";
import GoogleSignIn from "./components/GoogleSignIn";
import App from "./App";

function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? <App /> : <GoogleSignIn />}
    </div>
  );
}

export default Index;