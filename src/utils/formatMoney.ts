const formatMoney = (value: number, decimal: number) => {
  return parseFloat(value.toFixed(decimal)).toLocaleString();
};

export default formatMoney