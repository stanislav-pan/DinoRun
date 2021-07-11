export const maskPhoneNumber = (phone: string): string | undefined => {
  const x: RegExpMatchArray | null = phone
    .replace(/\(|\)| /g, "")
    .match(/(\+?)(\d?)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

  if (x) {
    return x[0];
  }
};
