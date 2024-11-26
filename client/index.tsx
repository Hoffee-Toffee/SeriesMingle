import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const router = createBrowserRouter(routes);
const rootElement = document.getElementById('app');

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, <RouterProvider router={router} />);
  } else {
    createRoot(rootElement).render(<RouterProvider router={router} />);
  }
} else {
  console.error('Root element not found');
}