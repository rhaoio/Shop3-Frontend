import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { ethers } from "ethers";
import Inventory from "../utils/Inventory.json";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CONTRACT_ADDRESS from "../utils/contractAddress";
import { StringMappingType } from "typescript";

//Main.jsx should handle all elements from sidebar -> table information
interface Props {
  productList: IProduct[];
}

const InputCollection = ({ productList }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodId, setProdId] = useState("");
  const [prodLocation, setProdLocation] = useState("");
  const [prodQty, setProdQty] = useState(0);
  const [product, setProduct] = useState<IProduct>({
    name: "",
    description: "",
    location: "",
    price: "",
    qty: "",
    externalId: "",
    id: "",
  });
  let { externalId } = useParams();
  const currAccount = useAppSelector((state) => state.account);

  const getProductToEdit = (_externalId: string, _productList: IProduct[]) => {
    let prodToEdit: IProduct = product;
    console.log(_productList, "prodList");

    const index = _productList.findIndex(
      (item) => item.externalId === _externalId
    );
    prodToEdit = { ..._productList[index] };
    //TODO: FIX PRICE WHEN CONTRACT UPDATED
    prodToEdit.price = 0;

    return prodToEdit;
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FormEvent<HTMLTextAreaElement>
  ) => {
    type ProductKeys = keyof IProduct;
    const eventId: ProductKeys = event.currentTarget.id as keyof IProduct;

    setProduct({ ...product, [eventId]: event.currentTarget.value });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //TODO: SUBMIT THE FORM AND SUBMIT A TX TO THE CHAIN
    event.preventDefault();
    console.log("SUBMITTING");
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

        let txn = await connectedContract.addProduct(
          product.externalId,
          product.name,
          product.qty,
          product.description,
          product.location
        );

        await txn.wait();

        console.log(txn);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //Find product by id,
    if (productList.length === 0) {
      navigate("/products");
    }
  }, []);

  useEffect(() => {
    //TODO: For a page refresh scenario - ALTERNATIVE SOLUTION IS TO CHECK FOR USER LOGIN AND THEN GRAB PRODUCT BY ID SINCE WE DO NOT HAVE PRODUCT LIST FROM PARENT
    //TODO: for a page refresh scenario - ANOTHER SOLUTION WOULD BE TO STORE IN REDUX TREE AND PERSIST THROUGH BROWSER REFRESH (not ideal)
    if (externalId) {
      console.log(productList, "productList inside If condition");
      let updatedProd: IProduct = getProductToEdit(externalId, productList);
      setProduct(updatedProd);
    }
  }, []);

  useEffect(() => {
    let inventoryContract: ethers.Contract;
    const onProductChanged = async () => {
      console.log("Product Changed");
    };
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      inventoryContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Inventory.abi,
        signer
      );

      //REMOVE TRY CATCH BLOCKS
      try {
        inventoryContract.on("ProductChanged", onProductChanged);
      } catch (error) {
        console.log("Event listener error ");
      }
    }
    return () => {
      if (inventoryContract) {
        try {
          inventoryContract.off("ProductChanged", onProductChanged);
        } catch (error) {}
      }
    };
  }, []);
  return (
    <div className=" h-full m-2 py-2">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit}>
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
                      id="name"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      placeholder="enter a product"
                      onChange={handleChange}
                      value={product.name}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2 ">
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <div className="mt-1  ">
                  <input
                    type="number"
                    name="product-price"
                    id="price"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="enter the product price (whole numbers only)"
                    onChange={handleChange}
                    value={product.price}
                  />
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
                    id="description"
                    name="description"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="enter a description for your product"
                    defaultValue={product.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2 ">
                <label
                  htmlFor="product-externalId"
                  className="block text-sm font-medium text-gray-700"
                >
                  externalID
                </label>
                <div className="mt-1  ">
                  <input
                    type="text"
                    name="product-externalId"
                    id="externalId"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="enter a productId"
                    onChange={handleChange}
                    value={product.externalId}
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2 ">
                <label
                  htmlFor="product-location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="mt-1  ">
                  <input
                    type="text"
                    name="product-location"
                    id="location"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="enter product location"
                    onChange={handleChange}
                    value={product.location}
                  />
                </div>
              </div>
              <div className="col-span-3 sm:col-span-2 ">
                <label
                  htmlFor="product-qty"
                  className="block text-sm font-medium text-gray-700"
                >
                  QTY
                </label>
                <div className="mt-1  ">
                  <input
                    type="number"
                    name="product-qty"
                    id="qty"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="enter product quantity"
                    onChange={handleChange}
                    value={product.qty}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save to Chain
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputCollection;
