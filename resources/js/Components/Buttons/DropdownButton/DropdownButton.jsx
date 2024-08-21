import React from 'react';

import Dropdown2 from '@/Components/Dropdown2';

const DropdownButton = ({
  trigger,
  buttonClass,
  content,
  contentClass,
  disabled,
}) => {
  return (
    <Dropdown2 className={buttonClass}>
      <Dropdown2.Trigger disabled={disabled}>{trigger}</Dropdown2.Trigger>

      {!disabled && (
        <Dropdown2.Content className={contentClass}>
          {content}
        </Dropdown2.Content>
      )}
    </Dropdown2>
  );
};

export default DropdownButton;
