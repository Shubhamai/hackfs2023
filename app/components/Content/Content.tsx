"use client";

import { motion } from "framer-motion";

const Content = () => {
  return (
    <div className="flex flex-col gap-10 mt-[400px] ">
      <h1 className="text-5xl font-extrabold">
        One Click Deployment <br /> of your ML Models
      </h1>
      <h4>Run your models on a decentralized network with API service</h4>
      <div className="flex flex-row gap-10">
        <button>Press S for Deploy</button>
        <motion.div
          whileHover={{ scale: 1.01, fontWeight: "bold" }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <button>Press D to become Compute Provider</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Content;
