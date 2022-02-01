import React from "react";
import { BigNumber, ethers } from "ethers";

interface Props {
  productList: IProduct[] | null;
}

const Table = ({ productList }: Props) => {
  const convertBigNum = (_bigNum: BigNumber) => {
    let bigNum = ethers.BigNumber.from(_bigNum);
    return bigNum.toNumber();
  };

  return (
    <div className=" bg-blue-50">
      <table className="w-full border-2 border-lime-500 table-fixed ">
        <thead>
          <tr className="">
            <th className="">Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className="text-center border-y"></tr> */}
          {productList &&
            productList.map((p: IProduct, index: number) => {
              return (
                <tr className="text-center border-y" key={`${p.name}+${index}`}>
                  <td>{p.name}</td>
                  <td>{convertBigNum(p.qty)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
