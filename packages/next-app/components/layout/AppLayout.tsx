import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { IS_ENV_PROD, IS_ENV_DEV } from "@/config";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 flex justify-between sticky top-0">
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          logo
        </div>
        <ConnectButton />
      </header>
      <main className="flex-grow overflow-y-auto">{children}</main>
      <footer className="text-center h-8 text-md text-stone-100">
        {IS_ENV_PROD && (
          <div className="border h-8 border-stone-900 bg-stone-800 pt-1 uppercase font-bold">
            production
          </div>
        )}
        {IS_ENV_DEV && (
          <div className="border h-8 border-purple-700 bg-purple-600 pt-1 uppercase font-bold">
            development
          </div>
        )}
      </footer>
    </div>
  );
};
