"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "@/components/FilterSelect";
import { FoodCard } from "@/components/FoodCard";
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

  const validDonations = useMemo(() => donatedFood.filter(item => new Date(item.expiryDate) > new Date()), [donatedFood]);
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">

      {/* Abstract Background Blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute top-40 -right-40 w-[500px] h-[500px] bg-orange-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

      {/* Content Wrapper */}
      <div className="relative z-10">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-6">
          <h1 className="text-2xl font-bold text-green-700">GivEat</h1>

          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>

            <Link href="/signup">
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
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>

            <Link href="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </section>

        {/* Nearby Donations Section (matches donate styling) 
        <section className="mt-16 px-6 max-w-6xl mx-auto">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Nearby Donations</h2>

            <div className="flex flex-wrap items-center gap-2">
              <FilterSelect placeholder="Type" options={["Free", "Paid"]} />
              <FilterSelect placeholder="Location" options={["Downtown", "Uptown", "Suburb"]} />
              <FilterSelect placeholder="Expiry" options={["Today", "Tomorrow", "This Week"]} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {validDonations.map((item) => (
              <div key={item.id} className="relative">
                {/* Expiry Alert 
                {new Date(item.expiryDate).getTime() - Date.now() < 1000 * 60 * 60 * 4 && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Expires Soon
                  </div>
                )}

                <FoodCard item={item} />

                {/* Extra Info Below Card 
                <div className="mt-2 text-sm px-2">
                  <p>⚠ Allergens: {item.allergens}</p>
                  <div className="mt-2">
                    <p className="font-medium">Reviews:</p>
                    {item.reviews.length === 0 && (
                      <p className="text-muted-foreground text-xs">No reviews yet</p>
                    )}
                    {item.reviews.map((review, index) => (
                      <div key={index} className="text-xs border-b py-1">
                        ⭐ {review.rating} – {review.comment}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>*/}

        {/* Abstract / About Section */}
        <section className="mt-32 px-6 pb-20 max-w-5xl mx-auto text-center">

          <h3 className="text-3xl font-semibold mb-8">
            Why GivEat?
          </h3>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Food wastage and hunger continue to be major social challenges in India.
            While large quantities of edible food are discarded daily from households,
            events, and food services, millions of people struggle to access proper meals.
            The absence of a trusted and efficient system to redistribute surplus food
            further worsens this problem.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-6">
            GivEat is a technology-based platform designed to connect surplus food donors
            with verified NGOs, homemakers, and individuals in need. The system enables
            real-time food listing, location-based matching, and expiry tracking to ensure
            timely and safe distribution.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            By providing a structured and reliable digital solution, GivEat enhances
            coordination between donors and receivers, improves accessibility, and
            strengthens food redistribution networks — contributing to sustainable
            development and hunger alleviation efforts across India.
          </p>

        </section>

      </div >

      {/* Floating Login/Signup Button */}
      < div className="fixed bottom-6 right-6" >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-14 w-14 rounded-full shadow-lg bg-accent hover:bg-accent/90">⋮</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[160px]">
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup">Sign Up</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div >
    </div >
  );
}
