import { useSubmission } from '@solidjs/router';
import { updateUser } from '~/lib'; // Ensure this function is correctly defined
import { Show } from 'solid-js';

type UpdateUserResult = {
  message?: string; // Assuming message is optional
};

export default function UsernameSetup() {
  const updatingUsername = useSubmission(updateUser);

  return (
    <main>
      <h1>Set up your username</h1>
      <form action={updateUser} method="post">
        <div>
          <label for="username-input">Username</label> {/* Use 'for' if 'htmlFor' doesn't work */}
          <input id="username-input" name="username" placeholder="Enter your username" required />
        </div>
        <button type="submit">Save</button>
        {updatingUsername.result && (updatingUsername.result as UpdateUserResult).message && (
          <p style={{ color: 'red' }} role="alert" id="error-message">
            {(updatingUsername.result as UpdateUserResult).message}
          </p>
        )}
      </form>
    </main>
  );
}