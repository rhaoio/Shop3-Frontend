import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setAccount } from "./store/accReducer";
import Main from "./components/main";
import Navbar from "./components/navbar";

//This section contains all contract information required for functionality
//Contract ABI
import Inventory from "./utils/Inventory.json";

//Contract Address
import CONTRACT_ADDRESS from "./utils/contractAddress";

interface IAppProps {
  tab?: string;
}

const App = ({ tab }: IAppProps) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const currAccount = useAppSelector((state) => state.account);

  const dispatch = useAppDispatch();

  console.log(currAccount.address, "IN APPJS");

  const checkIfWalletIsConnected = async () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum }: any = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    /*
     * User can have multiple authorized accounts, we grab the first one if its there!
     */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);

      setCurrentAccount(account);
      dispatch(setAccount(accounts[0]));
      //setupEventListener();

      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain " + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4";
      if (chainId !== rinkebyChainId) {
        alert("You are not connected to the Rinkeby Test Network!");
      }
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className=" flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="bg-red-200 h-full ">
        <Main />
      </div>
    </div>
  );
};

export default App;
