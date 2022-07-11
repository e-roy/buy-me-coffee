import { addressHalf } from "@/utils/address-shorten";
import { ExternalLinkIcon, MailIcon } from "@heroicons/react/outline";
import { Avatar } from "@/components/elements";

interface UserInfoProps {
  name?: string;
  avatar?: string;
  address?: string;
  message?: string;
}

export const UserInfo = ({ name, avatar, address, message }: UserInfoProps) => {
  return (
    <div className="my-4">
      <div className="flex space-x-3">
        <div className="">
          <Avatar src={avatar} alt={name} size="12" />
        </div>
        <div className="font-semibold dark:text-coffee-50 text-coffee-800 text-lg w-full">
          <div className="flex justify-between w-full">
            <div>{name}</div>
            <div className="hover:text-coffee-900 cursor-pointer text-xs mt-2 px-4">
              <a
                href={
                  address && `https://mumbai.polygonscan.com/address/${address}`
                }
                target="_blank"
                rel="noreferrer noopener"
              >
                {addressHalf(address as string)}
                <ExternalLinkIcon className="inline-block w-4 h-4 ml-4 mb-1" />
              </a>
            </div>
          </div>

          {message && (
            <label className="p-2 font-medium text-coffee-800">
              <MailIcon className="inline-block w-5 h-5 mb-1 text-coffee-900" />{" "}
              {message}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
