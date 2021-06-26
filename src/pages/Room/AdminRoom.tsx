import { useParams, useHistory } from 'react-router-dom';

import logo from '@/logo.svg';
import remove from '@/delete.svg';
import check from '@/check.svg';
import answer from '@/answer.svg';

import { Button, Question, RoomCode } from '~/components';
import { useRoom } from '~/hooks';
import { database } from '~/services';

import { sortQuestions } from './utils';

import './style.scss';

type RouteParams = {
  id: string;
};

const AdminRoom = () => {
  const history = useHistory();

  const { id } = useParams<RouteParams>();

  const { questions, title } = useRoom(id);

  const handleEndRoom = async () => {
    await database.ref(`rooms/${id}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  };

  const handleDeleteQuestion = async (questionId: string) => {
    const confirm = window.confirm(
      'Você tem certeza que deseja excluir essa pergunta?'
    );
    if (!confirm) {
      return;
    }
    await database.ref(`rooms/${id}/questions/${questionId}`).remove();
  };

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isAnswered: true,
      isHighlighted: false,
    });
  };

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <button className="go-back" onClick={() => history.push('/')}>
            <img src={logo} alt="Letmeask" />
          </button>
          <div>
            <RoomCode code={id} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && (
            <span>
              {questions.length} pergunta
              {questions.length !== 1 && 's'}
            </span>
          )}
        </div>
        <div className="question-list">
          {questions.sort(sortQuestions).map(item => (
            <div className={item.isAnswered ? 'answered-question' : ''}>
              <Question
                key={item.id}
                content={item.content}
                author={item.author}
                isAnswered={item.isAnswered}
                isHighlighted={item.isHighlighted}
              >
                {!item.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(item.id)}
                    >
                      <img src={check} alt="Marcar como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(item.id)}
                    >
                      <img src={answer} alt="Responder pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(item.id)}
                >
                  <img src={remove} alt="Remover pergunta" />
                </button>
              </Question>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
