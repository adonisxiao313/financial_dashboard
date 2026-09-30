export function money(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function millions(amount: number) {
  return `$${amount.toFixed(1)}m`;
}

export function compact(amount: number) {
  return amount.toLocaleString("en-US");
}
