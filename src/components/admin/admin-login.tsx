import { useState, type FormEvent, type ChangeEvent } from "react";
import { Loader, Lock, AlertCircle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  type: "success" | "error" | "info";
  text: string;
}

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setMessage({ type: "error", text: "Both fields are required" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        setMessage({ type: "success", text: "Login successful!" });
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else {
        setMessage({ type: "error", text: data.error || "Invalid credentials" });
      }
    } catch {
      setMessage({ type: "error", text: "Server connection error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-md p-6 space-y-6">
        <div className="flex flex-col items-center">
          <Lock className="w-12 h-12 text-primary mb-2" />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Access your dashboard</p>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md flex items-center gap-2 border text-sm ${
              message.type === "success"
                ? "bg-accent/20 border-accent text-accent-foreground"
                : message.type === "error"
                ? "bg-destructive/10 border-destructive/30 text-destructive"
                : "bg-card border-border text-foreground"
            }`}
          >
            {message.type === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
