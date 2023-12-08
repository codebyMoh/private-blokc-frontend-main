import HeaderWrapper from "./Header.style";
import MobileMenu from "../mobileMenu/MobileMenu";
import blokc from "../../../assets/images/Fulllogo.png";
import { HiMenuAlt3 } from "react-icons/hi";
//import Whitepaper from "../../../assets/pdf/whitepaper.pdf";
import { useState } from "react";
import DropdownDemo from "../dropdownDemo/DropdownDemo";
import ConnectWalletButton from "../../button/ConnectWalletButton";
import React from "react";
import TransakWidget from "../../transak/Transak";
import { useWeb3AuthSigner } from "../../contex/web3-auth-signer";

const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);

  const {
    code,
    isConnected,
    setOpenModule,
    setAccesscodeopen,
    transakopen,
    setTransak,
  } = useWeb3AuthSigner();

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  const buytoken = () => {
    if (code === undefined) {
      setAccesscodeopen(true);
    } else if (isConnected === false) {
      setOpenModule(true);
    } else {
      setTransak(true);
    }
    // console.log("transakopen:", transakopen); // Check if it's being set to true
  };

  return (
    <>
      <HeaderWrapper className="header-section">
        <div className="container">
          <div className="gittu-header-content">
            <div className="gittu-header-left">
              <a className="gittu-header-logo " href="/">
                <img
                  src={blokc}
                  alt="blokc"
                  className="md:h-12 md:w-full h-8 w-auto"
                />
                {/*BLOK Capital*/}
              </a>

              <DropdownDemo />
            </div>
            <div className="gittu-header-right">
              <div className="gittu-header-menu-toggle">
                <button className="menu-toggler" onClick={handleMobileMenu}>
                  <HiMenuAlt3 />
                </button>
              </div>
              <div className="gittu-header-right-menu">
                <div
                  className="gittu-header-menu"
                  role="button"
                  onClick={() => buytoken()}
                >
                  <p>Buy Crypto</p>
                </div>

                <ConnectWalletButton />
                {/*<Loginbutton />*/}
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>

      {transakopen && <TransakWidget />}
      {isMobileMenu && <MobileMenu mobileMenuHandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
