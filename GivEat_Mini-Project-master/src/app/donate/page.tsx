import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/Header";
import { FoodCard } from "@/components/FoodCard";
import type { FoodItem } from "@/lib/types";
import { Plus } from "lucide-react";

const donatedFood: FoodItem[] = [
  { id: 1, name: 'Fresh Bread Loaf', type: 'Free', expiry: '2 days', location: 'Downtown Cafe', imageUrl: 'https://placehold.co/600x400.png', description: 'A loaf of freshly baked sourdough bread.' },
  { id: 2, name: 'Vegetable Soup', type: 'Free', expiry: '1 day', location: 'Community Kitchen', imageUrl: 'https://placehold.co/600x400.png', description: 'Hearty and healthy vegetable soup for a family.' },
  { id: 3, name: 'Box of Apples', type: 'Free', expiry: '5 days', location: 'Green Grocers', imageUrl: 'https://placehold.co/600x400.png', description: 'A dozen fresh, crisp apples.' },
];

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Donate Food" />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Nearby Donations</h2>
            <div className="flex flex-wrap items-center gap-2">
              <FilterSelect placeholder="Type" options={['Free', 'Paid']} />
              <FilterSelect placeholder="Location" options={['Downtown', 'Uptown', 'Suburb']} />
              <FilterSelect placeholder="Expiry" options={['Today', 'Tomorrow', 'This Week']} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {donatedFood.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      <Button asChild className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-accent hover:bg-accent/90">
        <Link href="/donate/new">
          <Plus className="h-8 w-8" />
          <span className="sr-only">Post Donation</span>
        </Link>
      </Button>
    </div>
  );
}

function FilterSelect({ placeholder, options }: { placeholder: string, options: string[] }) {
  return (
    <Select>
      <SelectTrigger className="w-[150px] bg-background">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
