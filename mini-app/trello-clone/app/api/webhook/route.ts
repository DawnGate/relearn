import Stripe from "stripe";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return new NextResponse("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  if (event.type === "checkout.session.completed") {
    if (!session.metadata?.orgId) {
      return new NextResponse("OrgId is required", { status: 400 });
    }

    await db.orgSubscription.create({
      data: {
        orgId: session.metadata.orgId,
        stripeCustomerId: subscription.customer as string,
        stripeSubscriptionId: subscription.id as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    await db.orgSubscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
        stripePriceId: subscription.items.data[0].price.id,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
};
