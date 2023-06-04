"use client";

import Navigation from "./components/Header/Navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, wagmiConfig } from "./components/Header/walletConnect";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const Header = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#ffffff", // TODO : Improve the theme
          accentColorForeground: "black",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
      >
        <div className="fixed top-3 flex flex-row w-full mx-auto max-w-[1200px]">
          <div className="flex flex-row mx-auto items-center justify-between w-full">
            <Link href="/">
              <p>HackFS 2023</p>
            </Link>
            <Navigation />
            <ConnectButton />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Header;
