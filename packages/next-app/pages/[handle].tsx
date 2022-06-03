import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { BuyCoffee, MemoList } from "@/components/coffee";

const HandlePage: NextPage = () => {
  const router = useRouter();
  const { handle } = router.query;
  const [nav, setNav] = useState("list");

  return (
    <div className="">
      <div className="text-center">handle : {handle}</div>
      <div className="border border-red-600 h-8/10 relative mt-6">
        {nav === "list" && <MemoList />}
        {nav === "buy" && <BuyCoffee />}
        <div className="bottom-0 absolute w-full">
          <div className="flex shadow-lg rounded-lg mx-4 md:mx-auto border-2 max-w-md md:max-w-2xl">
            <button
              onClick={() => setNav("list")}
              className="w-full border-2 p-1 rounded text-gray-700 uppercase font-semibold text-lg hover:bg-gray-200"
            >
              list
            </button>
            <button
              onClick={() => setNav("buy")}
              className="w-full border-2 p-1 rounded text-gray-700 uppercase font-semibold text-lg hover:bg-gray-200"
            >
              buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandlePage;
