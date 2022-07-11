import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { NULL_ADDRESS } from "@/config";

import { useContract, useProvider, useAccount, useSigner } from "wagmi";
import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

import { useEnsData } from "@/hooks";

import { ProfileHeader, NoProfile } from "@/components/profile";
import {
  BuyCoffee,
  MemoList,
  UserSettings,
  ThankYou,
} from "@/components/coffee";

import { MotionFadeIn, MotionSlideDown } from "@/components/motion";

import { ChatIcon, CogIcon } from "@heroicons/react/outline";
import { CoffeeCup } from "@/images/CoffeeCup";

const HandlePage: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const chainId = Number(NETWORK_ID);
  const provider = useProvider();
  const { data: accountData } = useAccount();

  const [nav, setNav] = useState("list");
  const [isLoading, setIsLoading] = useState(true);
  const [isProfile, setIsProfile] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState(NULL_ADDRESS);

  const [coffeeAddress, setCoffeeAddress] = useState(NULL_ADDRESS);

  const { avatar } = useEnsData({ checkName: handle as string });

  const allContracts = contracts as any;
  const factoryAddress =
    allContracts[chainId][0].contracts.CoffeeFactory.address;
  const factoryABI = allContracts[chainId][0].contracts.CoffeeFactory.abi;

  // console.log("factoryAddress", factoryAddress);

  const factoryContract = useContract({
    addressOrName: factoryAddress,
    contractInterface: factoryABI,
    signerOrProvider: provider,
  });

  // console.log(provider);

  useEffect(() => {
    // console.log(handle);
    if (handle) {
      const checkHandle = async () => {
        // console.log(factoryContract);
        const coffeeContractAddress = await factoryContract.searchHandles(
          handle
        );
        // console.log(
        //   "coffee Contract Address FROM HANDLE",
        //   coffeeContractAddress
        // );
        if (coffeeContractAddress === NULL_ADDRESS) {
          // console.log("handle not found");
          setIsLoading(false);
        } else {
          // console.log("handle found");
          setIsLoading(false);
          setIsProfile(true);
          setCoffeeAddress(coffeeContractAddress);
        }
      };
      checkHandle();
    }
  }, [handle]);

  const coffeeABI = allContracts[chainId][0].contracts.BuyMeCoffee.abi;

  const coffeeContract = useContract({
    addressOrName: coffeeAddress,
    contractInterface: coffeeABI,
    signerOrProvider: provider,
  });

  useEffect(() => {
    if (coffeeAddress !== NULL_ADDRESS) {
      const fetchData = async () => {
        try {
          // console.log("coffee Contract", coffeeContract);
          const contractOwnerAddress = await coffeeContract.owner();
          setOwnerAddress(contractOwnerAddress);
          // console.log("contract Owner Address", contractOwnerAddress);
        } catch (e) {
          // console.log(e);
        }
      };
      fetchData();
    }
  }, [coffeeAddress]);

  const handleNavChange = () => {
    setNav("thankyou");
    setTimeout(() => {
      setNav("list");
    }, 3000);
  };

  return (
    <div className="">
      <MotionFadeIn>
        <div className="flex rounded-xl mx-auto sm:border-2 border-coffee-200 max-w-2xl h-2/10">
          <ProfileHeader
            handle={handle as string}
            avatar={avatar}
            contractAddress={coffeeAddress}
            userAddress={ownerAddress}
          />
        </div>
      </MotionFadeIn>

      {isLoading ? (
        <div className="h-6/10 relative">
          <div className="w-full -mt-2">
            <div className="flex justify-center rounded-lg mx-4 px-8 sm:mx-auto max-w-2xl">
              loading...
            </div>
          </div>
        </div>
      ) : (
        <>
          {isProfile ? (
            <div className="h-6/10 relative">
              <MotionFadeIn>
                <div className="w-full -mt-2">
                  <div className="flex justify-center rounded-lg mx-4 px-8 sm:mx-auto max-w-2xl">
                    <button
                      onClick={() => setNav("list")}
                      className="mx-8 sm:mx-20 text-coffee-800 hover:text-coffee-900"
                    >
                      <ChatIcon className="inline-block w-8 h-8" />
                    </button>
                    {accountData?.address && (
                      <button
                        onClick={() => setNav("buy")}
                        className="mx-8 sm:mx-20 text-coffee-800 hover:text-coffee-900"
                      >
                        <CoffeeCup />
                      </button>
                    )}
                    {ownerAddress === accountData?.address && (
                      <button
                        onClick={() => setNav("settings")}
                        className="mx-8 sm:mx-20 text-coffee-800 hover:text-coffee-900"
                      >
                        <CogIcon className="inline-block w-8 h-8" />
                      </button>
                    )}
                  </div>
                </div>
              </MotionFadeIn>

              <MotionFadeIn>
                <div className="mt-6 border-2 rounded-lg shadow-lg max-w-2xl mx-2 sm:mx-auto h-6/10 overflow-y-scroll bg-coffee-50 shadow-coffee-700">
                  {nav === "list" && (
                    <MotionSlideDown>
                      <MemoList contractAddress={coffeeAddress} />
                    </MotionSlideDown>
                  )}
                  {nav === "buy" && (
                    <MotionSlideDown>
                      <BuyCoffee
                        contractAddress={coffeeAddress}
                        onComplete={() => handleNavChange()}
                      />
                    </MotionSlideDown>
                  )}
                  {nav === "settings" && (
                    <MotionSlideDown>
                      <UserSettings contractAddress={coffeeAddress} />
                    </MotionSlideDown>
                  )}
                  {nav === "thankyou" && (
                    <MotionFadeIn>
                      <ThankYou />
                    </MotionFadeIn>
                  )}
                </div>
              </MotionFadeIn>
            </div>
          ) : (
            <MotionFadeIn>
              <div className="mt-12 border-2 rounded-lg shadow-lg max-w-2xl mx-2 sm:mx-auto h-6/10 overflow-y-scroll bg-coffee-50 shadow-coffee-700">
                <NoProfile />
              </div>
            </MotionFadeIn>
          )}
        </>
      )}
    </div>
  );
};

export default HandlePage;
