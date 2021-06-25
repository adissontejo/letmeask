import { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

import './style.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export default function Button({ isOutlined = false, ...buttonProps }: Props) {
  return (
    <button
      className={classnames('button', { outlined: isOutlined })}
      {...buttonProps}
    />
  );
}
