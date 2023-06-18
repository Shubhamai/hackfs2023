"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Render from "./components/Render/Render";
import { CommandShortcut } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HelpingHand, PlaneTakeoff, Utensils, WebhookIcon } from "lucide-react";

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
        <div className="flex flex-col items-center justify-center gap-10 mt-[400px] w-full mb-40">
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

          <div className="flex flex-col gap-12 mb-12">
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
          </div>

          <div className="flex justify-between gap-12">
            <div className="flex-1 flex flex-col gap-3 p-3 rounded-md border border-border/50">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground/70">
                <PlaneTakeoff />
                Deploy Model
              </h3>
              <p className="text-foreground/70">
                Deploy your model in one click, and get a link to your API
                endpoint. Pay as you go, and only for what you use. (soon)
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-3 p-3 rounded-md border border-border/50">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground/70">
                <Utensils />
                Consume model
              </h3>
              <p className="text-foreground/70">
                Once you model is deployed you and anyone can consume it using
                our frontend
              </p>
            </div>

            <div className="flex-1 flex flex-col gap-3 p-3 rounded-md border border-border/50">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground/70">
                <HelpingHand />
                Become Compute provider
              </h3>
              <p className="text-foreground/70">
                Earn money by providing compute to the deployed models.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-12 w-96">
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

          <div className="flex flex-col gap-12 justify-center w-full mt-20">
            <h3 className="text-center text-2xl font-semibold text-foreground">
              Powered by
            </h3>
            <div className="flex items-center justify-center gap-20">
              {[
                [
                  "https://storage.googleapis.com/ethglobal-api-production/organizations%2F4hh1n%2Flogo%2F1685055869116_sq.svg",
                  "Bacalhau",
                ],
                [
                  "https://storage.googleapis.com/ethglobal-api-production/organizations%2Fgwrmj%2Flogo%2F1685373604361_fvm.png",
                  "FEVM",
                ],
                [
                  "https://storage.googleapis.com/ethglobal-api-production/organizations%2Fuorta%2Flogo%2F1685036794085_h4Bvj_8p_400x400.png",
                  "IPFS",
                ],
                [
                  "https://storage.googleapis.com/ethglobal-api-production/organizations%2Fhp48a%2Flogo%2F1675799014799_1RnEmeJE_400x400.jpeg",
                  "Polygon",
                ],
                [
                  "https://storage.googleapis.com/ethglobal-api-production/organizations%2Fmi9fg%2Fimages%2Flibp2p_basic_white_icon.png",
                  "Libp2p",
                ],
                [
                  "https://storage.googleapis.com/ethglobal-api-production/organizations%2F4jgzz%2Flogo%2F1684251854251_nft-sq.png",
                  "NFT Storage",
                ],
              ].map((data, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 items-center justify-center grayscale transition-all cursor-pointer hover:grayscale-0"
                >
                  <img className={techLogoClassName} src={data[0]} />
                  <p className="uppercase text-foreground/70 text-sm">
                    {data[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "flex items-center justify-center w-fit divide-x divide-border",
              "bg-foreground/5 py-4 rounded-lg mt-12"
            )}
          >
            <div className="w-fit flex flex-col px-10">
              <h5 className="uppercase text-foreground/80 text-6xl font-extrabold">
                12
              </h5>
              <p className="uppercase text-foreground/50 font-medium">
                Models Deployed
              </p>
            </div>

            <div className="w-fit flex flex-col px-10">
              <h5 className="uppercase text-foreground/80 text-6xl font-extrabold">
                12
              </h5>
              <p className="uppercase text-foreground/50 font-medium">
                Models Deployed
              </p>
            </div>

            <div className="w-[fit flex flex-col px-10">
              <h5 className="uppercase text-foreground/80 text-6xl font-extrabold">
                12
              </h5>
              <p className="uppercase text-foreground/50 font-medium">
                Models Deployed
              </p>
            </div>
          </div>

          <div className="mt-20">
            <p>
              made by{" "}
              <a
                className="underline decoration-wavy"
                target="_blank"
                href="https://github.com/shubhamai"
              >
                Shubhamai
              </a>{" "}
              &{" "}
              <a
                className="underline decoration-wavy"
                target="_blank"
                href="https://denosaurabh.me"
              >
                denosaurabh
              </a>
            </p>
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

const techLogoClassName = "h-16 w-fit";
