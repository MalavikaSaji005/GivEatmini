"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function AuthChoice() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get("role");

  return (
    <div className="min-h-screen bg-[#f7f3e9] flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-[#2c3e1f] mb-10 capitalize">
        {role} Access
      </h1>

      <div className="flex flex-col gap-6">

        <button
          onClick={() => router.push(`/login?role=${role}`)}
          className="px-10 py-4 bg-[#4d6b2f] text-white rounded-xl hover:bg-[#3d5a26] transition"
        >
          Login as {role}
        </button>

        <button
          onClick={() => router.push(`/signup?role=${role}`)}
          className="px-10 py-4 bg-[#4d6b2f] text-white rounded-xl hover:bg-[#3d5a26] transition"
        >
          Create {role} Account
        </button>

      </div>
    </div>
  );
}