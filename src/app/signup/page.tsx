"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [role, setRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    setRole(searchParams.get("role"));
  }, [searchParams]);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!role) {
      router.push("/choose-role");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const name =
      role === "community"
        ? (formData.get("orgName") as string)
        : (formData.get("name") as string);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
  name,
  email,
  role: role?.toLowerCase(),
  createdAt: new Date(),
});

      alert("Account created successfully!");
      router.push("/home");
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("An account with this email already exists.");
      } else if (error.code === "auth/weak-password") {
        alert("Password must be at least 6 characters.");
      } else {
        alert(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f7f3e9] flex flex-col items-center justify-center px-6">

      <h1 className="text-3xl font-bold text-[#2c3e1f] mb-8 capitalize text-center">
        Create {role} Account
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">

        {/* ================= DONOR ================= */}
        {role === "donor" && (
          <>
            <input name="name" required placeholder="Full Name"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="email" type="email" required placeholder="Email"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="password" type="password" required placeholder="Password"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="phone" required placeholder="Phone Number"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="businessName" required placeholder="Business / Food Source Name"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="location" required placeholder="Location"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <select name="donorType" required
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white">
              <option value="">Select Donor Type</option>
              <option value="individual">Individual</option>
              <option value="restaurant">Restaurant</option>
              <option value="catering">Catering</option>
            </select>

            <input
              name="fssai"
              placeholder="FSSAI License (Optional)"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white"
            />
          </>
        )}

        {/* ================= BUYER ================= */}
        {role === "buyer" && (
          <>
            <input name="name" required placeholder="Full Name"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="email" type="email" required placeholder="Email"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="password" type="password" required placeholder="Password"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="phone" required placeholder="Phone Number"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="address" required placeholder="Delivery Address"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="familySize" type="number" required placeholder="Family Size"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />
          </>
        )}

        {/* ================= COMMUNITY ================= */}
        {role === "community" && (
          <>
            <input name="orgName" required placeholder="Organization Name"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="email" type="email" required placeholder="Official Email"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="password" type="password" required placeholder="Password"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="regID" required placeholder="Registration ID"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="contactPerson" required placeholder="Contact Person"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="phone" required placeholder="Phone Number"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />

            <input name="coverage" required placeholder="Coverage Area"
              className="w-full p-3 rounded-lg border border-[#d4cbb5] bg-white" />
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#4d6b2f] text-white rounded-lg hover:bg-[#3d5a26]"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </form>

      <p className="text-sm mt-6">
        Already have an account?{" "}
        <Link
          href={role ? `/login?role=${role}` : "/login"}
          className="text-[#4d6b2f] font-medium"
        >
          Login
        </Link>
      </p>

    </div>
  );
}