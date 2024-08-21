import './LangageSelector.less';

import { Inertia } from '@inertiajs/inertia';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SimpleList from '@/Components/SimpleList';

import { fileNames } from './i18n';

const profilesOptions = fileNames?.map((e) => ({ value: e, label: e }));

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const changeLanguage = useCallback((event) => {
    const language = event.value;
    setCurrentLang(language);
    i18n.changeLanguage(language);

    Inertia.reload();
  }, []);

  return (
    <SimpleList
      id='currentUserProfile'
      className='nav-link'
      label={t('common.lang')}
      options={profilesOptions}
      onChange={changeLanguage}
      value={currentLang}
      styles={{ label: 'nav-input', option: 'nav-option' }}
    />
  );
};

export default LanguageSelector;
