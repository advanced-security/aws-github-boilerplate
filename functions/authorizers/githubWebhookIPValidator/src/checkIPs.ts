import { cidrSubnet } from "ip";

const findIP = (keys: string[], ipToCheck: string) => {
  const even = (e: string) => {
    return cidrSubnet(e).contains(ipToCheck);
  };
  const values = (a: any) => {
    return a.some(even);
  };
  return keys.some(values);
};

export const checkIPs = async (
  meta: hookIPAddress,
  ipFromRequest: string
): Promise<boolean> => {
  try {
    const keys = Object.values(meta) as string[];
    const response = await findIP(keys, ipFromRequest);
    return response;
  } catch (err) {
    console.error("Error within function (findIP)", err);
    throw err;
  }
};
