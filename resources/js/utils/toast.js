import { t } from 'i18next';
import { toast } from 'react-toastify';

/**
 * @typedef ToastifyFunction
 * @type {(content: import('react-toastify').ToastContent, options?: import('react-toastify').ToastOptions) => import('react').ReactText}
 */

/**
 * @type {{
 * success: ToastifyFunction,
 * error: ToastifyFunction,
 * warning: ToastifyFunction,
 * }}
 */
export const toastify = {
  success: (content, options) =>
    toast.success(content, { autoClose: 5000, toastId: content, ...options }),

  warning: (content, options) =>
    toast.warning(content, { autoClose: 10000, toastId: content, ...options }),

  error: (content, options) =>
    toast.error(content, { autoClose: 15000, toastId: content, ...options }),
};

export const toastActionSuccess = (success) => {
  toastify.success(success?.message || t('common.success'));
};

export const toastCreateSuccess = () => {
  toastify.success(t('common.successCreation'));
};

export const toastActionError = (error) => {
  toastify.error(error?.message || t('common.errorOccurred'));
  if (error) {
    console.error(error);
  }
};

export const toastCommonError = (error) => {
  toastify.error(t('common.errorOccurred'));
  if (error) {
    console.error(error);
  }
};
