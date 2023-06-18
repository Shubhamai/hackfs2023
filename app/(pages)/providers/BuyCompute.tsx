"use client";

import SimpleCoinAPI from "../../../fevm-data-dao-kit/deployments/Calibration/SimpleCoin.json";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CoinsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useWalletClient,
} from "wagmi";

export const useComputeTokens = () => {
  const [tokens, _setTokens] = useState(0);

  useEffect(() => {
    // get tokens from local storage onload
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      setTokens(parseInt(tokens));
    }
  }, []);

  const setTokens = (updatedTokens: number) => {
    _setTokens(updatedTokens);
    localStorage.setItem("tokens", updatedTokens.toString());
  };

  return [tokens, setTokens];
};

type BuyComputeProps = {
  providerAddress: string;
};

export const BuyCompute = ({ providerAddress }: BuyComputeProps) => {
  const tokensToBuy = 1000;

  const [tokens, setTokens] = useComputeTokens();
  const [open, setOpen] = useState(false);

  const { address, connector, isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    address: SimpleCoinAPI.address as any,
    abi: SimpleCoinAPI.abi,
    functionName: "sendCoin",
    args: [providerAddress, tokensToBuy],
  });

  const { write, data } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    setTokens(Number(tokens) + tokensToBuy);
  }, [isSuccess]);

  const onClickBuyTokens = async () => {
    try {
      console.log("Pay Provider");
      console.log("Provider Address: ", address);

      write?.();
    } catch (err) {}
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-fit gap-2"
          variant={!tokens ? "default" : "secondary"}
        >
          <CoinsIcon className="w-4 h-4" />
          Buy Tokens
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Buy token to compute</DialogTitle>
        <DialogDescription>
          You need tokens to compute in this model
        </DialogDescription>

        {!isSuccess ? (
          <Button
            className="w-full"
            disabled={!write || isLoading}
            onClick={onClickBuyTokens}
          >
            {isLoading ? "Buying Tokens..." : `Buy ${tokensToBuy} tokens`}
          </Button>
        ) : null}

        {isSuccess && (
          <div className="text-sm text-emerald-700 flex items-center gap-2">
            Successfully bought tokens
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
