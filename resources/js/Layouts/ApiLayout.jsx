import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import { toastActionError, toastActionSuccess } from '@/utils/toast';

const ApiLayout = () => {
  const apiSuccess = usePage().props?.success;
  const apiError = usePage().props?.error;
  useEffect(() => {
    apiSuccess?.message && toastActionSuccess(apiSuccess);
    apiError?.message && toastActionError(apiError);
  }, [apiSuccess?.id, apiError?.id]);
};

export default ApiLayout;
