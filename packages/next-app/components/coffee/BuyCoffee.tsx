import { useState, FormEvent } from "react";
import { useContract, useSigner, useAccount } from "wagmi";
import { ethers } from "ethers";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

import { UserInfo, MotionHeader } from "@/components/coffee";
import { Button } from "@/components/elements";

import { TruckIcon, ExclamationCircleIcon } from "@heroicons/react/outline";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface BuyCoffeeProps {
  onComplete: () => void;
}

export const BuyCoffee = ({ onComplete }: BuyCoffeeProps) => {
  const chainId = Number(NETWORK_ID);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("have a coffee on me");
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
        onComplete();
      });
    } catch (error) {
      setError("txn failed, check contract");
      setLoading(false);
    }
  };

  if (loading)
    return (
      <MotionHeader>
        <div className="m-auto mt-16 p-4">
          <div className="flex justify-center text-coffee-900 py-8">
            <TruckIcon className="w-32 h-32" />
          </div>
          <div className="text-4xl font-bold text-center text-coffee-900">
            shipping coffee...
          </div>
          <div></div>
        </div>
      </MotionHeader>
    );

  if (error)
    return (
      <MotionHeader>
        <div className="m-auto mt-16 p-4">
          <div className="flex justify-center text-coffee-900 py-8">
            <ExclamationCircleIcon className="w-32 h-32" />
          </div>
          <div className="text-4xl font-bold text-center text-coffee-900">
            {error}
          </div>
          <div></div>
        </div>
      </MotionHeader>
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
                ? "bg-coffee-900 text-coffee-50 font-bold"
                : "bg-coffee-700 font-medium  hover:border-coffee-900",
              "w-32 rounded-full px-4 py-2 border-2 border-coffee-200 text-coffee-200 hover:text-coffee-50"
            )}
          >
            <p>☕</p>
            <p>1 MATIC</p>
          </button>
          <button
            onClick={() => setAmount(5)}
            className={classNames(
              amount === 5
                ? "bg-coffee-900 text-coffee-50 font-bold"
                : "bg-coffee-700 font-medium  hover:border-coffee-900",
              "w-32 rounded-full px-4 py-2 border-2 border-coffee-200 text-coffee-200 hover:text-coffee-50"
            )}
          >
            <p>☕☕</p>
            <p>5 MATIC</p>
          </button>
          <button
            onClick={() => setAmount(10)}
            className={classNames(
              amount === 10
                ? "bg-coffee-900 text-coffee-50 font-bold"
                : "bg-coffee-700 font-medium  hover:border-coffee-900",
              "w-32 rounded-full px-4 py-2 border-2 border-coffee-200 text-coffee-200 hover:text-coffee-50"
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
            className="border-2 p-2 my-2 rounded-lg w-full resize-none border-coffee-400 shadow-lg shadow-coffee-700 font-medium text-coffee-900 outline-none focus:border-coffee-700"
          />
        </div>
        <div className="flex justify-end px-4">
          <Button type="submit">submit</Button>
        </div>
      </form>
    </div>
  );
};
