import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import AdminLayout from '@/Layouts/AdminLayout';

const CreateHarvestTour = ({ warehouses, auth }) => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [harvestRequests, setHarvestRequests] = useState([]);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [volunteerDriver, setVolunteerDriver] = useState('');
  const [volunteerAssistants, setVolunteerAssistants] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [availableAssistants, setAvailableAssistants] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (selectedWarehouse && selectedDate && selectedPeriod) {
      axios
        .get(route('api.harvest-requests.filter'), {
          params: {
            warehouse: selectedWarehouse,
            date: selectedDate,
            period: selectedPeriod,
          },
        })
        .then((response) => setHarvestRequests(response.data))
        .catch((error) => console.error(error));

      axios
        .get(route('api.volunteers.filter'), {
          params: {
            warehouse: selectedWarehouse,
            date: selectedDate,
            period: selectedPeriod,
          },
        })
        .then((response) => {
          setAvailableDrivers(response.data.drivers);
          setAvailableAssistants(response.data.assistants);
        })
        .catch((error) => console.error(error));
    }
  }, [selectedWarehouse, selectedDate, selectedPeriod]);

  const handleRequestChange = (request, checked) => {
    if (checked) {
      setSelectedRequests([...selectedRequests, request.id]);
      setTotalQuantity(totalQuantity + request.quantity);
    } else {
      setSelectedRequests(selectedRequests.filter((id) => id !== request.id));
      setTotalQuantity(totalQuantity - request.quantity);
    }
  };

  const handleAssistantChange = (volunteerId, checked) => {
    if (checked && volunteerAssistants.length < 2) {
      setVolunteerAssistants([...volunteerAssistants, volunteerId]);
    } else if (!checked) {
      setVolunteerAssistants(
        volunteerAssistants.filter((id) => id !== volunteerId)
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (totalQuantity < 50 || totalQuantity > 500) {
      alert('La quantité totale doit être comprise entre 50 et 500 kg.');
      return;
    }

    if (volunteerAssistants.length !== 2) {
      alert('Vous devez sélectionner exactement 2 bénévoles assistants.');
      return;
    }

    const formData = {
      warehouse_id: selectedWarehouse,
      date: selectedDate,
      period: selectedPeriod,
      volunteer_driver_id: volunteerDriver,
      volunteer_assistants_ids: volunteerAssistants,
      harvest_requests_ids: selectedRequests,
      total_quantity: totalQuantity,
    };
    Inertia.post(route('harvest-tours.store'), formData);
  };

  return (
    <AdminLayout user={auth.user}>
      <Head title='Créer une Tournée de Récolte' />

      <div className='container mx-auto p-4'>
        <h2 className='text-2xl font-bold mb-4'>
          Créer une Tournée de Récolte
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block font-medium text-gray-700'>Entrepôt</label>
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value)}
              className='form-select mt-1 block w-full p-2 border rounded'
            >
              <option value=''>Sélectionner un entrepôt</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block font-medium text-gray-700'>
              Date de la tournée
            </label>
            <input
              type='date'
              min={
                new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split('T')[0]
              }
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='form-input mt-1 block w-full p-2 border rounded'
            />
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Période</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className='form-select mt-1 block w-full p-2 border rounded'
            >
              <option value=''>Sélectionner une période</option>
              <option value='morning'>Matin</option>
              <option value='afternoon'>Après-midi</option>
              <option value='evening'>Soir</option>
            </select>
          </div>

          <div>
            <h3 className='font-semibold'>
              Quantité Totale:
              <span
                className={
                  totalQuantity < 50 || totalQuantity > 500
                    ? 'text-red-500'
                    : ''
                }
              >
                {' '}
                {totalQuantity}
              </span>
            </h3>
            <table className='table-auto w-full mt-2 border border-gray-700'>
              <thead>
                <tr>
                  <th className='px-4 py-2 border border-gray-700'>Nom</th>
                  <th className='px-4 py-2 border border-gray-700'>Adresse</th>
                  <th className='px-4 py-2 border border-gray-700'>Quantité</th>
                  <th className='px-4 py-2 border border-gray-700'>Note</th>
                  <th className='px-4 py-2 border border-gray-700'>
                    Sélectionner
                  </th>
                </tr>
              </thead>
              <tbody>
                {harvestRequests.map((request) => (
                  <tr key={request.id}>
                    <td className='border border-gray-700 px-4 py-2'>
                      {request.user_name}
                    </td>
                    <td className='border border-gray-700 px-4 py-2'>
                      {request.building_number} {request.street}, {request.city}
                      , {request.postal_code}
                    </td>
                    <td className='border border-gray-700 px-4 py-2'>
                      {request.quantity}
                    </td>
                    <td className='border border-gray-700 px-4 py-2'>
                      {request.note && (
                        <button
                          type='button'
                          onClick={() => alert(request.note)}
                          className='text-blue-500'
                        >
                          Voir
                        </button>
                      )}
                    </td>
                    <td className='border border-gray-700 px-4 py-2'>
                      <input
                        type='checkbox'
                        value={request.id}
                        onChange={(e) =>
                          handleRequestChange(request, e.target.checked)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Routier</label>
            <select
              value={volunteerDriver}
              onChange={(e) => setVolunteerDriver(e.target.value)}
              className='form-select mt-1 block w-full p-2 border rounded'
            >
              <option value=''>Sélectionner un routier</option>
              {availableDrivers.map((volunteer) => (
                <option key={volunteer.id} value={volunteer.id}>
                  {volunteer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className='font-semibold'>Bénévoles Assistants</h3>
            <table className='table-auto w-full mt-2 border border-gray-700'>
              <thead>
                <tr>
                  <th className='px-4 py-2 border border-gray-700'>Nom</th>
                  <th className='px-4 py-2 border border-gray-700'>
                    Sélectionner
                  </th>
                </tr>
              </thead>
              <tbody>
                {availableAssistants.map((volunteer) => (
                  <tr key={volunteer.id}>
                    <td className='border border-gray-700 px-4 py-2'>
                      {volunteer.name}
                    </td>
                    <td className='border border-gray-700 px-4 py-2'>
                      <input
                        type='checkbox'
                        value={volunteer.id}
                        onChange={(e) =>
                          handleAssistantChange(volunteer.id, e.target.checked)
                        }
                        disabled={
                          !volunteerAssistants.includes(volunteer.id) &&
                          volunteerAssistants.length >= 2
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button type='submit' className='btn btn-primary'>
            Créer la Tournée
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateHarvestTour;
