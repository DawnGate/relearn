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
      billboardId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    const { storeId, billboardId } = params;

    const { label, imageUrl } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("BillboardId is required", { status: 400 });
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

    const updatedBillboard = await prismaDb.billboard.update({
      where: {
        storeId: storeByUserId.id,
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(updatedBillboard);
  } catch (error) {
    console.log("[BILLBOARD_ID_PATCH]", error);
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
      billboardId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    const { storeId, billboardId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("BillboardId is required", { status: 400 });
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

    const deletedBillboard = await prismaDb.billboard.delete({
      where: {
        storeId: storeByUserId.id,
        id: billboardId,
      },
    });

    return NextResponse.json(deletedBillboard);
  } catch (error) {
    console.log("[BILLBOARD_ID_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      billboardId: string;
    };
  }
) => {
  try {
    const billboard = await prismaDb.billboard.findFirst({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export { PATCH, DELETE, GET };
