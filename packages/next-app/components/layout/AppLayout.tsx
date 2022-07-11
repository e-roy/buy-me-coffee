import { useState, useEffect } from "react";
import { UserContext, IUserProfile } from "./UserContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { IS_ENV_PROD, IS_ENV_DEV } from "@/config";
import logo from "@/images/logo250.png";

import { useAccount } from "wagmi";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const router = useRouter();
  const { data: accountData } = useAccount();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userType, setUserType] = useState("");

  const profile: IUserProfile = {
    address: accountData?.address as string,
    name,
    avatar,
    userType,
  };

  const injectContext = {
    currentUser: profile,
    setCurrentUser: (profile: IUserProfile) => {
      console.log("setCurrentUser", profile);
      setName(profile.name);
      setAvatar(profile.avatar);
      setUserType(profile.userType);
    },
  };

  return (
    <UserContext.Provider value={injectContext}>
      <div className="h-screen flex flex-col bg-coffee-400">
        <header className="p-2 md:px-6 flex justify-between sticky top-0">
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
    </UserContext.Provider>
  );
};
