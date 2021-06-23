import copy from '~/assets/images/copy.svg';

import '~/styles/room-code.scss';

type Props = {
  code: string;
};

const RoomCode = ({ code }: Props) => {
  const copyRoomCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <button id="room-code" onClick={copyRoomCode}>
      <div>
        <img src={copy} alt="Copiar" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
};

export default RoomCode;
