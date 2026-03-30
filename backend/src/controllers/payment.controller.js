import { ENV } from "../config/env.js";
import { stripe } from "../config/stripe.js";
import { Course } from "../models/course.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import { sendInvoiceEmail } from "../utils/sendInvoice.js";

export const createCheckOutSession = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products) {
      return res.status(400).json({
        success: false,
        message: "Please provide course",
      });
    }

    const courseId = products._id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const alreadyPurchased = await Order.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (alreadyPurchased) {
      return res.status(200).json({
        success: false,
        message: "You already have this course",
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: products.name,
              images: [products.image],
            },
            unit_amount: Math.round(products.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${ENV.CLIENT_URL}/purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${ENV.CLIENT_URL}/cancel`,
      metadata: {
        userId: req.user._id.toString(),
        courseId: courseId,
        coursePrice: products.price.toString(),
      },
    });

    return res.status(201).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.log(error, "from create checkout session");
    return res.status(500).json({
      success: false,
      message: "Failed to create checkout session",
    });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Session ID not found",
      });
    }

    const existingOrder = await Order.findOne({
      stripeSessionId: sessionId,
    });

    if (existingOrder) {
      return res.status(200).json({
        success: true,
        message: "Order already created",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }

    const courseId = session.metadata.courseId;
    const userId = session.metadata.userId;

    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({
        success: false,
        message: "Course or User not found",
      });
    }

    const newOrder = new Order({
      user: userId,
      course: courseId,
      totalAmount: session.amount_total / 100,
      stripeSessionId: sessionId,
    });

    await newOrder.save();

    await User.findByIdAndUpdate(userId, {
      $push: { purchasedCourse: courseId },
    });

    // ✅ Send Invoice Email
    await sendInvoiceEmail({
      userEmail: user.email,
      userName: user.fullName,
      courseName: course.title,
      amount: session.amount_total / 100,
      orderId: newOrder._id,
    });

    return res.status(201).json({
      success: true,
      message: "Payment successful and invoice sent",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log(error, "from checkout success");
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};