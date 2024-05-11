import prismaDb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeader = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-control-Allow-Headers": "Content-Type, Authorization",
};

export const OPTIONS = () => {
  return NextResponse.json(
    {},
    {
      headers: corsHeader,
    }
  );
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { storeId: string } }
) => {
  const { productIds } = await req.json();

  if (!productIds || !productIds.length) {
    return new NextResponse("productIds is required", {
      status: 400,
      headers: corsHeader,
    });
  }

  const products = await prismaDb.product.findMany({
    where: {
      id: {
        in: [...productIds],
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        // cents => 1 usd => 100 cents
        unit_amount: product.price * 100,
      },
    });
  });

  const order = await prismaDb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    {
      url: session.url,
    },
    {
      headers: corsHeader,
    }
  );
};
