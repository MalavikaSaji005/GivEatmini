"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FilterSelect({ placeholder, options }: { placeholder: string; options: string[] }) {
  return (
    <Select>
      <SelectTrigger className="w-[150px] bg-background">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option.toLowerCase()}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
