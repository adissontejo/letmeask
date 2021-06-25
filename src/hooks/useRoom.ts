import { useState, useEffect } from 'react';

import { database } from '~/services';

import useAuth from './useAuth';

type Question = {
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
}[];

type FirebaseQuestions =
  | Record<
      string,
      {
        author: {
          name: string;
          icon: string;
        };
        content: string;
        isAnswered: boolean;
        isHighlighted: boolean;
        likes: Record<
          string,
          {
            authorId: string;
          }
        >;
      }
    >
  | undefined;

const useRoom = (id: string) => {
  const { user } = useAuth();

  const [title, setTitle] = useState('');

  const [authorId, setAuthorId] = useState('');

  const [questions, setQuestions] = useState<Question>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`);

    roomRef.on('value', room => {
      const parsedQuestions = Object.entries(
        (room.val().questions as FirebaseQuestions) ?? {}
      ).map(([key, value]) => ({
        id: key,
        ...value,
        likeCount: Object.values(value.likes ?? {}).length,
        likeId: Object.entries(value.likes ?? {}).find(
          ([, like]) => like.authorId === user?.id
        )?.[0],
      }));

      setTitle(room.val().title);
      setAuthorId(room.val().authorId);
      setQuestions(parsedQuestions);
    });

    return () => roomRef.off('value');
  }, [id, user?.id]);

  return { questions, authorId, title };
};

export default useRoom;
