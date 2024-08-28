import { Link } from '@inertiajs/react';
import { useMemo } from 'react';

const useColumns = () => {
    const columns = useMemo(
        () => [
            {
                field: 'id',
                headerName: 'ID',
                valueGetter: (row) => row?.id,
                renderCell: (row) => row?.id,
            },
            {
                field: 'objet',
                headerName: 'TITRE',
                valueGetter: (row) => row?.objet,
                renderCell: (row) => row?.objet,
            },
            {
                field: 'category_name',
                headerName: 'CATEGORY',
                valueGetter: (row) => row?.ticket_category.name,
                renderCell: (row) => row?.ticket_category.name,
            },
            {
                field: 'actions',
                headerName: 'Actions',
                renderCell: (row) => (
                    <Link href={route('ticket.show', row?.id)}>
                        détails
                    </Link>
                ),
            },
        ],
        []
    );

    return columns;
};

export default useColumns;
