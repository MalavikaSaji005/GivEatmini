//`/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, ShoppingBasket, Users, MapPin, Bell, User, Search, Headphones, ChevronRight, LogOut, Globe, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GivEatLogo } from "@/components/GivEatLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  {
    title: "Donate Food",
    icon: HandHeart,
    href: "/donate",
    description: "Share your surplus food with those in need.",
  },
  {
    title: "Sell Homemade Food",
    icon: ShoppingBasket,
    href: "/sell",
    description: "Share your culinary creations with the community.",
  },
  {
    title: "Community Connect",
    icon: Users,
    href: "/community",
    description: "Connect with NGOs, shelters, and volunteers.",
  },
];

export default function HomePage() {
  const [location, setLocation] = useState<string>("Loading location...");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Use reverse geocoding to get location name
            const response = await fetch(
              `/api/reverse-geocode?lat=${latitude}&lon=${longitude}`);
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

        {/* Soft Curved Wave Shapes at Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 320"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              fill="rgba(255, 255, 255, 0.2)"
              d="M0,160L48,165.3C96,171,192,181,288,165.3C384,149,480,107,576,112C672,117,768,171,864,181.3C960,192,1056,160,1152,138.7C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
            <path
              fill="rgba(199, 211, 196, 0.15)"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Header with Logo and Actions */}
      <div className="flex items-center justify-between p-6 border-b border-gray-300/20 bg-white/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <GivEatLogo />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-white/80 shadow-sm hover:shadow-md hover:bg-white">
            <Search className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-white/80 shadow-sm hover:shadow-md hover:bg-white">
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
      </div>

      {/* Main Content */}
      <div className="p-6 md:p-12 max-w-7xl mx-auto relative z-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-700 mb-2">Hello, User! 👋</h1>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        {/* Menu Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.title}>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                <CardHeader className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-gray-700 mb-3">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {item.description}
                      </CardDescription>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <item.icon className="h-10 w-10 text-green-700" />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Contact Us Button - Matching the Image */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          className="h-16 w-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center border-4 border-white"
          style={{
            background: 'linear-gradient(135deg, #6B8E6F 0%, #8BA888 100%)'
          }}
        >
          <Headphones className="h-7 w-7 text-white" strokeWidth={2.5} />
          <span className="sr-only">Contact Us</span>
        </Button>
      </div>
    </div>
  );
}