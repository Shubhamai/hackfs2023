"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import usercontractabi from "../../../fevm-data-dao-kit/deployments/Calibration/SimpleCoin.json";
import { usePrepareContractWrite } from "wagmi";
import * as React from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Provide = () => {

  // const queryClient = new QueryClient()


  // const { config } = usePrepareContractWrite({
  //   address: usercontractabi.address,
  //   abi: usercontractabi.abi,
  //   functionName: "SimpleCoin",
  // });

  const { address, connector, isConnected } = useAccount()
  // const { data: ensAvatar } = useEnsAvatar({ address })
  // const { data: ensName } = useEnsName({ address })
  // const { connect, connectors, error, isLoading, pendingConnector } =
  //   useConnect()
  // const { disconnect } = useDisconnect()

  console.log("Address: ", address);

  const onFormSubmit = async (e) => {
    e.preventDefault();

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
    //   signer
    // );

    // let data = await usercontract.getAllUsers();
    // console.log("User Contract: ", data);

    console.log("Submit");
  };

  return (
    // <QueryClientProvider client={queryClient}>

    <div className="mt-[200px] flex flex-col gap-10 w-[800px]">
      <h1 className="font-extrabold text-3xl text-white">Become a Provider</h1>

      <form onSubmit={onFormSubmit} className="flex flex-col gap-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="libp2p" className="text-white">
            Libp2p Link
          </Label>
          <Input id="libp2p" className="text-white" required></Input>
        </div>

        <Button type="submit" className="w-20">
          Submit
        </Button>
      </form>
    </div>
    // </QueryClientProvider>

  );
};

export default Provide;
