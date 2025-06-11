export const getBaseUrl = () => {
  const hostname = window.location.hostname;
  
  // Production URLs
  if (hostname === 'mildo.shop' || hostname === 'www.mildo.shop') {
    return 'https://mildo.shop:4000';
  }
  
  // Development URL
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  
  // Default to production URL for any other case
  return 'https://mildo.shop:4000';
};
