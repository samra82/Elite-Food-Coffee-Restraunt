import crypto from 'crypto';

/**
 * Computes the secure hash required by JazzCash.
 * The exact string to sign depends on the documentation.
 * Here we assume a simple concatenation of a few parameters.
 */
export function computeJazzCashSecureHash(params: {
  pp_TxnRefNo: string;
  pp_Amount: string;
  pp_TxnCurrency: string;
  pp_TxnDateTime: string;
  pp_TxnExpiryDateTime: string;
}): string {
  const { pp_TxnRefNo, pp_Amount, pp_TxnCurrency, pp_TxnDateTime, pp_TxnExpiryDateTime } = params;
  // Concatenate parameters in the order required by JazzCash documentation.
  // (This is an example – check your integration docs for the correct order and fields.)
  const dataToSign = `${pp_TxnRefNo}${pp_Amount}${pp_TxnCurrency}${pp_TxnDateTime}${pp_TxnExpiryDateTime}`;
  const salt = process.env.JAZZCASH_INTEGRITY_SALT || '';

  return crypto
    .createHmac('sha256', salt)
    .update(dataToSign)
    .digest('hex')
    .toUpperCase();
}
