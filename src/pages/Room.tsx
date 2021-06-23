import { useState, FormEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useAuth from '~/hooks/useAuth';
import { Button, RoomCode } from '~/components';
import { database } from '~/services/firebase';

import logo from '~/assets/images/logo.svg';

import '~/styles/room.scss';

type Params = {
  id: string;
};

type FirebaseQuestions =
  | Record<
      string,
      {
        author: {
          name: string;
          avatar: string;
        };
        content: string;
        isAnswered: string;
        isHighlited: string;
      }
    >
  | undefined;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: string;
  isHighlited: string;
};

const Room = () => {
  const { user } = useAuth();

  const { id } = useParams<Params>();

  const [title, setTitle] = useState('');

  const [newQuestion, setNewQuestion] = useState('');

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);

    roomRef.on('value', room => {
      const parsedQuestions = Object.entries(
        (room.val().questions as FirebaseQuestions) ?? {}
      ).map(([key, value]) => ({
        id: key,
        ...value,
      }));

      setTitle(room.val().title);
      setQuestions(parsedQuestions);
    });
  }, [id]);

  useEffect(() => {}, [questions]);

  const sendQuestion = async (event: FormEvent) => {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    const questionInfo = {
      content: newQuestion,
      author: {
        name: user.name,
        icon: user.icon,
      },
      isHighlited: false,
      isAnswered: false,
    };

    setNewQuestion('');

    await database.ref(`rooms/${id}/questions`).push(questionInfo);
  };

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logo} alt="Letmeask" />
          <RoomCode code={id} />
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length && (
            <span>
              {questions.length} pergunta
              {questions.length !== 1 && 's'}
            </span>
          )}
        </div>
        <form onSubmit={sendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.icon} alt="Icon" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Room;
