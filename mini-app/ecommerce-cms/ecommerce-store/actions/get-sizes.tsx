import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

export const getSizes = async (): Promise<Size[]> => {
  const res = await fetch(URL, { next: { revalidate: 0 } });

  return res.json();
};
