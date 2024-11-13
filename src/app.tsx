// @refresh reload
import { Route, Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import './app.css';
import { LoginForm } from '@solid-auth/ui';

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <a href="/">Index</a>
          <a href="/about">About</a>
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
      {/* <Route path="/login" component={LoginForm} /> */}
    </Router>
  );
}
