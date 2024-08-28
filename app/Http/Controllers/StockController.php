<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $warehouse_id = $request->input('warehouse_id');
        $date_from = $request->input('date_from');
        $date_to = $request->input('date_to');

        $productsQuery = Product::query()->with('warehouse');

        // Filtrage par recherche (nom ou code barre)
        if ($search) {
            $productsQuery->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('barcode', 'like', '%' . $search . '%');
            });
        }

        // Filtrage par bâtiment de stockage
        if ($warehouse_id) {
            $productsQuery->where('warehouse_id', $warehouse_id);
        }

        // Filtrage par date d'expiration
        if ($date_from && $date_to) {
            $productsQuery->whereBetween('expiry_date', [$date_from, $date_to]);
        }

        // Pagination (25 par page)
        $products = $productsQuery->paginate(25);

        $warehouses = Warehouse::all();

        return Inertia::render('Stock/Index', [
            'products' => $products,
            'warehouses' => $warehouses,
            'filters' => $request->only(['search', 'warehouse_id', 'date_from', 'date_to']),
        ]);
    }

    public function create()
    {
        $warehouses = Warehouse::all();
        return Inertia::render('Stock/Create', [
            'warehouses' => $warehouses,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'barcode' => 'required|string|max:255|unique:products,barcode',
            'weight' => 'required|numeric|min:0',
            'brand' => 'nullable|string|max:255',
            'expiration_date' => 'nullable|date|after_or_equal:today', // Validation pour bloquer les dates passées
            'warehouse_id' => 'required|exists:warehouses,id',
        ]);

        $product = Product::create($request->all());

        // Créer un mouvement de stock pour l'ajout
        StockMovement::create([
            'product_id' => $product->id,
            'user_id' => auth()->id(),
            'movement_type' => 'incoming',
            'quantity' => 1,
            'note' => 'Produit ajouté au stock',
        ]);

        return redirect()->route('stock.index')->with('success', 'Product added successfully.');
    }

    public function edit($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return redirect()->route('stock.index')->with('error', 'Product not found.');
        }

        $warehouses = Warehouse::all();

        return Inertia::render('Stock/Edit', [
            'product' => $product,
            'warehouses' => $warehouses,
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return redirect()->route('stock.index')->with('error', 'Product not found.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'barcode' => 'required|string|max:255|unique:products,barcode,' . $product->id,
            'weight' => 'required|numeric|min:0',
            'brand' => 'nullable|string|max:255',
            'expiration_date' => 'nullable|date|after_or_equal:today', // Validation pour bloquer les dates passées
            'warehouse_id' => 'required|exists:warehouses,id',
        ]);

        $product->update($request->all());

        return redirect()->route('stock.index')->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return redirect()->route('stock.index')->with('error', 'Product not found.');
        }

        $product->delete();

        return redirect()->route('stock.index')->with('success', 'Product deleted successfully.');
    }
}
