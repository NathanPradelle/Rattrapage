import { usePage } from '@inertiajs/react';

export const getCurrentUser = () => {
  return usePage().props?.auth?.user;
};

export const getUserName = (user) => {
  return `${user?.firstname} ${user?.lastname}`;
};
