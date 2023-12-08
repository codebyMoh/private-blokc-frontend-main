// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ModalWrapper from "../modal/Modal.style";
import { CgClose } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import {
  Web3AuthMPCCoreKit,
  WEB3AUTH_NETWORK,
  COREKIT_STATUS,
  SubVerifierDetailsParams,
} from "@web3auth/mpc-core-kit";
import { contractABI } from "../../abi/abi";
import { zeroAddress, type Hex } from "viem";
import { FiChevronDown } from "react-icons/fi";
import { LucideCopy } from "lucide-react";
import Accesscode from "../accesscode/Accesscode";
import clipboardCopy from "clipboard-copy";
import { MdDone } from "react-icons/md";
import Tokenbalance from "../tokenbalance/Tokenbalance";
import ethcontractABI from "../../abi/ethtransferabi.json";
import {
  ECDSAProvider,
  getRPCProviderOwner,
  SessionKeyProvider,
  Operation,
  ParamCondition,
  getPermissionFromABI,
  ParamOperator,
} from "@zerodev/sdk";
import { useWeb3AuthSigner } from "../contex/web3-auth-signer";
import { SafeEventEmitterProvider } from "@web3auth/base";
import Web3 from "web3";
import { BN } from "bn.js";
import useWallet from "../hooks/use-wallet";
import { LocalAccountSigner } from "@alchemy/aa-core";
import { generatePrivateKey } from "viem/accounts";
import { env } from "process";
import axios from "axios";

interface UserData {
  accessToken: string;
  authuser: string;
  email: string;
  expires_in: string;
  idToken: string;
  name: string;
  profileImage: string;
  prompt: string;
  scope: string;
  state: {
    instanceId: string;
    verifier: string;
    typeOfLogin: string;
    redirectToOpener: boolean;
  };
  token_type: string;
  typeOfLogin: string;
  verifier: string;
  verifierId: string;
  version_info: string;
}

