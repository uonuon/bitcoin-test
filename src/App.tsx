import React from 'react';
import './App.css';
import Feed from './screens/Feed';
import { Provider } from './store';

const App: React.FC = () => {
  return (
    <Provider>
      <Feed />
    </Provider>
  );
}

export default App;
