// /app/api/payment/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, paymentMethod } = await req.json();

    // Basic validation
    if (amount <= 0 || !paymentMethod) {
      return NextResponse.json(
        { message: "Invalid payment details" },
        { status: 400 }
      );
    }

    // Simulate a successful payment response
    return NextResponse.json({
      message: "Payment processed successfully",
      paymentId: "1234567890", // Mock payment ID
      amount,
      paymentMethod,
      status: "success",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
