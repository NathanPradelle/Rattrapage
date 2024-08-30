import clsx from 'clsx';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InputText from '@/Components/InputText';

const SimpleField = ({
  id,
  className,
  type,
  setdata,
  onChange,
  value,
  label,
  errorMessage,
  placeholder,
  required,
  disabled,
  ...props
}) => {
  return (
    <div className={clsx('flex-col', className)}>
      {label && <InputLabel htmlFor={id} value={label} />}

      <InputText
        id={id}
        className='flex-1'
        type={type}
        setdata={setdata}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        {...props}
      />

      {errorMessage && <InputError message={errorMessage} />}
    </div>
  );
};

export default SimpleField;
