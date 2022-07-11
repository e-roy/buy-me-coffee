import { useContext } from "react";
import { UserContext } from "@/components/layout";

import { useAccount } from "wagmi";
import { useEnsData } from "@/hooks";
import { Avatar } from "@/components/elements";

export const SelectProfile = () => {
  const { data: accountData } = useAccount();
  const { setCurrentUser } = useContext(UserContext);

  const { name: ensName, avatar: ensAvatar } = useEnsData({
    checkAddress: accountData?.address || "",
  });

  const handleChangeProfile = (
    name: string,
    avatar: string,
    userType: string
  ) => {
    console.log("handleChangeProfile", name, avatar);
    setCurrentUser({
      address: accountData?.address as string,
      name,
      avatar,
      userType,
    });
  };

  return (
    <div className="border-2 border-coffee-800 p-4 m-4">
      <div>select your profile</div>
      <div
        onClick={() => handleChangeProfile("anon", "", "anon")}
        className="border-2 m-4 p-4 flex cursor-pointer"
      >
        <Avatar src={""} alt={accountData?.address} size={"12"} />
        <div className="ml-4">
          <div>anon</div>
          <div>{accountData?.address}</div>
        </div>
      </div>
      {ensName && (
        <div
          onClick={() => handleChangeProfile(ensName, ensAvatar, "ens")}
          className="border-2 m-4 p-4 flex cursor-pointer"
        >
          <Avatar src={ensAvatar} alt={ensName} size={"12"} />
          <div className="ml-4">
            <div>ens</div>
            <div>{ensName}</div>
          </div>
        </div>
      )}
    </div>
  );
};
