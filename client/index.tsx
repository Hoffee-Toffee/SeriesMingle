import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes';

const router = createBrowserRouter(routes, {
  basename: '/projects/SeriesMingle'
});

const rootElement = document.getElementById('app');

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <RouterProvider router={router} />);
} else {
  createRoot(rootElement).render(<RouterProvider router={router} />);
}