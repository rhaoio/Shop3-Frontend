import React, { useEffect, useState } from "react";
import SideBar from "./sidebar";
import AddButton from "./buttons/addbutton";
import Table from "./table";
import InputCollection from "./inputcollection";
import { useAppSelector } from "../hooks";
import { ethers } from "ethers";
import Inventory from "../utils/Inventory.json";
const CONTRACT_ADDRESS = "0x6be954CAC436c9B015C59900b6366c168E194c0F";

//Main.jsx should handle all elements from sidebar -> table information

const Main = () => {
  const [productList, setProductList] = useState<IProduct[] | null>([]);
  const currAccount = useAppSelector((state) => state.account);
  console.log(currAccount.address, "MAIN");
  const getAllProducts = async () => {
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

        let txn = await connectedContract.getProductCount();

        const prodCount = ethers.BigNumber.from(txn);

        // console.log(
        //   `Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`
        // );
        let _prodList: IProduct[] = [];
        if (prodCount.toNumber() > 0) {
          for (let i = 0; i < prodCount.toNumber(); i++) {
            let getProductTxn = await connectedContract.getProductById(i);
            _prodList.push(getProductTxn);
          }

          console.log(_prodList[0]);
          setProductList(_prodList);
        }
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <main className="bg-red-500 h-full">
      <div className="h-full flex flex-row">
        <SideBar />
        <div className="bg-blue-500 w-full m-2">
          {/*RENDER ALL OTHER CONTENT HERE */}
          <div className="flex flex-col ">
            <Table productList={productList} />
          </div>
          <div className="bg-red-200 flex flex-col ">
            <AddButton contractAddress={CONTRACT_ADDRESS} />
            <InputCollection />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
