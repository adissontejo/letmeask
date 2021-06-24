import { ReactNode } from 'react';

import '~/styles/question.scss';

type Props = {
  content: string;
  author: {
    name: string;
    icon: string;
  };
  children?: ReactNode;
};

const Question = ({ content, author, children }: Props) => (
  <div className="question">
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
