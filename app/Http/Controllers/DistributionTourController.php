<?php

namespace App\Http\Controllers;

use App\Models\DistributionTour;
use App\Models\Product;
use App\Models\Warehouse;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DistributionTourController extends Controller
{
    public function index(Request $request)
    {
        $query = DistributionTour::query();

        // Appliquer les filtres s'ils sont définis
        if ($request->filled('search')) {
            $query->whereHas('volunteerDriver', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            })->orWhereHas('warehouse', function($q) use ($request) {
                $q->where('city', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('warehouse_id')) {
            $query->where('warehouse_id', $request->warehouse_id);
        }

        if ($request->filled('period')) {
            $query->where('period', $request->period);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Charger les relations nécessaires
        $tours = $query->with(['warehouse'])->paginate(10);

        return Inertia::render('Distribution/DistributionToursIndex', [
            'tours' => $tours,
            'warehouses' => Warehouse::all(),
            'filters' => $request->only(['search', 'warehouse_id', 'period', 'status']),
        ]);
    }

    public function create()
    {
        $warehouses = Warehouse::all();
        return Inertia::render('Distribution/CreateDistributionTour', [
            'warehouses' => $warehouses,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'warehouse_id' => 'required|exists:warehouses,id',
            'date' => 'required|date|after:today',
            'period' => 'required|in:morning,afternoon,evening',
            'volunteer_driver_id' => 'required|exists:users,id',
            'volunteer_assistants_ids' => 'required|array|size:2',
            'volunteer_assistants_ids.*' => 'exists:users,id',
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id',
            'address' => 'required|string|max:255',
        ]);

        // Créer la tournée de distribution
        $distributionTour = DistributionTour::create([
            'warehouse_id' => $request->warehouse_id,
            'date' => $request->date,
            'period' => $request->period,
            'volunteer_driver_id' => $request->volunteer_driver_id,
            'volunteer_assistants_ids' => json_encode($request->volunteer_assistants_ids),
            'address' => $request->address,
            'status' => 'pending',
        ]);

        // Mettre à jour la colonne distribution_tour_id des produits sélectionnés
        Product::whereIn('id', $request->product_ids)
            ->update(['distribution_tour_id' => $distributionTour->id]);

        // Ajouter le routier et les assistants à la table pivot avec le statut 'pending'
        $distributionTour->volunteers()->attach($request->volunteer_driver_id, ['status' => 'pending']);

        foreach ($request->volunteer_assistants_ids as $assistantId) {
            $distributionTour->volunteers()->attach($assistantId, ['status' => 'pending']);
        }

        return redirect()->route('distribution-tours.index')->with('success', 'Tournée de distribution créée avec succès.');
    }

    public function show($id)
    {
        $distributionTour = DistributionTour::with(['warehouse', 'volunteerDriver', 'volunteers', 'products'])
            ->findOrFail($id);

        // Vérifier si la tournée est complétée et s'il y a un lien PDF
        $pdfAvailable = $distributionTour->status === 'completed' && !empty($distributionTour->pdf_link);

        return Inertia::render('Distribution/Show', [
            'distributionTour' => $distributionTour,
            'pdfAvailable' => $pdfAvailable,
            'pdfLink' => $pdfAvailable ? $distributionTour->pdf_link : null,
        ]);
    }

    public function completeRecap(Request $request, $id)
    {
        $request->validate([
            'description' => 'required|string',
        ]);

        $distributionTour = DistributionTour::findOrFail($id);

        // Vérifier si l'utilisateur actuel est bien le chef bénévole
        if (Auth::id() !== $distributionTour->chief_volunteer_id) {
            return redirect()->route('profile.edit')->with('error', 'Vous n\'êtes pas autorisé à soumettre le récapitulatif pour cette tournée.');
        }

        // Supprimer les produits de cette distribution des stocks
        $products = $distributionTour->products; // Assurez-vous que vous avez une relation 'products' dans votre modèle DistributionTour
        foreach ($products as $product) {
            $product->delete();
        }

        // Marquer la tournée comme complétée
        $distributionTour->status = 'completed';
        $distributionTour->save();

        // Générer le PDF du récapitulatif
        $pdf = Pdf::loadView('pdf.distribution', ['distributionTour' => $distributionTour, 'description' => $request->description]);

        // Définir le nom du fichier pour le PDF
        $fileName = 'recap_distribution_tour_' . $distributionTour->id . '.pdf';

        // Sauvegarder le PDF dans le système de fichiers
        $pdf->save(storage_path('app/public/' . $fileName));

        // Ajouter le lien du PDF à la tournée
        $distributionTour->pdf_link = '/storage/' . $fileName;
        $distributionTour->save();

        return redirect()->route('profile.edit')->with('success', 'Récapitulatif validé, produits supprimés du stock, et PDF généré avec succès.');
    }


    public function validateTour(DistributionTour $tour)
    {
        $volunteer = Auth::user();

        // Mettre à jour le statut de la relation dans la table pivot
        $volunteer->distributionTours()->updateExistingPivot($tour->id, ['status' => 'accepted']);

        // Vérifier si tous les bénévoles ont validé
        if ($tour->volunteers()->wherePivot('status', 'pending')->count() === 0) {
            $tour->update(['status' => 'assigned']);

            // Sélectionner un chef bénévole au hasard parmi les assistants
            $assistants = $tour->volunteers()->where('service_id', '!=', 1)->get(); // Exclut le routier
            if ($assistants->isNotEmpty()) {
                $randomChiefVolunteer = $assistants->random();
                $tour->update(['chief_volunteer_id' => $randomChiefVolunteer->id]);
            }
        }

        return redirect()->route('profile.edit')->with('success', 'Vous avez validé votre participation à la tournée de distribution.');
    }

    public function refuseTour(DistributionTour $tour)
    {
        $volunteer = Auth::user();

        // Mettre à jour le statut de la relation dans la table pivot
        $volunteer->distributionTours()->updateExistingPivot($tour->id, ['status' => 'refused']);

        // La tournée reste en état 'pending' pour permettre à l'administrateur de gérer le remplacement
        $tour->update(['status' => 'pending']);

        return redirect()->route('profile.edit')->with('error', 'Vous avez refusé de participer à la tournée de distribution.');
    }


}
