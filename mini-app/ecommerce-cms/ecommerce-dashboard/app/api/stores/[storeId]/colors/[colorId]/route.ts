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
      colorId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    const { storeId, colorId } = params;

    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("ColorId is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }

    const regex = /^#(\d|\w)+/;
    if (!regex.test(value)) {
      return new NextResponse("Value must a valid hex color", { status: 400 });
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

    const updatedColor = await prismaDb.color.update({
      where: {
        storeId: storeByUserId.id,
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(updatedColor);
  } catch (error) {
    console.log("[COLOR_ID_PATCH]", error);
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
      colorId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    const { storeId, colorId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("ColorId is required", { status: 400 });
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

    const deletedColor = await prismaDb.color.delete({
      where: {
        storeId: storeByUserId.id,
        id: colorId,
      },
    });

    return NextResponse.json(deletedColor);
  } catch (error) {
    console.log("[COLOR_ID_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      colorId: string;
    };
  }
) => {
  try {
    const color = await prismaDb.color.findFirst({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export { PATCH, DELETE, GET };
