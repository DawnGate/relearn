import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const PATCH = async (
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

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const updatedStore = await prismaDb.store.update({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log("[STORE_ID_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

const DELETE = async (
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

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const deletedStore = await prismaDb.store.delete({
      where: {
        id: storeId,
        userId,
      },
    });

    return NextResponse.json(deletedStore);
  } catch (error) {
    console.log("[STORE_ID_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export { PATCH, DELETE };
