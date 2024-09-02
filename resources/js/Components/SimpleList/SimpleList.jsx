import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';

import InputLabel from '@/Components/InputLabel';

import DropdownButton from '../Buttons/DropdownButton';
import InputText from '../InputText';

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
  autocomplete,
}) => {
  const [open, setOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState();
  const [input, setInput] = useState(selectedOption?.label || '');

  const filteredOptions = useMemo(
    () =>
      autocomplete
        ? options?.filter((e) => e?.value?.includes(input))
        : options,
    [options, input]
  );

  useEffect(() => {
    setSelectedOption(options?.find((option) => option?.value === value));
  }, [value, options]);

  useEffect(() => {
    if (!open) {
      setInput(selectedOption?.label);
    }
  }, [open]);

  const onClickChange = useCallback(
    (selected) => {
      setSelectedOption(selected);
      setInput(selected.name);
      setdata && setdata(id, selected.value);
      onChange && onChange(selected);
      setOpen(false);
    },
    [setdata]
  );

  return (
    <DropdownButton
      buttonClass={className}
      setOpen={setOpen}
      open={open}
      trigger={
        <>
          <InputLabel htmlFor={id} value={label} className={styles?.label} />
          <InputText
            onChange={setInput}
            value={input}
            placeholder={placeholder || '...'}
            disabled={disabled}
          />
        </>
      }
      content={filteredOptions?.map((option) => (
        <button
          key={option?.value}
          value={option?.value}
          onClick={!disabled && (() => onClickChange(option))}
          className={clsx('p-0_5 border-1-grey', styles?.option)}
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
