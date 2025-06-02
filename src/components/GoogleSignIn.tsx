// components/GoogleSignIn.tsx
import { useCallback, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { googleSignIn } from "../services/authClient";

const GoogleSignIn = () => {
  const { login } = useAuth();

  const handleCredentialResponse = useCallback(
    async (response: any) => {
      try {
        const res = await googleSignIn(response.credential);
        login(res.user);
      } catch (error: any) {
        console.error("Failed to authenticate", error);
      }
    },
    [login]
  );

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("gsi-button")!,
        { theme: "outline", size: "large" }
      );
    }
  }, [handleCredentialResponse]);

  return <div id="gsi-button"></div>;
};

export default GoogleSignIn;
