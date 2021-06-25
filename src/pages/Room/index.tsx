import { useParams } from 'react-router-dom';

import { useAuth, useRoom } from '~/hooks';

import UserRoom from './UserRoom';
import AdminRoom from './AdminRoom';

type RouteParams = {
  id: string;
};

const Room = () => {
  const { user } = useAuth();

  const { id } = useParams<RouteParams>();

  const { authorId } = useRoom(id);

  return user?.id === authorId ? <AdminRoom /> : <UserRoom />;
};

export default Room;
