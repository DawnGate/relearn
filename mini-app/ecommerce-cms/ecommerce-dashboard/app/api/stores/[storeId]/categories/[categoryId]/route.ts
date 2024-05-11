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
      categoryId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    const { storeId, categoryId } = params;

    const { name, billboardId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("categoryId is required", { status: 400 });
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

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
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

    const updatedCategory = await prismaDb.category.update({
      where: {
        storeId: storeByUserId.id,
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log("[CATEGORY_ID_PATCH]", error);
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
      categoryId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    const { storeId, categoryId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!categoryId) {
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

    const deletedCategory = await prismaDb.category.delete({
      where: {
        storeId: storeByUserId.id,
        id: categoryId,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log("[DELETE_ID_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      categoryId: string;
    };
  }
) => {
  try {
    const category = await prismaDb.category.findFirst({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export { PATCH, DELETE, GET };
