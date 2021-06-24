import { useParams, useHistory } from 'react-router-dom';

import logo from '~/assets/images/logo.svg';
import remove from '~/assets/images/delete.svg';

import { useAuth, useRoom } from '~/hooks';
import { Button, Question, RoomCode } from '~/components';
import { database } from '~/services/firebase';

import '~/styles/room.scss';

type Params = {
  id: string;
};

const AdminRoom = () => {
  const history = useHistory();

  const { user } = useAuth();
  console.log(user);

  const { id } = useParams<Params>();

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

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />
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
          {questions.map(item => (
            <Question key={item.id} content={item.content} author={item.author}>
              <button
                type="button"
                onClick={() => handleDeleteQuestion(item.id)}
              >
                <img src={remove} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminRoom;
