'use client';

import React, { useState } from 'react';

import { axiosInstance } from '@/apis/axiosConfigs';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const initialState = {
    email: '',
    password: '',
  };

  const [field, setField] = useState(initialState);
  console.log('field>>>', field);

  const submitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/login', {
        email: field.email,
        password: field.password,
      });
      router.push('/');
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
      <h1>Login</h1>
      <form onSubmit={submitLoginForm}>
        <section>
          <label>Email</label>
          <input type="email" required autoFocus onChange={(e) => handleInputChange('email', e.target.value)} />
        </section>
        <section>
          <label>Password</label>
          <input type="password" required onChange={(e) => handleInputChange('password', e.target.value)} />
        </section>
        <button type="submit">Login</button>
      </form>
      <a href="/SignUp">Sign Up</a>
    </section>
  );
}
