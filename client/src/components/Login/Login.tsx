import React from 'react';

export default function Login() {
  return (
    <section>
      <h1>Login</h1>
      <form>
        <section>
          <label>Email</label>
          <input type="email" required autoFocus />
        </section>
        <section>
          <label>Password</label>
          <input type="password" required />
        </section>
        <button type="submit">Login</button>
      </form>
      <a href="/SignUp">Sign Up</a>
    </section>
  );
}
