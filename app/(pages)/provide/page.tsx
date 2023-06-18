"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usercontractabi from "../../../fevm-data-dao-kit/deployments/Calibration/SimpleCoin.json";
import { usePrepareContractWrite } from "wagmi";
import * as React from "react";
import { useAccount } from "wagmi";
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { db } from "@/utils/Polybase";
import { nanoid } from "nanoid";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

const Provide = () => {
  const { address, connector, isConnected } = useAccount();
  const router = useRouter()

  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    const collection = db.collection("Providers");

    const recordData = await collection.create([
      nanoid(),
      e.target.name.value,
      e.target.description.value,
      e.target.libp2p.value,
    ]);

    router.push("/providers");
  };

  return (
    <div className="mt-[300px] flex flex-col gap-20 items-center justify-center">
      <div className="flex flex-col gap-5">
        <h1 className="font-extrabold text-3xl text-foreground text-center">
          Become a Provider
        </h1>
        <h3 className="font-light text-base text-foreground/60 text-center">
          Provide your name and libp2p link to become a provider.
        </h3>
      </div>
      <form
        onSubmit={onFormSubmit}
        className="flex flex-col gap-10 items-center justify-center"
      >
        <div className="grid w-full max-w-sm items-center gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-foreground">
              Name
            </Label>
            <Input id="name" className="text-foreground" placeholder="Home Server" required></Input>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-foreground">
              Description
            </Label>
            <Textarea id="description" className="text-foreground" placeholder="Nvidia A100 40GB" required></Textarea>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="libp2p" className="text-foreground">
              Libp2p Link
            </Label>
            <Input id="libp2p"  placeholder="/ip4/192.0.2.0/tcp/61790/ipfs/QmZKjsGJ6ukXVRXVEcExx9GhiyWoJC97onYpzBwCHPWqpL" className="text-foreground" required></Input>
          </div>
        </div>

        <Button type="submit" className="w-96">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Provide;
