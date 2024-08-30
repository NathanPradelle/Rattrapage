import clsx from 'clsx';

import Dropdown from '../Dropdown';

const DropMenu = ({ className, title, options = [] }) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span className='inline-flex rounded-md'>
          <button
            type='button'
            className={clsx(
              className,
              'inline-flex items-center px-3 py-2 hover:text-black/70 dark:hover:text-white/80 focus:outline-none transition ease-in-out duration-150'
            )}
          >
            {title}
            <svg
              className='ms-2 -me-0.5 h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </span>
      </Dropdown.Trigger>

      <Dropdown.Content>
        {options?.map((e, index) => (
          <Dropdown.Link href={route(e?.link)} key={index}>
            {e?.label}
          </Dropdown.Link>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};

export default DropMenu;
