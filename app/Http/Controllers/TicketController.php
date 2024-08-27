<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Ticket_note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::query()
            ->select(['id', 'objet', 'description', 'status', 'ticket_category_id', 'created_at'])
            ->with(['ticketCategory:id,name'])
            ->latest()
            ->paginate(25);

        // Ajoutez le nom de la catégorie à chaque ticket
        $tickets->getCollection()->transform(function ($ticket) {
            $ticket->category_name = $ticket->ticketCategory->name;
            return $ticket;
        });

        return response()->json($tickets);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Contact/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'category' => 'required|integer|in:1,2,3,4',
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $validateData['user_id'] = Auth::id();

        $ticket = new Ticket();
        $ticket->user()->associate($validateData['user_id']);
        $ticket->ticket_category_id = $validateData['category'];
        $ticket->objet = $validateData['subject'];
        $ticket->description = $validateData['description'];
        $ticket->save();

        return redirect()->route('tickets.index', $validateData['user_id'])->with('success', 'Ticket créé avec succès!');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $ticket = Ticket::with(['ticketCategory', 'user', 'ticketNotes.user'])->find($id);

        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }

        if (request()->is('api/*')) {
            return response()->json($ticket);
        } else {
            return Inertia::render("Contact/Show", ['ticket' => $ticket]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        // Placeholder for edit functionality
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['error' => 'Ticket not found'], 404);
        }

        $request->validate([
            'status' => 'string|in:new,closed,fixed|nullable',
            'note' => 'nullable|string',
        ]);

        if ($request->filled('status')) {
            $ticket->status = $request->input('status');
            $ticket->save();
        }

        if ($request->filled('note')) {
            Ticket_note::create([
                'ticket_id' => $ticket->id,
                'note' => $request->input('note'),
                'user_id' => $request->input('user_id')
            ]);
        }

        if (request()->is('api/*')) {
            return response()->json($ticket);
        } else {
            return redirect()->route('ticket.show', $id)->with('success', 'Note ajoutée');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $ticket = Ticket::findOrFail($id);
            $ticket->delete();

            return response()->json([
                'success' => 'Ticket deleted successfully',
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Ticket not found',
            ], 404);
        }
    }

    public function contact()
    {
        $user = Auth::user();

        return Inertia::render("Contact/ContactAuth", ['user' => $user]);
    }

    public function customerIndex($id)
    {
        $tickets = Ticket::where('user_id', $id)
            ->select(['id', 'objet', 'description', 'status', 'ticket_category_id', 'created_at'])
            ->with(['ticketCategory:id,name'])
            ->latest()
            ->paginate(25);


        return Inertia::render("Contact/Index", [
            'tickets' => $tickets
        ]);
    }
}