interface ImportMetaEnv {
  VITE_API_WEB3AUTH_CLIENTID: string;
  // Add other environment variables as needed
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const selectedNetwork = WEB3AUTH_NETWORK.MAINNET;
const clientidweb3 = process.env.REACT_APP_WEB3AUTH_CLIENTID;
// console.log("clientidweb3--->", clientidweb3);

const coreKitInstance = new Web3AuthMPCCoreKit({
  web3AuthClientId: clientidweb3 as string,
  web3AuthNetwork: selectedNetwork,
  uxMode: "popup",
  chainConfig: {
    chainNamespace: "eip155",
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Ethereum Mainnet",
    blockExplorer: "https://etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
  },
});

const ConnectWalletButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    setWeb3AuthSigner,
    web3AuthSigner,
    accountAddress,
    setAccountAddress,
    setSessionKeyProvider,
    setUserinfo,
    userinfo,
    setEcdsaProvider,
    code,
    setCode,
    isConnected,
    setIsConnected,
    openModule,
    setOpenModule,
    setAccesscodeopen,
    accesscodeopen,
    accesscode,
    setSessionethProvider,
  } = useWeb3AuthSigner();
  // update env
  // console.log("accountAddress--->", accountAddress);
  // const [coreKitInstance, setCoreKitInstance] =
  //   useState<Web3AuthMPCCoreKit | null>(null);
  const [providercorkit, setProvidercorkit] =
    useState<SafeEventEmitterProvider | null>(null);

  const [coreKitStatus, setCoreKitStatus] = useState<COREKIT_STATUS>(
    COREKIT_STATUS.NOT_INITIALIZED
  );

  const [web3, setWeb3] = useState<any>(undefined);

  const [sucessfullogin, setsucessfullogin] = useState<boolean>(false);
  const [copy, setcopy] = useState<boolean>(false);
  const [resetaccount, setResetaccount] = useState<boolean>(false);
  const name = userinfo?.name;

  const { data } = useWallet();

  useEffect(() => {
    if (coreKitInstance) {
      const init = async () => {
        await coreKitInstance.init();

        if (coreKitInstance.provider) {
          setProvidercorkit(coreKitInstance.provider);
        }

        setCoreKitStatus(coreKitInstance.status);
      };
      init();
    }
  }, []);

  useEffect(() => {
    if (providercorkit) {
      const web3 = new Web3(providercorkit);
      setWeb3(web3);
    }
  }, []);

  const login = async () => {
    try {
      setIsLoading(true);
      if (!coreKitInstance) {
        throw new Error("initiated to login");
      }
      // console.log("1");
      const verifierConfig = {
        subVerifierDetails: {
          typeOfLogin: "google",
          verifier: "blok-capital",
          clientId: process.env.REACT_APP_GOOGLE_ID,
        },
      } as SubVerifierDetailsParams;

      await coreKitInstance.loginWithOauth(verifierConfig);

      if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
        console.log(
          "required more shares, please enter your backup/ device factor key, or reset account unrecoverable once reset, please use it with caution]"
        );
        setResetaccount(true);
      }

      if (coreKitInstance.provider) {
        setProvidercorkit(coreKitInstance.provider);
        setWeb3AuthSigner(coreKitInstance.provider);
      }
      //setCoreKitInstance(coreKitInstance);
      //google - tkey - w3a
      //new-blokc-verifier //

      //setOpenModuleGoogle(true);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call

      const userdata: UserData =
        coreKitInstance.getUserInfo() as unknown as UserData;
      setUserinfo(userdata);
      console.log("userdata", userdata);

      //localStorage.setItem("userRole", selectedOption);

      //setIsConnected(true);

      setsucessfullogin(true);

      //router.push(Routes.wallet.root);
    } catch (error) {
      console.log(error);
      setResetaccount(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (web3) {
      const getChainID = async () => {
        if (!web3) {
          console.log("web3 not initialized yet");
          return;
        }
        const chainId = await web3.eth.getChainId();
        console.log("chainid--->", chainId);
        return chainId;
      };
      getChainID();
    }
  }, [web3]);

  const logout = async () => {
    // console.log("---------------");

    if (!coreKitInstance) {
      throw new Error("coreKitInstance not found");
    }
    await coreKitInstance.logout();
    setWeb3AuthSigner(undefined);
    setOpenModule(false);
    setsucessfullogin(false);
    setAccountAddress(undefined);
    setCode(undefined);
  };

  const popupopen = () => {
    if (code === undefined) {
      setAccesscodeopen(true);
    } else {
      setOpenModule(true);
    }
  };

  const close1 = () => {
    setOpenModule(false);
    setIsLoading(false);
    setCode(undefined);
  };

  const close = () => {
    // console.log("close-----------------");
    setOpenModule(false);
  };

  const finalsubmit = () => {
    setOpenModule(false);
    setIsConnected(true);
  };

  const notify = () => {
    if (accountAddress) {
      void clipboardCopy(accountAddress);
      setcopy(true);
      setTimeout(() => {
        setcopy(false);
      }, 100);
    }
  };

  const openAccount = () => {
    setOpenModule(true);
  };

  const criticalResetAccount = async (): Promise<void> => {
    // This is a critical function that should only be used for testing purposes
    // Resetting your account means clearing all the metadata associated with it from the metadata server
    // The key details will be deleted from our server and you will not be able to recover your account
    if (!coreKitInstance) {
      throw new Error("coreKitInstance is not set");
    }
    //@ts-ignore
    // if (selectedNetwork === WEB3AUTH_NETWORK.MAINNET) {
    //   throw new Error("reset account is not recommended on mainnet");
    // }
    await coreKitInstance.tKey.storageLayer.setMetadata({
      privKey: new BN(coreKitInstance.metadataKey!, "hex"),
      input: { message: "KEY_NOT_FOUND" },
    });
    console.log("reset");
    setResetaccount(false);
    setProvidercorkit(null);
  };

  useEffect(() => {
    if (web3AuthSigner) {
      const sessionKey = LocalAccountSigner.privateKeyToAccountSigner(
        generatePrivateKey()
      );
      const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const contractAddresseth = "0x377Fdd37E53E5036aBeA0e8b2203AE6750812446";
      const ecdcfunction = async () => {
        if (web3AuthSigner) {
          const ecdsaProvider = await ECDSAProvider.init({
            projectId: process.env.REACT_APP_ZERODEV_PROJECT_ID as string,
            owner: getRPCProviderOwner(web3AuthSigner),
          });
          const address = await ecdsaProvider.getAddress();
          console.log("address-->", address);

          setAccountAddress(address);
          setEcdsaProvider(ecdsaProvider);

          const sessionKeyProvider = await SessionKeyProvider.init({
            // ZeroDev project ID
            projectId: process.env.REACT_APP_ZERODEV_PROJECT_ID as string,
            // The master signer
            defaultProvider: ecdsaProvider,
            // the session key (private key)
            opts: {
              paymasterConfig: {
                onlySendSponsoredTransaction: true,
                policy: "VERIFYING_PAYMASTER",
              },
            },
            sessionKey,
            // session key parameters
            sessionKeyData: {
              // The UNIX timestamp at which the session key becomes valid
              validAfter: 0,
              // The UNIX timestamp at which the session key becomes invalid
              validUntil: 0,
              // The permissions
              // Each permission can be considered a "rule" for interacting with a particular
              // contract/function.  To create a key that can interact with multiple
              // contracts/functions, set up one permission for each.

              permissions: [
                getPermissionFromABI({
                  // Target contract to interact with
                  target: contractAddress,
                  // Maximum value that can be transferred.  In this case we
                  // set it to zero so that no value transfer is possible.
                  valueLimit: BigInt(0),
                  // Contract abi
                  abi: contractABI,
                  // Function name
                  functionName: "transfer",
                  // An array of conditions, each corresponding to an argument for
                  // the function.
                  args: [null, null],
                }),
              ],

              paymaster: zeroAddress,
            },
          });

          const sessionethProvider = await SessionKeyProvider.init({
            projectId: process.env.REACT_APP_ZERODEV_PROJECT_ID as string,
            defaultProvider: ecdsaProvider,
            opts: {
              paymasterConfig: {
                onlySendSponsoredTransaction: true,
                policy: "VERIFYING_PAYMASTER",
              },
            },
            sessionKey,
            sessionKeyData: {
              validAfter: 0,
              validUntil: 0,
              permissions: [],
              paymaster: zeroAddress,
            },
          });

          setSessionKeyProvider(sessionKeyProvider);
          setSessionethProvider(sessionethProvider);
          console.log("sessionKeyProvider------>", sessionKeyProvider);
        }

        // console.log("sessionKeyProvider", sessionKeyProvider);
      };
      ecdcfunction();
    }
  }, [web3AuthSigner]);

  useEffect(() => {
    if (accountAddress) {
      const sendApiRequest = async () => {
        const dataToSend = {
          wallet: accountAddress,
          email: userinfo?.email,
          userName: userinfo?.name,
          accessCode: accesscode,
        };
        console.log("dataToSend--->", dataToSend);
        try {
          await axios
            .post(`https://core.blokcapital.io/presaleRegister`, dataToSend)
            .then((response) => {
              console.log("API Response:", response);

              console.log("message-->", response);
            });
        } catch (error) {
          console.error("API Error:", error);
        }
      };
      sendApiRequest();
    }
  }, [accountAddress]);

  return (
    <>
      {isConnected && web3AuthSigner && code ? (
        <>
          <Button
            // walletAddress
            className="connect-wallet-btn"
            variant={"connect"}
            onClick={openAccount}
          >
            <p className="md:block hidden">
              {/*{accountAddress
                ? accountAddress.slice(0, 3) + "...." + accountAddress.slice(-3)
                : ""}*/}
              Hi, {name ? name.slice(0, 7) : ""}
            </p>
            <p className="md:hidden block">
              {/*{accountAddress
                ? accountAddress.slice(0, 3) + "...." + accountAddress.slice(-3)
                : ""}*/}
              Hi
            </p>
            {/*<span className="short-address">{accountAddress}</span>*/}
            <FiChevronDown />
          </Button>

          {openModule && (
            <ModalWrapper className="gittu-modal">
              <div className="overlay"></div>
              <div className="gittu-modal-content">
                <div className="gittu-modal-header">
                  <div>{""}</div>
                  <div onClick={close} role="button">
                    <CgClose className="" size={20} />
                  </div>
                </div>
                <div className=" ">
                  <div className="flex flex-col">
                    <div className="flex">
                      <p className="text-center">
                        Hi {userinfo?.name}, your blockchain smart wallet
                        account with Address:
                      </p>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <h5 className="">
                        {accountAddress
                          ? accountAddress.slice(0, 5) +
                            "...." +
                            accountAddress.slice(-5)
                          : null}
                      </h5>
                      <button onClick={notify} className="">
                        {copy ? <MdDone size={15} /> : <LucideCopy size={15} />}
                      </button>
                    </div>
                    <div className="mb-3 ">
                      <Tokenbalance />
                    </div>
                    <div>
                      <div>
                        <a
                          href={`https://etherscan.io/address/${accountAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="d-flex flex-column justify-content-center mb-2"
                        >
                          <Button
                            className="connect-wallet-btn"
                            variant={"connect"}
                            type="submit"
                          >
                            View on Etherscan Link
                          </Button>
                        </a>
                        <div
                          onClick={logout}
                          className="d-flex flex-column justify-content-center"
                        >
                          <Button variant={"connect"} role="button">
                            LogOut
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalWrapper>
          )}
        </>
      ) : (
        <>
          <div onClick={() => popupopen()}>
            <Button className="connect-wallet-btn" variant={"connect"}>
              Login
            </Button>
          </div>
          {openModule && (
            <ModalWrapper className="gittu-modal">
              <div className="overlay"></div>
              <div className="gittu-modal-content">
                {accountAddress ? null : (
                  <>
                    <div className="gittu-modal-header">
                      <div>{""}</div>
                      <div onClick={() => close1()} role="button">
                        <CgClose className="" size={20} />
                      </div>
                    </div>
                    <div className="mx-auto text-center">
                      <p className="mb-3">
                        Thank you for entering the Private Sale Zone, now login
                        with your gmail to whitelist yourself for the sale and
                        create your onchain smart wallet account.
                      </p>
                      {/* {resetaccount ? (
                        <>
                          <h4
                            onClick={() => criticalResetAccount()}
                            className="d-flex flex-column justify-content-center"
                            role="button"
                          >
                            <Button
                              className="connect-wallet-btn"
                              variant={"connect"}
                            >
                              {isLoading && (
                                <div className="">
                                  <div
                                    className="spinner-border "
                                    role="status"
                                  >
                                    <span className="sr-only"></span>
                                  </div>
                                </div>
                              )}
                              <div
                                className={`flex gap-2 justify-center items-center text-center${
                                  isLoading ? "disabled" : " "
                                }`}
                              >
                                <span>
                                  <FcGoogle size={28} />
                                </span>{" "}
                                Reset Acoount
                              </div>
                            </Button>
                          </h4>{" "}
                        </>
                      ) : ( */}
                      <h4
                        onClick={() => !isLoading && login()}
                        className={`d-flex flex-column justify-content-center `}
                        role="button"
                      >
                        <Button
                          className={`connect-wallet-btn `}
                          variant={"connect"}
                        >
                          {isLoading && (
                            <div className="">
                              <div
                                className="spinner-border h-5 w-5"
                                role="status"
                              >
                                <span className="sr-only"></span>
                              </div>
                            </div>
                          )}
                          <div
                            className={` flex gap-2 justify-center items-center text-center `}
                          >
                            <FcGoogle size={28} />
                            Login with Google
                          </div>
                        </Button>
                      </h4>
                      {/* )} */}

                      {/*<button onClick={criticalResetAccount}>BackupShare</button>*/}
                      {/*<button onClick={keyDetails}>Get Key Details</button>*/}
                      <div className="d-flex flex-column justify-content-center">
                        {isLoading && !accountAddress && (
                          <p className="text-warning mx-auto mt-3">
                            Please Wait...{" "}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="d-flex flex-column justify-content-center">
                  {sucessfullogin && accountAddress && (
                    <div className="flex flex-column">
                      <div className="">
                        <div className="text-center">
                          <h5 className="mb-3 ">
                            Congratulations {userinfo?.name}, you have just
                            created your blockchain smart wallet account with
                            Address:{" "}
                            {accountAddress
                              ? accountAddress.slice(0, 5) +
                                "...." +
                                accountAddress.slice(-5)
                              : null}
                            <button
                              onClick={notify}
                              className="mx-2 !bg-transparent rounded-5"
                            >
                              {copy ? (
                                <MdDone size={15} />
                              ) : (
                                <LucideCopy size={15} />
                              )}
                            </button>
                          </h5>
                          {/*<p className="d-flex flex-column justify-content-center">/*/}
                          {/* <span>
                            {accountAddress
                              ? accountAddress.slice(0, 5) +
                                "...." +
                                accountAddress.slice(-5)
                              : null}
                          </span> */}

                          {/*<span className="">{userinfo.name}</span>*/}
                          {/*</p>*/}
                          <div className="d-grid gap-2 mt-3">
                            <a
                              href={`https://etherscan.io/address/${accountAddress}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="d-flex flex-column justify-content-center"
                            >
                              <Button
                                className="connect-wallet-btn"
                                variant={"connect"}
                                type="submit"
                              >
                                <p className="mx-2">View on Etherscan Link</p>
                              </Button>
                            </a>
                            <div
                              className="d-flex flex-column justify-content-center"
                              onClick={finalsubmit}
                            >
                              <Button
                                className="connect-wallet-btn"
                                variant={"connect"}
                              >
                                <p className="mx-2">
                                  Continue to the Private Sale
                                </p>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ModalWrapper>
          )}
        </>
      )}
      {accesscodeopen && (
        <Accesscode
          setCode={setCode}
          setAccesscodeopen={setAccesscodeopen}
          setOpenModule={setOpenModule}
        />
      )}
    </>
  );
};

export default ConnectWalletButton;
