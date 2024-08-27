<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StockMovementController extends Controller
{
    public function index()
    {
        $movements = StockMovement::with('product', 'user')->orderBy('created_at', 'desc')->get();

        return Inertia::render('StockMovements/Index', [
            'movements' => $movements,
        ]);
    }

    public function create()
    {
        $products = Product::all();

        return Inertia::render('StockMovements/Create', [
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'movement_type' => 'required|in:incoming,outgoing,adjustment',
            'quantity' => 'required|integer',
            'note' => 'nullable|string',
        ]);

        $movement = StockMovement::create([
            'product_id' => $request->product_id,
            'user_id' => auth()->id(),
            'movement_type' => $request->movement_type,
            'quantity' => $request->quantity,
            'note' => $request->note,
        ]);

        // Update product quantity based on the movement type
        $product = Product::find($request->product_id);
        if ($request->movement_type == 'incoming') {
            $product->increment('quantity', $request->quantity);
        } elseif ($request->movement_type == 'outgoing') {
            $product->decrement('quantity', $request->quantity);
        }

        return redirect()->route('stock-movements.index')->with('success', 'Stock movement recorded successfully.');
    }
}
