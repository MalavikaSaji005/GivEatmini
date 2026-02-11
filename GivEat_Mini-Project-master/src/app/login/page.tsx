"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful ✅");

      // Go to home
      router.push("/home");

    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f3e9]">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 mb-3 rounded hover:bg-green-700"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        {/* Go to Signup */}
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-green-700 font-semibold">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
