import { useState } from 'react';

export default function Button () {
  const [num, setNum] = useState(0);

  const increment = () => {
    setNum(num + 1);
  }

  return <button onClick={increment}>{num}</button>
}