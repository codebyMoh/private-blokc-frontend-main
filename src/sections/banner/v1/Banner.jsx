import BannerWrapper from "./Banner.style";
import Countdown from "../../../components/countdown/Countdown";
import Progressbar from "../../../components/progressbar/Progressbar";
import Button from "../../../components/button/Button";

import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import Medium from "../../../assets/images/icons/medium.svg";
import Reddit from "../../../assets/images/icons/reddit.svg";
import Instagram from "../../../assets/images/icons/instagram.svg";
import Linkedin from "../../../assets/images/icons/linkedin.svg";

import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Data from "../../../assets/data/bannarV3";
import { useEffect } from "react";
import Deposite from "../../../components/modal/Deposite";
import { ToastContainer, toast } from "react-toastify";

import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import TransakWidget from "../../../components/transak/Transak";
import { useWeb3AuthSigner } from "../../../components/contex/web3-auth-signer";
import { alchemy } from "../../../utils/alchemy";
import MeshGradModal from "../../../assets/images/modal/overlay1.png";
// eslint-disable-next-line react/prop-types
const PopupWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #000; /* White background */
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff; /* Black text */
  z-index: 999;
  display: ${({ open }) => (open ? "block" : "none")};
  text-align: left; /* Adjust text alignment as needed */
  width: 300px; /* Adjust the width as needed */
  padding: 18px;
  /* Add background image styling */
  background-image: url(${MeshGradModal}); /* Replace with your desired background image */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

const PopupContent = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Move the icon to the right */
`;

const PopupText = styled.p`
  color: #fff;

  margin-top: 3px; /* Add a 3px gap between the icon and text */
`;

const Link = styled.a`
  color: #fff; /* Set link color to blue by default */
  text-decoration: underline; /* Remove the default underline */
  cursor: pointer;
  border-bottom: 1px solid white;
  transition: text-decoration 0.2s; /* Add a smooth transition effect */

  // &:hover {
  //   text-decoration: underline; /* Add underline on hover */
  // }
