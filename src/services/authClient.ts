const API_URL =
  import.meta.env.VITE_ENV === "dev"
    ? "http://localhost:3000"
    : "https://travel-agent-langgraph-backend-production.up.railway.app";

export const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/agent/user`, {
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error:", err);
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_URL}/agent/logout`, {
      credentials: "include",
      method: "POST",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

export const googleSignIn = async (credential: string) => {
  try {
    const response = await fetch(`${API_URL}/agent/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ credential }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data
  } catch (err) {
    console.error("Error:", err);
  }
};
