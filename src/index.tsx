import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import { store } from '@store/configureStore';
import { Provider } from 'react-redux';
import Loading from '@components/organisms/Loading';

const LazyApp = lazy(() => {
  return Promise.all([
    import('./App'),
    new Promise(resolve => setTimeout(resolve, 100))
  ])
    .then(([ moduleExports ]) => moduleExports);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <LazyApp />
      </Suspense>
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
