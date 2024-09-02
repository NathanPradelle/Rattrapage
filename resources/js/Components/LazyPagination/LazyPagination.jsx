import React from 'react';

const LazyPagination = ({ onChangePage, pagination }) => {
  return (
    <>
      <div className='flex justify-between'>
        <div className='w-0 flex-1 flex'>
          {pagination?.prev_page_url && (
            <input
              type='button'
              onClick={() =>
                onChangePage({ page: pagination?.current_page - 1 })
              }
              className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
              value='Previous'
            />
          )}
        </div>
        <div className='w-0 flex-1 flex justify-end'>
          {pagination?.next_page_url && (
            <input
              type='button'
              onClick={() =>
                onChangePage({ page: pagination?.current_page + 1 })
              }
              className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
              value='Next'
            />
          )}
        </div>
      </div>
      <div className='text-sm text-gray-500'>
        Page {pagination?.current_page} of {pagination?.last_page}, Total:{' '}
        {pagination?.total}
      </div>
    </>
  );
};

export default LazyPagination;
