"use client";

import Navigation from "./components/header/Navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, wagmiConfig } from "./components/header/walletConnect";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";

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
        <div className="fixed top-3 flex flex-row w-full mx-auto">
          <div className="flex flex-row mx-auto items-center justify-between gap-72">
            <p>HackFS 2023</p>
            <Navigation />
            <ConnectButton />
          </div>
          <div />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Header;
