"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export const CommandBox = () => {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Pick your model from the templates..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Vicuna 13b</CommandItem>
          <CommandItem>Tortoise TTS</CommandItem>
          <CommandItem>Stable Diffusion</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
