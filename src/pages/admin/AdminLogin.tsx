import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Fetch } from "@/lib/fetch";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await Fetch.post("/admin/login", { email, password });

      if (res.data && res.data.accessToken) {
        Cookies.set("adminToken", res.data.accessToken, { expires: 1 });
        alert("Login berhasil!");
        navigate("/admin");
      } else {
        alert("Login gagal!");
      }
    } catch (err) {
      console.error(err);
      alert("Email atau password salah!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="bg-white dark:bg-[#100C0C] shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-red-600 dark:text-red-400 mb-2">
          Admin Login
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Masuk ke panel administrator Replas
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition"
              placeholder="admin@replas.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-md font-semibold shadow-md transition disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          © 2025 Replas Admin Panel. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
