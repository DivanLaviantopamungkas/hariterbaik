// Reseller database (simulated)
const resellerDatabase = {
  reseller123: {
    id: "reseller123",
    name: "Agen Utama",
    phone: "6281234567890",
  },
  weddingpro: {
    id: "weddingpro",
    name: "Wedding Pro",
    phone: "6289876543210",
  },
  invitemaster: {
    id: "invitemaster",
    name: "Invite Master",
    phone: "6281122334455",
  },
  default: {
    id: "default",
    name: "HariTerbaik Official",
    phone: "6285399911320", // Default WhatsApp number
  },
};

// Sanitize URL parameters
export function sanitizeParams(param) {
  if (!param) return "";

  // Remove any potentially dangerous characters
  return param
    .toString()
    .replace(/[<>"'`]/g, "") // Remove HTML tags
    .replace(/[^a-zA-Z0-9\-_]/g, "") // Allow only alphanumeric, dash, underscore
    .substring(0, 50); // Limit length
}

// Get reseller info from URL
export function getResellerInfo() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const resellerId = sanitizeParams(urlParams.get("reseller")) || "default";

  // Return reseller info or default
  return resellerDatabase[resellerId] || resellerDatabase.default;
}

// Parse URL for additional parameters
export function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};

  for (const [key, value] of params) {
    result[key] = sanitizeParams(value);
  }

  return result;
}

// Validate reseller ID
export function isValidReseller(resellerId) {
  return Object.keys(resellerDatabase).includes(resellerId);
}
