import { addressShorten } from "@/utils/address-shorten";
import {
  ExternalLinkIcon,
  UserIcon,
  DocumentTextIcon,
} from "@heroicons/react/outline";
import { Avatar } from "@/components/elements/Avatar";

interface ProfileHeaderProps {
  handle: string;
  avatar?: string;
  userAddress?: string;
  contractAddress?: string;
}

export const ProfileHeader = ({
  handle,
  avatar,
  userAddress,
  contractAddress,
}: ProfileHeaderProps) => {
  // console.log("userAddress", userAddress);
  return (
    <div className="w-full flex justify-center items-center">
      <div className="absolute flex justify-center items-center">
        <Avatar size="lg" src={avatar} alt={handle} />
      </div>

      <div className="h-56 bg-coffee-800 rounded-3xl shadow-md w-full">
        <div className="h-1/2 w-full flex justify-between items-baseline px-3"></div>

        <div className="bg-coffee-50 text-coffee-900 font-medium shadow-lg shadow-coffee-700 h-1/2 w-full rounded-3xl flex flex-col pt-2">
          <div className="w-full flex justify-between px-6">
            <div className="flex flex-col justify-center">
              <h1 className="font-bold">{handle}</h1>
              {/* <h1 className="text-sm">location:</h1> */}
            </div>
            <div className="flex flex-col w-40">
              {contractAddress && (
                <div className="text-coffee-800 hover:text-coffee-900 cursor-pointer">
                  <a
                    href={
                      contractAddress &&
                      `https://mumbai.polygonscan.com/address/${contractAddress}`
                    }
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <p className="w-full flex justify-between">
                      <DocumentTextIcon className="inline-block w-5 h-5" />
                      {addressShorten(contractAddress as string)}
                      <ExternalLinkIcon className="inline-block w-5 h-5" />
                    </p>
                  </a>
                </div>
              )}
              {userAddress && (
                <div className="text-coffee-800 hover:text-coffee-900 cursor-pointer">
                  <a
                    href={
                      userAddress &&
                      `https://mumbai.polygonscan.com/address/${userAddress}`
                    }
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <p className="w-full flex justify-between">
                      <UserIcon className="inline-block w-5 h-5" />
                      {addressShorten(userAddress as string)}
                      <ExternalLinkIcon className="inline-block w-5 h-5" />
                    </p>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
