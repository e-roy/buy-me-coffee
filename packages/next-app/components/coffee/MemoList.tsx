import { useEffect, useState } from "react";
import { useContract, useSigner } from "wagmi";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

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

  if (memos.length === 0) return null;

  return (
    <div className="border-2 p-4 rounded-lg shadow-lg max-w-2xl m-auto">
      {memos.map((memo: any, index: number) => (
        <div className="border p-2 rounded-lg shadow-lg" key={index}>
          <div>name : {memo.name}</div>
          <div>message : {memo.message}</div>
        </div>
      ))}
    </div>
  );
};
