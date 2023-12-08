/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type SafeEventEmitterProvider } from "@web3auth/base";
import { createContext, useContext, useState } from "react";
import React from "react";
export interface Wallet1 {
  email: string;
  name: string;
  profileImage: string;
  verifier: string;
  verifierId: string;
  typeOfLogin: string;
  accessToken: string;
  idToken: string;
  state: {
    instanceId: string;
    verifier: string;
    typeOfLogin: string;
    redirectToOpener: boolean;
  };
  token_type: string;
  expires_in: string;
  scope: string;
  authuser: string;
  prompt: string;
  version_info: string;
}
export interface Web3AuthSignerContext {
  web3AuthSigner?: SafeEventEmitterProvider;
  setWeb3AuthSigner: React.Dispatch<
    React.SetStateAction<SafeEventEmitterProvider | undefined>
  >;

  sessionKeyProvider: any;
  setSessionKeyProvider: any;

  sessionethProvider: any;
  setSessionethProvider: any;

  accountAddress?: `0x${string}`;
  setAccountAddress: React.Dispatch<
    React.SetStateAction<`0x${string}` | undefined>
  >;
  userinfo: Wallet1 | null;
  setUserinfo: React.Dispatch<React.SetStateAction<Wallet1 | null>>;

  ecdsaProvider: any | null;
  setEcdsaProvider: React.Dispatch<React.SetStateAction<any | null>>;
  // Correct variable name

  ethprice: number | null;
  setEthprice: React.Dispatch<React.SetStateAction<number | null>>;

  code: string | undefined;
  setCode: React.Dispatch<React.SetStateAction<string | undefined>>;

  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;

  openModule: boolean;
  setOpenModule: React.Dispatch<React.SetStateAction<boolean>>;

  transakopen: boolean;
  setTransak: React.Dispatch<React.SetStateAction<boolean>>;

  accesscodeopen: boolean;
  setAccesscodeopen: React.Dispatch<React.SetStateAction<boolean>>;

  accesscode: number | null;
  setAccesscode: React.Dispatch<React.SetStateAction<number | null>>;

  usdtbalace: number | null;
  setusdtbalace: React.Dispatch<React.SetStateAction<number | null>>;

  blokcbalace: number | null;
  setBlokcbalace: React.Dispatch<React.SetStateAction<number | null>>;

  totalblokc: number | null;
  setTotalblokc: React.Dispatch<React.SetStateAction<number | null>>;
}

export const Web3AuthSigner = createContext<Web3AuthSignerContext | null>(null);

export const useWeb3AuthSigner = () => {
  const signer = useContext(Web3AuthSigner);
  if (signer === null) {
    throw new Error(
      "useWeb3AuthSigner() can only be used inside of <Web3AuthSignerProvider />, " +
        "please declare it at a higher level."
    );
  }
  return signer;
};

export function Web3AuthSignerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [web3AuthSigner, setWeb3AuthSigner] = useState<
    SafeEventEmitterProvider | undefined
  >(undefined);
  const [accountAddress, setAccountAddress] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [sessionKeyProvider, setSessionKeyProvider] = useState<any>();
  const [sessionethProvider, setSessionethProvider] = useState<any>();
  const [userinfo, setUserinfo] = useState<Wallet1 | null>(null);

  const [ecdsaProvider, setEcdsaProvider] = useState<any | null>(null);

  const [ethprice, setEthprice] = useState<number | null>(null);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [openModule, setOpenModule] = useState<boolean>(false);
  const [accesscodeopen, setAccesscodeopen] = useState<boolean>(false);
  const [accesscode, setAccesscode] = useState<number | null>(null);
  const [usdtbalace, setusdtbalace] = useState<number | null>(null);
  const [blokcbalace, setBlokcbalace] = useState<number | null>(null);
  const [totalblokc, setTotalblokc] = useState<number | null>(null);
  const [transakopen, setTransak] = useState<boolean>(false);
  return (
    <Web3AuthSigner.Provider
      value={{
        web3AuthSigner,
        setWeb3AuthSigner,
        accountAddress,
        setAccountAddress,
        sessionKeyProvider,
        setSessionKeyProvider,
        setUserinfo,
        userinfo,
        ecdsaProvider,
        setEcdsaProvider,
        ethprice,
        setEthprice,
        code,
        setCode,
        isConnected,
        setIsConnected,
        openModule,
        setOpenModule,
        accesscodeopen,
        setAccesscodeopen,
        accesscode,
        setAccesscode,
        usdtbalace,
        setusdtbalace,
        blokcbalace,
        setBlokcbalace,
        sessionethProvider,
        setSessionethProvider,
        setTransak,
        transakopen,
        totalblokc,
        setTotalblokc,
      }}
    >
      {children}
    </Web3AuthSigner.Provider>
  );
}
