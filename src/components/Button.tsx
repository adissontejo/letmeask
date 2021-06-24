import { ButtonHTMLAttributes } from 'react';

import '~/styles/button.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export default function Button({ isOutlined = false, ...buttonProps }: Props) {
  return (
    <button
      className={`button ${isOutlined ? 'outlined' : ''}`}
      {...buttonProps}
    />
  );
}
