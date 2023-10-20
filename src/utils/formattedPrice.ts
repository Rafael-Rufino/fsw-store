export function formattedPrice(
  price: number,
  locale: string = "pt-BR",
  currency: string = "BRL",
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2,
): string {
  return price.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  });
}
