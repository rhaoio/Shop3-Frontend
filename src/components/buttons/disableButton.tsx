import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Inventory from "../../utils/Inventory.json";

const CONTRACT_ADDRESS = "0x6be954CAC436c9B015C59900b6366c168E194c0F";

type Props = {
  contractAddress: String;
};

const AddButton = ({ contractAddress }: Props) => {
  const [testCount, setTestCount] = useState(0);

  const addClick = async () => {
    //send the contract a request
    try {
      const { ethereum }: any = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          Inventory.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");

        let addProdTxn = await connectedContract.addProduct("cutie", 69);

        console.log("Mining...please wait.");
        //setMiningState(true);
        await addProdTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${addProdTxn.hash}`
        );
        //setMiningState(false);

        let getProductTxn = await connectedContract.getProductCount();

        const bigNum = ethers.BigNumber.from(getProductTxn);
        console.log(bigNum.toNumber());

        setTestCount(bigNum.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      //setMiningState(false);
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="m-2">
      <div className="bg-white border-2">{testCount}</div>
      <button
        className="bg-white"
        onClick={() => {
          addClick();
        }}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddButton;
