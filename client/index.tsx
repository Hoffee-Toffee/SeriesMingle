import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().then((success) => {
          if (success) {
            console.log('Successfully unregistered service worker:', registration);
          }
        });
      }
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