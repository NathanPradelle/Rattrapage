import './bootstrap';
import '../css/app.css';
import '@/theme/Fonts.less';
import '@/theme/Main.less';
import '@/translation/i18n';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import ToastWrapper from './Components/ToastWrapper';

const appName = import.meta.env.VITE_APP_NAME || 'No More Waste';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <>
        <App {...props} />
        <ToastWrapper />
      </>
    );
  },
  progress: {
    color: '#4B5563',
  },
}).then(() => {
  document.getElementById('app').removeAttribute('data-page');
});
