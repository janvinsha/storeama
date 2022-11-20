import React, { useState, useEffect } from "react";

import { ethers } from "ethers";
import axios from "axios";

import Web3Modal from "@0xsequence/web3modal";

import WalletConnect from "@walletconnect/web3-provider";

import styled from "styled-components";
import { motion } from "framer-motion";
import Header from "./Header";

import AppContext from "../context/AppContext";
import { GlobalStyle } from "../components";

import { Wallet, providers } from "ethers";

import storeamaAbi from "../storeama-contract/storeama_abi.json";
const STOREAMA_CONTRACT_ADDRESS = "0xBaFDdDCd96e18Bedd401f781c4020E8677898828";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

interface Props {
  children: any;
}

let web3Modal;

if (typeof window != "undefined") {
  let providerOptions = {
    walletconnect: {
      package: WalletConnect,
    },
  };
  web3Modal = new Web3Modal({
    providerOptions,
    cacheProvider: true,
    theme: `dark`,
  });
}

const privateKey = process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY;
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const tblWallet = new Wallet(privateKey);
const tblProvider = new providers.AlchemyProvider("maticmum", alchemyKey);

const filesTable = "files_80001_1316";
const Layout = ({ children }: Props) => {
  const [theme, setTheme] = useState(true);

  const [currentAccount, setCurrentAccount] = useState();
  const [provider, setProvider] = useState();
  const [chainId, setChainId] = useState();
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem("theme") || "true"));
  }, []);
  const changeTheme = () => {
    setTheme(!theme);
    localStorage.setItem("theme", JSON.stringify(!theme));
  };

  const poll = async () => {
    if (web3Modal.cachedProvider) {
      let wallet = await web3Modal.connect();
      const tProvider = new ethers.providers.Web3Provider(wallet);
      setProvider(tProvider);
      const accounts = await tProvider?.listAccounts();
      console.log("CHECKING ACCOUNT ADDRESS", accounts[0]);
      //   console.log('Accounts', accounts);
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        console.log("Found an authorized account:", account);
        const signer = tProvider.getSigner();
        let chainID = await signer.getChainId();
        setChainId(chainID);
        console.log("THIS IS THE CHSAIN ID", chainID);
        if (chainID == 80001) {
        } else {
          console.log("Wrong chain ID");
        }
      } else {
        console.log("No authorized account found");
      }
    } else {
      setCurrentAccount();
    }
  };

  const connectWallet = async () => {
    if (web3Modal.cachedProvider) {
      web3Modal.clearCachedProvider();
    }
    try {
      const wallet = await web3Modal.connect();

      const tProvider = new ethers.providers.Web3Provider(wallet);

      setProvider(tProvider);
      const accounts = await tProvider.listAccounts();
      const signer = tProvider.getSigner();
      setCurrentAccount(accounts[0]);
      poll();
    } catch (error) {
      console.log("CONNECT ERROR HERE", error);
    }
  };

  const disconnectWallet = async () => {
    const wallet = await web3Modal.connect();
    web3Modal.clearCachedProvider();
    setCurrentAccount(null);
  };
  useEffect(() => {
    poll();
  }, []);

  const getFiles = async () => {
    try {
      if (currentAccount) {
        const wallet = await web3Modal.connect();
        const tProvider = new ethers.providers.Web3Provider(wallet);
        const signer = tProvider.getSigner();
        const connectedContract = new ethers.Contract(
          STOREAMA_CONTRACT_ADDRESS,
          storeamaAbi.abi,
          signer
        );

        let files = await connectedContract.getDocuments(currentAccount);
        console.log("this are the files", files);
        return files;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getFile = async (id) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = async (file) => {
    try {
      const wallet = await web3Modal.connect();
      const tProvider = new ethers.providers.Web3Provider(wallet);
      const signer = tProvider.getSigner();
      const connectedContract = new ethers.Contract(
        STOREAMA_CONTRACT_ADDRESS,
        storeamaAbi.abi,
        signer
      );

      let tx = await connectedContract.createDocument(
        file?.name,
        file?.type,
        file?.description,
        file?.url,
        { value: "2" }
      );
      console.log("CHECK FILE WELL", tx);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledLayout>
      <AppContext.Provider
        value={{
          theme,
          changeTheme,
          connectWallet,
          currentAccount,
          disconnectWallet,
          chainId,
          getFiles,
          getFile,
          uploadFile,
        }}
      >
        <GlobalStyle theme={theme} />
        <Header />
        {children}
      </AppContext.Provider>
    </StyledLayout>
  );
};

const StyledLayout = styled(motion.div)``;
export default Layout;
