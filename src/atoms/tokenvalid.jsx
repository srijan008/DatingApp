export const getValidToken = () => {
  // Retrieve token data from sessionStorage
  const tokenData = JSON.parse(window.sessionStorage.getItem('authToken'));

  // If no token data is found, return null
  if (!tokenData) return null;

  const { token, expiry } = tokenData;
  const currentTime = Date.now();

  if (currentTime < expiry) {
    console.log('Token is valid:', token);
    return token; // Token is still valid
  } else {

    window.sessionStorage.removeItem('authToken');
    console.log('Token expired');
    return null;
  }
};
