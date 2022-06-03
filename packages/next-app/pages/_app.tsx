import * as React from "react";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import "../styles/globals.css";

// Imports
import { chain, createClient, WagmiConfig, configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";

import { IS_ENV_PROD, IS_ENV_DEV } from "@/config";

import { useIsMounted } from "../hooks";

import { AppLayout } from "@/components/layout";

// Get environment variables
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
// const infuraId = process.env.NEXT_PUBLIC_INFURA_ID as string;

const hardhatChain: Chain = {
  id: 31337,
  name: "Hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Hardhat",
    symbol: "HARD",
  },
  network: "hardhat",
  rpcUrls: {
    default: "http://127.0.0.1:8545",
  },
  testnet: true,
};

const networks = [];
if (IS_ENV_PROD) {
  // networks.push(chain.polygon);
  networks.push(chain.polygonMumbai);
}

if (IS_ENV_DEV) {
  networks.push(chain.polygonMumbai);
  networks.push(hardhatChain);
}

const { chains, provider } = configureChains(networks, [
  (alchemyProvider({ alchemyId }), publicProvider()),
]);

const { connectors } = getDefaultWallets({
  appName: "Buy-Me-Coffee",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = ({ Component, pageProps }: AppProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <NextHead>
          <title>Buy Me Coffee</title>
        </NextHead>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
