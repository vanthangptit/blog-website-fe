import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';

import { store } from '@store/configureStore';
import { Provider } from 'react-redux';

const LazyApp = lazy(() => import('./App'));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <LazyApp />
    </Provider>
  );
};

root.render(
  // This React.StrictMode renders the application twice in the development mode to check the side effects and the bad code and practices.
  // If you remove this, your app will be single-rendered.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
