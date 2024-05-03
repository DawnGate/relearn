import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    const { storeId } = params;

    const { name, billboardId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("billboardId is required", { status: 400 });
    }

    const billboard = await prismaDb.billboard.findUnique({
      where: {
        id: billboardId,
        storeId,
      },
    });

    if (!billboard) {
      return new NextResponse("billboardId is not valid", { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findUnique({
      where: {
        userId,
        id: storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const category = await prismaDb.category.create({
      data: {
        storeId: storeByUserId.id,
        billboardId,
        name,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeId: string;
    };
  }
) => {
  try {
    const categories = await prismaDb.category.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export { POST, GET };
