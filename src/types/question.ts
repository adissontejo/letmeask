type QuestionType = {
  id: string;
  author: {
    name: string;
    icon: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

export default QuestionType;
