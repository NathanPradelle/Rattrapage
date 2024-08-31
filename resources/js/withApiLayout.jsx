import React from 'react';

import ApiLayout from '@/Layouts/ApiLayout';

const withApiLayout = (Page) => {
  return (props) => (
    <ApiLayout>
      <Page {...props} />
    </ApiLayout>
  );
};

export default withApiLayout;
