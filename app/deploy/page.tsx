import { Button } from "@/components/ui/button";
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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const Deploy = () => {
  // TODO : Currently necessary to add margin top everywhere, need fix
  // TODO : Improving github repo feature
  return (
    <div className="mt-[200px] flex flex-col gap-10 w-[800px]">
      <h1 className="text-4xl font-bold">Let&lsquo;s build something new.</h1>

      <h3>
        To Deploy your app, import an existing Git Repository, upload your model
        or get started with one of our templates.
      </h3>
      <Input placeholder="Your app name..." />
      <Input placeholder="Your app description..." />
      <div className="flex flex-row gap-5">
        <Input id="model" type="file" />
        <Separator orientation="vertical" />
        <Command>
          <CommandInput placeholder="Pick your model from the templates..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Profile</CommandItem>
              <CommandItem>Billing</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <Command>
        <CommandInput placeholder="Pick your compute provider..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Favourites">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Suggestions">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <Button>Deploy</Button>
    </div>
  );
};

export default Deploy;
