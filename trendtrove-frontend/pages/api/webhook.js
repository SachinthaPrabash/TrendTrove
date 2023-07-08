import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret = "whsec_9a1dd61de278a627530d71f3ea01f2d55f2b11a4e759972b06984b1a63317d34";

export default async function handler(request, response) {
    await mongooseConnect();
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(await buffer(request), sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.created':
            const paymentIntentSucceeded = event.data.object;
            const orderId = paymentIntentSucceeded.metadata.orderId;
            const paid = paymentIntentSucceeded.payment_status === 'paid'
            if (orderId && paid) {
                await Order.findByIdAndUpdate(orderId, {
                    paid: true,
                })
            }
            // console.log(paymentIntentSucceeded);
            break;
        case 'checkout.session.completed':
            const checkoutIntentSucceeded = event.data.object;
            const orderIds = checkoutIntentSucceeded.metadata.orderId;
            const paids = checkoutIntentSucceeded.payment_status === 'paid'
            if (orderIds && paids) {
                await Order.findByIdAndUpdate(orderIds, {
                    paid: true,
                })
            }
            // console.log(checkoutIntentSucceeded);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.status(200).send('ok');
}

export const config = {
    api: { bodyParser: false }
}

//envy-lively-ease-peace
//acct_1NRIPNLVUjlYELtF