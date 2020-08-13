export const output = (price: number): string => {
  price = price / 100;
  return price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  // return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};