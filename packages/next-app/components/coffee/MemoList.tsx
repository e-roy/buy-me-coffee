import { useEffect, useState } from "react";
import { useContract, useProvider } from "wagmi";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

import { UserInfo } from "@/components/coffee";
import { CoffeeCup } from "@/images/CoffeeCup";

interface MemoListProps {
  contractAddress: string;
}

export const MemoList = ({ contractAddress }: MemoListProps) => {
  const chainId = Number(NETWORK_ID);
  const provider = useProvider();
  const [memos, setMemos] = useState([]);

  const allContracts = contracts as any;
  const coffeeABI = allContracts[chainId][0].contracts.BuyMeCoffee.abi;

  const coffeeContract = useContract({
    addressOrName: contractAddress,
    contractInterface: coffeeABI,
    signerOrProvider: provider,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memos = await coffeeContract.getMemos();
        // console.log("memos", memos);
        setMemos(memos);
      } catch (e) {
        // console.log(e);
      }
    };
    fetchData();
  }, []);

  if (memos.length === 0)
    return (
      <div className="m-auto mt-16 p-4">
        <div className="flex justify-center text-coffee-800 py-8">
          <CoffeeCup size="128px" />
        </div>
        <div className="text-4xl font-bold text-center text-coffee-800">
          be the first to buy me a coffee
        </div>
        <div></div>
      </div>
    );

  return (
    <div className="p-2">
      {memos.map((memo: any, index: number) => (
        <div
          className="border mb-4 p-2 rounded-lg bg-coffee-50 border-coffee-500 shadow-lg shadow-coffee-700"
          key={index}
        >
          <UserInfo
            name={memo.name}
            address={memo.from}
            message={memo.message}
          />
        </div>
      ))}
    </div>
  );
};
