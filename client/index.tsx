import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './components/App.tsx';

const rootElement = document.getElementById('app');
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}