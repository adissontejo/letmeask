import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import { AuthProvider } from './contexts';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </BrowserRouter>
    </AuthProvider>
  );
}
