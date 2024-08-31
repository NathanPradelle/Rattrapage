<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Utils\FilePaths;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    #region Pages
    
    public function listPage(): Response
    {
        $serviceList = $this->getAllP(new Request());

        return Inertia::render(FilePaths::SERVICES, [
            'services' => $serviceList['services'],
            'pagination' => $serviceList['pagination'],
        ]);
    }

    public function creationPage(): Response
    {
        return Inertia::render(FilePaths::SERVICE_CREATION);
    }

    public function detailsPage(int $id): Response
    {
        $service = $this->get($id);

        return Inertia::render(FilePaths::SERVICE, [
            'service' => $service->modelSetter(),
        ]);
    }

    #endregion

    #region Get

    /// <summary>
    /// Get a Service.
    /// </summary>
    public function get(int $id)
    {
        $user = Service::query()
            ->select(['id', 'name', 'description', 'date_start', 'date_end'])
            ->where('id', $id)
            ->firstOrFail();

        return $user;
    }

    /// <summary>
    /// Get all Services.
    /// </summary>
    public function getAllP(Request $request)
    {
        $services = Service::query()
        ->select(['id', 'name', 'description', 'date_start', 'date_end']);

        if ($request->has('params')) {
        $params = $request->input('params');
        $services->where(function ($query) use ($params) {
            $query->where('name', 'like', "%{$params}%");
        });
    }

        $services = $services->distinct()->paginate(10);

        $pagination = [
            'current_page' => $services->currentPage(),
            'first_page_url' => $services->url(1),
            'from' => $services->firstItem(),
            'last_page' => $services->lastPage(),
            'last_page_url' => $services->url($services->lastPage()),
            'links' => $services->linkCollection(),
            'next_page_url' => $services->nextPageUrl(),
            'path' => $services->path(),
            'per_page' => $services->perPage(),
            'prev_page_url' => $services->previousPageUrl(),
            'to' => $services->lastItem(),
            'total' => $services->total(),
        ];

        $formattedServices = $services->map(function ($service) {
            return $service->modelSetter();
        });

        return [
            'services' => $formattedServices,
            'pagination' => $pagination
        ];
    }

    #endregion

    #region Post

    /// <summary>
    /// create new Service.
    /// </summary>
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'max:255'],
            'description' => ['required'],
            'dateStart' => ['required', 'date', 'after_or_equal:today'],
            'dateEnd' => ['required', 'date', 'after:dateStart'],
        ]);

        $service = (new Service())->modelGetter((object) $validatedData);

        $service->save();

        return redirect()->back()->with('success', "Service created successfully");
    }

    /// <summary>
    /// Update Service.
    /// </summary>
    public function update(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'id'=> ['required', 'integer'],
            'name' => ['required', 'max:255'],
            'description' => ['required'],
            'dateStart' => ['required', 'date'],
            'dateEnd' => ['required', 'date', 'after:dateStart'],
        ]);
    
        $service = Service::findOrFail($validatedData['id']);
        $newService = (new Service())->modelGetter((object) $validatedData);
        $service->update($newService->getAttributes());

        return redirect()->back()->with('success', "Service updated successfully");
    }

    #endregion
}
