"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { FoodItem } from "@/lib/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function LandingPage() {
  const donatedFood: FoodItem[] = useMemo(() => ([
    {
      id: 1,
      name: "Fresh Bread Loaf",
      type: "Free",
      expiryDate: "2026-02-16T18:00",
      location: "Downtown Cafe",
      imageUrl: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
      description: "Fresh sourdough bread.",
      allergens: "Gluten",
      reviews: [{ user: "Anita", rating: 5, comment: "Very fresh!" }],
    },
    {
      id: 2,
      name: "Vegetable Soup",
      type: "Free",
      expiryDate: "2026-02-15T20:00",
      location: "Community Kitchen",
      imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554",
      description: "Healthy vegetable soup.",
      allergens: "None",
      reviews: [],
    },
  ]), []);

  const validDonations = useMemo(
    () => donatedFood.filter(item => new Date(item.expiryDate) > new Date()),
    [donatedFood]
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="relative z-10">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-6">
          <h1 className="text-2xl font-bold text-green-700">GivEat</h1>

          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>

            {/* UPDATED */}
            <Link href="/choose-role">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center px-6 mt-24 max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Share More. <span className="text-green-600">Waste Less.</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
            A digital platform connecting surplus food donors with verified NGOs
            and individuals in need — reducing food waste while fighting hunger
            across India.
          </p>

          <div className="flex gap-4">
            {/* UPDATED */}
            <Link href="/choose-role">
              <Button size="lg">Get Started</Button>
            </Link>

            <Link href="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="mt-32 px-6 pb-20 max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8">
            Why GivEat?
          </h3>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Food wastage and hunger continue to be major social challenges in India.
            While large quantities of edible food are discarded daily, millions of
            people struggle to access proper meals.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            GivEat connects surplus food donors with verified NGOs and
            individuals in real-time — ensuring efficient and safe redistribution.
          </p>
        </section>
      </div>

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-14 w-14 rounded-full shadow-lg bg-accent hover:bg-accent/90">⋮</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[160px]">
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              {/* UPDATED */}
              <Link href="/choose-role">Sign Up</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}