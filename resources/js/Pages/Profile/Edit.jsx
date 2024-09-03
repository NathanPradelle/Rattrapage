import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';

import LayoutSelection from '@/Layouts/LayoutSelection';

import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

const Edit = ({
  mustVerifyEmail,
  status,
  candidature,
  abonnement,
  harvestTours,
  distributionTours,
}) => {
  const getStatusStyle = (validation) => {
    switch (validation) {
      case 1:
        return 'bg-green-100 border border-green-400 text-green-700';
      case 2:
        return 'bg-red-100 border border-red-400 text-red-700';
      case 3:
        return 'bg-blue-100 border border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border border-gray-400 text-gray-700';
    }
  };

  const getStatusText = (validation) => {
    switch (validation) {
      case 1:
        return 'Validée';
      case 2:
        return 'Refusée';
      case 3:
        return "En cours d'Examen";
      default:
        return 'En attente';
    }
  };

  const handleValidateHarvest = (tourId) => {
    Inertia.post(route('harvest.tour.validate', { tour: tourId }));
  };

  const handleRefuseHarvest = (tourId) => {
    Inertia.post(route('harvest.tour.refuse', { tour: tourId }));
  };

  const handleValidateDistribution = (tourId) => {
    Inertia.post(route('distribution.tour.validate', { tour: tourId }));
  };

  const handleRefuseDistribution = (tourId) => {
    Inertia.post(route('distribution.tour.refuse', { tour: tourId }));
  };

  return (
    <LayoutSelection
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Profile
        </h2>
      }
    >
      <Head title='Profile' />

      <div className='py-12'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 text-gray-800'>
          <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
            {abonnement ? (
              <p className='text-gray-800 text-2xl font-bold text-center'>
                Particulier+
              </p>
            ) : (
              <p className='text-gray-800 text-2xl font-bold text-center'>
                Particulier
              </p>
            )}
          </div>

          {/* Affichage des informations de candidature uniquement si elles existent */}
          {candidature && (
            <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
              <div>
                <p
                  className={`p-2 rounded ${getStatusStyle(candidature.validation)}`}
                >
                  <strong>Validation :</strong>{' '}
                  {getStatusText(candidature.validation)}
                </p>
                <p className='text-gray-600'>
                  <strong>Service demandé :</strong> {candidature.service}
                </p>
                <p className='text-gray-600'>
                  <strong>Date de candidature :</strong>{' '}
                  {candidature.date_derniere_candidature}
                </p>
                {candidature.refus && (
                  <p className='text-red-600'>
                    <strong>Motif du refus :</strong> {candidature.refus}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Tableau des tournées de récolte assignées */}
          {harvestTours.length > 0 && (
            <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
              <h2 className='text-xl font-bold mb-4'>
                Vos Tournées de Récolte
              </h2>
              <table className='min-w-full bg-white'>
                <thead>
                  <tr>
                    <th className='px-4 py-2'>Date</th>
                    <th className='px-4 py-2'>Période</th>
                    <th className='px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {harvestTours.map((tour) => (
                    <tr key={tour.id}>
                      <td className='border px-4 py-2'>{tour.date}</td>
                      <td className='border px-4 py-2'>{tour.period}</td>
                      <td className='border px-4 py-2'>
                        <button
                          onClick={() => handleValidateHarvest(tour.id)}
                          className='bg-green-500 text-white px-2 py-1 rounded mr-2'
                        >
                          Valider
                        </button>
                        <button
                          onClick={() => handleRefuseHarvest(tour.id)}
                          className='bg-red-500 text-white px-2 py-1 rounded'
                        >
                          Refuser
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tableau des tournées de distribution assignées */}
          {distributionTours.length > 0 && (
            <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
              <h2 className='text-xl font-bold mb-4'>
                Vos Tournées de Distribution
              </h2>
              <table className='min-w-full bg-white'>
                <thead>
                  <tr>
                    <th className='px-4 py-2'>Date</th>
                    <th className='px-4 py-2'>Période</th>
                    <th className='px-4 py-2'>Adresse</th>
                    <th className='px-4 py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {distributionTours.map((tour) => (
                    <tr key={tour.id}>
                      <td className='border px-4 py-2'>{tour.date}</td>
                      <td className='border px-4 py-2'>{tour.period}</td>
                      <td className='border px-4 py-2'>{tour.address}</td>
                      <td className='border px-4 py-2'>
                        <button
                          onClick={() => handleValidateDistribution(tour.id)}
                          className='bg-green-500 text-white px-2 py-1 rounded mr-2'
                        >
                          Valider
                        </button>
                        <button
                          onClick={() => handleRefuseDistribution(tour.id)}
                          className='bg-red-500 text-white px-2 py-1 rounded'
                        >
                          Refuser
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className='max-w-xl'
            />
          </div>

          <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
            <UpdatePasswordForm className='max-w-xl' />
          </div>

          <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
            <DeleteUserForm className='max-w-xl' />
          </div>
        </div>
      </div>
    </LayoutSelection>
  );
};

export default Edit;
