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
    // Exchange code for tokens (ID token and access token)
    const { id_token } = await getGoogleTokens(code);

    // Decode and verify the ID token (JWT)
    const googleUser = await getGoogleUser(id_token);

    const username = googleUser.name || googleUser.email || 'Unknown User';

    // Check if user exists in the database, else create one
    let user = await db.user.findUnique({ where: { email: googleUser.email } });
    
    if (!user) {
      const username = googleUser.email ? googleUser.email.split('@')[0] : 'defaultUsername';
      let user = await db.user.create({
        data: {
          username: username ?? 'defaultUsername',
          email: googleUser.email
        }
      });
    }

    // Set userId in the session
    const session = await authCallbacks.getSession();
    await session.update((d) => {
      if (!user) throw new Error('User not found');
      d.userId = user.id.toString();
    });

    return redirect('/');
  } catch (error) {
    console.error('OAuth callback error:', error);
    return redirect('/login');
  }
}
