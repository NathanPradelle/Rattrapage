<?php

namespace App\Exports;

use App\Models\HarvestTour;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ToursExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return HarvestTour::select('date', 'warehouse', 'period')->get();
    }

    public function headings(): array
    {
        return [
            'Date',
            'Entrepot',
            'Periode',
        ];
    }
}

?>