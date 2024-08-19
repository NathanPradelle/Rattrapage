import './LangageSelector.less';

import { Inertia } from '@inertiajs/inertia';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SimpleList from '@/Components/SimpleList';

import { LanguageENUM } from './i18n';
const profilesOptions = [
  {
    value: LanguageENUM.FR,
    label: 'Français',
  },
  {
    value: LanguageENUM.EN,
    label: 'English',
  },
];
const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const changeLanguage = useCallback((event) => {
    const language = event.value;
    switch (language) {
      case LanguageENUM.EN:
        setCurrentLang(LanguageENUM.EN);
        i18n.changeLanguage(LanguageENUM.EN);

        break;
      case LanguageENUM.FR:
      default:
        setCurrentLang(LanguageENUM.FR);
        i18n.changeLanguage(LanguageENUM.FR);

        break;
    }
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
