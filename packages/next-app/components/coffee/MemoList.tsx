import { useEffect, useState } from "react";
import { useContract, useSigner } from "wagmi";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

import { UserInfo } from "@/components/coffee";
import { CoffeeCup } from "@/images/CoffeeCup";

export const MemoList = () => {
  const chainId = Number(NETWORK_ID);
  const { data: signerData } = useSigner();
  const [memos, setMemos] = useState([]);

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
      const fetchData = async () => {
        const memos = await coffeeContract.getMemos();
        // console.log("memos", memos);
        setMemos(memos);
      };
      fetchData();
    }
  }, [signerData]);

  if (memos.length === 0)
    return (
      <div className="m-auto mt-16 p-4">
        <div className="flex justify-center text-coffee-900 py-8">
          <CoffeeCup size="128px" />
        </div>
        <div className="text-4xl font-bold text-center text-coffee-900">
          be the first to buy a coffee
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
          <UserInfo name={memo.from} message={memo.message} />
        </div>
      ))}
    </div>
  );
};
