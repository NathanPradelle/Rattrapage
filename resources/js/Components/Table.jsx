import { useMemo } from 'react';

const Table = ({ searchInput, columns, data, pagination, placeholder }) => {
    const cols = useMemo(() => columns, [columns, data]);

    return (
        <div className='flex-col gap-1 p-6 text-gray-900'>
            {searchInput}
            <div className='flex overflow-x-auto'>
                {data?.length > 0 ? (
                    <table className='flex-1 bg-white shadow-md rounded'>
                        <thead>
                        <tr>
                            {cols.map((col, index) => (
                                <th
                                    key={col?.field || index}
                                    className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                >
                                    {col?.headerName}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                        {data.map((element, index) => (
                            <tr key={index}>
                                {cols.map((col, ind) => (
                                    <td
                                        key={col?.field || ind}
                                        className='px-6 py-4 whitespace-nowrap'
                                    >
                                        {col?.renderCell ? col.renderCell(element) : element[col.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    placeholder
                )}
            </div>
            {pagination && (
                <>
                    <div className='mt-4 flex justify-between'>
                        <div className='w-0 flex-1 flex'>
                            {pagination.prev_page_url && (
                                <a
                                    href={pagination.prev_page_url}
                                    className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                                >
                                    Previous
                                </a>
                            )}
                        </div>
                        <div className='w-0 flex-1 flex justify-end'>
                            {pagination.next_page_url && (
                                <a
                                    href={pagination.next_page_url}
                                    className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                                >
                                    Next
                                </a>
                            )}
                        </div>
                    </div>
                    <div className='mt-4 text-sm text-gray-500'>
                        Page {pagination.current_page} of {pagination.last_page}, Total: {pagination.total}
                    </div>
                </>
            )}
        </div>
    );
};

export default Table;
