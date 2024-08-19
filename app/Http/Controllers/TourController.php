<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use App\Models\ApartmentImage;
use App\Models\ClosedPeriod;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\Tag;
use Carbon\Carbon;
use FilePaths;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApartmentController extends Controller
{
    #region Get

    /// <summary>
    /// Get all Tours.
    /// </summary>
    public function getAll()
    {
        $tours = Tour::query()
            ->select([
                'id',
                'name',
                'country',
                'city',
                'postal_code',
                'street',
                'description',
                'date_start',
                'date_end',
                'is_validated'
            ])
            ->latest()
            ->get();

        $toursVm = $tours->map(function ($tour) {
            return $tour->modelSetter();
        });

        return Inertia::render(FilePaths::APARTMENT_TO_VERIFY, [
            'tours' => $toursVm
        ]);
    }

    /// <summary>
    /// Get validated Tours.
    /// </summary>
    public function getAllValidated()
    {
        $tours = Tour::query()
            ->select([
                'id',
                'name',
                'country',
                'city',
                'postal_code',
                'street',
                'description',
                'date_start',
                'date_end'
            ])
            ->where('is_validated', true)
            ->latest()
            ->get();

        $toursVm = $tours->map(function ($tour) {
            return $tour->modelSetter();
        });

        return Inertia::render(FilePaths::APARTMENT_TO_VERIFY, [
            'tours' => $toursVm
        ]);
    }

    /// <summary>
    /// Get a Tour.
    /// </summary>
    public function get($id)
    {
        $tour = Tour::query()
            ->select([
                'id',
                'name',
                'country',
                'city',
                'postal_code',
                'street',
                'description',
                'date_start',
                'date_end',
                'is_validated'
            ])
            ->where('id', $id)
            ->firstOrFail();

        return Inertia::render(FilePaths::APARTMENT, [
            'tour' => $tour->modelSetter(),
        ]);
    }

    #endregion

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        $tour = Tour::findOrFail($id);

        $tour->delete();

        return redirect()->back()->with('success', 'Tour deleted successfully');
    }

    public function validate($id)
    {

        $tour = Tour::findOrFail($id);

        $tour->is_validated = 1;

        $tour->save();

        return redirect()->route("apartment.managerList")
            ->with('success', "Tour successfully validated");
    }

    public function devalidate($id)
    {

        $tour = Tour::findOrFail($id);

        $tour->is_validated = 0;

        $tour->save();

        return redirect()->route("apartment.managerList")
            ->with('success', "Tour successfully devalidated");
    }
}
