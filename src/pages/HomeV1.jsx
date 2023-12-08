import React, { useEffect } from "react";
import Header from "../components/header/v1/Header";
import Banner from "../sections/banner/v1/Banner";
import { useWeb3AuthSigner } from "../components/contex/web3-auth-signer";
import axios from "axios";

const HomeV1 = () => {
  return (
    <div className="">
      <Header />
      <Banner />
    </div>
  );
};

export default HomeV1;
