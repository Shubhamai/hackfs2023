"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Render from "./components/Render/Render";
import { CommandShortcut } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  // if (document) {
  // document.addEventListener("keydown", function (event) {
  //   if (event.key == "s") {
  //     window.location.href = "/deploy";
  //   }
  // if (event.key == "Control") {
  //   window.location.href = "/provide";
  // }
  //   });
  // }

  return (
    <div className="max-w-[2000px] mx-auto w-full h-full">
      <div className="flex flex-row mx-auto w-full">
        <div className="flex flex-col items-center justify-center gap-10 mt-[400px] w-full">
          <h1
            className={cn(
              "text-5xl font-extrabold text-transparent text-center",
              "bg-clip-text bg-gradient-to-b from-foreground/70 to-primary"
            )}
          >
            {/* One Click Deployment <br /> of your AI Models */}
            Deploy AI Models in <br />
            One Click
          </h1>
          <h4 className="text-foreground/70">
            Run your models on a decentralized network with API service
          </h4>
          <div className="flex flex-row gap-5">
            <Button asChild className="gap-2">
              <Link href="/deploy">
                Press{" "}
                <span className="bg-foreground/20 text-background px-[5px] py-[2px] rounded-md">
                  S
                </span>{" "}
                to Deploy
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="gap-2"
              // className="text-foreground/50 transition hover:text-foreground"
            >
              <Link href="/provide">
                Press{" "}
                <span className="bg-foreground/20 text-background px-[5px] py-[2px] rounded-md">
                  Ctrl
                </span>{" "}
                to provide Compute
              </Link>
            </Button>
          </div>

          <div className="flex flex-col gap-12 mb-40">
            <ul
              className={cn(
                "list-disc text-foreground/70 w-full",
                "flex flex-col items-center gap-3"
              )}
            >
              <li>yes, its true</li>
              <li>
                <Link
                  href="/provide"
                  className="underline decoration-wavy underline-offset-2"
                >
                  demo
                </Link>{" "}
                of how can do deploy within 2 minuites
              </li>
            </ul>

            <div className="flex flex-col gap-6 justify-center w-full mt-20">
              <h3 className="text-2xl font-semibold text-foreground">
                How it works?
              </h3>

              <ul
                className={cn(
                  "list-disc text-foreground/70",
                  "flex flex-col gap-3 w-full"
                )}
              >
                <li>using Balachu we...</li>
                <li>filecoin makes this tech possible</li>
              </ul>
            </div>

            <div className="flex flex-col gap-6 justify-center w-full">
              <h3 className="text-2xl font-semibold text-foreground">
                Why web3?
              </h3>

              <ul
                className={cn(
                  "list-disc text-foreground/70",
                  "flex flex-col gap-3 w-full"
                )}
              >
                <li>using Balachu we...</li>
                <li>filecoin makes this tech possible</li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col gap-10 mt-[200px] ml-24">
          <Render />
        </div> */}
      </div>
      {/* <div className="mt-[800px] flex flex-col items-center py-4">
        <p className="text-slate-500">
          Website Design inspired by <Link href="resend.com">resend.com</Link>,
          vercel.com and huggingface.co
        </p>
      </div> */}
    </div>
  );
}
