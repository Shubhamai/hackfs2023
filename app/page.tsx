"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto w-full h-full">
      <div className="flex flex-col gap-10 mt-[400px]">
        <h1 className="text-5xl font-extrabold">
          One Click Deployment <br /> of your ML Models
        </h1>
        <h4>Run your models on a decentralized network with API service</h4>
        <div className="flex flex-row gap-10">
          <Link href="/deploy">
            <button>Press Space to Deploy</button>
          </Link>
          <motion.div
            whileHover={{ scale: 1.01, fontWeight: "bold" }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link href="/provide">
              <button>Press Ctrl to Provide Compute</button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
