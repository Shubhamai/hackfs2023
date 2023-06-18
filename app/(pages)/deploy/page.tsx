"use client";

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
import { useEffect, useState } from "react";
import { CommandBox } from "./command";
import { db, getProviders } from "@/utils/Polybase";
import { NFTStorage, File, Blob } from "nft.storage";
import { ArrowLeft, Dot, Loader } from "lucide-react";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";

const uploadData = () => {};

const Deploy = () => {
  // TODO : Currently necessary to add margin top everywhere, need fix
  // TODO : Improving github repo feature

  const [providers, setProviders] = useState({ data: [] });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState<any>(null);
  const [choice, setChoice] = useState("");
  const [rdr, setRDR] = useState("");
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [deployText, setDeployText] = useState("Deploy");

  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProviders();
      setProviders(data);
    };

    fetchData();
  }, []);

  const onFormSubmit = async () => {
    setUploadInProgress(true);
    setDeployText("Deploying");

    const data = {
      name,
      description,
      model: model || choice,
      provider: rdr,
    };

    let inputOutputData;

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      inputOutputData = event.target.result.split("\n").shift().slice(1);
      // const inputOutputData = JSON.parse(firstLine);
    });
    for (let fileIndex = 0; fileIndex < model.length; fileIndex++) {
      if (model[fileIndex].name.endsWith(".py")) {
        reader.readAsText(model[fileIndex]);
      }
    }

    const cid = await client.storeDirectory(model);

    const collection = db.collection("Deployments");

    const recordData = await collection.create([
      nanoid(),
      name,
      description,
      cid,
      inputOutputData,
      true, //is_custom
      rdr, //provider
    ]);

    setUploadInProgress(false);
    setDeployText("Deploy");
  };

  return (
    <div className="mt-[150px] flex gap-10">
      <div className="bg-foreground/5 p-6 rounded-md border border-border shadow shadow-foreground/60 w-xl">
        <div className="flex flex-col gap-2 w-full mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-foreground/70 to-foreground">
            Let&lsquo;s build something new.
          </h1>
          <h3 className="text-sm text-foreground/60">
            To Deploy your app, use an existing template or upload your own
            model.
          </h3>
        </div>

        <div className="flex flex-col gap-10 items-center justify-between">
          <div className="flex flex-col gap-3 w-full">
            <Label className="text-foreground">App Name</Label>
            <Input
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Your app name..."
              className="text-foreground"
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Label className="text-foreground">Description</Label>
            <Input
              name="description"
              placeholder="Your app description..."
              className="text-foreground"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Label className="text-foreground">Upload your model</Label>
            <div className="flex flex-row gap-5">
              {/* <Input id="model" type="file" className="file:bg-white" /> */}
              <>
                <Input
                  className="text-background hidden"
                  id="file-uploader"
                  // name="model"
                  // value={model}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      // const File = e.target.files[0];
                      setModel(e.target.files);
                      // console.log(e.target.value);
                    } else {
                      console.log("no files");
                    }
                  }}
                  type="file"
                  accept="*"
                  multiple
                  required
                  // onChange={handleChange}
                />
                <label
                  htmlFor="file-uploader"
                  className="p-16 bg-background text-foreground text-center rounded-md border border-foreground/10 font-light text-sm cursor-pointer hover:bg-foreground/5 transition-all w-full"
                >
                  <i className="fa-solid fa-upload"></i>
                  {model ? `File uploaded :)` : "Upload / Drop Files"}
                </label>
              </>
              {/* <div className="flex flex-col justify-between items-center">
            <Separator
              orientation="vertical"
              className="w-[1px] h-16 bg-foreground/10"
            />
            <span className="text-foreground/30">Or</span>
            <Separator
              orientation="vertical"
              className="w-[1px] h-16 bg-foreground/10"
            />
          </div> */}
              {/* <Command
            className="rounded-lg border shadow-md"
            value={choice}
            onValueChange={setChoice}
          >
            <CommandInput placeholder="Pick your model from the templates..." />

            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Vicuna 13b</CommandItem>
                <CommandItem>Tortoise TTS</CommandItem>
                <CommandItem>Stable Diffusion</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command> */}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="text-foreground">
              Pick your Compute Provider
            </Label>

            <Command
              className="rounded-lg border shadow-md"
              value={rdr}
              onValueChange={setRDR}
            >
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
                            <Badge variant="outline">
                              {provider.data.libp2p}
                            </Badge>
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

          <Button onClick={onFormSubmit} className="w-full items-center">
            {deployText}{" "}
            {uploadInProgress ? (
              <Loader className="ml-4 animate-spin" />
            ) : (
              <></>
            )}
          </Button>
        </div>
      </div>

      <div>
        <p className={cn(hintClassName, "mt-96")}>
          <ArrowLeft className="w-4 h-4" /> this your model file, it should end
          with `.model`
        </p>

        <p className={cn(hintClassName, "mt-56")}>
          <ArrowLeft className="w-4 h-4" /> the compute provides will provide
          compute for your model, using LIP2kb
        </p>

        <p className={cn(hintClassName, "mt-44")}>
          <ArrowLeft className="w-4 h-4" /> the model will be deployed on IPFS,
          and the providers will provide compute
        </p>
      </div>
    </div>
  );
};

export default Deploy;

const hintClassName =
  "flex items-center gap-1 font-mono italic text-sm text-foreground/80 transition-all hover:text-foreground";
