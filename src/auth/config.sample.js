export const config = {
  clientId: '{YOUR_AUTH0_CLIENT_ID}',
  domain: '{YOUR_AUTH0_DOMAIN}',
  // For production, redirect and logoutUrl should be on port 3005
  redirect: 'http://localhost:3000/close-popup',
  logoutUrl: 'http://localhost:3000'
};
