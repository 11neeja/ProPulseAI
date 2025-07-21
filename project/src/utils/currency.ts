export const formatIndianCurrency = (amount: number): string => {
  if (amount >= 10000000) { // 1 Crore
    return `₹${(amount / 10000000).toFixed(1)} Crores`;
  } else if (amount >= 100000) { // 1 Lakh
    return `₹${(amount / 100000).toFixed(1)} Lakhs`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-IN');
};

export const parseIndianCurrency = (value: string): number => {
  const cleanValue = value.replace(/[₹,\s]/g, '');
  if (cleanValue.toLowerCase().includes('crore')) {
    return parseFloat(cleanValue.replace(/crore/i, '')) * 10000000;
  } else if (cleanValue.toLowerCase().includes('lakh')) {
    return parseFloat(cleanValue.replace(/lakh/i, '')) * 100000;
  }
  return parseFloat(cleanValue) || 0;
};