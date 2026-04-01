import crypto from 'crypto'
import razorpay from '../config/razorpay'

/**
 * Create a Razorpay order.
 * @param amountInRupees — amount in ₹ (will be converted to paise)
 */
export async function createRazorpayOrder(
  amountInRupees: number,
  currency: string = 'INR',
  receiptId: string
): Promise<{ orderId: string; amount: number; currency: string }> {
  const order = await razorpay.orders.create({
    amount: amountInRupees * 100, // Razorpay works in paise
    currency,
    receipt: receiptId.slice(0, 40), // Razorpay receipt max 40 chars
  })

  return {
    orderId: order.id,
    amount: amountInRupees,
    currency: order.currency,
  }
}

/**
 * Verify Razorpay payment signature using HMAC-SHA256.
 * razorpay_order_id + "|" + razorpay_payment_id → signed with key_secret
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) throw new Error('RAZORPAY_KEY_SECRET not configured')

  const body = `${orderId}|${paymentId}`
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature, 'hex'),
    Buffer.from(signature, 'hex')
  )
}
