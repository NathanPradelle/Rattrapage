import { usePage } from '@inertiajs/react';
import { t } from 'i18next';

import { PROFILE } from '@/Constants/profiles';

export const getCurrentUser = () => {
  return usePage().props?.auth?.user;
};

export const isSubscriptionExipred = (user) => {
  const today = new Date();
  const dateSubscription = new Date(user?.abonnement);

  return today > dateSubscription;
};

export const getUserName = (user) => {
  return `${user?.firstname} ${user?.lastname}`;
};

export const getProfileLabel = (profileId) => {
  switch (profileId) {
    case PROFILE.CUSTOMERS:
      return t('profile.customer');
    case PROFILE.VOLUNTEER:
      return t('profile.volunteer');
    case PROFILE.ADMIN:
      return t('profile.admin');
    default:
      return 'Autre';
  }
};
