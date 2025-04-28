import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);


export const paymentFunction = async (req, res) => {
    try {
        const { show, seats } = req.body;
        console.log("Received payment data:", { show, seats });

        if (!show || !show.movie || !show.pricePerSeat || !seats) {
            console.error("Missing Stripe payment fields", show, seats);
            return res.status(400).json({ error: "Invalid show data or seats" });
        }

        const lineItems = [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: show.movie,
                        images: show.image? [`${process.env.BACKEND_URL}/${show.image.replace(/\\/g, '/')}`]: [],
                     },

                    unit_amount: Math.round(show.pricePerSeat * 100), // in paise
                },
                quantity: seats.length,
            },
        ];


        console.log("Image URL being sent to Stripe:", show.image);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/failed`,
        });

        res.status(200).json({
            success: true,
            sessionId: session.id,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};
