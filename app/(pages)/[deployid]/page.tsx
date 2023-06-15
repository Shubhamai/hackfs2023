"use client";
// Ported Next.js implementation from original JS - https://github.com/libp2p/js-libp2p-webrtc/blob/main/examples/browser-to-server/index.js

import React, { useEffect, useState } from "react";
import { createLibp2p } from "libp2p";
import { noise } from "@chainsafe/libp2p-noise";
import { multiaddr } from "@multiformats/multiaddr";
import { pipe } from "it-pipe";
import { fromString, toString } from "uint8arrays";
import { webRTCDirect } from "@libp2p/webrtc";
import { pushable } from "it-pushable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDeployments } from "@/utils/Polybase";

const Deployment = ({ params }: { params: { deployid: string } }) => {
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState<any>(null);
  const [node, setNode] = useState<any>(null);

  const [peer, setPeer] = useState("");
  const [inputOutputData, setInputOutputData] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modelURL, setModelURL] = useState("");

  useEffect(() => {
    getDeployments().then((deployments) => {
      deployments.data.map((deployment, i) => {
        if (deployment.data.id === params.deployid) {
          console.log(deployment.data);
          setPeer(deployment.data.provider);
          setInputOutputData(JSON.parse(deployment.data.inputOutputData));
          setName(deployment.data.name);
          setDescription(deployment.data.description);
          setModelURL(deployment.data.model);
        }
      });
    });
  }, [params.deployid]);
  // const deployments = await getDeployments();
  // console.log(deployments);

  useEffect(() => {
    (async () => {
      const node = await createLibp2p({
        transports: [webRTCDirect()],
        connectionEncryption: [noise()],
        connectionGater: {
          denyDialMultiaddr: () => {
            return false;
          },
        },
      });

      await node.start();
      setNode(node);

      //   node.on("peer:connect", () => {
      //     console.log(
      //       `Peer connected '${node
      //         .getConnections()
      //         .map((c) => c.remoteAddr.toString())}'`
      //     );
      //   });
    })();
  }, []);

  const clean = (line: string) => line.replaceAll("\n", "");

  const handleConnect = async () => {
    let candidateMa = peer;
    candidateMa = candidateMa.replace(
      /\/webrtc\/certhash/,
      "/webrtc-direct/certhash"
    );
    const ma = multiaddr(candidateMa);

    console.log(`Dialing '${ma}'`);
    const stream = await node.dialProtocol(ma, ["/echo/1.0.0"]);

    const sender = pushable();
    setSender(sender);

    pipe(sender, stream, async (src) => {
      for await (const buf of src) {
        const response = toString(buf.subarray());
        console.log(`Received message '${clean(response)}'`);
      }
    });
  };

  const handleSend = async () => {
    const sendMessage = `${message}\n`;
    console.log(`Sending message '${clean(sendMessage)}'`);
    sender.push(fromString(sendMessage));
  };

  return (
    <div className="mt-[200px] flex flex-col gap-10 w-[800px]">
      {name}
      {description}
      {modelURL}
      {JSON.stringify(inputOutputData)}
      {peer}
      {modelURL}

      {/* <Input
        value={peer}
        onChange={(e) => setPeer(e.target.value)}
        placeholder="Peer"
      /> */}
      <Button onClick={handleConnect}>Connect</Button>

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />
      <Button onClick={handleSend}>Send</Button>
    </div>
  );
};

export default Deployment;