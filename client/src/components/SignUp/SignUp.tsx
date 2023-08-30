'use client';

import React, { useState } from 'react';

import { axiosInstance } from '@/apis/axiosConfigs';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();

  const initialState = {
    email: '',
    password: '',
  };
  const [field, setField] = useState(initialState);

  const submitSignUpForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/signup', {
        email: field.email,
        password: field.password,
      });
      router.push('/login');
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
          <input type="password" required onChange={(e) => handleInputChange('password', e.target.value)} />
        </section>
        <button type="submit">Sign Up</button>
      </form>
      <Link href="/login">Go to Login</Link>
    </section>
  );
}
