import illustration from '@/illustration.svg';

import './style.scss';

const Aside = () => (
  <aside className="aside-component">
    <img
      src={illustration}
      alt="Ilustração simbolizando perguntas e respostas"
    />
    <strong>Crie salas de Q&amp;A ao-vivo</strong>
    <p>Tire as dúvidas da sua audiência em tempo real</p>
  </aside>
);

export default Aside;
