"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Render from "./components/Render/Render";
import { CommandShortcut } from "@/components/ui/command";

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
      <div className="flex flex-row mx-auto">
        <div className="flex flex-col gap-10 mt-[400px]">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-100">
            {/* One Click Deployment <br /> of your AI Models */}
            Deploy AI Models in <br />
            One Click
          </h1>
          <h4 className="text-gray-300">
            Run your models on a decentralized network with API service
          </h4>
          <div className="flex flex-row gap-10">
            <Link href="/deploy">
              <button className="text-foreground/50 transition hover:text-foreground">
                Press{" "}
                <span className="bg-foreground/50 text-background px-[5px] py-[2px] rounded-md">
                  S
                </span>{" "}
                to Deploy
              </button>
            </Link>
            <Link href="/provide">
              <button className="text-foreground/50 transition hover:text-foreground">
                Press{" "}
                <span className="bg-foreground/50 text-background px-[5px] py-[2px] rounded-md">
                  Ctrl
                </span>{" "}
                to Provide Compute
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-10 mt-[200px] ml-24">
          <Render />
        </div>
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
