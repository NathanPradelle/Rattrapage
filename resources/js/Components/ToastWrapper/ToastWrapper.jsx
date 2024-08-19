import 'react-toastify/dist/ReactToastify.css';
import './styles.less';

import React from 'react';
import { ToastContainer } from 'react-toastify';

const ToastWrapper = () => (
  <ToastContainer
    position='bottom-right'
    autoClose={20000}
    hideProgressBar={false}
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    limit={5}
    newestOnTop
  />
);

export default ToastWrapper;
