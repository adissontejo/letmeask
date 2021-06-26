import QuestionType from '~/types/question';

const sortQuestions = (a: QuestionType, b: QuestionType) => {
  if (a.isHighlighted === b.isHighlighted && a.isAnswered === b.isAnswered) {
    return b.likeCount - a.likeCount;
  }
  if (a.isHighlighted || b.isAnswered) {
    return -1;
  }
  return 1;
};

export default sortQuestions;