`;

const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    code,
    isConnected,
    setOpenModule,
    setAccesscodeopen,
    accountAddress,
    setusdtbalace,
    setBlokcbalace,
    setTotalblokc,
    totalblokc,
  } = useWeb3AuthSigner();
  const modalHandle = () => {
    if (code === undefined) {
      setAccesscodeopen(true);
    } else if (isConnected === false) {
      setOpenModule(true);
    } else {
      setIsModalOpen(true);
    }
  };
  const [opendeposit, setPpendeposit] = useState(false);
  const [stageEnd, setStageEnd] = useState(1703916000);
  const [showPopup, setShowPopup] = useState(false);
  const [transakopen, setTransak] = useState(false);
  const [persantage, setpersentage] = useState("");
  const blokcbuytoken = 10049960 - totalblokc;
  const tottalblokc = 10000000;
  useEffect(() => {
    if (totalblokc) {
      const totalpersantage = (
        ((10049960 - totalblokc) / 10000000) *
        100
      ).toFixed(1);
      setpersentage(totalpersantage);
    }

    setStageEnd(1703916000);
    // Automatically open the popup after 5 seconds
    setTimeout(() => {
      setShowPopup(true);
    }, 1000);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  }, [totalblokc]);

  const main = async () => {
    if (accountAddress) {
      // Wallet address
      const walletAddress = accountAddress;

      // USDT contract address
      const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const numDecimals = 6;

      // Get latest USDT balance
      let balance = await alchemy.core.getTokenBalances(walletAddress, [
        contractAddress,
      ]);
      balance = balance["tokenBalances"][0]["tokenBalance"];
      balance = (parseInt(balance) / 10 ** numDecimals).toFixed(2);
      // console.log("Balance:", balance, "USDT");
      setusdtbalace(balance);
    }
  };

  const main1 = async () => {
    if (accountAddress) {
      // Wallet address
      const walletAddress = accountAddress;

      // USDT contract address
      const contractAddress = "0x0a830e9F2BAa2Ebaf8d33C0806283dEA9C08952f";
      const numDecimals = 18;

      // Get latest USDT balance
      let balance = await alchemy.core.getTokenBalances(walletAddress, [
        contractAddress,
      ]);
      balance = balance["tokenBalances"][0]["tokenBalance"];
      balance = (parseInt(balance) / 10 ** numDecimals).toFixed(2);
      // console.log("Balance:", balance, "BLOKC");
      setBlokcbalace(balance);
    }
  };

  const totalblokcbalance = async () => {
    // Wallet address
    const walletAddress = "0x23874afc3e1992215f08d16ea7490dd8be56b518";

    // USDT contract address
    const contractAddress = "0x0a830e9F2BAa2Ebaf8d33C0806283dEA9C08952f";
    const numDecimals = 18;

    // Get latest USDT balance
    let balance = await alchemy.core.getTokenBalances(walletAddress, [
      contractAddress,
    ]);
    balance = balance["tokenBalances"][0]["tokenBalance"];
    balance = (parseInt(balance) / 10 ** numDecimals).toFixed(2);
    setTotalblokc(balance);
    // console.log("BalanceTOTAL:", balance, "BLOKC");
  };

  useEffect(() => {
    main();
    main1();
    totalblokcbalance();
  });

  return (
    <>
      <BannerWrapper>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-40 text-center">
                <div className="mb-20">
                  <h5 className="ff-outfit fw-600 text-white text-uppercase">
                    Private Sale Ends in{" "}
                  </h5>
                </div>
                <div className="mb-20 d-flex justify-content-center">
                  <Countdown endDate={stageEnd} font="orbitron" />
                </div>
                <div className="mb-20">
                  <h1 className="banner-title">
                    {Data.title}
                    <br />
                    {Data.titleExtra}
                  </h1>
                </div>
                <h5 className="ff-outfit text-white">{Data.subtitle}</h5>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8">
              {/* <div className="md:block hidden">
                <div className="mb-2 flex justify-between">
                  <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                    PRIVATE ROUND: {persantage}% SALE COMPLETED!
                  </h5>
                  <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                    {blokcbuytoken.toLocaleString(2)} OF{" "}
                    {tottalblokc.toLocaleString(2)} BLOKC SOLD
                  </h5>
                </div> */}
              {/* </div>
              <div className="md:hidden block">
                <div className="mb-2 flex flex-col justify-center items-center text-center">
                  <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                    PRIVATE ROUND: {persantage}% SALE COMPLETED!
                  </h5>
                  <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                    {blokcbuytoken.toLocaleString(2)} OF{" "}
                    {tottalblokc.toLocaleString(2)} BLOKC SOLD
                  </h5>
                </div>
              </div>
              <div className="mb-30">
                <Progressbar done={persantage} variant="dashed" />
              </div> */}
              <div className="mb-30 text-center">
                <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  1 BLOKC = 0.01 USDT
                </p>
                {/* <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  NEXT STAGE PRICE = 0.001 ETH
                </p> */}
              </div>
              <div className="mb-74 d-flex align-items-center justify-content-center">
                <Button variant="gradient" onClick={modalHandle}>
                  Buy now
                </Button>
              </div>
              <ul className="social-links">
                <li>
                  <a
                    href="https://t.me/BLOKCapital"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Telegram} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="http://twitter.com/blok_cap"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Twitter} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/blokcapital"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Medium} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="http://linkedin.com/company/blok-capital"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Linkedin} alt="icon" />
                  </a>
                </li>
                {/* <li>
                  <a
                    href="https://discord.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Discord} alt="icon" />
                  </a>
                </li> */}
                {/* <li>
                  <a
                    href="https://www.reddit.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Reddit} alt="icon" />
                  </a>
                </li> */}
                {/* <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Instagram} alt="icon" />
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </BannerWrapper>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setPpendeposit={setPpendeposit}
        />
      )}
      {opendeposit && (
        <Deposite
          setPpendeposit={setPpendeposit}
          setIsModalOpen={setIsModalOpen}
          setTransak={setTransak}
        />
      )}

      {transakopen && <TransakWidget setTransak={setTransak} />}
      <PopupWrapper open={showPopup}>
        <AiOutlineClose
          onClick={() => setShowPopup(false)}
          size={15}
          className="cursor-pointer"
        />
        <PopupContent>
          <PopupText>
            {" "}
            <Link href="https://private.blokcapital.io/" target="_blank">
              private.blokcapital.io
            </Link>{" "}
            is the only platform to buy BLOKC
          </PopupText>
        </PopupContent>
      </PopupWrapper>
    </>
  );
};

export default Banner;
