import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ProfileHeader } from "@/components/profile";
import { BuyCoffee, MemoList } from "@/components/coffee";

import { ChatIcon } from "@heroicons/react/outline";

import { CoffeeCup } from "@/images/CoffeeCup";

const HandlePage: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const [nav, setNav] = useState("list");

  return (
    <div className="">
      <div className="flex shadow-lg rounded-lg mx-auto border-2 max-w-2xl h-2/10">
        <ProfileHeader handle={handle as string} />
      </div>
      <div className="h-6/10 relative">
        <div className=" w-full">
          <div className="flex w-full justify-center rounded-lg mx-4 px-8 sm:mx-auto  max-w-2xl">
            <button
              onClick={() => setNav("list")}
              className=" mx-8 sm:mx-20 p-1 rounded text-coffee-900 uppercase font-bold text-lg hover:bg-coffee-50"
            >
              <ChatIcon className="inline-block w-8 h-8" />
            </button>
            <button
              onClick={() => setNav("buy")}
              className=" mx-8 sm:mx-20 p-1 rounded text-coffee-900 uppercase font-bold text-lg hover:bg-coffee-50"
            >
              <CoffeeCup />
            </button>
          </div>
        </div>
        <div className="border-2 rounded-lg shadow-lg max-w-2xl m-auto h-6/10 overflow-y-scroll border-coffee-800 shadow-coffee-700">
          {nav === "list" && <MemoList />}
          {nav === "buy" && <BuyCoffee />}
        </div>
      </div>
    </div>
  );
};

export default HandlePage;
