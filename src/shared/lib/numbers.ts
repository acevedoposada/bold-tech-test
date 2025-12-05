export function formatCurrency(value: number): string {
  return Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency',
    minimumFractionDigits: 0,
  }).format(value);
}
