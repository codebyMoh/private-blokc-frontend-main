import MobileMenuWrapper from "./MobileMenu.style";
import Logo from "../../../assets/images/Fulllogo.png";
import Telegram from "../../../assets/images/icons/telegram.svg";
import Medium from "../../../assets/images/icons/medium.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import Linkedin from "../../../assets/images/icons/linkedin.svg";
import { AiOutlineClose } from "react-icons/ai";

import Whitepaper from "../../../assets/pdf/whitepaper.pdf";
import ConnectWalletButton from "../../button/ConnectWalletButton";
import Button from "../../button/Button";
import { useWeb3AuthSigner } from "../../contex/web3-auth-signer";

const MobileMenu = ({ mobileMenuHandle }) => {
  const { code, isConnected, setOpenModule, setAccesscodeopen, setTransak } =
    useWeb3AuthSigner();
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
    <MobileMenuWrapper>
      <div className="gittu-mobile-menu-content">
        <div className="mobile-menu-top">
          <a className="" href="/">
            <img src={Logo} alt="Logo" height={200} width={200} />
          </a>
          <button className="mobile-menu-close" onClick={mobileMenuHandle}>
            <AiOutlineClose />
          </button>
        </div>

        <ul className="mobile-menu-list mb-40">
          <li>
            <a
              href="https://prototype.blokcapital.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Prototype
            </a>
          </li>
          <li>
            <a
              href="https://blokcapital.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </li>
          <li>
            <a
              href="https://docsend.com/view/qqzdvsv2q47g6t9y"
              target="_blank"
              rel="noopener noreferrer"
            >
              Whitepaper
            </a>
          </li>
          <li>
            <div
              className="gittu-header-menu"
              role="button"
              onClick={() => buytoken()}
            >
              <p>Buy Crypto</p>
            </div>
          </li>
        </ul>

        <ul className="mobile-social-links mb-40">
          <li>
            <a href="https://t.me/BLOKCapital" target="_blank" rel="noreferrer">
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
        </ul>

        {/* <ul className="mobile-menu-list mb-40">
          <li>
            <a href={Whitepaper} target="_blank" rel="noreferrer">
              Whitepaper
            </a>
          </li>
        </ul> */}

        <div className="">
          {" "}
          {/* <ConnectWalletButton /> */}
          <a href="/">
            <Button
              // walletAddress
              className="connect-wallet-btn"
              variant={"connect"}
            >
              Logout
            </Button>
          </a>
        </div>
      </div>
    </MobileMenuWrapper>
  );
};

export default MobileMenu;
