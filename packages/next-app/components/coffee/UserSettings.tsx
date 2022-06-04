import { useState, useEffect } from "react";
import { useContract, useSigner } from "wagmi";
import { ethers } from "ethers";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

import { Button } from "@/components/elements";

export const UserSettings = () => {
  const chainId = Number(NETWORK_ID);
  const [userBalance, setUserBalance] = useState("0");

  const { data: signerData } = useSigner();

  const allContracts = contracts as any;
  const coffeeAddress = allContracts[chainId][0].contracts.BuyMeCoffee.address;
  const coffeeABI = allContracts[chainId][0].contracts.BuyMeCoffee.abi;

  const coffeeContract = useContract({
    addressOrName: coffeeAddress,
    contractInterface: coffeeABI,
    signerOrProvider: signerData || undefined,
  });

  useEffect(() => {
    if (signerData) {
      // console.log("coffeeContract", coffeeContract);
      const fetchData = async () => {
        const balance = await coffeeContract.checkBalance();
        const balanceInEther = ethers.utils.formatEther(balance);
        setUserBalance(balanceInEther);
      };
      fetchData();
    }
  }, [signerData]);

  const handleWithdraw = async () => {
    console.log("withdrawing");
    const tx = await coffeeContract.withdrawTips();
    tx.wait(1).then((res: any) => {
      console.log("res", res);
      console.log("tx complete");
    });
  };

  return (
    <div className="m-auto mt-6 p-4">
      <div className="flex justify-between">
        <div className="my-auto text-coffee-900 font-medium">
          Your current balance is : {userBalance} MATIC
        </div>
        <Button onClick={() => handleWithdraw()}>withdrawal</Button>
      </div>
    </div>
  );
};
