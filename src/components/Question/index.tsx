import { ReactNode } from 'react';
import classnames from 'classnames';

import './style.scss';

type Props = {
  content: string;
  author: {
    name: string;
    icon: string;
  };
  isAnswered?: boolean;
  isHighlighted?: boolean;
  children?: ReactNode;
};

const Question = ({
  content,
  author,
  children,
  isAnswered,
  isHighlighted,
}: Props) => (
  <div
    className={classnames(
      'question',
      { answered: isAnswered },
      { highlighted: isHighlighted }
    )}
  >
    <p>{content}</p>
    <footer>
      <div className="user-info">
        <img src={author.icon} alt={author.name} />
        <span>{author.name}</span>
      </div>
      <div />
      <div>{children}</div>
    </footer>
  </div>
);

export default Question;
