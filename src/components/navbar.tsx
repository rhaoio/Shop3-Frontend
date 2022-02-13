import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setAccount } from "../store/accReducer";

const Navbar = () => {
  const currAccount = useAppSelector((state) => state.account);
  console.log(currAccount.address, "NAVBAR");
  const dispatch = useAppDispatch();
  const handleConnect = async () => {
    try {
      const { ethereum }: any = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      dispatch(setAccount(accounts[0]));
    } catch (error) {
      console.log(error);
    }
  };

  const renderNotConnectedContainer = () => {
    return (
      <button
        className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        onClick={handleConnect}
      >
        Connect to Wallet
      </button>
    );
  };

  return (
    <nav className="bg-gray-800 relative flex  items-center h-14">
      <div className="flex items-center m-6 bg-red-300 h-10 ">
        <a
          className="inline-flex text-white bg-red-500 whitespace-nowrap"
          href="/"
        >
          LOGO
        </a>
      </div>
      <div className=" text-white bg-red-500 whitespace-nowrap ml-2">
        Inventory3
      </div>
      <div className="absolute right-0 flex items-center justify-center ">
        {currAccount.address === "" ? (
          renderNotConnectedContainer()
        ) : (
          <div className="flex items-center h-8 px-2 m-6 text-base text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
            {String(currAccount.address.substring(0, 5)).concat(
              "...",
              currAccount.address.substring(
                currAccount.address.length,
                currAccount.address.length - 4
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
