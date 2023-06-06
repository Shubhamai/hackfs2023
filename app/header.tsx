"use client";

import Navigation from "./components/Header/Navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, wagmiConfig } from "./components/Header/walletConnect";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "black", // TODO : Improve the theme
          accentColorForeground: "#d3d6d9",
          borderRadius: "none",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <div className="fixed top-3 flex flex-col w-full mx-auto max-w-[1200px] backdrop-blur-sm">
          <div className="flex flex-row mx-auto items-center justify-between w-full">
            <Link href="/">
              <p className="text-white underline decoration-1 decoration-wavy decoration-slate-400 underline-offset-4">
                HackFS 2023
              </p>
            </Link>
            <Navigation />
            <div className="rounded-full border-gray-700 border-[2px] z-50 border-solid gap-5">
              <ConnectButton />
            </div>
          </div>
          <Separator className="mt-5 bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900  " />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Header;
