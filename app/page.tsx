"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto w-full h-full">
      <div className="flex flex-col gap-10 mt-[400px]">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-100">
          One Click Deployment <br /> of your AI Models
        </h1>
        <h4 className="text-gray-300">
          Run your models on a decentralized network with API service
        </h4>
        <div className="flex flex-row gap-10">
          <Link href="/deploy">
            <button className="text-slate-500 transition hover:text-slate-300">Press <span className="bg-slate-500 text-black px-[5px] py-[2px] rounded-md" >S</span> to Deploy</button>
          </Link>
            <Link href="/provide">
              <button className="text-slate-500 transition hover:text-slate-300">
                Press <span className="bg-slate-500 text-black px-[5px] py-[2px] rounded-md">Ctrl</span> to Provide Compute
              </button>
            </Link>
        </div>
      </div>
      <div className="mt-[800px] flex flex-col items-center py-4">
        <p className="text-slate-500">
          Website Design inspired by <Link href="resend.com">resend.com</Link>,
          vercel.com and huggingface.co
        </p>
      </div>
    </div>
  );
}
