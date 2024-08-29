import { toSimpleFormat } from '@/utils/date';

import InputError from '../InputError';
import InputLabel from '../InputLabel';
import InputText from '../InputText';

const SimpleDate = ({
  id,
  value,
  setdata,
  label,
  minDate,
  maxDate,
  onChange,
  errorMessage,
  placeholder,
  disabled,
  required,
}) => {
  minDate = toSimpleFormat(minDate);
  maxDate = toSimpleFormat(maxDate);

  return (
    <div>
      <InputLabel htmlFor={id} value={label} />

      <InputText
        id={id}
        name={id}
        type='datetime-local'
        value={value}
        placeholder={placeholder}
        setdata={setdata}
        onChange={onChange}
        min={minDate}
        max={maxDate}
        disabled={disabled}
        required={required}
      />

      <InputError message={errorMessage} />
    </div>
  );
};

export default SimpleDate;
