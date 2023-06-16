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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { create } from "ipfs-http-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function getLinks(ipfsPath) {
  const url = "https://dweb.link/api/v0";
  const ipfs = create({ url });

  const links = [];
  for await (const link of ipfs.ls(ipfsPath)) {
    links.push(link);
  }
  return links;
}

const Deployment = ({ params }: { params: { deployid: string } }) => {
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState<any>(null);
  const [node, setNode] = useState<any>(null);

  const [peer, setPeer] = useState("");
  const [inputOutputData, setInputOutputData] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modelURL, setModelURL] = useState("");
  const [fileList, setFileList] = useState<any>(null);

  const [input, setInput] = useState<any>(null);
  const [output, setOutput] = useState<any>(null);

  const [isProviderOnline, setIsProviderOnline] = useState(false);
  const [computeText, setComputeText] = useState("Compute");

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
  }, [peer]);

  useEffect(() => {
    if (peer) {
      handleConnect(peer);
    }
  }, [peer]);

  useEffect(() => {
    getDeployments().then((deployments) => {
      deployments.data.map((deployment, i) => {
        if (deployment.data.id === params.deployid) {
          // setPeer(deployment.data.provider);
          setPeer(
            ""
          );
          setInputOutputData(JSON.parse(deployment.data.inputOutputData));
          setName(deployment.data.name);
          setDescription(deployment.data.description);
          setModelURL(deployment.data.model);

          getLinks(deployment.data.model).then((links) => {
            setFileList(links);
          });
        }
      });
    });
  }, [params.deployid]);
  // const deployments = await getDeployments();
  // console.log(deployments);

  const clean = (line: string) => line.replaceAll("\n", "");

  const handleConnect = async (peer: string) => {
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
        const cleanResponse = clean(response);
        console.log(`Received message '${clean(response)}'`);
        if (cleanResponse === "ping") {
          setIsProviderOnline(true);
        } else {
          setComputeText("Compute");
          setOutput(cleanResponse);
        }
      }
    });
  };

  const handleSend = async () => {
    setComputeText("Computing...");

    const pythonFile = fileList.filter((file) => file.name.endsWith(".py"))[0];
    // console.log(pythonFile);
    const pythonFilePath = "https://" + modelURL + ".ipfs.nftstorage.link/" + pythonFile.name;

      console.log(pythonFilePath);
    const sendMessage = `{"model" : "${pythonFilePath}", "input " : "${input}"}\n`;
    console.log(`Sending message '${clean(sendMessage)}'`);
    sender.push(fromString(sendMessage));
  };

  return (
    <div className="mt-[130px] flex flex-col gap-10 w-[800px]">
      <Tabs defaultValue="Model">
        <div className="flex flex-row justify-between items-start mb-5">
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">{name}</h1>
            <h4 className="font-light text-base text-foreground/60">
              {description}
            </h4>
          </div>
          <div className="flex flex-row mt-2">
            Provider Status :
            {isProviderOnline ? (
              <div className="ml-2 flex flex-row items-center gap-2">
                <div className="animate-ping w-2 h-2 rounded-full bg-green-500"></div>
                Online
              </div>
            ) : (
              <div className="ml-2 flex flex-row items-center gap-2">
                <div className="animate-ping w-2 h-2 rounded-full bg-red-500"></div>
                Offline
              </div>
            )}
          </div>
        </div>
        <TabsList className="grid my-5 grid-cols-2 w-[400px]">
          <TabsTrigger value="Model">Model</TabsTrigger>
          <TabsTrigger value="Files">Files</TabsTrigger>
        </TabsList>
        <Separator orientation="horizontal" />
        <TabsContent
          value="Model"
          className="flex flex-col gap-10 w-[800px] mt-12"
        >
          <div className="grid w-full gap-1.5">
            <Label htmlFor="input">Your Text input</Label>
            {inputOutputData && inputOutputData.input === "text" ? (
              <Textarea
                value={input}
                id="input"
                onChange={(e) => setInput(e.target.value)}
                placeholder="Input"
              />
            ) : (
              <></>
            )}
          </div>
          <Button onClick={handleSend}>{computeText}</Button>
          <div>
            <h4 className="flex flex-row gap-4 font-light text-base text-foreground/60">
              Output
            </h4>

            {output && inputOutputData.output === "image" ? (
              <div>{output}</div>
            ) : (
              <>output</>
            )}
            {/* <Image src={output} alt="Output Image" /> */}
          </div>
        </TabsContent>
        {fileList ? (
          <TabsContent value="Files">
            <Table>
              <TableCaption>Index of /ipfs/{modelURL}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">FileName</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fileList.map((file, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>{file.path}</TableCell>
                    <TableCell>{file.size} B</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        ) : (
          <div>loading</div>
        )}
      </Tabs>
    </div>
  );
};

export default Deployment;
