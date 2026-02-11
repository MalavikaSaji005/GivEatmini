"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password);

      alert("Account created successfully ✅");

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
          Sign Up
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
          placeholder="Password (min 6 chars)"
          className="w-full border p-2 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 mb-3 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* Back to Login */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
