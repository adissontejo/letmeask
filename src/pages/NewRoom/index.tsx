import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logo from '@/logo.svg';

import '~/styles/auth.scss';

import { Aside, Button } from '~/components';
import { database } from '~/services';
import { useAuth } from '~/hooks';

import './style.scss';

export default function NewRoom() {
  const { user } = useAuth();

  const [roomName, setRoomName] = useState('');

  const history = useHistory();

  const createRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (roomName.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: roomName,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  };

  return (
    <div id="page-auth">
      <Aside />
      <main>
        <div className="main-content">
          <img src={logo} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={createRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={roomName}
              onChange={event => setRoomName(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
