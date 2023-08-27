'use client';

import { axiosInstance } from '@/apis/axiosConfigs';
import React, { useState } from 'react';

export default function SignUp() {
  const initialState = {
    email: '',
    password: '',
  };
  const [field, setField] = useState(initialState);

  const submitSignUpForm = async () => {
    try {
      axiosInstance.post('/signup', {
        email: field.email,
        password: field.password,
      });
    } catch (error) {
      console.error(error);
      alert('오류 발생');
    }
  };

  const handleInputChange = (type: string, value: string) => {
    setField((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <section>
      <h1>Sign Up</h1>
      <form onSubmit={submitSignUpForm}>
        <section>
          <label>Email</label>
          <input type="email" required onChange={(e) => handleInputChange('email', e.target.value)} />
        </section>
        <section>
          <label>Password</label>
          <input type="password" required />
        </section>
        <button type="submit">Sign Up</button>
      </form>
      <a href="/login">Go to Login</a>
    </section>
  );
}
