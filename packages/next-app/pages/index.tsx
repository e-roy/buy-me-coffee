import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
  const router = useRouter();

  return (
    <div className={""}>
      <Head>
        <title>Buy Me Coffee</title>
        <meta name="description" content="Generated by npx create-web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>Landing page</div>
        <div>
          <button
            className="m-4 py-2 px-4 bg-blue-600 text-gray-100 font-bold rounded-xl"
            onClick={() => router.push("/random")}
          >
            random profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
