export const formatCurrency = (amount) => {
  if (!amount) {
    return 'Rs. 0.00';
  }
  const formattedAmount = amount
    .toLocaleString('en-IN', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    })
    .replace('LKR', 'Rs.');
  return formattedAmount;
};
