import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { t } from 'i18next';
import React, { useCallback, useMemo } from 'react';

import SimpleField from '@/Components/SimpleField';
import SimpleListMultiple from '@/Components/SimpleListMultiple';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const TourCreationPage = ({ tags }) => {
  const { data, setData, errors } = useForm();
  const tagOptions = useMemo(
    () =>
      tags?.map((tag) => {
        return {
          value: tag?.id,
          label: tag?.name,
        };
      }),
    [tags]
  );

  const handleFileChange = useCallback(
    (e) => {
      const { name, files } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: files,
      }));
    },
    [setData]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData();
      for (const key in data) {
        if (data[key] instanceof FileList) {
          Array.from(data[key]).forEach((file) => {
            formData.append(key, file);
          });
        }
        if (Array.isArray(data[key])) {
          formData.append('tag_id', JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }

      Inertia.post(route('apartment.store'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    [data]
  );

  return (
    <AuthenticatedLayout>
      <div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <SimpleField
            id='name'
            className='flex-col'
            setdata={setData}
            value={data.name}
            label={t('common.title')}
            errorMessage={errors.name}
            required
          />
          <SimpleField
            id='street'
            className='flex-col'
            setdata={setData}
            value={data.street}
            label={t('common.street')}
            errorMessage={errors.street}
            required
          />
          <SimpleField
            id='postalCode'
            className='flex-col'
            setdata={setData}
            value={data.postalCode}
            label={t('common.postalCode')}
            errorMessage={errors.postalCode}
            required
          />
          <SimpleField
            id='surface'
            className='flex-col'
            type='number'
            min='1'
            setdata={setData}
            value={data.surface}
            label='Surface (Au mètre carré)'
            errorMessage={errors.surface}
            required
          />
          <SimpleField
            id='guestCount'
            className='flex-col'
            type='number'
            min='1'
            setdata={setData}
            value={data.guestCount}
            label='Nombre de personnes'
            errorMessage={errors.guestCount}
            required
          />

          <SimpleField
            id='roomCount'
            className='flex-col'
            type='number'
            min='1'
            setdata={setData}
            value={data.roomCount}
            label='Nombre de pièces'
            errorMessage={errors.roomCount}
            required
          />
          <SimpleField
            id='price'
            className='flex-col'
            type='number'
            min='1'
            setdata={setData}
            value={data.price}
            label={t('common.price')}
            errorMessage={errors.price}
            required
          />
          <SimpleField
            id='description'
            className='flex-col'
            setdata={setData}
            value={data.description}
            label={t('common.description')}
            errorMessage={errors.description}
            required
          />
          <div>
            <label
              htmlFor='image'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Ajoutez vos images
            </label>
            <input
              id='image'
              className='file-input w-full max-w-xs'
              type='file'
              name='image'
              multiple
              onChange={handleFileChange}
            />
            {errors.image && (
              <div className='text-red-500 mt-2'>{errors.image}</div>
            )}
          </div>
          <SimpleListMultiple
            id='tag_id'
            setdata={setData}
            value={data.tag_id}
            label={t('Ajoutez des tags')}
            options={tagOptions}
          />

          <button type='submit' className='ms-3 mt-5 ml-0'>
            Créer une tournée
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default TourCreationPage;
