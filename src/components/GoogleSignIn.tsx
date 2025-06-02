import { useCallback, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { googleSignIn } from "../services/authClient";
import { LogIn } from "lucide-react";
import "../styles/GoogleSignIn.css";

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
        {
          theme: "outline",
          size: "large",
          type: "standard",
          shape: "rectangular",
          text: "continue_with",
          logo_alignment: "left",
        }
      );
    }
  }, [handleCredentialResponse]);

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-logo">
          <LogIn size={36} strokeWidth={1.5} className="logo-icon" />
        </div>
        <h1 className="signin-title">Welcome</h1>
        <p className="signin-subtitle">
          Sign in to continue to the application
        </p>
        <div className="signin-button-container">
          <div id="gsi-button" className="gsi-button-wrapper"></div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSignIn;
