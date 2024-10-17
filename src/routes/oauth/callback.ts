import { redirect } from '@solidjs/router';
import { getGoogleTokens, getGoogleUser } from '../../lib/utils/oauth';
import { authCallbacks } from '../../lib/server';
import { db } from '../../lib/db';

export async function GET({ url }: { url: URL }) {
  const code = url.searchParams.get('code');
  if (!code) {
    return redirect('/login'); // If there's no code, redirect back to login
  }

  try {
    // Exchange code for tokens (ID token and access token)
    const { id_token } = await getGoogleTokens(code);

    // Decode and verify the ID token (JWT)
    const googleUser = await getGoogleUser(id_token);

    // Check if user exists in the database, else create one
    let user = await db.user.findUnique({ where: { email: googleUser.email } });
    if (!user) {
      user = await db.user.create({ data: { email: googleUser.email, username: googleUser.name } });
    }

    // Set userId in the session
    const session = await authCallbacks.getSession();
    await session.update((d) => {
      d.userId = user.id.toString();
    });

    return redirect('/'); // Redirect to the home page after login
  } catch (error) {
    console.error('OAuth callback error:', error);
    return redirect('/login');
  }
}
