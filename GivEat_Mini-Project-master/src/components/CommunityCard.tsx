import Image from "next/image";
import type { CommunityMember } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { MapPin, UserCheck } from "lucide-react";

type CommunityCardProps = {
  member: CommunityMember;
};

export function CommunityCard({ member }: CommunityCardProps) {
  return (
    <Card className="flex flex-col justify-between text-center shadow-md transition-shadow hover:shadow-xl">
      <CardHeader>
        <Avatar className="mx-auto h-24 w-24 border-4 border-primary/20">
          <AvatarImage src={member.avatarUrl} alt={member.name} data-ai-hint="person portrait" />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="text-lg font-bold">{member.name}</h3>
        <div className="flex items-center justify-center gap-2 text-sm text-primary">
            <UserCheck className="h-4 w-4" />
            <p>{member.role}</p>
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            <span>{member.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button className="w-full font-bold">Connect</Button>
      </CardFooter>
    </Card>
  );
}
