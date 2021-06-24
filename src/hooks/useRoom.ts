import { useState, useEffect } from 'react';

import { database } from '~/services/firebase';

import useAuth from './useAuth';

type Question = {
  id: string;
  author: {
    name: string;
    icon: string;
  };
  content: string;
  isAnswered: string;
  isHighlited: string;
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
        isAnswered: string;
        isHighlited: string;
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
      setQuestions(parsedQuestions);
    });

    return () => roomRef.off('value');
  }, [id, user?.id]);

  return { questions, title };
};

export default useRoom;
