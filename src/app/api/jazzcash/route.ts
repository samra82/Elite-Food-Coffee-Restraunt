// app/api/jazzcash/route.ts
import { NextResponse } from 'next/server';
import { computeJazzCashSecureHash } from '@/lib/jazzcash';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Expect these fields from the frontend
    const {
      pp_TxnRefNo, // e.g. "T20250208123456"
      pp_Amount,   // Amount in the smallest unit (e.g. "10000" for PKR 100.00)
      pp_TxnCurrency = "PKR",
      pp_BillReference = "billRef",
      pp_Description = "Payment for Order",
      // Optionally, you might receive card details here (if doing a card transaction)
      pp_CustomerCardNumber,
      pp_CustomerCardExpiry,
      pp_CustomerCardCvv,
    } = body;

    // Generate current date/time strings as required.
    // For example, JazzCash might require a format like YYYYMMDDHHMMSS.
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const pp_TxnDateTime = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(
      now.getHours()
    )}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    // Let’s assume expiry is 1 hour later.
    const expiry = new Date(now.getTime() + 60 * 60 * 1000);
    const pp_TxnExpiryDateTime = `${expiry.getFullYear()}${pad(expiry.getMonth() + 1)}${pad(expiry.getDate())}${pad(
      expiry.getHours()
    )}${pad(expiry.getMinutes())}${pad(expiry.getSeconds())}`;

    // Compute the secure hash
    const pp_SecureHash = computeJazzCashSecureHash({
      pp_TxnRefNo,
      pp_Amount,
      pp_TxnCurrency,
      pp_TxnDateTime,
      pp_TxnExpiryDateTime,
    });

    // Prepare the payload based on the "Direct Pay" API reference.
    const payload = {
      pp_Version: "1.1",
      pp_TxnType: "MPAY", // Direct Pay (card) type as per docs
      pp_TxnRefNo,
      pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID,
      pp_Password: process.env.JAZZCASH_PASSWORD,
      pp_Amount,
      pp_TxnCurrency,
      pp_TxnDateTime,
      pp_TxnExpiryDateTime,
      pp_BillReference,
      pp_Description,
      // These fields are required for card payments:
      pp_CustomerCardNumber,
      pp_CustomerCardExpiry,
      pp_CustomerCardCvv,
      pp_SecureHash,
      pp_Frequency: "SINGLE", // or RECURRING if needed
    };

    // Call the JazzCash Direct Pay API endpoint.
    const response = await fetch(process.env.JAZZCASH_DIRECT_PAY_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Parse and return the JazzCash API response.
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("JazzCash Direct Pay API error:", error);
    return NextResponse.json(
      { error: "Error processing payment. Please try again." },
      { status: 500 }
    );
  }
}
