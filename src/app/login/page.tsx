"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const role = roleParam?.toLowerCase(); // ensure consistent comparison

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Authenticate user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2️⃣ Get Firestore user document
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      // 3️⃣ If Firestore document does not exist → create it
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          role: role,
          createdAt: new Date(),
        });

        router.push("/home");
        return;
      }

      const savedRole = userDoc.data().role?.toLowerCase();

      // 4️⃣ Validate role
      if (role && savedRole !== role) {
        alert(
          `This account is registered as ${savedRole}. Please use the correct login page.`
        );
        setLoading(false);
        return;
      }

      // 5️⃣ Success
      router.push("/home");

    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3e9] flex flex-col items-center justify-center px-6">

      <h1 className="text-3xl font-bold text-[#2c3e1f] mb-8 capitalize">
        Login {role && `as ${role}`}
      </h1>

      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">

        <input
          type="email"
          required
          placeholder="Email"
          className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          placeholder="Password"
          className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#4d6b2f] text-white rounded-lg hover:bg-[#3d5a26] transition"
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>

      <p className="text-sm mt-6">
        Don’t have an account?{" "}
        <Link
          href={`/signup?role=${role}`}
          className="text-[#4d6b2f] font-medium"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}