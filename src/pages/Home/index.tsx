import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '@/logo.svg';
import googleIcon from '@/google-icon.svg';

import { Aside, Button } from '~/components';
import { useAuth } from '~/hooks';
import { database } from '~/services';

import '~/styles/auth.scss';

import './style.scss';

export default function Home() {
  const history = useHistory();

  const { user, signIn } = useAuth();

  const [roomCode, setRoomCode] = useState('');

  const nextPage = async () => {
    if (!user) {
      await signIn();
    }
    history.push('/rooms/new');
  };

  const joinRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('A sala não existe.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('A sala já foi encerrada.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  };

  return (
    <div id="page-auth">
      <Aside />
      <main>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <button className="create-room" onClick={nextPage}>
            <img src={googleIcon} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={joinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
