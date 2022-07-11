import { useState, useEffect } from "react";
import { useContract, useSigner } from "wagmi";
import { ethers } from "ethers";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

import { Button } from "@/components/elements";

interface UserSettingsProps {
  contractAddress: string;
}

export const UserSettings = ({ contractAddress }: UserSettingsProps) => {
  const chainId = Number(NETWORK_ID);
  const [userBalance, setUserBalance] = useState("0");

  const { data: signerData } = useSigner();

  const allContracts = contracts as any;
  const coffeeABI = allContracts[chainId][0].contracts.BuyMeCoffee.abi;

  const coffeeContract = useContract({
    addressOrName: contractAddress,
    contractInterface: coffeeABI,
    signerOrProvider: signerData,
  });

  useEffect(() => {
    if (signerData) {
      console.log("coffeeContract", coffeeContract);
      const fetchData = async () => {
        try {
          // const _owner = await coffeeContract._owner();
          // console.log("_owner", _owner);

          // const owner = await coffeeContract.owner();
          // console.log("owner", owner);

          const balance = await coffeeContract.checkBalance();
          console.log("balance", balance);
          const balanceInEther = ethers.utils.formatEther(balance);
          setUserBalance(balanceInEther);
        } catch (error) {
          // console.log("error", error);
        }
      };
      fetchData();
    }
  }, [signerData]);

  const handleWithdraw = async () => {
    console.log("withdrawing");
    const tx = await coffeeContract.withdrawTips({
      gasLimit: "1000000",
    });
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
