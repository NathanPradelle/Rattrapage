<?php

namespace App\Http\Controllers;

use App\Exports\ToursExport;
use Maatwebsite\Excel\Facades\Excel;

class ExcelController extends Controller
{
    public function exportUsers()
    {
        $filePath = storage_path('app/public/tours.xlsx');
    
        Excel::store(new ToursExport, 'tours.xlsx', 'public');
    
        return $filePath;
    }
}


?>