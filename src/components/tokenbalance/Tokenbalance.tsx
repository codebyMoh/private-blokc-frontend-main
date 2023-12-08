import axios, { type AxiosRequestConfig } from "axios";
//import Moralis from "moralis"
import { useEffect, useState } from "react";
import { useWeb3AuthSigner } from "../contex/web3-auth-signer";
import blokc from "../../assets/images/icons/Blokc-logo.svg";
import usdt from "../../assets/images/icons/usdtlogo.png";
import eth from "../../assets/images/icons/ethlogo.png";
import useWallet from "../hooks/use-wallet";
interface confi {
  method: string;
  url: string;
  headers: {
    "Content-Type": string;
  };
  data: string;
}
// Replace with the correct path
interface TokenBalanceData {
  data: TokenBalanceData;
  jsonrpc: string;
  id: number;
  result: {
    address: string;
    tokenBalances: {
      contractAddress: string;
      tokenBalance: number;
    }[];
  };
}

const Tokenbalance = () => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [isloding, setIsloding] = useState<boolean>(false);
  const { accountAddress, blokcbalace, ethprice, usdtbalace } =
    useWeb3AuthSigner();
  const { data } = useWallet();
  // Replace with your desired address

  // const address = accountAddress;
  // //  const address = accountwallet
  // // Alchemy URL with your API key
  // const baseURL = process.env.REACT_APP_ALCHEMY_API_KEY;
  // // Replace with your Alchemy API key

  // // Data for making the request to query token balances
  // const data = {
  //   jsonrpc: "2.0",
  //   method: "alchemy_getTokenBalances",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   params: [`${address}`],
  //   id: 42,
  // };

  // // Config object for making a request with axios
  // const config: confi = {
  //   method: "post",
  //   url: baseURL as string,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: JSON.stringify(data),
  // };

  // async function getTokens() {
  //   let response: TokenBalanceData = await axios(config);
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   response = response.data;

  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   const balances = response.result;
  //   //console.log("balances", balances)
  //   const tokensData: { name: any; balance: string; logo: string }[] = [];

  //   const contractAddresses = balances.tokenBalances
  //     .filter((token) => token.tokenBalance !== 0)
  //     .map((token) => token.contractAddress);

  //   const metadataPromises = contractAddresses.map(async (contractAddress) => {
  //     const options: AxiosRequestConfig = {
  //       method: "POST",
  //       url: baseURL,
  //       headers: {
  //         accept: "application/json",
  //         "content-type": "application/json",
  //       },
  //       data: {
  //         id: 1,
  //         jsonrpc: "2.0",
  //         method: "alchemy_getTokenMetadata",
  //         params: [contractAddress],
  //       },
  //     };

  //     return axios.request(options);
  //   });

  //   // Wait for all metadata requests to complete
  //   const metadataResponses = await Promise.all(metadataPromises);

  //   metadataResponses.forEach((metadataResponse, index) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //     const balance = balances?.tokenBalances[index]?.tokenBalance;

  //     if (typeof balance !== "undefined") {
  //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //       const metadata = metadataResponse.data;

  //       if (metadata?.result) {
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //         const balanceValue = balance / Math.pow(10, metadata.result.decimals);
  //         const formattedBalance = balanceValue.toFixed(5);

  //         tokensData.push({
  //           // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //           name: metadata.result.name,
  //           // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //           logo: metadata.result.logo,
  //           balance: `${formattedBalance}`,
  //         });
  //       }
  //     }
  //   });

  //   return tokensData;
  // }

  // useEffect(() => {
  //   setIsloding(true);
  //   async function fetchData() {
  //     const tokenData = await getTokens();
  //     setTokens(tokenData);
  //     setIsloding(false);
  //   }
  //   void fetchData();
  // }, [setIsloding]);

  return (
    <>
      {isloding ? (
        <div className="flex justify-center items-center text-center">
          <div
            className="spinner-border h-5 w-5 flex justify-center items-center"
            role="status"
          >
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="text-center  p-3 overflow-y-scroll space-y-3 h-32 custom-scrollbar">
            <div className="d-flex flex-row  justify-content-center gap-3">
              <div className="flex w-12 justify-center items-center ">
                <img src={blokc} alt="" height={40} width={40} />
              </div>
              <div className="w-12">
                <p className="">BLOKC</p>
                <p className="">{blokcbalace}</p>
              </div>
            </div>
            <div className="d-flex flex-row  justify-content-center gap-3">
              <div className="flex w-12 justify-center items-center">
                <img src={eth} alt="ethlogo" height={40} width={40} />
              </div>
              <div className="w-12">
                <p className="">ETH</p>
                <p className="">{data?.totalBalance}</p>
              </div>
            </div>
            <div className="d-flex flex-row  justify-content-center gap-3">
              <div className="flex w-12 justify-center items-center">
                <img src={usdt} alt="usdtlogo" height={40} width={40} />
              </div>
              <div className="w-12">
                <p className="">USDT</p>
                <p className="">{usdtbalace}</p>
              </div>
            </div>
          </div>
          {/* <div className="text-center  p-3 overflow-y-scroll h-32 custom-scrollbar">
            {tokens.map((token, index) => (
              <div
                key={index}
                className="d-flex flex-row  justify-content-center gap-3"
              >
                {/*{`${index + 1}. ${token.name}: ${token.balance}`}*/}

          {/* <div className="mb-4  ">
                  <img
                    src={`${token.logo}`}
                    alt={`${token.name}`}
                    height={40}
                    width={40}
                  />
                </div> */}
          {/*<p className="text-lg font-medium">{`${token.logo}.`}</p>*/}
          {/* <div className="">
                  <p className="">{token.name}</p>
                  <p className="">{token.balance}</p>
                </div>
              </div> */}
          {/* ))} */}
          {/* </div>  */}
        </div>
      )}
    </>
  );
};

export default Tokenbalance;
