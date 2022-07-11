import { useEffect, useState } from "react";
import { ethers } from "ethers";

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;

interface IUseEnsData {
  checkAddress?: string;
  checkName?: string;
}

export const useEnsData = ({ checkAddress, checkName }: IUseEnsData) => {
  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const provider = new ethers.providers.AlchemyProvider("homestead", alchemyId);

  useEffect(() => {
    if (provider && checkAddress) {
      const fecthData = async () => {
        const name = await provider.lookupAddress(checkAddress);
        setName(name as string);

        const avatar = await provider.getAvatar(checkAddress);
        setAvatar(avatar as string);
      };
      fecthData();
    }
  }, [checkAddress]);

  useEffect(() => {
    if (provider && checkName) {
      const fecthData = async () => {
        const address = await provider.resolveName(checkName);
        setAddress(address as string);

        const avatar = await provider.getAvatar(checkName);
        setAvatar(avatar as string);
      };
      fecthData();
    }
  }, [checkName]);

  return {
    address,
    name,
    avatar,
  };
};

export default useEnsData;
