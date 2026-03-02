export function calculateMargin(
  basePrice: number,
  costPrice: number,
  discountPrice?: number,
) {
  const base = Number(basePrice) || 0;
  const cost = Number(costPrice) || 0;
  const discount = Number(discountPrice) || 0;

  const finalPrice = discount > 0 && discount < base ? discount : base;

  if (!finalPrice || finalPrice <= 0) return 0;

  return ((finalPrice - cost) / finalPrice) * 100;
}
