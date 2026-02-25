"use client";

import { useRouter } from "next/navigation";

export default function ChooseRole() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f7f3e9] flex flex-col items-center justify-center px-6">

      <h1 className="text-4xl font-bold text-[#2c3e1f] mb-12">
        Join GivEat As
      </h1>

      <div className="flex flex-col md:flex-row gap-6">

        <button
          onClick={() => router.push("/auth?role=donor")}
          className="px-10 py-4 bg-[#4d6b2f] text-white rounded-xl hover:bg-[#3d5a26] transition"
        >
          Donate Food
        </button>

        <button
          onClick={() => router.push("/auth?role=buyer")}
          className="px-10 py-4 bg-[#4d6b2f] text-white rounded-xl hover:bg-[#3d5a26] transition"
        >
          Buy Food
        </button>

        <button
          onClick={() => router.push("/auth?role=community")}
          className="px-10 py-4 bg-[#4d6b2f] text-white rounded-xl hover:bg-[#3d5a26] transition"
        >
          Community
        </button>

      </div>
    </div>
  );
}