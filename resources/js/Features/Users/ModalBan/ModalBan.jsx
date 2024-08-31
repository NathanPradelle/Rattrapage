import { useForm } from '@inertiajs/react';
import axios from 'axios';
import { t } from 'i18next';
import { useCallback, useState } from 'react';

import DangerButton from '@/Components/Buttons/DangerButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import Modal from '@/Components/Modal';
import SimpleDate from '@/Components/SimpleDate';
import SimpleField from '@/Components/SimpleField';

const ModalBan = ({ user, className = '' }) => {
  const today = new Date();

  const [confirmingUserBan, setConfirmingUserBan] = useState(false);
  const { data, setData, processing, reset, errors } = useForm({
    user: user?.id,
  });

  const confirmUserBan = () => {
    setConfirmingUserBan(true);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      axios
        .post(route('user.ban'), {
          ...data,
          preserveScroll: true,
        })
        .then(closeModal);
    },
    [data]
  );

  const closeModal = () => {
    setConfirmingUserBan(false);

    reset();
  };
  return (
    <section className={`space-y-6 ${className}`}>
      <DangerButton onClick={confirmUserBan}>
        {t('user.ban.label')}
      </DangerButton>

      <Modal show={confirmingUserBan} onClose={closeModal}>
        <h2 className='p-1'>{user?.name}</h2>
        <form onSubmit={handleSubmit} className='p-1'>
          <div className='mt-6'>
            <SimpleDate
              id='dateStart'
              setdata={setData}
              value={data.dateStart}
              label={t('common.dateStart')}
              errorMessage={errors.dateStart}
              minDate={today}
              isFocused
            />
          </div>
          <div className='mt-6'>
            <SimpleDate
              id='dateEnd'
              setdata={setData}
              value={data.dateEnd}
              label={t('common.dateEnd')}
              minDate={today}
              errorMessage={errors.dateEnd}
            />
          </div>
          <div className='mt-6'>
            <SimpleField
              id='reason'
              setdata={setData}
              value={data.reason}
              label={t('common.reason')}
              errorMessage={errors.reason}
            />
          </div>

          <div className='mt-6 flex justify-end'>
            <SecondaryButton onClick={closeModal}>
              {t('common.cancel')}
            </SecondaryButton>

            <DangerButton className='ms-3' disabled={processing}>
              {t('user.ban.label')}
            </DangerButton>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default ModalBan;
