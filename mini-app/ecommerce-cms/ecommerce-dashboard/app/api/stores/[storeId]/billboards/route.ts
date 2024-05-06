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

    const { label, imageUrl } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("imageUrl is required", { status: 400 });
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

    const billboard = await prismaDb.billboard.create({
      data: {
        storeId: storeByUserId.id,
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
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
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await prismaDb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export { POST, GET };
