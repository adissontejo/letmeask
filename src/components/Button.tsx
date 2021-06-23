import { ButtonHTMLAttributes } from 'react';

import '~/styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  return <button id="button-component" {...props} />;
}
