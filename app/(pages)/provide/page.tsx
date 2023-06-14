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

const Provide = () => {
  const { address, connector, isConnected } = useAccount();

  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    const collection = db.collection("Providers");

    const recordData = await collection.create([
      nanoid(),
      e.target.name.value,
      e.target.libp2p.value,
    ]);
  };

  return (
    <div className="mt-[200px] flex flex-col gap-10 w-[800px]">
      <h1 className="font-extrabold text-3xl text-foreground">
        Become a Provider
      </h1>

      <form onSubmit={onFormSubmit} className="flex flex-col gap-10">
        <div className="grid w-full max-w-sm items-center gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-foreground">
              Name
            </Label>
            <Input id="name" className="text-foreground" required></Input>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="libp2p" className="text-foreground">
              Libp2p Link
            </Label>
            <Input id="libp2p" className="text-foreground" required></Input>
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
