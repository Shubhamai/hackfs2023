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
import ReactMarkdown from "react-markdown";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComponentIcon, CpuIcon, FileIcon } from "lucide-react";
import { BuyCompute, useComputeTokens } from "../providers/BuyCompute";

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
  let providerAddress = "0x374d50AD1d3C82EB58fDCA0D81D05C20730B810f";
  const [tokens, setTokens] = useComputeTokens();

  const [message, setMessage] = useState("");
  const [sender, setSender] = useState<any>(null);
  const [node, setNode] = useState<any>(null);

  const [peer, setPeer] = useState("");
  const [inputOutputData, setInputOutputData] = useState<any>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modelURL, setModelURL] = useState("");
  const [fileList, setFileList] = useState<any>(null);
  const [readMe, setReadMe] = useState<any>(null);

  const [input, setInput] = useState<any>(null);
  const [progressOutput, setProgressOutput] = useState<any>(null);
  const [finalOutput, setFinalOutput] = useState<any>(null);

  const [isProviderOnline, setIsProviderOnline] = useState(false);
  const [computeInProgress, setComputeInProgress] = useState(false);

  const timeRef = React.useRef(null);
  const startTimeRef = React.useRef(0);

  useEffect(() => {
    setInterval(() => {
      if (timeRef.current && !finalOutput) {
        const ms = Date.now() - startTimeRef?.current;
        timeRef.current.textContent = `${(ms / 1000).toFixed(1)}s`;
      }
    }, 100);
  }, []);

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

            const readmeText = fetch(
              "https://" +
                deployment.data.model +
                ".ipfs.nftstorage.link/" +
                links.filter((file) => file.name.endsWith(".md"))[0].name
            )
              .then((r) => r.text())
              .then((t) => {
                setReadMe(t);
              });
          });

          // setReadMe()
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
    sender.push(fromString("ping\n"));
    setSender(sender);

    pipe(sender, stream, async (src) => {
      for await (const buf of src) {
        const response = toString(buf.subarray());
        const cleanResponse = clean(response);
        console.log(`Received message '${clean(response)}'`);
        if (cleanResponse === "pong") {
          setIsProviderOnline(true);
        } else if (cleanResponse[0] == "@") {
          setComputeInProgress(false);

          setFinalOutput(cleanResponse.split("@")[1]);
          // startTimeRef.current = Date.now();
          timeRef.current = null;
        } else {
          // if (progressOutput) {
          //   setProgressOutput(progressOutput + "\n" + cleanResponse);
          // } else {
          setProgressOutput(cleanResponse);
          startTimeRef.current = Date.now();

          // }
        }
      }
    });
  };

  const handleSend = async () => {
    setComputeInProgress(true);

    console.log(inputOutputData);

    const pythonFile = fileList.filter((file) => file.name.endsWith(".py"))[0];
    const pythonFilePath =
      "https://" + modelURL + ".ipfs.nftstorage.link/" + pythonFile.name;

    // const sendMessage = `{"model" : "${pythonFilePath}", "input" : "${input}"}\n`;
    const sendMessage =
      JSON.stringify({
        model: pythonFilePath,
        input: inputOutputData.input,
        bacalhau: inputOutputData.bacalhau, //"bacalhau docker run ubuntu echo Hello World --download", /
      }) + "\n";
    console.log(`Sending message '${clean(sendMessage)}'`);
    sender.push(fromString(sendMessage));

    setTokens(tokens - 1);

    setFinalOutput(null);
    timeRef.current = null;
  };

  return (
    <div className="mt-[130px] flex flex-col gap-10 w-[1200px]">
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
          <TabsTrigger className="gap-1" value="Model">
            <ComponentIcon className="w-4 h-4" /> Model
          </TabsTrigger>
          <TabsTrigger className="gap-1" value="Files">
            <FileIcon className="w-4 h-4" /> Files
          </TabsTrigger>
        </TabsList>
        <Separator orientation="horizontal" />
        <TabsContent
          value="Model"
          className="grid grid-cols-2 gap-10 w-[1200px] mt-12"
        >
          <div className="flex flex-col gap-5 mb-32">
            {readMe ? <ReactMarkdown>{readMe}</ReactMarkdown> : <div></div>}
          </div>
          <div className="flex flex-col gap-7">
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
              {inputOutputData && inputOutputData.input === "image" ? (
                <div>
                  <Input
                    className="text-background hidden"
                    id="file-uploader"
                    // name="model"
                    // value={model}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        // const File = e.target.files[0];
                        setInput(e.target.files);
                        // console.log(e.target.value);
                      } else {
                        console.log("no files");
                      }
                    }}
                    type="file"
                    accept="image/*"
                    multiple
                    required
                    // onChange={handleChange}
                  />
                  <label
                    htmlFor="file-uploader"
                    className="p-16 bg-background text-foreground text-center rounded-md border border-foreground/10 font-light text-sm cursor-pointer hover:bg-foreground/5 transition-all w-full"
                  >
                    <i className="fa-solid fa-upload"></i>Upload / Drop Images
                  </label>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button className="w-40 gap-2" onClick={handleSend}>
                <CpuIcon className="w-4 h-4" />
                {!computeInProgress ? "Compute" : "Computing..."}
              </Button>

              <p className="text-foreground/70 text-sm">{tokens} tokens left</p>
            </div>

            <BuyCompute providerAddress={providerAddress} />
            <div>
              {progressOutput ? (
                <div className="flex flex-row gap-2 items-center mb-6">
                  <div className="animate-ping w-1 h-1 rounded-full bg-green-500"></div>
                  <div className="text-sm font-light text-foreground/50">
                    {progressOutput}
                  </div>
                  <div
                    ref={timeRef}
                    className="text-sm font-light text-foreground/50"
                  />
                </div>
              ) : (
                <></>
              )}
              {/* <Image src={output} alt="Output Image" /> */}

              {!computeInProgress && finalOutput ? (
                <h4 className="border boder-[1px] rounded-2xl p-4 gap-4 font-medium text-foreground text-base mb-6 break-words">
                  {finalOutput}
                </h4>
              ) : (
                <></>
              )}
            </div>
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
