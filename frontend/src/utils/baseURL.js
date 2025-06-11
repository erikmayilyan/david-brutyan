export const getBaseUrl = () => {
  const hostname = window.location.hostname;
  if (hostname === 'mildo.shop' || hostname === 'www.mildo.shop') {
    return 'https://mildo.shop:4000'\;
  }
  if (process.env.NODE_ENV === 'production') {
    return 'https://mildo.shop:4000'\;
  }
  return 'http://localhost:4000'\;
};
