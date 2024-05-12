import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { CreditCardIcon, DollarSign, PackageIcon } from "lucide-react";

import prismaDb from "@/lib/prismadb";
import { currencyFormatter } from "@/lib/utils";

import { Heading } from "@/components/heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import { getSalesCount } from "@/actions/getSalesCount";
import { getStockCount } from "@/actions/getStockCount";
import { getMonthlyGraphRevenue } from "@/actions/getMonthlyGraphRevenue";
import { OverviewChart } from "@/components/overview-chart";

const StorePage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismaDb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  const totalRevenue = await getTotalRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const stockCount = await getStockCount(storeId);
  const graphData = await getMonthlyGraphRevenue(storeId);

  return (
    <div className="space-y-4 p-8 pt-6">
      <Heading title="Dashboard" description="Overview of your store" />
      <Separator />
      <div className="grid gap-4 grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
            <CardTitle className="text-sm font-semibold">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currencyFormatter.format(totalRevenue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
            <CardTitle className="text-sm font-semibold">Sale</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{salesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
            <CardTitle className="text-sm font-semibold">
              Product in Stock
            </CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockCount}</div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
            <CardTitle className="text-sm font-semibold">Overview</CardTitle>
            <PackageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <OverviewChart data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StorePage;
