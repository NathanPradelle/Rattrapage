import { useForm } from '@inertiajs/react';
import { useState } from 'react';

import DangerButton from '@/Components/Buttons/DangerButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import Modal from '@/Components/Modal';
import SimpleDate from '@/Components/SimpleDate';
import SimpleField from '@/Components/SimpleField';

const ModalBan = ({ userId, className = '' }) => {
  const [confirmingUserBan, setConfirmingUserBan] = useState(false);
  const { data, setData, get, processing, reset, errors } = useForm({
    user_id: userId,
    date_start: '',
    date_end: '',
    raison: '',
  });

  const confirmUserBan = () => {
    setConfirmingUserBan(true);
  };

  const banUser = (e) => {
    e.preventDefault();

    get(`/user/${userId}/ban`, {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserBan(false);

    reset();
  };
  return (
    <section className={`space-y-6 ${className}`}>
      <DangerButton onClick={confirmUserBan}>Bannir</DangerButton>

      <Modal show={confirmingUserBan} onClose={closeModal}>
        <form onSubmit={banUser} className='p-6'>
          <div className='mt-6'>
            <SimpleDate
              id='date_start'
              setdata={setData}
              value={data.date_start}
              label='Start Date'
              errorMessage={errors.date_start}
              isFocused
            />
          </div>
          <div className='mt-6'>
            <SimpleDate
              id='date_end'
              setdata={setData}
              value={data.date_end}
              label='End Date'
              errorMessage={errors.date_end}
            />
          </div>
          <div className='mt-6'>
            <SimpleField
              id='raison'
              setdata={setData}
              value={data.raison}
              label='Raison'
              errorMessage={errors.raison}
            />
          </div>

          <div className='mt-6 flex justify-end'>
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

            <DangerButton className='ms-3' disabled={processing}>
              Bannir {userId}
            </DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default ModalBan;
