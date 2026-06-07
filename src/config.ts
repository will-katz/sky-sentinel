const productionContactApiUrl =
  'https://vzuzy5z5h0.execute-api.us-east-1.amazonaws.com/default/SkySentinel_ContactForm';

/** In dev, use the Vite proxy to avoid browser CORS preflight. */
export const CONTACT_API_URL =
  import.meta.env.VITE_CONTACT_API_URL ??
  (import.meta.env.DEV ? '/api/contact' : productionContactApiUrl);
