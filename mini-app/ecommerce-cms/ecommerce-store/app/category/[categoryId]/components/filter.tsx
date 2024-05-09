"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import queryString from "query-string";

interface Props {
  data: Size[] | Color[];
  name: string;
  valueKey: string;
}

export const Filter = ({ data, name, valueKey }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = queryString.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = queryString.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => {
          return (
            <div key={filter.id} className="flex items-center">
              <Button
                onClick={() => {
                  onClick(filter.id);
                }}
                className={cn(
                  "rounded-md text-sm text-gray-8000 p-3 bg-white border border-gray-300",
                  selectedValue === filter.id && "bg-black text-white"
                )}
              >
                {filter.name}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
