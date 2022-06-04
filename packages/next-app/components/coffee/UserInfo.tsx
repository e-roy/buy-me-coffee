import { addressHalf } from "@/utils/address-shorten";
import { ExternalLinkIcon } from "@heroicons/react/outline";

interface UserInfoProps {
  name: string;
  message?: string;
}

export const UserInfo = ({ name, message }: UserInfoProps) => {
  return (
    <div className="my-4">
      <div className="flex space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border dark:border-coffee-50 border-coffee-900">
          <img
            src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="font-semibold dark:text-coffee-50 text-coffee-800 text-lg">
          <div className="hover:text-coffee-900 cursor-pointer">
            <a
              href={`https://mumbai.polygonscan.com/address/${name}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {addressHalf(name)}
              <ExternalLinkIcon className="inline-block w-5 h-5 ml-4 mb-1" />
            </a>
          </div>
          {message && (
            <label className="p-2 font-medium text-coffee-800">
              ✉️ {message}
            </label>
          )}
        </div>
      </div>
    </div>
  );
};
