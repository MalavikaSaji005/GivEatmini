"use client";

import { ChevronRight, Globe, Type, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "@/components/FilterSelect";
import { FoodCard } from "@/components/FoodCard";
import type { FoodItem } from "@/lib/types";
import { Plus, MapPin, User, SearchIcon, Settings } from "lucide-react";
import { GivEatLogo } from "@/components/GivEatLogo";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

/*const donatedFood: FoodItem[] = [
  {
    id: 1,
    name: "Fresh Home-cooked Biryani (5 portions)",
    type: "Free",
    expiryDate: new Date().toISOString().split("T")[0] + "T13:40:00",
    //blaaaaaaaaa
    location: "Downtown Heights",
    imageUrl: "/pictures/biryani.png"
    ,
    description: "Authentic Hyderabadi Biryani cooked with premium Basmati rice and fresh ingredients. Prepared in a clean home kitchen just an hour ago. Perfectly spiced and comes with Raita.",
    allergens: "Nuts, Dairy",
    reviews: [
      { user: "Anita", rating: 5, comment: "Very fresh!" }
    ]
  },
];*/

export default function DonatePage() {
  const [donations, setDonations] = useState<FoodItem[]>([]);

  const [location, setLocation] = useState<string>("Loading location...");
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
            );

            const data = await response.json();

            const city = data.address.city || data.address.town || data.address.village || "";
            const state = data.address.state || "";

            if (city && state) {
              setLocation(`${city}, ${state}`);
            } else if (city) {
              setLocation(city);
            } else {
              setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Location unavailable");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Location unavailable");
        }
      );
    } else {
      setLocation("Location not supported");
    }
  }, []);

  const validDonations = donations.filter(
    item => new Date(item.expiryDate) > new Date()
  );


  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDonations(prev =>
        prev.filter(item => new Date(item.expiryDate) > new Date())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (donations.length > 0) {
      setSelectedItem(donations[0]);
    } else {
      setSelectedItem(null);
    }
  }, [donations]);


  useEffect(() => {
    const fetchDonations = async () => {
      const res = await fetch("/api/donations");
      const data = await res.json();
      setDonations(data);
      setSelectedItem(data[0] || null);
    };

    fetchDonations();
  }, []);
  useEffect(() => {
    if (donations.length > 0) {
      setSelectedItem(donations[0]);
    } else {
      setSelectedItem(null);
    }
  }, [donations]);
  useEffect(() => {
    if (!selectedItem) return;

    const updateTimer = () => {
      const diff =
        new Date(selectedItem.expiryDate).getTime() - Date.now();

      setTimeLeft(diff > 0 ? diff : 0);
    };

    updateTimer(); // run immediately
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [selectedItem]);


  const formatTime = (ms: number) => {
    if (ms <= 0) return "Expired";

    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Eco-friendly Background with Radial Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(circle at center, 
              rgba(255, 255, 255, 0.95) 0%, 
              rgba(225, 235, 222, 0.9) 30%,
              rgba(199, 211, 196, 0.85) 60%,
              #C7D3C4 100%
            )
          `
        }}
      >
        {/* Subtle Organic Texture/Noise */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />

        {/* Faint Watercolor Green Overlays */}
        <div
          className="absolute top-10 right-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(199, 211, 196, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <div
          className="absolute bottom-32 left-10 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(199, 211, 196, 0.12) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-300/20 bg-white/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <GivEatLogo />
          <span className="text-xl font-semibold text-gray-700">Donate Food</span>
        </div>
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/80 shadow-sm hover:shadow-md hover:bg-white">
              <User className="h-5 w-5 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-2">
            <div className="px-4 py-3 border-b border-gray-200/50">
              <h3 className="text-lg font-bold text-gray-800">My Account</h3>
            </div>

            <DropdownMenuItem asChild className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100/50 rounded-lg my-1">
              <Link href="/profile" className="w-full flex items-center gap-3">
                <User className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium flex-1">Profile</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100/50 rounded-lg my-1">
              <Link href="/language" className="w-full flex items-center gap-3">
                <Globe className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium flex-1">Language</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100/50 rounded-lg my-1">
              <div className="w-full flex items-center gap-3">
                <Type className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium flex-1">Large Fonts</span>
                <div className="relative inline-flex h-6 w-10 rounded-full transition-colors bg-gray-300">
                  <button className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform" />
                </div>
              </div>
            </DropdownMenuItem>

            <div className="border-t border-gray-200/50 my-2" />

            <DropdownMenuItem asChild className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-red-50 rounded-lg my-1">
              <Link href="/logout" className="w-full flex items-center gap-3">
                <LogOut className="h-5 w-5 text-red-600" />
                <span className="text-red-600 font-medium">Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-12 max-w-7xl mx-auto relative z-10">
        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Nearby Donations</h2>
          <div className="flex flex-wrap items-center gap-2">
            <FilterSelect placeholder="Type" options={["Free", "Paid"]} />
            <FilterSelect placeholder="Location" options={["Downtown", "Uptown", "Suburb"]} />
            <FilterSelect placeholder="Expiry" options={["Today", "Tomorrow", "This Week"]} />
          </div>
        </div>

        {/* Two Column Layout - Image + Details */}
        {selectedItem && new Date(selectedItem.expiryDate) > new Date() && (

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Left - Image with Badge */}
              <div className="relative">
                <div className="relative h-96 w-full rounded-lg overflow-hidden">
                  <Image
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    AVAILABLE NOW
                  </div>
                </div>

                {/* Carousel Dots */}
                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-2 h-2 rounded-full bg-gray-600" />
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                  <div className="w-2 h-2 rounded-full bg-gray-400" />
                </div>

                {/* Claim Button */}
                <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-6 rounded-lg text-lg font-semibold">
                  Claim Donation
                </Button>
              </div>

              {/* Right - Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedItem.name}</h1>

                  {/* Location and Distance */}
                  <div className="flex items-center gap-2 mb-6 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span>0.5 km away • {selectedItem.location}</span>
                  </div>

                  {/* Expiry Alert */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="text-red-600 font-bold text-lg">ⓘ</div>
                      <div>
                        <p className="text-red-600 font-bold">
                          Expires in {formatTime(timeLeft)}
                        </p>

                        <p className="text-red-600 text-sm">Pickup by {new Date(selectedItem.expiryDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} today</p>
                      </div>
                    </div>
                  </div>

                  {/* Safety Alert - Allergens */}
                  <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-4 mb-6">
                    <p className="text-red-600 font-bold text-sm">⚠ SAFETY ALERT</p>
                    <p className="text-red-600 font-bold">ALLERGENS: {selectedItem.allergens}</p>
                  </div>

                  {/* Donor Info */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                      SK
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Shared by Sarah K.</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold text-gray-800">4.8</span>
                        <span className="text-gray-600 text-sm">(20 reviews)</span>
                      </div>
                    </div>
                    <Link href="#" className="ml-auto text-green-600 font-semibold hover:text-green-700">
                      View Profile
                    </Link>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedItem.description}
                  </p>

                  {/* Disclaimer */}
                  <p className="text-xs text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <span className="font-semibold">FOOD SAFETY DISCLAIMER</span> By claiming this donation, you acknowledge that GivEat is not responsible for any food-related illnesses. Please use your judgment and ratar.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Grid of Other Donations */}
        {validDonations.length > 1 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Other Available Donations</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {validDonations.slice(1).map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <FoodCard item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <Button
        asChild
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #6B8E6F 0%, #8BA888 100%)',
          border: '4px solid white'
        }}
      >
        <Link href="/donate/new">
          <Plus className="h-8 w-8 text-white" />
          <span className="sr-only">Post Donation</span>
        </Link>
      </Button>
    </div>
  );
}