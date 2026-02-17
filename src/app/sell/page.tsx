import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/Header";
import { FoodCard } from "@/components/FoodCard";
import type { FoodItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

const homemadeFood: FoodItem[] = [
  { id: 1, name: 'Homemade Lasagna', type: 'Paid', price: 15.00, rating: 4.8, expiry: '3 days', location: 'Maria\'s Kitchen', imageUrl: 'https://placehold.co/600x400.png', description: 'Classic beef lasagna with rich tomato sauce and cheese.' },
  { id: 2, name: 'Vegan Curry', type: 'Paid', price: 12.50, rating: 4.9, expiry: '2 days', location: 'Raj\'s Vegan Delights', imageUrl: 'https://placehold.co/600x400.png', description: 'Aromatic and spicy chickpea and spinach curry.' },
  { id: 3, name: 'Chocolate Cake', type: 'Paid', price: 20.00, rating: 5.0, expiry: '4 days', location: 'Sweet Treats by Amy', imageUrl: 'https://placehold.co/600x400.png', description: 'Decadent, moist chocolate fudge cake by the slice.' },
  { id: 4, name: 'Artisan Pizza', type: 'Paid', price: 18.00, rating: 4.7, expiry: '1 day', location: 'Luigi\'s Pizzeria', imageUrl: 'https://placehold.co/600x400.png', description: 'Wood-fired pizza with premium toppings.' },
];

export default function SellPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Sell Homemade Food" />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Homemade Meals</h2>
            <div className="flex w-full sm:w-auto flex-wrap items-center gap-2">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search meals..." className="pl-8 sm:w-[200px] lg:w-[300px] bg-background"/>
              </div>
              <FilterSelect placeholder="Price" options={['Under $10', '$10 - $20', 'Over $20']} />
              <FilterSelect placeholder="Rating" options={['5 Stars', '4+ Stars', '3+ Stars']} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {homemadeFood.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      <Button asChild className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-accent hover:bg-accent/90">
        <Link href="/sell/new">
          <Plus className="h-8 w-8" />
          <span className="sr-only">Post Food</span>
        </Link>
      </Button>
    </div>
  );
}

function FilterSelect({ placeholder, options }: { placeholder: string, options: string[] }) {
  return (
    <Select>
      <SelectTrigger className="w-full sm:w-[150px] bg-background">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => <SelectItem key={option} value={option.toLowerCase()}>{option}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
