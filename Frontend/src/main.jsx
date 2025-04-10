import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import App from './App.jsx';
import store from './Store/store.jsx';
import './index.css';
import { UserContextProvider } from './UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </UserContextProvider>
  </StrictMode>
);