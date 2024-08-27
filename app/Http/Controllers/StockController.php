<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Stock/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Stock/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'barcode' => 'nullable|string|max:255',
            'quantity' => 'required|integer',
            'expiry_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
        ]);

        $product = Product::create($request->all());

        // Créer un mouvement de stock pour l'ajout
        StockMovement::create([
            'product_id' => $product->id,
            'user_id' => auth()->id(), // Le bénévole qui fait l'ajout
            'movement_type' => 'incoming',
            'quantity' => $product->quantity,
            'note' => 'Récolte de produits ajoutée au stock',
        ]);

        return redirect()->route('stock.index')->with('success', 'Product added successfully.');
    }

    public function edit($id)
    {

        $product = Product::find($id);

        if (!$product) {
            return redirect()->route('stock.index')->with('error', 'Product not found.');
        }

        return Inertia::render('Stock/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, $id)
    {

        $product = Product::find($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'barcode' => 'nullable|string|max:255',
            'quantity' => 'required|integer',
            'expiry_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
        ]);

        // Calculer la différence entre l'ancienne quantité et la nouvelle
        $oldQuantity = $product->quantity;
        $newQuantity = $request->quantity;
        $difference = $oldQuantity - $newQuantity;

        $product->update($request->all());

        if ($difference > 0) {
            // Si la quantité diminue, c'est une distribution (sortie)
            StockMovement::create([
                'product_id' => $product->id,
                'user_id' => auth()->id(), // Le bénévole qui fait la mise à jour
                'movement_type' => 'outgoing',
                'quantity' => $difference,
                'note' => 'Distribution de produits retirée du stock',
            ]);
        } elseif ($difference < 0) {
            // Si la quantité augmente (par erreur), c'est une correction ou une nouvelle entrée
            StockMovement::create([
                'product_id' => $product->id,
                'user_id' => auth()->id(),
                'movement_type' => 'incoming',
                'quantity' => abs($difference),
                'note' => 'Ajustement du stock après correction',
            ]);
        }

        return redirect()->route('stock.index')->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {

        $product = Product::find($id);
        $product->delete();

        return redirect()->route('stock.index')->with('success', 'Product deleted successfully.');
    }
}
