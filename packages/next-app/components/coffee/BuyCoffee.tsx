import { useEffect, useState, useCallback, FormEvent } from "react";
import { useContract, useSigner } from "wagmi";
import { ethers } from "ethers";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

export const BuyCoffee = () => {
  const chainId = Number(NETWORK_ID);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: signerData } = useSigner();

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
      // setLoading(true);
      // const tx = await greeterContract.setGreeting(newGreeter);
      // await tx.wait();
      // setNewGreeter("");
      // fetchData();
      const tx = await coffeeContract.buyCoffee(
        name ? name : "anon",
        message ? message : "Enjoy your coffee!",
        { value: ethers.utils.parseEther(amount.toString()) }
      );
      tx.wait(1).then(() => {
        console.log("tx complete");
        setName("");
        setMessage("");
        setAmount(0);
      });
    } catch (error) {
      setError("txn failed, check contract");
      setLoading(false);
    }
  };

  return (
    <div className="border-2 p-4 rounded-lg shadow-lg max-w-2xl m-auto mt-8">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="p-2 font-medium text-gray-800">Amount</label>
          <div className="flex">
            <input
              type="number"
              value={amount}
              min={0}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border p-2 my-2 rounded-lg"
            />
            <span className="my-auto ml-4 font-medium text-gray-800">
              MATIC
            </span>
          </div>
        </div>
        <div>
          <label className="p-2 font-medium text-gray-800">Message</label>
          <textarea
            placeholder="message"
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 my-2 rounded-lg w-full resize-none"
          />
        </div>

        <button className="border p-2 rounded-lg m-4 bg-sky-500" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};
