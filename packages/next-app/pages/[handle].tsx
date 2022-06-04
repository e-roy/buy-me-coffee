import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ProfileHeader } from "@/components/profile";
import {
  BuyCoffee,
  MemoList,
  UserSettings,
  ThankYou,
  MotionHeader,
  MotionCard,
} from "@/components/coffee";

import { ChatIcon, CogIcon } from "@heroicons/react/outline";
import { CoffeeCup } from "@/images/CoffeeCup";

const HandlePage: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const [nav, setNav] = useState("list");

  const handleNavChange = () => {
    console.log("nav change");
    setNav("thankyou");
    setTimeout(() => {
      setNav("list");
    }, 3000);
  };

  return (
    <div className="">
      <MotionHeader>
        <div className="flex rounded-xl mx-auto sm:border-2 border-coffee-200 max-w-2xl h-2/10">
          <ProfileHeader handle={handle as string} />
        </div>
      </MotionHeader>

      <div className="h-6/10 relative">
        <MotionHeader>
          <div className="w-full -mt-2">
            <div className="flex justify-center rounded-lg mx-4 px-8 sm:mx-auto max-w-2xl">
              <button
                onClick={() => setNav("list")}
                className="mx-8 sm:mx-20 text-coffee-800 hover:text-coffee-900"
              >
                <ChatIcon className="inline-block w-8 h-8" />
              </button>
              <button
                onClick={() => setNav("buy")}
                className="mx-8 sm:mx-20 text-coffee-800 hover:text-coffee-900"
              >
                <CoffeeCup />
              </button>
              <button
                onClick={() => setNav("settings")}
                className="mx-8 sm:mx-20 text-coffee-800 hover:text-coffee-900"
              >
                <CogIcon className="inline-block w-8 h-8" />
              </button>
            </div>
          </div>
        </MotionHeader>

        <MotionHeader>
          <div className="mt-6 border-2 rounded-lg shadow-lg max-w-2xl mx-2 sm:mx-auto h-6/10 overflow-y-scroll bg-coffee-50 shadow-coffee-700">
            {nav === "list" && (
              <MotionCard>
                <MemoList />
              </MotionCard>
            )}
            {nav === "buy" && (
              <MotionCard>
                <BuyCoffee onComplete={() => handleNavChange()} />
              </MotionCard>
            )}
            {nav === "settings" && (
              <MotionCard>
                <UserSettings />
              </MotionCard>
            )}
            {nav === "thankyou" && (
              <MotionHeader>
                <ThankYou />
              </MotionHeader>
            )}
          </div>
        </MotionHeader>
      </div>
    </div>
  );
};

export default HandlePage;
