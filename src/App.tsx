import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, NewRoom, Room } from './pages';

import { AuthProvider } from './contexts';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}
