import Link from "next/link";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

type GivEatLogoProps = {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
};

export function GivEatLogo({ className, textClassName, iconClassName }: GivEatLogoProps) {
  return (
    <Link href="/home" className={cn("flex items-center gap-2", className)}>
      <Leaf className={cn("h-6 w-6 text-primary", iconClassName)} />
      <span className={cn("text-2xl font-bold font-headline text-primary", textClassName)}>
        GivEat
      </span>
    </Link>
  );
}
