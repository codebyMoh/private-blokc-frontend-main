// CodeChecker.js

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import { CgClose } from "react-icons/cg";
import ModalWrapper from "../modal/Modal.style";
import Button from "../button/Button";
import { useWeb3AuthSigner } from "../contex/web3-auth-signer";
interface ConnectWalletButtonProps {
  setCode: (code: string | undefined) => void;

  setAccesscodeopen: (isOpen: boolean) => void;

  setOpenModule: (module: boolean) => void;
}
// eslint-disable-next-line react/prop-types
const Accesscode: React.FC<ConnectWalletButtonProps> = ({
  setCode,
  setAccesscodeopen,
  setOpenModule,
}) => {
  const [userInput, setUserInput] = useState("");
  const staticCode = [
    "ERC4337",
    "WALLET",
    "BUNDLER",
    "PROTOCOL",
    "DEFI",
    "BLOKC",
    "BUILDER",
    "SESSION",
    "GARDEN",
  ];
  const { setAccesscode } = useWeb3AuthSigner();
  const [codeMatchednot, setCodeMatchednot] = useState(false);
  const [loding, setLoding] = useState(false);

  const handleInputChange = (event: any) => {
    setUserInput(event.target.value);
    setCode(event.target.value);
    setAccesscode(event.target.value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    setCodeMatchednot(false);
    setLoding(true);

    if (staticCode.includes(userInput)) {
      // Show loading state
      // Simulate loading for 2 seconds before closing the modal
      //setTimeout(() => {
      setLoding(false);
      setAccesscodeopen(false);
      setOpenModule(true);
      //}, 100);
    } else {
      // Simulate loading for 2 seconds before setting the "Code not matched" state
      //setTimeout(() => {
      setLoding(false);
      setCodeMatchednot(true);
      //}, 1000);
    }
  };

  return (
    <ModalWrapper className="gittu-modal">
      <div className="overlay"></div>
      <div className="gittu-modal-content">
        <div className="gittu-modal-header">
          <div>{""}</div>
          <div onClick={() => setAccesscodeopen(false)} role="button">
            <CgClose className="" size={20} />
          </div>
        </div>
        <div className="mb-3">
          <h5>Please enter the Private Round Access Code :</h5>
        </div>
        <div>
          <form
            onSubmit={handleFormSubmit}
            className="d-flex flex-column justify-content-center"
          >
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="mb-3"
            />
            <Button
              className="connect-wallet-btn mb-3"
              variant={"connect"}
              type="submit"
            >
              {loding ? (
                <div
                  className="spinner-border connect-wallet-btn "
                  role="status"
                >
                  <span className="sr-only"></span>
                </div>
              ) : (
                <p>Submit</p>
              )}
            </Button>

            {/*{codeMatched && <p className='text-center text-success' >Code matched!</p>}*/}
            {codeMatchednot && (
              <p className="text-center text-danger">
                Incorrect Code, Please enter right code.
              </p>
            )}
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Accesscode;
