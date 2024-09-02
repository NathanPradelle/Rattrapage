import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { t } from 'i18next';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import LanguageSelector from '@/translation/LanguageSelector';

const UpdateProfileInformation = ({
  mustVerifyEmail,
  status,
  className = '',
}) => {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user?.name,
      email: user?.email,
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route('profile.update'));
  };

  return (
    <section className={className}>
      <div className='mb-2'>
        <h2 className='text-lg font-medium text-gray-900'>
          {t('common.lang')}
        </h2>
        <LanguageSelector />
      </div>
      <header>
        <h2 className='text-lg font-medium text-gray-900'>
          {t('user.profil.info')}
        </h2>

        <p className='mt-1 text-sm text-gray-600'>
          {t('user.profil.updateAccount')}
        </p>
      </header>

      <form onSubmit={submit} className='mt-6 space-y-6'>
        <div>
          <InputLabel htmlFor='name' value='Name' />

          <TextInput
            id='name'
            className='mt-1 block w-full text-gray-600'
            value={data?.name}
            onChange={(e) => setData('name', e.target.value)}
            required
            isFocused
            autoComplete='name'
          />

          <InputError className='mt-2' message={errors?.name} />
        </div>

        <div>
          <InputLabel htmlFor='email' value='Email' />

          <TextInput
            id='email'
            type='email'
            className='mt-1 block w-full text-gray-600'
            value={data?.email}
            onChange={(e) => setData('email', e.target.value)}
            required
            autoComplete='username'
          />

          <InputError className='mt-2' message={errors.email} />
        </div>

        {mustVerifyEmail && user.email_verified_at === null && (
          <div>
            <p className='text-sm mt-2 text-gray-800'>
              {t('user.profil.emailUnverified')}
              <Link
                href={route('verification.send')}
                method='post'
                as='button'
                className='underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                {t('user.profil.emailResend')}
              </Link>
            </p>

            {status === 'verification-link-sent' && (
              <div className='mt-2 font-medium text-sm text-green-600'>
                {t('user.profil.emailSent')}
              </div>
            )}
          </div>
        )}

        <div className='flex items-center gap-4'>
          <PrimaryButton disabled={processing}>
            {t('common.save')}
          </PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter='transition ease-in-out'
            enterFrom='opacity-0'
            leave='transition ease-in-out'
            leaveTo='opacity-0'
          >
            <p className='text-sm text-gray-600'>Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
};

export default UpdateProfileInformation;
