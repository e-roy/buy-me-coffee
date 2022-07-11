import { UserIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: string;
}

export const Avatar = ({ src, alt, size, ...props }: AvatarProps) => {
  const [baseClass, setBaseClass] = useState("h-12 w-12");

  useEffect(() => {
    if (size == "lg") {
      setBaseClass("h-20 w-20");
    }
  }, [size]);

  if (!src) {
    return (
      <div
        className={`bg-coffee-50 relative inline-block rounded-full border-2 border-coffee-800 text-coffee-800 shadow-md shadow-coffee-300`}
      >
        <UserIcon className={`${baseClass} p-1`} />
      </div>
    );
  }

  return (
    <div className="relative inline-block rounded-full border-2 border-coffee-800 text-coffee-800 shadow-md shadow-coffee-300">
      <img
        className={`rounded-full object-cover ${baseClass}`}
        src={src}
        alt={alt}
        {...props}
      />
    </div>
  );
};
