import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Inventory from "../utils/Inventory.json";

const CONTRACT_ADDRESS = "0x6be954CAC436c9B015C59900b6366c168E194c0F";

//Main.jsx should handle all elements from sidebar -> table information

const InputCollection = () => {
  const [productList, setProductList] = useState<IProduct[] | null>([]);
  const getAllProducts = async () => {
    // try {
    //   const { ethereum }: any = window;
    //   if (ethereum) {
    //     const provider = new ethers.providers.Web3Provider(ethereum);
    //     const signer = provider.getSigner();
    //     const connectedContract = new ethers.Contract(
    //       CONTRACT_ADDRESS,
    //       Inventory.abi,
    //       signer
    //     );
    //     let txn = await connectedContract.getProductCount();
    //     const prodCount = ethers.BigNumber.from(txn);
    //     // console.log("Mining...please wait.");
    //     // console.log(
    //     //   `Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`
    //     // );
    //     let _prodList: IProduct[] = [];
    //     for (let i = 0; i < prodCount.toNumber(); i++) {
    //       let getProductTxn = await connectedContract.getProductById(i);
    //       _prodList.push(getProductTxn);
    //     }
    //     console.log(_prodList[0]);
    //     setProductList(_prodList);
    //   } else {
    //     console.log("Ethereum object doesn't exist!");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div className=" h-full m-2 py-2">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form action="#" method="POST">
          <div className="shadow bg-white sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5  space-y-6 sm:p-6">
              <div className="grid grid-cols-1 gap-6 ">
                <div className="col-span-3 sm:col-span-2 ">
                  <label
                    htmlFor="product-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <div className="mt-1  ">
                    <input
                      type="text"
                      name="product-name"
                      id="product-name"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      placeholder="enter a product"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-3 sm:col-span-2">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="product-description"
                    name="product-description"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="enter a description for your product"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2 ">
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  externalID
                </label>
                <div className="mt-1  ">
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="enter a product"
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2 ">
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="mt-1  ">
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="enter a product"
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2 ">
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  QTY
                </label>
                <div className="mt-1  ">
                  <input
                    type="text"
                    name="product-name"
                    id="product-name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="enter a product"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputCollection;
