import { getCurrentUser } from '@/utils/user';

import AdminLayout from './AdminLayout';
import AuthenticatedLayout from './AuthenticatedLayout';

const LayoutSelection = ({ headTitle, header, className, children }) => {
  const user = getCurrentUser();

  if (user?.role === 2) {
    return (
      <AdminLayout headTitle={headTitle} header={header} className={className}>
        {children}
      </AdminLayout>
    );
  }
  return (
    <AuthenticatedLayout
      headTitle={headTitle}
      header={header}
      className={className}
    >
      {children}
    </AuthenticatedLayout>
  );
};

export default LayoutSelection;
