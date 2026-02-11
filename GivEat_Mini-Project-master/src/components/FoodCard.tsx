import Image from "next/image";
import type { FoodItem } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

type FoodCardProps = {
  item: FoodItem;
};

export function FoodCard({ item }: FoodCardProps) {
  return (
    <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint="food meal"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold mb-2">{item.name}</CardTitle>
            <Badge variant={item.type === 'Free' ? 'secondary' : 'default'}>
                {item.type === 'Free' ? 'Free' : `$${item.price?.toFixed(2)}`}
            </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground bg-secondary/20 p-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>Expires: {item.expiry}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
