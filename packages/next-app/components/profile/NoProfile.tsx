import { UserCircleIcon } from "@heroicons/react/outline";

export const NoProfile = () => {
  return (
    <div className="m-auto mt-16 p-4">
      <div className="flex justify-center text-coffee-800 py-8">
        <UserCircleIcon className="h-32 w-32" />
      </div>
      <div className="text-4xl font-bold text-center text-coffee-800">
        this user hasn't registered their profile yet
      </div>
      <div></div>
    </div>
  );
};
