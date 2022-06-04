import Image from "next/image";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { IS_ENV_PROD, IS_ENV_DEV } from "@/config";
import logo from "@/images/logo250.png";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col bg-coffee-400">
      <header className="p-2 flex justify-between sticky top-0">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image src={logo} width={50} height={50} />
        </div>
        <ConnectButton />
      </header>
      <main className="flex-grow overflow-y-auto">{children}</main>
      <footer className="text-center text-md text-stone-100">
        {IS_ENV_PROD && (
          <div className="border border-stone-900 bg-stone-800 uppercase font-bold">
            production
          </div>
        )}
        {IS_ENV_DEV && (
          <div className="border border-purple-700 bg-purple-600 uppercase font-bold">
            development
          </div>
        )}
      </footer>
    </div>
  );
};
