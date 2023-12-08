import { createTestClient, http } from "viem";
import { mainnet } from "viem/chains";

export const publicClient = createTestClient({
  chain: mainnet,
  mode: "anvil",
  transport: http(
    "https://eth-mainnet.g.alchemy.com/v2/vBwEupHTfqXRo7CLn6GOVIy6g2oZ8i5H"
  ),
});

//import { createPublicClient, http } from "viem"
//import { sepolia } from "viem/chains"

//export const publicClient = createPublicClient({
//  chain: sepolia,
//  transport: http(
//    "https://polygon-mumbai.g.alchemy.com/v2/XSb75aw_jshDUV7ASCNM13QXokJ9EYyC",
//  ),
//})
