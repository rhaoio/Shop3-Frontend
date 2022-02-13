import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CONTRACT_ADDRESS from "../utils/contractAddress";
import { useAppSelector } from "../hooks";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { BigNumber } from "ethers";

const Transactions = () => {
  const [transactions, setTransactions] = useState<
    TransactionResponse[] | null
  >();
  const currAcc = useAppSelector((state) => state.account);
  const convertBigNum = (_bigNum: BigNumber) => {
    let bigNum = ethers.BigNumber.from(_bigNum);
    return bigNum.toNumber();
  };
  const getPastTxs = async () => {
    try {
      //   const provider2 = ethers.providers.EtherscanProvider(
      //     "rinkeby",
      //     "QK5Z25JYYQBUD5RGZMR8UYF1FCKKHG53YV"
      //   );
      const provider = new ethers.providers.EtherscanProvider(
        4,
        "QK5Z25JYYQBUD5RGZMR8UYF1FCKKHG53YV"
      );
      const signer = currAcc.address;

      let history = await provider.getHistory(signer);

      //filter for only interactions with CONTRACT_ADDRESS

      let filtered = history.filter((tx) => tx.to === CONTRACT_ADDRESS);

      console.log(filtered);
      setTransactions(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPastTxs();
  }, []);

  return (
    <div className=" bg-white">
      <table className="w-full border-2 border-lime-500 table-fixed ">
        <thead>
          <tr className="">
            <th className="">hash</th>
            <th>timestamp</th>
            <th>nonce</th>
            <th>contract address</th>
            <th>user address</th>
            <th>gas price</th>
            <th>Etherscan Link</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="text-center border-y"></tr> */}
          {transactions?.map((tx) => {
            return (
              <tr className="text-center border-y" key={`${tx.hash}`}>
                <td className="text-sm truncate">{tx.hash}</td>
                <td className="text-sm truncate">
                  {tx.timestamp && new Date(tx.timestamp * 1000).toUTCString()}
                </td>
                <td className="text-sm truncate">{tx.nonce}</td>
                <td className="text-sm truncate">{tx.to}</td>
                <td className="text-sm truncate">{tx.from}</td>
                <td className="text-sm truncate">
                  {tx.gasPrice && convertBigNum(tx.gasPrice)}
                </td>
                <td className="underline decoration-sky-500">
                  <a
                    href={`https://rinkeby.etherscan.io/tx/${tx.hash}`}
                    target="_blank"
                  >
                    Etherscan
                  </a>
                </td>
              </tr>
            );
          })}
          {!transactions && (
            <tr>
              <td>
                <div>NO TXS</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
