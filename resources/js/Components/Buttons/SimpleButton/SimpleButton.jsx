import './SimpleButton.less';

import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import React from 'react';

/**
 * @param {import('./typesButton').ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} param0
 */
const SimpleButton = ({
  color = 'beige',
  className,
  children,
  disabled,
  loading,
  to,
  target,
  type,
  onClick,
  ...props
}) => {
  const childrenRender = Array.isArray(children) ? (
    children.map((c) => (typeof c === 'string' ? <span key={c}>{c}</span> : c))
  ) : typeof children === 'string' ? (
    <span>{children}</span>
  ) : (
    children
  );

  const button = (
    <button
      className={clsx('gpcs-button', className, {
        disabled: disabled || loading,
        [color]: color,
        loading,
      })}
      type={type || 'button'}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <CircularProgress size={20} className='absolute' />}
      {childrenRender}
    </button>
  );

  if (to) {
    return (
      <Link
        href={to}
        target={target}
        className={clsx('redirection-button-link', className)}
        {...props}
      >
        {button}
      </Link>
    );
  }

  return button;
};

export default SimpleButton;
