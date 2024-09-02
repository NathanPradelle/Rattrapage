import { toSimpleFormat } from '@/utils/date';

import InputError from '../InputError';
import InputLabel from '../InputLabel';
import InputText from '../InputText';

const SimpleDate = ({
  id,
  type = 'datetime-local',
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
  minDate = toSimpleFormat(minDate, type);
  maxDate = toSimpleFormat(maxDate, type);

  return (
    <div>
      <InputLabel htmlFor={id} value={label} />

      <InputText
        id={id}
        name={id}
        type={type}
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
