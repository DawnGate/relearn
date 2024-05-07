import { Billboard as BillboardType } from "@/types";

interface Props {
  data: BillboardType;
}

export const Billboard = ({ data }: Props) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        style={{
          backgroundImage: `url(${data.imageUrl})`,
        }}
      >
        <div className="h-full w-full flex justify-center items-center text-center">
          <div className="font-bold text-3xl md:text-5xl lg:text-6xl max-w-xs sm:max-w-xl">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};
