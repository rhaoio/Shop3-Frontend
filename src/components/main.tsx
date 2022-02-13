import React, { useEffect, useState } from "react";
import SideBar from "./sidebar";
import Dashboard from "./dashboard";
import Table from "./table";
import InputCollection from "./inputcollection";
import { useAppSelector } from "../hooks";
import { ethers } from "ethers";
import Inventory from "../utils/Inventory.json";
import CONTRACT_ADDRESS from "../utils/contractAddress";
import { Routes, Route, useLocation } from "react-router-dom";
import Transactions from "./transactions";

//Main.jsx should handle all elements from sidebar -> table information

const Main = () => {
  const [productList, setProductList] = useState<IProduct[]>([]);
  const currAccount = useAppSelector((state) => state.account);
  const currentLocation = useLocation();

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
        <div></div>
        <div className="bg-blue-500 w-full m-2">
          {/*RENDER ALL OTHER CONTENT HERE */}
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/products"
              element={<Table productList={productList} />}
            />
            <Route path="/transactions" element={<Transactions />} />
            <Route
              path="/addproducts"
              element={<InputCollection productList={productList} />}
            >
              <Route
                path="/addproducts/:externalId"
                element={<InputCollection productList={productList} />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </main>
  );
};

export default Main;
