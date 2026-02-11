import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHeart, ShoppingBasket, Users } from "lucide-react";
import { Header } from "@/components/Header";

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
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Home" />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <Link href={item.href} key={item.title} className="group">
                <Card className="h-full transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl hover:border-primary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold text-primary font-headline">
                      {item.title}
                    </CardTitle>
                    <item.icon className="h-8 w-8 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
