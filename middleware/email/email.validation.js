//simple email validation, after this send notification messsage to see if the email is valid and working.
export const eml_validation_fuc = (email) => {
  // 1. Basic type & empty check
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed === "" || trimmed.length > 254) return false;

  // 2. Quick rejection of obvious invalid patterns
  if (
    trimmed.includes("..") ||
    trimmed.startsWith(".") ||
    trimmed.endsWith(".") ||
    trimmed.includes(" ") ||
    trimmed.includes("..@") ||
    trimmed.includes("@.")
  )
    return false;

  // 3. Split and check local part + domain lengths
  const atIndex = trimmed.indexOf("@");
  if (atIndex < 1 || atIndex === trimmed.length - 1) return false;

  const localPart = trimmed.slice(0, atIndex);
  const domain = trimmed.slice(atIndex + 1);

  if (localPart.length > 64 || localPart.length === 0) return false;
  if (domain.length > 255 || domain.length < 4) return false;

  // 4. Final regex validation (most accurate check)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(trimmed);
};
