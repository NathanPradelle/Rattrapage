import axios from 'axios';
import { t } from 'i18next';
import { useCallback, useState } from 'react';

import DangerButton from '@/Components/Buttons/DangerButton';
import SecondaryButton from '@/Components/Buttons/SecondaryButton';
import Modal from '@/Components/Modal';

const BanUserList = ({ userId }) => {
  const [bans, setBans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUserBanHistory = useCallback(() => {
    axios
      .get(`/user/${userId}/ban/list`)
      .then((response) => {
        setBans(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ban list:', error);
      });
  }, [userId]);

  const openModal = useCallback(() => {
    getUserBanHistory();
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <div>
      <DangerButton onClick={openModal}>liste Ban</DangerButton>

      <Modal show={isModalOpen} onClose={closeModal}>
        <div className='p-6'>
          <h2 className='text-xl font-bold mb-4'>Ban List</h2>
          {bans.length > 0 ? (
            <ul>
              {bans.map((ban, index) => (
                <li key={index} className='mb-2'>
                  <div>
                    <strong>{t('common.dateStart')}:</strong> {ban.date_start}
                  </div>
                  <div>
                    <strong>{t('common.dateEnd')}:</strong> {ban.date_end}
                  </div>
                  <div>
                    <strong>{t('common.reason')}:</strong> {ban.raison}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>{t('user.ban.never')}</p>
          )}
          <div className='mt-6 flex justify-end'>
            <SecondaryButton onClick={closeModal}>Close</SecondaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BanUserList;
