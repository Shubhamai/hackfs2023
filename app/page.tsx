"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto w-full h-full">
      <div className="flex flex-col gap-10 mt-[400px]">
        <h1 className="text-5xl font-extrabold text-white">
          One Click Deployment <br /> of your AI Models
        </h1>
        <h4 className="text-gray-300">
          Run your models on a decentralized network with API service
        </h4>
        <div className="flex flex-row gap-10">
          <Link href="/deploy">
            <button className="text-slate-500 transition hover:text-slate-300">Press Space to Deploy</button>
          </Link>
            <Link href="/provide">
              <button className="text-slate-500 transition hover:text-slate-300">
                Press Ctrl to Provide Compute
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
