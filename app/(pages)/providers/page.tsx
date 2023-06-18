"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProviders } from "@/utils/Polybase";
import { Star } from "lucide-react";
import Link from "next/link";
import { useAccount, usePrepareContractWrite, useWalletClient } from "wagmi";
import usercontractabi from "../../../fevm-data-dao-kit/deployments/Calibration/SimpleCoin.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BuyCompute } from "./BuyCompute";

const Providers = () => {
  const [providers, setProviders] = useState([]);

  const { config } = usePrepareContractWrite({
    address: usercontractabi.address,
    abi: usercontractabi.abi,
    functionName: "SimpleCoin",
  });

  useEffect(() => {
    getProviders().then((prs) => {
      setProviders(prs.data);
    });
  }, []);

  const { address, connector, isConnected } = useAccount();
  const signer = useWalletClient();

  const payProvider = () => {
    console.log("Pay Provider");

    // const { data: ensAvatar } = useEnsAvatar({ address })
    // const { data: ensName } = useEnsName({ address })
    // const { connect, connectors, error, isLoading, pendingConnector } =
    //   useConnect()
    // const { disconnect } = useDisconnect()

    console.log("Provider Address: ", address);

    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();

    // const CONTRACT_ADDRESS = usercontractabi.address;
    // console.log("Contract Address: ", CONTRACT_ADDRESS);
    // const usercontract = new ethers.Contract(
    //   CONTRACT_ADDRESS,
    //   usercontractabi.abi,
    //   // provider
    //   signer.data.sign
    // );

    // let data = await usercontract.getAllUsers();
    // console.log("User Contract: ", data);
  };

  return (
    <div className="mt-[200px] flex flex-col gap-20 w-[1200px]">
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground/70 to-foreground">
          Providers.
        </h1>

        <h3 className="text-foreground">
          A page to explore all providers, their ratings, current online status.
        </h3>
      </div>
      <div className="flex flex-col divide-y divide-border">
        {providers.map((provider, i) => {
          return (
            <div
              key={i}
              className={cn(
                "bg-background/50 p-3 rounded-lg flex flex-col gap-3 hover:border-foreground",
                "cursor-pointer hover:bg-foreground/10"
              )}
            >
              <div
                // href={`/${provider.data.id}`}
                className="flex flex-row gap-5 items-center"
                onClick={payProvider}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={`https://source.boringavatars.com/beam?${i}`}
                  />
                </Avatar>
                <div className="flex flex-col gap-[2px]">
                  <h3 className="font-bold">{provider.data.name}</h3>
                </div>
                <div className="font-extralight text-sm">
                  {provider.data.libp2p}
                </div>
              </div>

              <h3 className="font-extralight text-sm">
                {provider.data.description}
              </h3>

              <div className="flex flex-row gap-3 items-center ml-auto">
                <Button
                  className="gap-2 p-2 h-8 hover:bg-foreground/5 border-foreground/30"
                  variant="outline"
                  size="sm"
                >
                  <Star className="w-4 h-4" /> Favorite
                </Button>
                {/* <Button
                  className="gap-2 p-2 h-8 hover:bg-foreground/5 border-foreground/30"
                  variant="outline"
                  size="sm"
                >
                  <Star
                    className="stroke-yellow-300 fill-yellow-300"
                    size={20}
                  />{" "}
                  4.5 / 5
                </Button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Providers;
