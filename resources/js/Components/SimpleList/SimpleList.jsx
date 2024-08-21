import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

import InputLabel from '@/Components/InputLabel';

import DropdownButton from '../Buttons/DropdownButton';

const SimpleList = ({
  id,
  className,
  setdata,
  onChange,
  value = '',
  label,
  placeholder,
  options,
  disabled,
  styles,
}) => {
  const [selectedOption, setSelectedOption] = useState();

  useEffect(() => {
    setSelectedOption(options?.find((option) => option?.value === value));
  }, [value, options]);

  const onClickChange = useCallback(
    (selected) => {
      setSelectedOption(selected);
      setdata && setdata(id, selected.value);
      onChange && onChange(selected);
    },
    [setdata]
  );

  return (
    <DropdownButton
      buttonClass={className}
      trigger={
        <>
          <InputLabel htmlFor={id} value={label} className={styles?.label} />
          <button id={id} type='button'>
            {selectedOption?.label || placeholder || '...'}
          </button>
        </>
      }
      content={options.map((option) => (
        <button
          key={option?.value}
          value={option?.value}
          onClick={!disabled && (() => onClickChange(option))}
          className={clsx('p-0_5', styles?.option)}
          type='button'
        >
          {option?.label || placeholder || '...'}
        </button>
      ))}
      disabled={disabled}
    />
  );
};

export default SimpleList;
