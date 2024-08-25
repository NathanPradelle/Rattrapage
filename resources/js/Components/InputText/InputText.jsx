import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';

const InputText = (
  {
    id,
    type = 'text',
    setdata,
    onChange,
    value = '',
    className,
    isFocused,
    disabled,
    ...props
  },
  ref
) => {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input?.current?.focus();
    }
  }, []);

  const onChangeInput = useCallback(
    (e) => {
      let newValue = e.target.value;
      if (type === 'number') {
        newValue = parseInt(newValue);
      }
      setdata && setdata(id, newValue);
      onChange && onChange(newValue);
    },
    [onChange, setdata]
  );

  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      className={clsx(
        'text-black border-1-grey focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm',
        disabled ? 'text-grey bg-transparent' : 'bg-white',
        className
      )}
      onChange={onChangeInput}
      {...props}
    />
  );
};

export default InputText;
