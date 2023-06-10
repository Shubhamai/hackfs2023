"use client";

import Navigation from "./components/header/Navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, wagmiConfig } from "./components/header/walletConnect";
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
        <div className="fixed top-3 flex flex-col w-full max-w-[1200px] backdrop-blur-sm">
          <div className="flex flex-row items-center justify-between w-full">
            <Link href="/">
              <p className="text-white underline decoration-1 decoration-wavy decoration-slate-400 underline-offset-4">
                HackFS 2023
              </p>
            </Link>
            <Navigation />
            <div className="rounded-full border-gray-700 border-[1px] border-solid gap-5 px-4 py-2">
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
                          <div style={{ display: "flex", gap: 12 }}>
                            <button
                              onClick={openChainModal}
                              style={{ display: "flex", alignItems: "center" }}
                              type="button"
                              className="text-white"  
                            >
                              {chain.hasIcon && (
                                <div
                                  style={{
                                    background: chain.iconBackground,
                                    width: 12,
                                    height: 12,
                                    borderRadius: 999,
                                    overflow: "hidden",
                                    marginRight: 4,
                                  }}
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? "Chain icon"}
                                      src={chain.iconUrl}
                                      style={{ width: 12, height: 12 }}
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </button>

                            <button onClick={openAccountModal} className="text-white" type="button">
                              {account.displayName}
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ""}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>
          <Separator className="mt-5 bg-gradient-to-r from-slate-900 via-slate-500 to-slate-900  " />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Header;
