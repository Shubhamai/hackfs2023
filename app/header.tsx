"use client";

import NextLink from "next/link";

import Navigation from "./components/header/Navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, wagmiConfig } from "./components/header/walletConnect";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlaneTakeoff, User } from "lucide-react";

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
        <div className="fixed top-3 left-0 flex flex-col w-full px-12 backdrop-blur-sm">
          <div className="flex flex-row items-center gap-6 w-full">
            <Link href="/">
              <p className="text-foreground underline decoration-1 decoration-wavy decoration-foreground/40 underline-offset-4">
                HackFS 2023
              </p>
            </Link>

            <Navigation />

            <div className="rounded-full gap-5 px-4 py-2 ml-auto">
              {/* <ConnectButton /> */}
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  // Note: If your app doesn't use authentication, you
                  // can remove all 'authenticationStatus' checks
                  const ready = mounted && authenticationStatus !== "loading";
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === "authenticated");

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              type="button"
                              className="text-white"
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button onClick={openChainModal} type="button">
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={openAccountModal}
                            >
                              <User className="w-4 h-4 mr-1" />
                              {account.displayName}
                            </Button>

                            <Button asChild>
                              <NextLink href="/deploy">
                                <PlaneTakeoff className="w-4 h-4 mr-1" />
                                Deploy Model
                              </NextLink>
                            </Button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>
          <Separator className="mt-5 bg-border" />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Header;
