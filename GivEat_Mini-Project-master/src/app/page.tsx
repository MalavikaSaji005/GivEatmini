import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow">
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
      <section className="flex flex-col items-center text-center mt-24 px-4">

        <h2 className="text-4xl font-bold mb-4">
          Share More. Waste Less.
        </h2>

        <p className="text-muted-foreground mb-6 max-w-xl">
          GivEat connects food donors with people in need and helps reduce food waste.
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

    </div>
  );
}
