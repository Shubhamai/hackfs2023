import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";

const db = new Polybase({
  defaultNamespace:
    "pk/0xb82708f37646d6bbf852f5252ca72c403c2d60b5b3df1d0a6144b3cd8c54d5405cae9c02289ee01be0cbede8e359de539ab985090eb29a82d30ab7159204f0bc/hackfs2023-2",

  signer: (data) => {
    return {
      h: "eth-personal-sign",
      sig: ethPersonalSign(
        process.env.NEXT_PUBLIC_PRIVATE_KEY as string,
        data
      ), // TODO: THIS IS NOT SECURE
    };
  },
});

export { db };
