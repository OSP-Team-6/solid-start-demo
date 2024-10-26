import { redirect } from '@solidjs/router';
import { googleOAuthUrl } from '../../lib/utils/oauth';


export async function GET() {
  // Redirect user to Google's OAuth 2.0 consent screen
  
  return redirect(googleOAuthUrl());
}