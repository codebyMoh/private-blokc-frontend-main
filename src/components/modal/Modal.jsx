/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Button from "../button/Button";

import ModalWrapper from "./Modal.style";
import EthIcon from "../../assets/images/token/eth.png";
import UsdtIcon from "../../assets/images/token/usdt.png";
import { CgClose } from "react-icons/cg";
import useWallet from "../hooks/use-wallet";
import { useWeb3AuthSigner } from "../contex/web3-auth-signer";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from "axios";
import { contractABI } from "../../abi/abi";
import { encodeFunctionData, parseEther } from "viem";
import { ClockLoader } from "react-spinners";
import sucess from "../../assets/images/checked.png";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ethcontractABI from "../../abi/ethtransferabi.json";
import Web3 from "web3";
const Modal = ({ setPpendeposit, setIsModalOpen, ...props }) => {
  const [selectedOption, setSelectedOption] = useState(1);
  const [paymentAmount, setPaymentAmount] = useState(1000);
  const {
    accountAddress,
    sessionKeyProvider,
    ethprice,
    setEthprice,
    setOpenModule,
    usdtbalace,
    sessionethProvider,
    userinfo,
  } = useWeb3AuthSigner();
  //console.log(userinfo);
  const [titleText, setTitleText] = useState("USDT");
  const [titleText1, setTitleText1] = useState("ETH");
  const [selectedImg, setSelectedImg] = useState(UsdtIcon);
  const [selectedImg1, setSelectedImg1] = useState(EthIcon);

  const [tokenname, setTOkenname] = useState(titleText);
  const [hash, setHash] = useState("");

  const { data } = useWallet();
  const [isChecked, setChecked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [errorbalace, setErrorbalace] = useState(false);
  const [minbalanceerror, setminbalanceerror] = useState(false);
  const [incheckbox, setIncheckbox] = useState(false);
  const [responsemsg, setResponsemsg] = useState("");
  const [responsepopup, setResponsepopup] = useState(false);
  const [transfererror, setTransfererror] = useState(false);
  const [sucesstrs, setSucesstrs] = useState(false);
  // console.log("paymentAmount-->", paymentAmount);
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };
  const ethbalace = data?.totalBalance;


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchEthPrice = async () => {
    try {
      // const response = await axios.get(
      //   "https://api.etherscan.io/api?module=stats&action=ethprice"
      // );

      // console.log("ethPriceData-->", response.data.result.ethusd);
      // const ethp = response.data.result.ethusd;
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/ethereum?market_data=true"
      );
      const price = response.data.market_data.current_price.usd;
      setEthprice(price);
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    }
  };

  useEffect(() => {
    let intervalId;

    if (selectedOption === 2) {
      // Call fetchEthPrice immediately when selectedOption is 2
      fetchEthPrice();

      // Set up an interval to call fetchEthPrice every 1 minute
      intervalId = setInterval(() => {
        fetchEthPrice();
      }, 1000);
    } else {
      intervalId = setInterval(() => {
        fetchEthPrice();
      }, 1000);
    }

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchEthPrice, selectedOption]);

  const handleOptionClick = (option, e) => {
    if (option === 1) {
      setSelectedOption(1);
      setPaymentAmount(1000);
      setTOkenname(e);
    } else {
      setSelectedOption(2);
      setPaymentAmount(1000 / ethprice);
      setTOkenname(e);
    }
  };

  // console.log(ethprice);

  const handlePaymentInput = (event) => {
    const enteredValue = event.target.value;
    setPaymentAmount(enteredValue); // Always set the payment amount

    if (!isNaN(enteredValue) && enteredValue >= 1000) {
      // Update the state only if the value is valid
      setPaymentAmount(enteredValue);
    }

    // if (
    //   (selectedOption === 1 && enteredValue > usdtbalace) ||
    //   (selectedOption === 2 && enteredValue > ethbalace)
    // ) {
    //   setErrorbalace(true);
    // } else if (
    //   (selectedOption === 1 && enteredValue < 1000) ||
    //   (selectedOption === 2 && enteredValue < (ethprice * 1) / 1000)
    // ) {
    //   setminbalanceerror(true);
    // } else {
    //   setErrorbalace(false);
    //   setminbalanceerror(false);
    // }

    if (
      (selectedOption === 1 && enteredValue > usdtbalace) ||
      (selectedOption === 2 && enteredValue > ethbalace)
    ) {
      setErrorbalace(true);
    } else {
      setErrorbalace(false);
    }

    if (
      (selectedOption === 1 && enteredValue < 0.001) ||
      (selectedOption === 2 && enteredValue < 0.000001)
    ) {
      setminbalanceerror(true);
    } else {
      setminbalanceerror(false);
    }
  };
  const openDeposite = () => {
    setPpendeposit(true);
    setIsModalOpen(false);
  };

  const amountblokc =
    selectedOption === 1
      ? (paymentAmount * 100).toFixed(2)
      : (paymentAmount * 100 * ethprice).toFixed(2);

  const sendApiRequest = async () => {
    const dataToSend = {
      address: accountAddress,
      BLOKCAmount: amountblokc,
      inputToken: tokenname,
      inputTokenAmount: paymentAmount,
      userName: userinfo.name,
      useremail: userinfo.email,
    };
    console.log("dataToSend--->", dataToSend);
    try {
      await axios
        .post(`https://core.blokcapital.io/buyBLOKC`, dataToSend)
        .then((response) => {
          console.log("message-->", response.data);
          setResponsemsg(response?.data?.data);
          if (response) {
            setSucesstrs(true);
          }
        });
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const transfer = async () => {
    setTransfererror(false);
    console.log("----transfer----");
    if (selectedOption === 1 && !errorbalace && !minbalanceerror) {
      console.log("------------trtansfer usdt----------");
      const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const to = "0xE61AD5D50C5Cb5562980235eA823872C135F9440";
      const value = paymentAmount * 1000000;
      try {
        setResponsepopup(true);
        const { hash } = await sessionKeyProvider.sendUserOperation({
          target: contractAddress,
          data: encodeFunctionData({
            abi: contractABI,
            functionName: "transfer",
            args: [to, value],
          }),
        });
        const hash1 = await sessionKeyProvider.waitForUserOperationTransaction(
          hash
        );

        console.log("-----hash1------>", hash1);
        setHash(hash1);

        console.log("----------------hash complet----------");
        // if (hash1) {
        //   const apikey = process.env.REACT_APP_ALCHEMY_API_KEY;
        //   const web3 = new Web3(new Web3.providers.HttpProvider(apikey));

        //   var receipt = web3.eth.getTransactionReceipt(hash1);
        //   console.log("receipt--->", (await receipt).status);
        //   setHashrecipe((await receipt).status);
        // }
        // console.log(hash1);
        console.log("----------------send api----------");

        sendApiRequest();

        console.log("----------------finale----------");
        setIncheckbox(false);
      } catch (error) {
        console.log(error);
        setSucesstrs(false);
        setTransfererror(true);
      }
      //} ///eth trasfer code
    } else if (selectedOption === 2 && !errorbalace && !minbalanceerror) {
      console.log("eth tranfer");

      const contractAddress = "0x377Fdd37E53E5036aBeA0e8b2203AE6750812446";
      const to = "0xE61AD5D50C5Cb5562980235eA823872C135F9440";
      const amount = parseEther(paymentAmount);
      console.log("ethvalue-->", amount);
      try {
        setResponsepopup(true);
        const { hash } = await sessionethProvider.sendUserOperation({
          target: to,
          data: "0x",
          value: amount,
        });
        // const { hash } = await sessionethProvider.sendUserOperation({
        //   target: contractAddress,
        //   data: encodeFunctionData({
        //     abi: ethcontractABI,
        //     functionName: "sendViaTransfer",
        //     args: [to, amount],
        //   }),
        // });
        const hash1 = await sessionethProvider.waitForUserOperationTransaction(
          hash
        );

        console.log("-----hash1------>", hash1);
        setHash(hash1);

        console.log("----------------hash complet----------");
        if (hash1) {
          sendApiRequest();
        }

        console.log("----------------finale----------");
        setIncheckbox(false);
      } catch (error) {
        console.log(error);
        setSucesstrs(false);
        setTransfererror(true);
      }
    }
  };

  const transferdata = () => {
    transfer();
    // setErrorbalace(false);
    // const usdtamount = usdtbalace;
    // const ethamount = ethbalace;
    // const inputvalue = selectedOption === 1 ? 0.1 : (ethprice * 1) / 1000;
    // if (selectedOption === 1 && inputvalue < usdtamount) {
    //   transfer();
    // } else if (selectedOption === 2 && inputvalue < ethamount) {
    //   transfer();
    // } else {
    //   setErrorbalace(true);
    // }
    //
  };

  // useEffect(() => {
  //   const hashfetch = async () => {
  //     const apikey = process.env.REACT_APP_ALCHEMY_API_KEY;
  //     const web3 = new Web3(new Web3.providers.HttpProvider(apikey));

  //     var receipt = web3.eth.getTransactionReceipt(
  //       "0xb613ac1e21ff8339527db73ea33db6e6feb527e35cf0b241e14a19e5300261bd"
  //     );
  //     console.log("receipt--->11", (await receipt).status);
  //   };
  //   hashfetch();
  // }, []);

  const tooltipStyle = {
    position: "relative",
    display: "inline-block",
    borderBottom: "1px dotted black",
  };

  const tooltipTextStyle = {
    visibility: showTooltip ? "visible" : "hidden",
    backgroundColor: "black",
    color: "#fff",
    textAlign: "center",
    borderRadius: "4px", // Adjusted border radius
    padding: "3px 0", // Adjusted padding
    fontSize: "12px", // Added font size
    position: "absolute",
    zIndex: 1,
    width: "200px", // Automatically adjust width based on content
  };

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  const checkbalace = () => {
    setResponsepopup(false);
    setIsModalOpen(false);
    setOpenModule(true);
  };

  return (
    <>
      <ModalWrapper className="gittu-modal" {...props}>
        <div className="overlay"></div>
        <div className="gittu-modal-content">
          <div className="gittu-modal-header">
            <h4 className="ff-orbitron text-white text-uppercase">
              Be an early investor
            </h4>
            <button onClick={() => setIsModalOpen(false)}>
              <CgClose />
            </button>
          </div>
          <div className="gittu-modal-body">
            <div className="mb-20">
              <div className="d-flex flex-row justify-content-between align-items-center">
                <div>
                  <h5 className="ff-outfit fw-600 text-white text-uppercase gap-1 flex ">
                    Balance : {selectedOption === 1 ? usdtbalace : ethbalace}
                    <span>{tokenname}</span>
                  </h5>
                </div>
                <div className="" onClick={openDeposite}>
                  <button className=" bg-slate-500 bg-opacity-25 md:px-10 px-3 py-2 md:text-xl text-sm rounded-full text-white" >
                    Deposit
                  </button>
                </div>
              </div>
            </div>
            <div className="input-group">
              <div className="flex justify-between items-center gap-2  w-full my-2">
                {/* one */}
                <div
                  className={`w-full flex justify-center items-center gap-2 border-2 rounded p-2 border-[#ffffff] border-opacity-40 bg-opacity-10 cursor-pointer text-white md:text-base text-xs  ${selectedOption === 1 ? "border-opacity-90" : ""
                    }`}
                  onClick={() => handleOptionClick(1, titleText)}
                >
                  {/* <StyledButton> */}
                  <img src={selectedImg} alt="icon" className="md:h-8 h-5" />
                  <span>{titleText}</span>
                  {/* </StyledButton> */}
                </div>
                {/* Two ETH*/}
                <div
                  className={`w-full flex justify-center items-center gap-2 border-2 rounded p-2 border-[#ffffff] border-opacity-40 bg-opacity-10 cursor-pointer text-white md:text-base text-xs  ${selectedOption === 2 ? "border-opacity-90" : ""
                    }`}
                  onClick={() => handleOptionClick(2, titleText1)}
                >
                  <img src={selectedImg1} alt="icon" className="md:h-8 h-5" />
                  <span>{titleText1}</span>
                </div>
              </div>
            </div>
            <div className="presale-item mb-25">
              <h6>You Pay</h6>
              <div className="input-group">
                <input
                  type="number"
                  min={selectedOption === 1 ? 1000 : 1000 / ethprice}
                  step="0.01"
                  name="payment-amount"
                  id="payment-amount"
                  placeholder={selectedOption === 1 ? 1000 : 1000 / ethprice}
                  value={ethprice && "1000" ? paymentAmount : null}
                  onChange={handlePaymentInput}
                />
                {errorbalace && (
                  <p className="text-sm text-red-600 px-2 ">
                    Insufficient fund
                  </p>
                )}
                {minbalanceerror && selectedOption === 1 && (
                  <p className="text-sm text-red-600 px-2 ">
                    Minimum buy value is 1000
                  </p>
                )}
                {minbalanceerror && selectedOption === 2 && (
                  <p className="text-sm text-red-600 px-2 ">
                    Minimum buy value is {1000 / ethprice}
                  </p>
                )}
              </div>
            </div>
            <div className="presale-item mb-25">
              <h6>You Receive ( {"BLOKC"} )</h6>
              <input
                type="text"
                name="get-amount"
                id="get-amount"
                placeholder="0" // Initially set to 0
                value={amountblokc} // Calculate and display the Get Amount
              />

              {/* <input
                type="text"
                name="get-amount"
                id="get-amount"
                placeholder="0" // Initially set to 0
                value={
                  selectedOption === 1
                    ? (paymentAmount * 100).toFixed(2)
                    : (paymentAmount * 100 * ethprice).toFixed(2)
                } // Calculate and display the Get Amount
              /> */}
              {/* {selectedOption === 1 ? (
                <input
                  type="text"
                  name="get-amount"
                  id="get-amount"
                  placeholder="0" // Initially set to 0
                  value={
                    selectedOption === 1
                      ? (paymentAmount * 100).toFixed(2)
                      : (paymentAmount * 100 * ethprice).toFixed(2)
                  } // Calculate and display the Get Amount
                />
              ) : (
                <input
                  type="text"
                  name="get-amount"
                  id="get-amount"
                  placeholder="0" // Initially set to 0
                  value={(paymentAmount * 100 * ethprice).toFixed(2)} // Calculate and display the Get Amount
                />
              )} */}
            </div>
            <ul className="token-info-list">
              <li>
                <div className="flex gap-1 justify-center items-center">
                  <p> 1 BLOKC Price </p>
                  {selectedOption === 2 ? (
                    <span
                      style={tooltipStyle}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <IoIosInformationCircleOutline />
                      <span style={tooltipTextStyle} className="w-full">
                        The price of ethereum comes from decentralised oracles.
                        Check{" "}
                        <a
                          href="https://data.chain.link/ethereum/mainnet/crypto-usd/eth-usd"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-700 text-sm"
                        >
                          here.
                        </a>
                      </span>
                    </span>
                  ) : null}
                </div>
                <p className="flex gap-2">
                  {selectedOption === 1 ? 0.01 : 1 / (ethprice * 100)}
                  <span>{tokenname}</span>
                </p>
              </li>
              {/* <li> */}
              {/* <p>Total Amount</p>
                <p>
                  {selectedOption === 1
                    ? (paymentAmount * 100).toFixed(2)
                    : ethprice
                    ? (paymentAmount * 100 * ethprice).toFixed(2)
                    : "calc"}
                </p> */}
              {/* </li> */}
            </ul>

            <div>
              <div className="flex items-center gap-2 my-3">
                <div>
                  <input type="checkbox" checked />
                </div>
                <div>
                  I have read, understood and agree to accept{" "}
                  <Link
                    to="/opportunity"
                    target="_blank"
                    className="underline underline-offset-2 text-blue-400 border-b-2 border-blue-400"
                  >
                    The Opportunity
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/terms-and-conditions"
                    target="_blank"
                    className="underline underline-offset-2 text-blue-400 border-b-2 border-blue-400"
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </div>

              <div className="d-flex flex-column justify-content-center">
                <Button
                  variant={props.variant === "v2" ? "gadient2" : "gradient"}
                  //onClick={buyToken}
                  className="btn-approve "
                  onClick={transferdata}
                >
                  {incheckbox ? (
                    <div className="spinner-border h-5 w-5" role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    "Approve"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ModalWrapper>

      {responsepopup && (
        <>
          <div>
            <ModalWrapper>
              <div className="overlay"></div>
              <div className="gittu-modal-content">
                <div className="gittu-modal-body">
                  {transfererror ? (
                    <>
                      <div className="flex flex-col gap-3 justify-center items-center mb-3">
                        <div className="flex flex-col gap-2 justify-center items-center">
                          <MdErrorOutline size={40} />
                          <p className="text-lg text-red-800">
                            Transaction Failed
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center gap-2 items-center text-center">
                        <Button
                          className="connect-wallet-btn"
                          variant={"connect"}
                          onClick={() => setResponsepopup(false)}
                        >
                          <span className="px-2">Pleasce try again</span>
                        </Button>
                      </div>
                    </>
                  ) : sucesstrs ? (
                    <>
                      <div className="flex flex-col gap-3 justify-center items-center mb-3">
                        <div className="flex flex-col gap-2 justify-center items-center">
                          <img src={sucess} alt="sucessicon" className="h-12" />
                          <p className="text-lg">Transaction Successful</p>
                        </div>
                        <div className="flex flex-col text-center">
                          <ul className="order-first">
                            <li className="text-lg">
                              You Received: {responsemsg.BLOKCAmount} BLOKC
                            </li>
                            <li className="text-lg">
                              You Paid: {responsemsg.inputTokenAmount}{" "}
                              {tokenname}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex justify-center gap-2 items-center text-center">
                        <Button
                          className="connect-wallet-btn"
                          variant={"connect"}
                          onClick={() => setResponsepopup(false)}
                        >
                          Buy More
                        </Button>
                        <Button
                          className="connect-wallet-btn"
                          variant={"connect"}
                          onClick={checkbalace}
                        >
                          Check Balance
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-3 justify-center items-center">
                        <div className="flex flex-col gap-2 justify-center items-center">
                          <ClockLoader color="#ffff" size={40} />
                          <p className="text-lg">Processing...</p>
                        </div>
                        <div className="flex flex-col text-center">
                          <p className="text-lg text-warning">Do Not Refresh</p>
                          <p>Your transaction is being processed...</p>
                          <p>
                            Ethereum transaction may take few minutes as well...
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </ModalWrapper>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
