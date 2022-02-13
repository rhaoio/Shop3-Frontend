import React from "react";
import { BigNumber, ethers } from "ethers";
import EditButton from "./buttons/editbutton";
import { useParams, useNavigate } from "react-router-dom";

interface Props {
  productList: IProduct[] | null;
}

const Table = ({ productList }: Props) => {
  const navigate = useNavigate();

  const convertBigNum = (_bigNum: BigNumber) => {
    let bigNum = ethers.BigNumber.from(_bigNum);
    return bigNum.toNumber();
  };
  const editClick = (_extId: string) => {
    navigate(`/addproducts/${_extId}`);
  };

  return (
    <div className=" bg-white">
      <table className="w-full border-2 border-lime-500 table-fixed ">
        <thead>
          <tr className="">
            <th className="">Product Name</th>
            <th>externalId</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
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
                  <td>{p.externalId}</td>
                  <td>price</td>
                  <td>{convertBigNum(p.qty)}</td>
                  <td>desc</td>
                  <td>loc</td>
                  <td>active</td>
                  <td>
                    <EditButton
                      onClick={() => {
                        editClick(p.externalId);
                      }}
                      externalId={p.externalId}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
