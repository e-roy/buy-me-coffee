import { useState, FormEvent } from "react";
import { useContract, useSigner, useAccount } from "wagmi";
import { ethers } from "ethers";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

import { UserInfo } from "@/components/coffee";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const BuyCoffee = () => {
  const chainId = Number(NETWORK_ID);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("have a coffee on me ");
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: signerData } = useSigner();
  const { data: accountData } = useAccount();

  const allContracts = contracts as any;
  const coffeeAddress = allContracts[chainId][0].contracts.BuyMeCoffee.address;
  const coffeeABI = allContracts[chainId][0].contracts.BuyMeCoffee.abi;

  const coffeeContract = useContract({
    addressOrName: coffeeAddress,
    contractInterface: coffeeABI,
    signerOrProvider: signerData || undefined,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const tx = await coffeeContract.buyCoffee(
        name ? accountData?.address : "anon",
        message,
        { value: ethers.utils.parseEther(amount.toString()) }
      );
      tx.wait(1).then(() => {
        console.log("tx complete");
        setName("");
        setMessage("");
        setAmount(0);
        setLoading(false);
      });
    } catch (error) {
      setError("txn failed, check contract");
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="m-auto py-16 p-4 flex justify-center">
        <div className="text-2xl font-medium font-gray-700">
          shipping coffee...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="m-auto py-16 p-4 flex justify-center">
        <div className="text-2xl font-medium font-gray-700"> {error}</div>
      </div>
    );

  return (
    <div className="m-auto mt-2 p-4">
      <UserInfo name={accountData?.address || "anon"} />
      <div className="mx-4">
        <div className="flex w-full pt-2 space-x-2 justify-between">
          <button
            onClick={() => setAmount(1)}
            className={classNames(
              amount === 1
                ? "bg-coffee-900 text-coffee-100 font-bold"
                : "bg-coffee-700 font-medium  hover:border-coffee-900",
              "w-32 rounded-full px-4 py-2 border-2 border-coffee-200 text-coffee-200"
            )}
          >
            <p>☕</p>
            <p>1 MATIC</p>
          </button>
          <button
            onClick={() => setAmount(5)}
            className={classNames(
              amount === 5
                ? "bg-coffee-900 text-coffee-100 font-bold"
                : "bg-coffee-700 font-medium  hover:border-coffee-900",
              "w-32 rounded-full px-4 py-2 border-2 border-coffee-200 text-coffee-200"
            )}
          >
            <p>☕☕</p>
            <p>5 MATIC</p>
          </button>
          <button
            onClick={() => setAmount(10)}
            className={classNames(
              amount === 10
                ? "bg-coffee-900 text-coffee-100 font-bold"
                : "bg-coffee-700 font-medium  hover:border-coffee-900",
              "w-32 rounded-full px-4 py-2 border-2 border-coffee-200 text-coffee-200"
            )}
          >
            <p>☕☕☕</p>
            <p>10 MATIC</p>
          </button>
        </div>
      </div>
      <form className="my-4" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="p-2 font-medium text-gray-800">Message</label>
          <textarea
            placeholder="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 my-2 rounded-lg w-full resize-none border-coffee-900 shadow-lg shadow-coffee-700"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="w-32 rounded-full px-4 py-2 text-gray-300 bg-coffee-800 hover:bg-coffee-900 border-2 border-coffee-200 hover:border-coffee-900"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
};
