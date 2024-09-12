import { useSubmission, type RouteSectionProps } from '@solidjs/router';
import { Show } from 'solid-js';
import { loginOrRegister } from '~/lib';

// TODO: importing this and invoking it causes npm run build to break. why?
import { authCallbacks } from '~/auth-lib/authCallbacks';
console.log(authCallbacks);

export default function Login(props: RouteSectionProps) {
  const loggingIn = useSubmission(loginOrRegister);

  const handleSubmit = async (event: Event) => {
    console.log('in handleSubmit');
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const result = await loginOrRegister(formData);
    // Handle the result (e.g., error handling, redirect, etc.)
    // testing:...
    return result;
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} method="post">
        <input
          type="hidden"
          name="redirectTo"
          value={props.params.redirectTo ?? '/'}
        />
        <fieldset>
          <legend>Login or Register?</legend>
          <label>
            <input type="radio" name="loginType" value="login" checked={true} />{' '}
            Login
          </label>
          <label>
            <input type="radio" name="loginType" value="register" /> Register
          </label>
        </fieldset>
        <div>
          <label for="username-input">Username</label>
          <input name="username" placeholder="kody" />
        </div>
        <div>
          <label for="password-input">Password</label>
          <input name="password" type="password" placeholder="twixrox" />
        </div>
        <button type="submit">Login</button>
        <Show when={loggingIn.result}>
          <p style={{ color: 'red' }} role="alert" id="error-message">
            {loggingIn.result!.message}
          </p>
        </Show>
      </form>
    </main>
  );
}
