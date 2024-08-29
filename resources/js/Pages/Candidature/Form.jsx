import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';

const CandidatureForm = ({ auth, services, warehouses }) => {
  const { data, setData, post, processing, errors } = useForm({
    user_id: auth.user.id,
    phone: '',
    validation: 0,
    motif: '',
    service_id: '',
    warehouse_id: '',
    nationalite: '',
    age: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    post(route('candidature.store'));
  };

  useEffect(() => {
    console.errors(errors); // Affiche les erreurs dans la console pour débogage
  }, [errors]);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title='Form' />

      {/* Affichage des erreurs globales de candidature */}
      {errors.candidature && (
        <div
          className='mb-4 p-4 text-white bg-red-500 rounded'
          dangerouslySetInnerHTML={{ __html: errors.candidature }}
        ></div>
      )}

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-3xl mx-auto mt-8 p-5 bg-white rounded-lg shadow-lg space-y-4 border border-gray-300'
      >
        <input type='hidden' value={data.user_id} name='user_id' />

        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Numéro de téléphone
          </label>
          <input
            type='text'
            value={data.phone}
            onChange={(e) => setData('phone', e.target.value)}
            className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
          />
          {errors.phone && (
            <div className='text-red-600 text-sm mt-1'>{errors.phone}</div>
          )}
        </div>

        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Motif de la candidature
          </label>
          <textarea
            value={data.motif}
            onChange={(e) => setData('motif', e.target.value)}
            className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
          />
          {errors.motif && (
            <div className='text-red-600 text-sm mt-1'>{errors.motif}</div>
          )}
        </div>

        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Service (obligatoire)
          </label>
          <select
            value={data.service_id}
            onChange={(e) => setData('service_id', e.target.value)}
            className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            required
          >
            <option value=''>Sélectionner un service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          {errors.service_id && (
            <div className='text-red-600 text-sm mt-1'>{errors.service_id}</div>
          )}
        </div>

        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Entrepôt (Warehouse)
          </label>
          <select
            value={data.warehouse_id}
            onChange={(e) => setData('warehouse_id', e.target.value)}
            className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
            required
          >
            <option value=''>Sélectionner un entrepôt</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.city}
              </option>
            ))}
          </select>
          {errors.warehouse_id && (
            <div className='text-red-600 text-sm mt-1'>
              {errors.warehouse_id}
            </div>
          )}
        </div>

        <div>
          <label className='block text-lg font-medium text-gray-700'>
            Nationalité
          </label>
          <select
            value={data.nationalite}
            onChange={(e) => setData('nationalite', e.target.value)}
            className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value=''>Sélectionner une nationalité</option>
            <option value='fr'>Français</option>
            <option value='us'>Américain</option>
            <option value='uk'>Britannique</option>
          </select>
          {errors.nationalite && (
            <div className='text-red-600 text-sm mt-1'>
              {errors.nationalite}
            </div>
          )}
        </div>

        <div>
          <label className='block text-lg font-medium text-gray-700'>Âge</label>
          <input
            type='number'
            value={data.age}
            onChange={(e) => setData('age', e.target.value)}
            className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500'
          />
          {errors.age && (
            <div className='text-red-600 text-sm mt-1'>{errors.age}</div>
          )}
        </div>

        <div className='flex justify-center'>
          <button
            type='submit'
            className='px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-300'
            disabled={processing}
          >
            Soumettre la candidature
          </button>
        </div>
      </form>
    </AuthenticatedLayout>
  );
};

export default CandidatureForm;
