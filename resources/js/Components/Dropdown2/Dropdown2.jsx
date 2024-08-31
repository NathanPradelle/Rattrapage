import './Dropdown.less';

import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { createContext, Fragment, useContext } from 'react';

const DropDownContext = createContext();

const Dropdown2 = ({ className, setOpen, open, children }) => {
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
      <div className={clsx('dropdown', className)}>{children}</div>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ className, disabled, children }) => {
  const { toggleOpen } = !disabled && useContext(DropDownContext);

  return (
    <div className={className} onClick={toggleOpen}>
      {children}
    </div>
  );
};

const Content = ({ className, children }) => {
  const { open } = useContext(DropDownContext);

  return (
    <>
      <Transition
        as={Fragment}
        show={open}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <div className={clsx('dropdown-content', className)}>{children}</div>
      </Transition>
    </>
  );
};

Dropdown2.Trigger = Trigger;
Dropdown2.Content = Content;

export default Dropdown2;
