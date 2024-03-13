import React, { useEffect, useContext, createContext, Children } from "react";
import { useAddress, useContract, useMetamask, useContractWrite, useContractEvents, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract("0xDF843E98174370B41093bc2fd41fCA76b82900aD");
  const address = useAddress();
  const connect = useMetamask();

  const Online_course = "Online Course Dapp";
  const { mutateAsync: listProperty, isLoading } = useContractWrite(contract, "listProperty");

  const createPropertyFunction = async (form) => {
    const {
      propertyTitle,
      description,
      category,
      price,
      images,
      propertyAddress,
    } = form;
    try {
      const data = await listProperty({ args: [address, price, propertyTitle, category, images, propertyAddress, description] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
const getPropertiesData =async()=>{
  try{
const properties= await contract.call("getAllProperties");
console.log(properties);
  }catch(error){
    console.log("Error while loading data", error);
  }
}
  return (
    <StateContext.Provider value={{ address, connect, contract, Online_course, createPropertyFunction, getPropertiesData,}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
