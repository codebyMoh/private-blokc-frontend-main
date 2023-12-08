import { Network, Alchemy } from "alchemy-sdk";

export const alchemy = new Alchemy({
  apiKey: "vBwEupHTfqXRo7CLn6GOVIy6g2oZ8i5H",
  network: Network.ETH_MAINNET,
});

///MATIC_MUMBAI
//import { Network, Alchemy } from "alchemy-sdk"

//import { env } from "~/env.mjs"

//export const alchemy = new Alchemy({
//  apiKey: env.NEXT_PUBLIC_APP_ALCHEMY_KEY,
//  network: Network.MATIC_MUMBAI,
//})
