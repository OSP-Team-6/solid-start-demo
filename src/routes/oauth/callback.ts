import { redirect } from '@solidjs/router';
import { getGoogleTokens, getGoogleUser } from '../../lib/utils/oauth';
import { authCallbacks } from '../../lib/server';
import { db } from '../../lib/db';

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return redirect('/login');
  }

  try {
    // Exchange code for tokens
    const { access_token, id_token } = await getGoogleTokens(code);
    
    
    // Use access_token for getting user info
    const googleUser = await getGoogleUser(access_token);
    

    // Check if user exists by email in the database
    let user = await db.user.findUnique({ where: { email: googleUser.email } });

    // If user doesn't exist, create new user entry and redirect to username setup
    if (!user) {
      const defaultUsername = googleUser.email ? googleUser.email.split('@')[0] : 'defaultUsername';
      user = await db.user.create({
        data: {
          username: defaultUsername,
          email: googleUser.email ?? 'unknown@example.com', // Fallback for email
          provider: googleUser.provider ?? 'unknown',        // Fallback for provider
        }
      });
    
      const session = await authCallbacks.getSession();
      await session.update((d) => {
        d.userId = user!.id.toString();
      });
      return redirect('/username-setup'); // Redirect new users to set up a username
    }

    // ** Ensure `username` has a fallback value, e.g., an empty string **
    if (!user.username) user.username = '';

    // Set userId in the session for existing users
    const session = await authCallbacks.getSession();
    await session.update((d) => {
      d.userId = user!.id.toString();
    });

    // Redirect existing user to the home page
    return redirect('/');
  } catch (error) {
    console.error('OAuth callback error:', error);
    return redirect('/login');
  }
}
