import React from 'react';
import cn from 'classnames';
import { useRippleEffect } from 'hooks';
import styles from './Button.module.css';

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  value?: string | number;
  children?: React.FC;
  testid?: string;
  title?:string;
  type?: string;
  disabled?: boolean
}

const Button :React.FC<ButtonProps> = ({ className, onClick, value, children, testid, title, type, disabled, ...rest }) => {
  const clickCallback = useRippleEffect('button', onClick || (() => {}));
  return (
    <button className={cn('btn', 'btn-default', 'navbar-btn', styles.baseBtn, className)} onClick={clickCallback} data-testid={testid} disabled={disabled} {...rest}>
      {children}
      {value}
    </button>
  );
};

export default Button;
