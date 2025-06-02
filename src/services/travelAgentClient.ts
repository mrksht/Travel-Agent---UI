const API_URL =
  import.meta.env.VITE_ENV === "dev"
    ? "http://localhost:3000"
    : "https://travel-agent-langgraph-backend-production.up.railway.app";

interface QueryAgentRequest {
  message: string;
  threadId: number;
}

export const queryAgent = async ({ message, threadId }: QueryAgentRequest) => {
  try {
    const res = await fetch(`${API_URL}/agent/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, threadId }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Server responded with ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    return {
      text: data.response,
    };
  } catch (err) {
    console.error("Error:", err);
  }
};
