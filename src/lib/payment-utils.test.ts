import crypto from 'crypto';
import { verifyPayOSSignature } from './payment-utils';

describe('verifyPayOSSignature', () => {
  const secret = 'test_secret_key';
  const payload = JSON.stringify({
    code: '00',
    desc: 'Success',
    data: {
      orderCode: 123456,
      amount: 10000,
      description: 'Test payment'
    }
  });

  it('should return true for a valid signature', () => {
    // Generate a valid signature
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    const validSignature = hmac.digest('hex');

    const result = verifyPayOSSignature(payload, validSignature, secret);
    expect(result).toBe(true);
  });

  it('should return false for an invalid signature', () => {
    const invalidSignature = 'invalid_signature_hex';
    const result = verifyPayOSSignature(payload, invalidSignature, secret);
    expect(result).toBe(false);
  });

  it('should return false if payload is tampered', () => {
    // Generate signature for original payload
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    const signature = hmac.digest('hex');

    // Tamper the payload
    const tamperedPayload = payload + 'tampered';

    const result = verifyPayOSSignature(tamperedPayload, signature, secret);
    expect(result).toBe(false);
  });

  it('should return false if secret is incorrect', () => {
    // Generate signature with original secret
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    const signature = hmac.digest('hex');

    // Verify with wrong secret
    const wrongSecret = 'wrong_secret';

    const result = verifyPayOSSignature(payload, signature, wrongSecret);
    expect(result).toBe(false);
  });

  it('should return false for empty inputs', () => {
    // Empty signature cannot match the HMAC-SHA256 of an empty string (which is not empty)
    expect(verifyPayOSSignature('', '', '')).toBe(false);

    // Test empty signature with non-empty payload
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    // const signature = hmac.digest('hex'); // Unused
    expect(verifyPayOSSignature(payload, '', secret)).toBe(false);

    // Test empty payload with valid empty-payload signature
    const hmacEmpty = crypto.createHmac('sha256', secret);
    hmacEmpty.update('');
    const signatureEmpty = hmacEmpty.digest('hex');
    // This should be true because the signature matches the empty payload hashed with the secret
    expect(verifyPayOSSignature('', signatureEmpty, secret)).toBe(true);
  });

  it('should handle edge cases with throws gracefully (though implementation catches them)', () => {
      // The implementation wraps crypto in try-catch
      // crypto.createHmac might throw if algorithm is not supported, but sha256 is standard.
      // We can check if it returns false for something that might cause issues if not typed correctly,
      // but purely string inputs are safe in TS.

      // Let's test with a signature that is not a hex string (though Buffer.from handles it)
      const result = verifyPayOSSignature(payload, 'not-a-hex-string', secret);
      expect(result).toBe(false);
  });
});
