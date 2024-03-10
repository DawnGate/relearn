"use server";

import { revalidatePath } from "next/cache";

import { auth, currentUser } from "@clerk/nextjs";

import { createSafeAction } from "@/lib/create-safe-action";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

import { db } from "@/lib/db";

import { InputType } from "./type";

import { Scheme } from "./scheme";

const handler = async (validatedData: InputType) => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Un-authentication",
    };
  }

  const urlPath = `/organization/${orgId}`;
  const settingUrl = absoluteUrl(urlPath);

  let url = "";
  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingUrl,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Tasktify Pro",
                description: "Unlimited board for your organization.",
              },
              unit_amount: 1000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],

        metadata: {
          orgId,
        },
      });

      url = stripeSession.url || "";
    }
  } catch (err) {
    return {
      error: "Some thing went wrong!",
    };
  }

  revalidatePath(settingUrl);

  return {
    data: url,
  };
};

export const stripeRedirect = createSafeAction(Scheme, handler);
