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
      productId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    const { storeId, productId } = params;

    const {
      name,
      price,
      images,
      categoryId,
      sizeId,
      colorId,
      isArchived,
      isFeatured,
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("ProductId is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("CategoryId is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("SizeId is required", { status: 400 });
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

    let updatedProduct = await prismaDb.product.update({
      where: {
        storeId: storeByUserId.id,
        id: productId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
        },
      },
    });

    updatedProduct = await prismaDb.product.update({
      where: {
        storeId: storeByUserId.id,
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log("[PRODUCT_ID_PATCH]", error);
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
      productId: string;
    };
  }
) => {
  try {
    const { userId } = auth();

    const { storeId, productId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("ProductId is required", { status: 400 });
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

    const deletedProduct = await prismaDb.product.delete({
      where: {
        storeId: storeByUserId.id,
        id: productId,
      },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log("[PRODUCT_ID_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: {
      productId: string;
    };
  }
) => {
  try {
    const product = await prismaDb.product.findFirst({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_ID_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export { PATCH, DELETE, GET };
