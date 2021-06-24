import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '~/components/Button';
import useAuth from '~/hooks/useAuth';
import { database } from '~/services/firebase';

import illustration from '~/assets/images/illustration.svg';
import logo from '~/assets/images/logo.svg';
import googleIcon from '~/assets/images/google-icon.svg';

import '~/styles/auth.scss';

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
      <aside>
        <img
          src={illustration}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
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
