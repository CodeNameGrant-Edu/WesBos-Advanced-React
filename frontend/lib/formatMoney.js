export default function formatMoney(amount = 0) {
  const formatter = Intl.NumberFormat('en-za', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2
  });

  return formatter.format(amount);
}
