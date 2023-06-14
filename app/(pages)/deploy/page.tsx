import { Badge } from "@/components/ui/badge";
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
import { db } from "@/utils/Polybase";
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";

const getProviders = async () => {
  const collection = db.collection("Providers");
  const providers = await collection.get();

  return providers;
};

const uploadData = async () => {};

const Deploy = async () => {
  // TODO : Currently necessary to add margin top everywhere, need fix
  // TODO : Improving github repo feature

  const providers = await getProviders();

  return (
    <div className="mt-[200px] flex flex-col gap-10 w-[800px]">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-foreground">
          Let&lsquo;s build something new.
        </h1>

        <h3 className="text-foreground">
          To Deploy your app, use an existing template or upload your own model.
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        <Label className="text-foreground">App Name</Label>
        <Input placeholder="Your app name..." className="text-foreground" />
      </div>
      <div className="flex flex-col gap-3">
        <Label className="text-foreground">Description</Label>
        <Input
          placeholder="Your app description..."
          className="text-foreground"
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label className="text-foreground">Upload your model</Label>
        <div className="flex flex-row gap-5">
          {/* <Input id="model" type="file" className="file:bg-white" /> */}
          <>
            <Input
              className="text-background hidden"
              id="image-uploader"
              type="file"
              accept="image/*"
              // onChange={handleChange}
            />
            <label
              htmlFor="image-uploader"
              className="p-16 bg-background text-foreground text-center rounded-md border border-foreground/10 font-light text-sm cursor-pointer hover:bg-foreground/5 transition-all"
            >
              <i className="fa-solid fa-upload"></i>Upload / Drop Files
            </label>
          </>
          <div className="flex flex-col justify-between items-center">
            <Separator
              orientation="vertical"
              className="w-[1px] h-16 bg-foreground/10"
            />
            <span className="text-foreground/30">Or</span>
            <Separator
              orientation="vertical"
              className="w-[1px] h-16 bg-foreground/10"
            />
          </div>
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
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label className="text-foreground">Pick your Compute Provider</Label>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Pick your compute provider..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {providers.data.map((provider, i) => {
                return (
                  <CommandItem key={i}>
                    <div className="flex flex-row items-center justify-between">
                      <div>{provider.data.name}</div>
                      <div>
                        <Badge variant="outline">{provider.data.libp2p}</Badge>
                      </div>
                      <div></div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
      <Button>Deploy</Button>
    </div>
  );
};

export default Deploy;
