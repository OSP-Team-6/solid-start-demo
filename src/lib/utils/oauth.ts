import 'dotenv/config';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// consolelog("client id", )
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
//not sure if this redirect URL is correct
const GOOGLE_REDIRECT_URI = 'http://localhost:3000/oauth/callback';
const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo';

// Construct Google OAuth URL
export function googleOAuthUrl() {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
  });
  return `${GOOGLE_OAUTH_URL}?${params.toString()}`;
}
console.log('client_id', googleOAuthUrl())
// Exchange authorization code for tokens
export async function getGoogleTokens(code: string) {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }).toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Token exchange error:', errorData);
    throw new Error(`Failed to fetch Google tokens: ${response.statusText}`);
  }

  return response.json();
}

// Get user info from Google using the ID token (JWT)
export async function getGoogleUser(access_token: string) {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error('User info error:', errorData);
    throw new Error(`Failed to fetch user info: ${response.statusText}`);
  }
  
  return response.json();
}
