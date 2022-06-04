import { useState, useEffect } from "react";
import { useContract, useSigner } from "wagmi";
import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";
// import { ethers } from "ethers";

import { Avatar } from "@/components/elements/Avatar";

interface ProfileHeaderProps {
  handle: string;
}

export const ProfileHeader = ({ handle }: ProfileHeaderProps) => {
  const chainId = Number(NETWORK_ID);
  const { data: signerData } = useSigner();
  // const [userBalance, setUserBalance] = useState("0");

  const allContracts = contracts as any;
  const coffeeAddress = allContracts[chainId][0].contracts.BuyMeCoffee.address;
  const coffeeABI = allContracts[chainId][0].contracts.BuyMeCoffee.abi;

  const coffeeContract = useContract({
    addressOrName: coffeeAddress,
    contractInterface: coffeeABI,
    signerOrProvider: signerData || undefined,
  });

  // console.log("coffeeContract", coffeeContract);
  useEffect(() => {
    if (signerData) {
      console.log("coffeeContract", coffeeContract);
      // const fetchData = async () => {
      //   const balance = await coffeeContract.checkBalance();
      //   // convert back to ether
      //   const balanceInEther = ethers.utils.formatEther(balance);
      //   console.log("balanceInEther", balanceInEther);
      //   setUserBalance(balanceInEther);
      // };
      // fetchData();
    }
  }, [signerData]);

  return (
    <div className="w-full flex justify-center items-center">
      <div className=" absolute flex justify-center items-center">
        <img
          className="object-cover h-20 w-20 rounded-full"
          src="https://images.unsplash.com/photo-1484608856193-968d2be4080e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
          alt=""
        />
      </div>

      <div className="h-56 bg-coffee-800 rounded-3xl shadow-md w-full">
        <div className="h-1/2 w-full flex justify-between items-baseline px-3"></div>

        <div className="bg-coffee-50 text-coffee-900 font-medium shadow-lg shadow-coffee-700 h-1/2 w-full rounded-3xl flex flex-col pt-6">
          <div className="w-full flex justify-between px-6">
            <div className="flex flex-col justify-center">
              <h1 className="font-bold">{handle}</h1>
              <h1 className="text-sm">location:</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              {/* <h1 className="text-xs">Balance</h1>
              <h1 className="text-sm">{userBalance}</h1> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
