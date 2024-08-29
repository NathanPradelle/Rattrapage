<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use App\Utils\FilePaths;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TourController extends Controller
{
    #region Pages

    public function creationPage()
    {
        return Inertia::render(FilePaths::TOUR_CREATION);
    }

    public function calendarPage()
    {
        $tours = $this->getAll();

        $toursVm = $tours->map(function ($tour) {
            return $tour->modelSetter();
        });
        
        return Inertia::render(FilePaths::TOURS, [
            'tours' => $toursVm
        ]);
    }

    #endregion

    #region Get

    /// <summary>
    /// Get all Tours.
    /// </summary>
    public function getAll()
    {
        $tours = Tour::query()
            ->select([
                'id',
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

        return $tours;
    }

    /// <summary>
    /// Get validated Tours.
    /// </summary>
    public function getAllValidated()
    {
        $tours = Tour::query()
            ->select([
                'id',
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

        return Inertia::render(FilePaths::TOURS, [
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

        return Inertia::render(FilePaths::TOUR, [
            'tour' => $tour->modelSetter(),
        ]);
    }

    #endregion

    #region Post

    /// <summary>
    /// create new Tour.
    /// </summary>
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'country' => ['required', 'max:255'],
            'city' => ['required', 'max:255'],
            'postalCode' => ['required', 'numeric'],
            'street' => ['required', 'max:255'],
            'description' => ['required', 'max:255'],
            'dateStart' => ['required', 'date', 'after_or_equal:today'],
            'dateEnd' => ['required', 'date', 'after:dateStart'],
        ]);

        $tour = (new Tour())->modelGetter((object) $validatedData);

        $tour->save();

        return redirect()->route("page.tours")
        ->with('success', "Tour successfully validated");
    }

    /// <summary>
    /// Remove the specified resource from storage.
    /// </summary>
    public function destroy($id): RedirectResponse
    {
        $tour = Tour::findOrFail($id);

        $tour->delete();

        return redirect()->back()->with('success', 'Tour deleted successfully');
    }

    #endregion

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
