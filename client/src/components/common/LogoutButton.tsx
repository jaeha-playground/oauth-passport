'use client';

import React from 'react';

import { axiosInstance } from '@/apis/axiosConfigs';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const submitLogoutForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post('/auth/logout');
      console.log('res>>>', res);

      console.log('logout');

      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitLogoutForm}>
      <button type="submit">Logout</button>
    </form>
  );
}
